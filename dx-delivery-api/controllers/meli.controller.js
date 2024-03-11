const {
  meliGetShipping,
  buildMLAuthenticationLink,
  validateMLCode,
  refreshMLToken,
} = require("../helpers/meli");
const { meliLogger } = require("../helpers/logger");
const {
  BusinessMl,
  ShippingMl,
  Shipping,
  PostalCode,
  Business,
  Company,
  CompanyMl,
  User,
} = require("../models");
const {
  shippingType,
  shippingState,
  meliShippingStatus,
  meliShippingSubStatus,
} = require("../helpers/constants");
const db = require("../models/index");
const { fetchGeocode } = require("../helpers/google");
const { sendDataToNotificationQueue } = require("../helpers/notification");

const isStatusHandled = (status) =>
  status === meliShippingStatus.cancelled ||
  status === meliShippingStatus.delivered ||
  status === meliShippingStatus.not_delivered;

const isSubStatusHandled = (substatus) =>
  substatus === meliShippingSubStatus.delivery_failed;

const formatPostalCode = (postalCode) => {
  const integerPostalCode = Number(postalCode);
  return integerPostalCode || 10000;
};

const notifications = (req, res) => {
  const { topic } = req.body;

  try {
    switch (topic) {
      case "shipments":
        sendDataToNotificationQueue(req.body);
        break;
      case "orders_v2":
        sendDataToNotificationQueue(req.body);
        break;
      default:
        meliLogger.info("notificationProcessor", {
          message: `unrecognized topic ${topic}`,
        });
    }
  } catch (ex) {
    meliLogger.error("notificationProcessor", ex);
  }
  res.sendStatus(200);
};

async function authenticate(req, res) {
  try {
    if (!req.query.code) {
      return res.sendStatus(400);
    }

    const { code, state } = req.query;

    if (!state) {
      return sendMLError(
        "El state no puede ser vacío.",
        { res, status: 400, errorName: 'Authenticate' },
      );
    }

    // state format 'businessId,companyId'
    const [businessId, companyId] = state.split(',');

    if (!businessId || !companyId) {
      return sendMLError(
        "Valores del state no son validos.",
        { res, status: 400, errorName: 'Authenticate' },
      );
    }

    const credentials = await CompanyMl.findOne({
      where: { CompanyId: companyId },
    });

    if (!credentials) {
      return sendMLError(
        "La compañia no existe.",
        { res, status: 400, errorName: 'Authenticate' },
      );
    }

    const MLValidationResponse = await validateMLCode({
      credentials,
      currentHost: req.get("host"),
      code,
    });

    if (!MLValidationResponse) {
      return res.sendStatus(404);
    }

    const { error, message } = await meliSaveToken(MLValidationResponse, businessId);

    if (error) {
      return sendMLError(
        message,
        { res, status: 500, errorName: 'authenticate' },
      );
    }

    res.sendStatus(200);
  } catch (error) {
    return sendMLError(
      error,
      { res, status: 500, errorName: 'authenticate - catch' },
    );
  }
}

async function getAuthUrl(req, res) {
  try {
    const businessId = req.user.BusinessId;
    const companyId = req.user.CompanyId;

    if (!businessId) {
      return res.status(404).json({ message: "El usuario no pertenece a ninguna empresa" });
    } else if (!companyId) {
      return res.status(404).json({ message: "El usuario no pertenece a ninguna compañía" });
    }

    const userCompany = await Company.findOne({
      where: { id: companyId },
      include: [
        {
          model: CompanyMl,
          attributes: ["clientId"],
        },
      ],
    });

    if (!userCompany || !userCompany.CompanyMls?.length) {
      return res.status(404).json({ message: "La compañía no ha configurado la integración con Mercado Libre" });
    }

    const companyCredentials = userCompany.CompanyMls[0];

    const url = buildMLAuthenticationLink({
      credentials: companyCredentials,
      businessId,
      companyId,
      currentHost: req.get("host"),
    });

    res.status(200).json({ url });
  } catch (error) {
    console.log(error)
    meliLogger.error("getAuthUrl - catch", { error });
    res.sendStatus(500);
  }
}

async function meliGetToken(clientMl, transaction = null) {
  const businessMl = await BusinessMl.findOne({
    where: { clientMl: clientMl },
    include: [
      {
        model: Business,
        attributes: ["CompanyId"],
      },
    ],
    transaction,
  });

  if (!businessMl) return null;

  const companyId = businessMl.Business?.CompanyId;

  if (!companyId) return null;

  const credentials = await CompanyMl.findOne({
    where: { CompanyId: companyId },
  });

  const now = new Date();

  if (now < businessMl.tokenExpiration) {
    return businessMl.token;
  } else {
    if (now < businessMl.refreshTokenExpiration) {
      const jsonObject = await refreshMLToken(
        { refreshToken: businessMl.refreshToken, credentials }
      );

      const { error } = await meliSaveToken(jsonObject, null, transaction);

      if (!error) {
        return jsonObject.access_token;
      }
    }
  }
  return null;
}

