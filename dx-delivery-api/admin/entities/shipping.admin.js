const { ValidationError } = require("adminjs");
const AdminBro = require("adminjs");
const { Op, Sequelize } = require("sequelize");
const {
  Shipping,
  DeliveryZone,
  User,
  Business,
  PostalCode,
} = require("../../models");
const bluebird = require("bluebird");
const redis = require("redis");
const fs = require("fs");

bluebird.promisifyAll(redis);

// eslint-disable-next-line no-undef
const client = redis.createClient(process.env.REDIS_URL);

const {
  shippingStateList,
  stateTranslate,
  typeTranslate,
  shippingState,
  pickupCenters,
} = require("../../helpers/constants");

const {
  fetchGeocode,
  fetchSuggestedLocations,
} = require("../../helpers/google");
const { getShippingDates } = require("../../helpers/shipping");
const { generateExcel, shippingExcel, convertExcelToJson } = require("../../helpers/excel");
const {
  calculateDeliveryPosibilities,
  getShippingRate,
  createShipping,
  getClients,
} = require("../../helpers/shippings");

const { formatedDate } = require("../../helpers/date");
const { readExcelShippings } = require("../../controllers/excel.controller");

/** @type {AdminBro.ResourceOptions} */
const options = {
  id: "shippings",
  properties: {
    id: {
      isId: true,
      isRequired: true,
      isVisible: false,
    },
    number: {
      isTitle: true,
      isVisible: false,
      position: 1,
    },
    ShippingTypeId: {
      isVisible: true,
      position: 2,
    },
    client: {
      isRequired: true,
      position: 3,
    },
    phone: {
      isRequired: true,
      position: 4,
    },
    comments: {
      isVisible: true,
      position: 5,
    },
    originStreet: {
      isRequired: true,
      position: 6,
    },
    originNumber: {
      isRequired: true,
      position: 7,
    },
    originFloor: {
      isVisible: true,
      position: 8,
    },
    originCity: {
      isRequired: true,
      position: 9,
    },
    destinyStreet: {
      isVisible: true,
      position: 10,
    },
    destinyNumber: {
      isVisible: true,
      position: 11,
    },
    destinyFloor: {
      isVisible: true,
      position: 12,
    },
    destinyCity: {
      isVisible: true,
      position: 13,
    },
    ClientId: {
      isVisible: true,
      position: 14,
    },
    RiderId: {
      isVisible: true,
      position: 15,
      reference: "riders",
      isId: true,
    },
    DeliveryZoneId: {
      isVisible: true,
      position: 16,
    },
    price: {
      isVisible: true,
      position: 17,
    },
    fullAddress: {
      components: {
        list: AdminBro.bundle("../components/full-address"),
      },
      isVisible: {
        show: true,
        view: false,
        edit: false,
        filter: false,
      },
      position: 18,
    },
    BusinessId: {
      isVisible: true,
      position: 20,
    },
    createdAt: {
      isVisible: true,
      position: 21,
      components: {
        list: AdminBro.bundle("../components/formated-date"),
      },
    },
    destinyLocation: {
      isVisible: false,
    },
    destinyPostalCode: {
      isVisible: false,
    },
    details: {
      isVisible: false,
    },
    originLocation: {
      isVisible: false,
    },
    originPostalCode: {
      isVisible: false,
    },
    state: {
      availableValues: shippingStateList,
      components: {
        list: AdminBro.bundle("../components/shipping-state"),
        show: AdminBro.bundle("../components/shipping-state"),
      },
    },
    startDate: {
      isVisible: false,
    },
    limitDate: {
      isVisible: false,
    },
    UserId: {
      isVisible: false,
    },
    undeliveredReason: {
      isVisible: false,
    },
    undeliveredReasonDetails: {
      isVisible: false,
    },
    packages: {
      isVisible: false,
    },
    DeliveryNeighborhoodId: {
      isVisible: false,
    },
    ShippingMlId: {
      isVisible: false,
    },
    PostalCodeId: {
      isVisible: false,
    },
    AgencyId: {
      isVisible: true,
    },
    collectionAmount: {
      isVisible: true,
    },
    isHandledByGP: {
      isVisible: false,
    },
    CompanyId: {
      isVisible: {
        show: true,
        view: false,
        edit: false,
        filter: false,
      },
    },
  },
  filterProperties: [
    "DeliveryZoneId",
    "state",
    "RiderId",
    "ClientId",
    "BusinessId",
    "createdAt",
  ],
  listProperties: [
    "ClientId",
    "BusinessId",
    "DeliveryZoneId",
    "RiderId",
    "state",
    "fullAddress",
    "price",
    "createdAt",
  ],
  showProperties: [
    "number",
    "state",
    "client",
    "phone",
    "details",
    "comments",
    "price",
    "originStreet",
    "originNumber",
    "originFloor",
    "originCity",
    "originLocation",
    "originPostalCode",
    "destinyStreet",
    "destinyNumber",
    "destinyFloor",
    "destinyLocation",
    "destinyPostalCode",
    "destinyCity",
  ],
  sort: { direction: "desc", sortBy: "state" },
  actions: {
    edit: {
      before: async (request) => {
        const {
          id,
          number,
          type,
          state,
          client,
          phone,
          details,
          originStreet,
          originFloor,
          originNumber,
          originCity,
          originPostalCode,
          destinyStreet,
          destinyNumber,
          destinyCity,
          destinyFloor,
          destinyDepartment,
          limitDate,
          startDate,
          destinyPostalCode,
          comments,
          undeliveredReason,
          undeliveredReasonDetails,
          clientDni,
          shippingMethod,
          packageSize,
          isHandledByGP,
          price,
          pickupInAgency,
          collectionAmount,
          createdAt,
          updatedAt,
          deletedAt,
          AgencyId,
          BusinessId,
          DeliveryZoneId,
          PostalCodeId,
          ClientId,
          RiderId,
          ShippingMlId,
          ShippingRateId,
          DeliveryNeighborhoodId,
          UserId,
        } = request?.payload;

        const data = {
          id,
          number,
          type,
          state,
          client,
          phone,
          details,
          originStreet,
          originFloor,
          originNumber,
          originCity,
          originPostalCode,
          destinyStreet,
          destinyNumber,
          destinyCity,
          destinyFloor,
          destinyDepartment,
          limitDate,
          startDate,
          destinyPostalCode,
          comments,
          undeliveredReason,
          undeliveredReasonDetails,
          clientDni,
          shippingMethod,
          packageSize,
          isHandledByGP,
          price,
          pickupInAgency,
          collectionAmount,
          createdAt,
          updatedAt,
          deletedAt,
          AgencyId,
          BusinessId,
          DeliveryZoneId,
          PostalCodeId,
          ClientId,
          RiderId,
          ShippingMlId,
          ShippingRateId,
          DeliveryNeighborhoodId,
          UserId,
        };
        return {
          ...request,
          payload: data,
        };
      },
    },
    new: {
      before: async (request) => {
        request.payload.enabled = !!request.payload.enabled;
        const errors = {};

        const {
          type,
          originStreet,
          originNumber,
          originCity,
          destinyStreet,
          destinyNumber,
          destinyCity,
        } = request.payload;

        if (!originStreet) {
          errors.originStreet = 'Campo "Calle de origen" obligatorio';
        }
        if (!originNumber) {
          errors.originNumber = 'Campo "Nro. de calle de origen" obligatorio';
        }

        if (!originCity) {
          errors.originCity = 'Campo "Ciudad origen" obligatorio';
        }

        if (!destinyStreet) {
          errors.destinyStreet = 'Campo "Calle de destino" obligatorio';
        }
        if (!destinyNumber) {
          errors.destinyNumber = 'Campo "Nro. de calle de destino" obligatorio';
        }
        if (!destinyCity) {
          errors.destinyCity = 'Campo "Ciudad destino" obligatorio';
        }

        let address = `${originStreet} ${originNumber} ${originCity}`;
        await processAddress(errors, {
          addressType: "origin",
          address,
          request,
        });

        address = `${destinyStreet} ${destinyNumber} ${destinyCity}`;
        await processAddress(errors, {
          addressType: "destiny",
          address,
          request,
        });

        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors, {
            message: "Ocurrió un error, verifica la información.",
          });
        }

        const { limitDate, startDate } = getShippingDates(type);
        request.payload.limitDate = limitDate;
        request.payload.startDate = startDate;

        return request;
      },
      component: AdminBro.bundle("../components/create-shippings"),
    },
    list: {
      before: async (request, context) => {
        const { query } = request;
        const filter = Object.keys(query)
          .map((item, index) => {
            const values = Object.values(query);
            let modifyedItem = item;
            if (modifyedItem.includes("filters")) {
              modifyedItem = modifyedItem.slice(8);
              if (modifyedItem.includes("~~")) {
                modifyedItem = modifyedItem.replace("~~", "");
              }
            }
            return {
              [modifyedItem]: values[index],
            };
          })
          ?.reduce((obj, item) => Object.assign(obj, { ...item }), {});

        await client.set(
          `$FILTER_${context.currentAdmin.id}`,
          JSON.stringify(filter)
        );
        //Only get the shippings handled by Gestion Post
        return {
          request,
          query: {
            ...request.query,
            "filters.isHandledByGP": true,
          },
        };
      },
    },
    submitStep: {
      actionType: "resource",
      isVisible: false,
      component: false,
      handler: async (request, res, context) => {
        if (request.method === "get") {
          const neighborhoods = await PostalCode.findAll({
            attributes: [
              ["postal_code_id", "value"],
              ["neighbourhood", "label"],
              "code",
            ],
          });

          //TODO GET COMPANY ID
          const clients = await getClients(null);

          const formatedItem = clients?.result?.map((client) => ({
            ...client,
            label: client.Business
              ? `${client.name} (${client.Business.name})`
              : client.name,
            value: client.id,
          }));

          return {
            error: clients.error,
            clients: formatedItem,
            neighborhoods,
            pickupCenters,
          };
        }

        const searchAddressByQuery = async (query, postalCode) => {
          let error;
          const neighborhoodPostalCode = `${postalCode}`;
          const options = await fetchSuggestedLocations(query);
          const result = await fetchGeocode(undefined, options[0]?.place_id);

          if (!result) {
            error = "Dirección no encontrada";
          }

          if (result && !result.postalCode) {
            error = "Dirección inválida";
          }

          return {
            error,
            result: {
              ...result,
              neighborhood: request.payload.neighborhood,
              postalCode: neighborhoodPostalCode,
            },
          };
        };

        if (request.payload?.step === 1) {
          const { error, result } = await searchAddressByQuery(
            request.payload.input,
            request.payload.neighborhood.code
          );

          return {
            error,
            result,
            nextStep: 2,
          };
        }
        if (request.payload?.step === 2) {
          if (request.payload.isPickup || request.payload.isAgency) {
            let error;
            const posibilities = await calculateDeliveryPosibilities(
              request.payload.originPostalCode,
              request.payload.isPickup
                ? request.payload.pickupDestination?.postalCode
                : "",
              null,
              request.payload.isAgency,
              request.payload.isPickup
            );

            if (posibilities?.error) {
              error = posibilities.error.message;
            }

            return {
              error,
              nextStep: 3,
              posibilities: posibilities.result,
            };
          }

          let { error, result, warning } = await searchAddressByQuery(
            request.payload.input,
            request.payload.neighborhood?.code
          );

          const posibilities = await calculateDeliveryPosibilities(
            request.payload.originPostalCode,
            request.payload.neighborhood.code,
            null,
            request.payload.isAgency,
            request.payload.isPickup
          );

          if (posibilities?.error) {
            error = posibilities.error.message;
          }

          return {
            error,
            result,
            warning,
            nextStep: 3,
            posibilities: posibilities.result,
          };
        }

        if (request.payload?.step === 3) {
          let error;

          if (
            request.payload.shippingMethod === "MESSAGERING" &&
            request.payload.isPickup
          ) {
            const rate = await getShippingRate(
              request.payload.originPostalCode,
              request.payload.destinationPostalCode,
              "PICK_UP",
              null,
              request.payload.shippingMethod
            );

            if (rate?.error) {
              error = rate.error.message;
            }

            return {
              error,
              nextStep: 6,
              result: rate.result,
            };
          }

          const posibilities = await calculateDeliveryPosibilities(
            request.payload.originPostalCode,
            request.payload.destinationPostalCode,
            request.payload.shippingMethod,
            request.payload.isAgency,
            request.payload.isPickup
          );

          if (posibilities?.error) {
            error = posibilities.error.message;
          }

          return {
            error,
            nextStep: 4,
            posibilities: posibilities.result,
          };
        }

        if (request.payload?.step === 5 || request.payload?.step === 4) {
          let error;
          const {
            originPostalCode,
            destinyPostalCode,
            typeOfShipping,
            packages,
            shippingMethod,
          } = request.payload;

          const rate = await getShippingRate(
            originPostalCode,
            destinyPostalCode,
            typeOfShipping,
            packages, // Expected input [{"S": 2, "L":3}]
            shippingMethod
          );

          if (rate?.error) {
            error = rate.error.message;
          }

          return {
            error,
            nextStep: 6,
            result: rate.result,
          };
        }

        if (request.payload?.step === 7) {
          let error;
          const {
            phone,
            origin,
            destination,
            comments,
            details,
            type,
            UserId,
            rate,
            agency,
            pickupInAgency,
            method,
            collectionAmount,
            packages,
          } = request.payload;

          const body = {
            client: request.payload.client,
            phone,
            origin,
            destination,
            comments,
            details,
            type,
            UserId,
            price: rate.totalAmount,
            agency,
            dateOfDelivery: rate.date,
            pickupInAgency,
            method: method.id,
            collectionAmount,
            neighborhood: destination.neighborhood?.value,
            packages,
          };

          const newShipping = await createShipping(body, {
            isAdmin: true,
            id: context.currentAdmin.id,
          });

          if (newShipping.error) {
            error = newShipping.error.message;
          }

          return {
            error,
            result: newShipping,
            redirectUrl: "/admin/resources/shippings",
          };
        }

        return {
          redirectUrl: "/admin/resources/shippings",
        };
      },
    },
    importFromExcel:{
      name:'importFromExcel',
      actionType: "resource",
      isVisible: true,
      handler: async (req, res, context) => {
        const shippings = await convertExcelToJson(req.payload.file.path);
        const request = { body: { data: shippings, authId: context.currentAdmin.authId } };    
        const responseBulkImport = await readExcelShippings(request);
        res.status(200).json({ data: responseBulkImport });
      },
      component: AdminBro.bundle('../components/file-upload'),
      icon: "Add",
      variant: "danger",
    },
    exportToExcel: {
      actionType: "resource",
      handler: async (req, res, context) => {
        const filter = await client.getAsync(
          `$FILTER_${context.currentAdmin.id}`
        );

        //Posible values: type, DeliveryZoneId, state, RiderId, BusinessId,createdAtfrom, createdAtto, ClientId
        const filters = JSON.parse(filter);
        const {
          type = null,
          DeliveryZoneId = null,
          state = null,
          RiderId = null,
          BusinessId = null,
          createdAtfrom = null,
          createdAtto = null,
          ClientId = null,
        } = filters;

        let where = {
          isHandledByGP: true,
        };

        if (type) {
          where.type = type;
        }

        if (state) {
          where.state = state;
        }

        if (createdAtfrom) {
          where.createdAt = {
            ...where.createdAt,
            [Op.gte]: new Date(createdAtfrom),
          };
        }

        if (createdAtto) {
          where.createdAt = {
            ...where.createdAt,
            [Op.lte]: new Date(createdAtto),
          };
        }

        const include = [
          {
            model: User,
            as: "Rider",
            where: RiderId ? { id: RiderId } : null,
            attributes: [[Sequelize.col("name"), "delivery"]],
          },
          {
            model: DeliveryZone,
            where: DeliveryZoneId ? { id: DeliveryZoneId } : null,
            attributes: [[Sequelize.col("name"), "deliveryZone"]],
          },
          {
            model: Business,
            where: BusinessId ? { id: BusinessId } : null,
            attributes: [[Sequelize.col("name"), "businessName"]],
          },
          {
            model: User,
            as: "Client",
            where: ClientId ? { id: ClientId } : null,
            attributes: [["name", "client"]],
          },
        ];

        const shippings = await await Shipping.findAll({
          where,
          include,
          attributes: [
            "number",
            "state",
            "type",
            "price",
            "comments",
            "destinyStreet",
            "destinyNumber",
            "createdAt",
          ],
          raw: true,
          nest: true,
          order: [["createdAt", "ASC"]],
        });

        const cleanShipping = shippings.map(
          ({
            number,
            state,
            type,
            comments,
            destinyStreet,
            destinyNumber,
            price,
            Rider,
            DeliveryZone,
            Client,
            Business,
            createdAt,
          }) => ({
            number,
            state: stateTranslate[state],
            type: typeTranslate[type],
            comments,
            price,
            address: `${destinyStreet} ${destinyNumber}`,
            delivery: Rider?.delivery || null,
            deliveryZone: DeliveryZone?.deliveryZone || null,
            client: Client?.client || null,
            businessName: Business?.businessName || null,
            date: formatedDate(createdAt),
          })
        );

        const { path } = await generateExcel(
          "Pedidos",
          shippingExcel,
          cleanShipping
        );

        await client.set(`CURRENT_FILE_${context.currentAdmin.id}`, path);

        return {
          path,
        };
      },
      isVisible: true,
      component: AdminBro.bundle("../components/excel"),
      icon: "Download",
      hideActionHeader: true,
      variant: "success",
    },
    deleteExcel: {
      isVisible: false,
      component: false,
      handler: async (req, res, context) => {
        const path = await client.getAsync(
          `CURRENT_FILE_${context.currentAdmin.id}`
        );

        if (path) {
          //Delete file
          fs.unlink(`public${path}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }

        return {
          redirectUrl: "/admin/resources/shippings",
        };
      },
    },
    assignRider: {
      name: "assignRider",
      actionType: "bulk",
      icon: "ScooterFront",
      isVisible: true,
      handler: async (request, response, context) => {
        const { records, resource, h, translateMessage } = context;
        if (request.method === "get") {
          // Load records and riders to Drawer screen
          const riders = await User.findAll({
            where: {
              role: "RIDER",
            },
            attributes: ["name", "id"],
          });

          return {
            records,
            riders,
          };
        }
        if (request.method === "post") {
          // Update records with the rider selected
          await Promise.all(
            records.map((record) => {
              let update = {};

              if (record.params.state !== shippingState.DELIVERED) {
                update = {
                  ...update,
                  RiderId: request.payload?.selectedRider,
                };
              }

              if (record.params.state === shippingState.TO_ASSIGN) {
                update = {
                  ...update,
                  state: shippingState.IN_PROGRESS,
                };
              }
              record.update(update);
            })
          );
          return {
            records: records.map((record) =>
              record.toJSON(context.currentAdmin)
            ),
            notice: {
              message: translateMessage(
                "successfullyRiderAssigned",
                resource.id(),
                {
                  count: records.length,
                }
              ),
              type: "success",
            },
            redirectUrl: h.resourceUrl({
              resourceId: resource._decorated?.id() || resource.id(),
            }),
          };
        }
      },
      component: AdminBro.bundle("../components/riders"),
      showInDrawer: true,
      variant: "secondary",
    },
  },
};

const processAddress = async (errors, { addressType, address, request }) => {
  const data = await fetchGeocode(address);
  if (!data) {
    errors[`${addressType}City`] = errors[`${addressType}Street`] = errors[
      `${addressType}Number`
    ] = "Error en la dirección";
  } else {
    const {
      streetName,
      streetNumber,
      postalCode,
      location: { lat, long },
    } = data;

    request.payload[`${addressType}Street`] = streetName;
    request.payload[`${addressType}Number`] = streetNumber;
    request.payload[`${addressType}PostalCode`] = postalCode;
    request.payload[`${addressType}Location`] = {
      type: "Point",
      coordinates: [lat, long],
    };
  }
};

module.exports = {
  options,
  resource: Shipping,
};