async function meliSaveToken(data, businessId, transaction = null) {
  const {
    access_token,
    token_type,
    expires_in,
    scope,
    user_id,
    refresh_token,
  } = data;

  let businessMl = await BusinessMl.findOne({
    where: { clientMl: user_id.toString() },
    transaction,
  });

  if (!businessMl && businessId) {
    const [model] = await BusinessMl.findOrCreate({
      where: { BusinessId: businessId },
      defaults: {
        BusinessId: businessId,
        clientMl: user_id.toString(),
      },
      transaction,
    });

    businessMl = model;

    if (businessMl && !businessMl.clientMl) {
      businessMl.clientMl = user_id.toString();
    }
  }

  if (businessMl) {
    if (
      businessId &&
      businessMl.clientMl === user_id.toString() &&
      businessMl.BusinessId !== businessId
    ) {
      return {
        error: true,
        message:
          "El identificador de mercado libre está asociado con otra empresa",
      };
    }

    const tokenExpiration = new Date();

    tokenExpiration.setSeconds(tokenExpiration.getSeconds() + expires_in);
    businessMl.token = access_token;
    businessMl.tokenExpiration = tokenExpiration;
    businessMl.tokenType = token_type;
    businessMl.scope = scope;

    if (businessMl.refreshToken !== refresh_token) {
      const refreshTokenExpiration = new Date();

      refreshTokenExpiration.setMonth(
        refreshTokenExpiration.getMonth() +
          Number(process.env.MELI_TOKEN_EXPIRATION_MONTHS)
      );

      businessMl.refreshToken = refresh_token;
      businessMl.refreshTokenExpiration = refreshTokenExpiration;
    }

    await businessMl.save({ transaction });

    return { error: false, message: "" };
  } else {
    return {
      error: true,
      message: "The user associated with the token was not found",
    };
  }
}

const updateMeliShipping = async (body) => {
  await db.sequelize.transaction(async (t) => {
    const { user_id, resource, topic } = body;
    const clientMl = user_id.toString();
    const businessMl = await BusinessMl.findOne({
      where: { clientMl },
      transaction: t,
    });

    if (businessMl) {
      const token = await meliGetToken(clientMl, t);

      if (token) {
        const business = await Business.findOne({
          where: { id: businessMl.BusinessId },
          include: [
            {
              model: User,
              attributes: [
                "id",
                "addressStreet",
                "addressNumber",
                "addressCity",
                "addressFloor",
                "addressPostalCode",
                "CompanyId",
              ],
            },
          ],
          transaction: t,
        });

        const user = business?.Users[0];
        const jsonObject = await meliGetShipping(token, "", resource);

        if (jsonObject) {
          meliLogger.info("meliGetShipping", jsonObject);

          const {
            id,
            mode,
            site_id,
            status,
            logistic_type,
            type,
            shipping_option,
            receiver_address,
            sender_address,
            base_cost,
            tags,
            shipping,
            substatus,
          } = jsonObject;

          const isFlex = mode === "me2" && logistic_type === "self_service";

          if (topic === "orders_v2") {
            if (
              (status === meliShippingStatus.cancelled ||
                status === meliShippingStatus.not_delivered ||
                tags?.includes(meliShippingStatus.not_delivered)) &&
              shipping?.id
            ) {
              meliLogger.info("MELI_NOTIFICATION_MANUALLY", jsonObject);
              updateMeliShipping({
                user_id,
                resource: `/shipments/${jsonObject.shipping.id}`,
                topic: "shipments",
              });
            }
            return;
          }

          // eslint-disable-next-line no-undef
          if (process.env.MELI_LIMITED_FLEX === "true" && !isFlex) {
            return;
          }

          const currentShippingMl = await ShippingMl.findOne({
            where: { idMl: id },
            include: [
              {
                model: Shipping,
                attributes: ["id"],
              },
            ],
            transaction: t,
          });

          if (currentShippingMl) {
            await ShippingMl.update(
              {
                flex: isFlex,
                deliveryTypeMl: type,
                estimatedDeliveryMl:
                  shipping_option.estimated_delivery_time?.date,
                estimatedDeliveryLimitMl:
                  shipping_option.estimated_handling_limit?.date,
                shippingMethodMl: shipping_option.shipping_method_id,
                logisticTypeMl: logistic_type,
                statusMl: status,
                modeMl: mode,
                subStatusMl: substatus,
              },
              {
                where: {
                  idMl: id,
                },
                transaction: t,
              }
            );
            if (isStatusHandled(status) || isSubStatusHandled(substatus)) {
              const update = {
                state: shippingState.DELIVERED,
                comments: "Entregado desde Mercado Libre",
              };

              if (status === meliShippingStatus.cancelled) {
                update.state = shippingState.CANCELLED;
                update.comments = "Cancelado desde Mercado Libre";
                update.price = 0;
              }

              if (
                status === meliShippingStatus.not_delivered ||
                isSubStatusHandled(substatus)
              ) {
                update.state = shippingState.UNDELIVERED;
                update.comments = "No entregado desde Mercado Libre";
              }

              await Shipping.update(update, {
                where: {
                  id: currentShippingMl.Shipping?.id,
                },
                transaction: t,
              });
            }
          } else {
            const queryAddressDestiny =
              receiver_address &&
              `${receiver_address.street_name} ${receiver_address.street_number}, ${receiver_address.city.name}`;
            const queryAddressOrigin =
              sender_address &&
              `${sender_address.street_name} ${sender_address.street_number}, ${sender_address.city.name}`;
            const dataGeocodeDestiny = await fetchGeocode(queryAddressDestiny);

            const dataGeocodeOrigin = await fetchGeocode(queryAddressOrigin);
            //create new
            const shippingMl = await ShippingMl.create(
              {
                flex: isFlex,
                idMl: id,
                deliveryTypeMl: type,
                estimatedDeliveryMl:
                  shipping_option.estimated_delivery_time?.date,
                estimatedDeliveryLimitMl:
                  shipping_option.estimated_handling_limit?.date,
                shippingMethodMl: shipping_option.shipping_method_id,
                logisticTypeMl: logistic_type,
                statusMl: status,
                siteMl: site_id,
                modeMl: mode,
                clientMl: user_id,
                baseCostMl: base_cost,
                subStatusMl: substatus,
              },
              { transaction: t }
            );

            const originPostalCode = formatPostalCode(
              user?.addressPostalCode ??
                dataGeocodeOrigin?.postalCode ??
                sender_address?.zip_code
            );

            const destinyPostalCode = formatPostalCode(
              dataGeocodeDestiny?.postalCode ?? receiver_address?.zip_code
            );

            const postalCode = await PostalCode.findOne({
              where: {
                code: destinyPostalCode,
              },
              transaction: t,
            });

            const currentBusiness = await Business.findByPk(
              businessMl.BusinessId,
              {
                raw: true,
                transaction: t,
              }
            );

            const isHandledByGP = currentBusiness?.shippingAutomaticHandling;

            await Shipping.create(
              {
                type: shippingType.MERCADO_LIBRE,
                state: !isStatusHandled(status)
                  ? shippingState.TO_ASSIGN
                  : status === meliShippingStatus.cancelled
                  ? shippingState.CANCELLED
                  : status === meliShippingStatus.not_delivered
                  ? shippingState.UNDELIVERED
                  : shippingState.DELIVERED,
                client: receiver_address.receiver_name,
                phone: receiver_address.receiver_phone,
                originStreet:
                  user?.addressStreet ?? sender_address?.street_name,
                originNumber:
                  user?.addressNumber ?? sender_address?.street_number,
                originPostalCode,
                originCity: user?.addressCity ?? sender_address?.city.name,
                originFloor: user?.addressFloor ?? sender_address?.comment,
                destinyStreet: receiver_address.street_name,
                destinyNumber: receiver_address.street_number,
                destinyPostalCode,
                destinyCity: receiver_address.city.name,
                destinyFloor: receiver_address.comment,
                limitDate: shipping_option.estimated_delivery_time?.date,
                startDate: new Date(),
                DeliveryZoneId: postalCode?.DeliveryZoneId,
                BusinessId: businessMl.BusinessId,
                ShippingMlId: shippingMl.id,
                price: base_cost,
                isHandledByGP,
                CompanyId: user.CompanyId,
              },
              {
                transaction: t,
              }
            );
          }
        } else {
          const message =
            "An error occurred while retrieving shipping information";
          meliLogger.info("meliAddShipping", message);
          throw new Error(message);
        }
      } else {
        const message = `Invalid token for the client ${clientMl}`;
        meliLogger.info("meliAddShipping", message);
        throw new Error(message);
      }
    } else {
      const message = `Unknown client: ${clientMl}`;
      meliLogger.info("meliAddShipping", message);
      throw new Error(message);
    }
  });
};

async function meliAddShipping(req, res) {
  try {
    const { shipping } = req.body;

    if (!shipping) {
      return res.status(400).send("No se encontró el pedido a actualizar");
    }

    await updateMeliShipping(shipping);
    return res.status(200).send("Notificación procesada correctamente!");
  } catch (error) {
    meliLogger.error("meliAddShipping", error);
    return res.status(500).send(error);
  }
}

function sendMLError(message, { status, res, errorName = 'ML Error' }) {
  meliLogger.error(errorName, { message });

  if (res) {
    res.status(status).json(message);
  }
}

module.exports = {
  authenticate,
  notifications,
  meliGetToken,
  meliAddShipping,
  getAuthUrl,
};
