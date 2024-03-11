/* eslint-disable no-undef */
const { Op } = require("sequelize");
const { User, PostalCode, Agency } = require("../models");
const { roles, shippingMethods, shippingType } = require("../helpers/constants");
const db = require("../models/index");

const { fetchGeocode, getPlaceId } = require("../helpers/google");
const { createShipping } = require("../helpers/shippings");

const validateShipping = (shipping, row, errors, packages, currentUser) => {
  let hasErrors = false;

  const validateField = (field, fieldName, values = []) => {
    if (!field) {
      errors.push({
        index: row,
        message: `${fieldName} es requerido.`,
      });
      hasErrors = true;
    } else if (values.length && !values.includes(field)) {
      errors.push({
        index: row,
        message: `Valor incorrecto del "${fieldName}".`,
      });
      hasErrors = true;
    }
  };

  if (shipping.method === shippingMethods.ORDER) {
    packages.push({
      S: "",
      M: "",
      L: "",
    });
  }

  if (shipping.method === shippingMethods.COLLECTION) {
    if (!currentUser.enableCollection) {
      errors.push({
        index: row,
        message: "Usted no tiene permisos para realizar ese tipo de envios.",
      });
      hasErrors = true;
    }
    if (shipping.type !== shippingType.CHECK) {
      errors.push({
        index: row,
        message:
          "El tipo de pedido no coincide con el tipo de envio: usted quiere enviar un Cheque a cobrar.",
      });
      hasErrors = true;
    }
  }

  validateField(shipping.client, "Nombre de destinatario");
  validateField(shipping.phone, "Telefono");
  validateField(shipping.originStreet, "Calle origen");
  validateField(shipping.originNumber, "Numero de origen");
  validateField(shipping.originCity, "Ciudad de origen");
  validateField(shipping.destinyStreet, "Calle destino");
  validateField(shipping.destinyNumber, "Numero de destino");
  validateField(shipping.destinyCity, "Ciudad de destino");
  validateField(
    shipping.method,
    "Tipo de pedido",
    Object.values(shippingMethods)
  );
  validateField(
    shipping.type,
    "Tipo de envío",
    Object.values(shippingType)
  );

  return hasErrors;
};

const getOriginAddressData = async (street, number, row, errors) => {
  if (street && number) {
    const placeId = await getPlaceId(`${street} ${number}`);
    if (placeId) {
      const originData = await fetchGeocode(undefined, placeId);
      if (!originData?.postalCode) {
        errors.push({
          index: row,
          message: 'No es posible determinar el Código Postal.',
        });
        return null;
      } else {
        const existPostalCode = await PostalCode.findOne({
          where: {
            code: originData?.postalCode,
          },
        });
        if (existPostalCode) {
          return {
            streetName: street,
            streetNumber: number,
            streetFloor: "",
            postalCode: originData?.postalCode,
            address: originData?.address,
            location: originData?.location,
            city: originData?.city,
          };
        } else {
          errors.push({
            index: row,
            message:
              "No se encontró ningún código postal para los datos de la dirección proporcionada.",
          });
          return null;
        }
      }
    } else {
      errors.push({
        index: row,
        message: "La dirección no existe o no se encuentra en Uruguay",
      });
      return null;
    }
  } else {
    errors.push({
      index: row,
      message: "Faltan datos en la dirección.",
    });
    return null;
  }
};

const getDestinationAddressData = async (
  shipping,
  destination,
  agencyId,
  errors,
  hasErrors,
  row
) => {
  if (shipping.pickupInAgency) {
    if (shipping.agency) {
      const existAgency = await Agency.findOne({
        where: {
          name: { [Op.iLike]: shipping.agency },
        },
      });

      if (existAgency) {
        agencyId = existAgency.id;
        destination = {
          address: "",
          location: {
            lat: -34.8824311,
            long: -56.1758958,
          },
          postalCode: "",
          streetNumber: "",
          city: shipping.destinyCity,
          department: shipping.destinyDepartment,
          streetName: "",
          streetFloor: "",
        };
        if (shipping.destinyDepartment === "Montevideo") {
          errors.push({
            index: row,
            message:
              "Los retiros en agencia solo se pueden realizar al interior",
          });
          hasErrors = true;
        }
      } else {
        errors.push({
          index: row,
          message: "Debe indicar una agencia válida para el retiro",
        });
        hasErrors = true;
      }
    } else {
      errors.push({
        index: row,
        message: "Debe indicar una agencia para el retiro.",
      });
      hasErrors = true;
    }
  } else {
    if (shipping.destinyStreet && shipping.destinyNumber) {
      const place_id = await getPlaceId(
        `${shipping.destinyStreet} ${shipping.destinyNumber}`
      );
      if (place_id) {
        const destinyData = await fetchGeocode(undefined, place_id);
        if (destinyData?.postalCode) {
          destination = {
            streetName: shipping.destinyStreet,
            streetNumber: shipping.destinyNumber,
            postalCode: destinyData?.postalCode,
            city: destinyData?.city,
            address: destinyData?.address,
            location: destinyData?.location,
            place_id,
            streetFloor: shipping.destinyFloor,
          };
        } else {
          errors.push({
            index: row,
            message:
              "Los envios no están disponibles desde la dirección de destino.",
          });
          hasErrors = true;
          return;
        }
      } else {
        errors.push({
          index: row,
          message:
            "La dirección de retiro no existe o no se encuentra en Uruguay.",
        });
        hasErrors = true;
      }
    } else {
      errors.push({
        index: row,
        message: "Debe indicar una dirección para el retiro.",
      });
      hasErrors = true;
    }
  }
  return destination
};

const readExcelShippings = async (req) => {
  const authId = req.body.authId;
  const transaction = await db.sequelize.transaction();
  try {
    const currentUser = await User.findOne(
      { where: { authId } },
      {
        attributes: [
          "ci",
          "BusinessId",
          "email",
          "name",
          "phone",
          "role",
          "id",
          "enableCollection",
          "addressStreet",
          "addressNumber",
          "addressCity",
          "addressFloor",
          "addressPostalCode",
          "addressLocation",
          "CompanyId",
        ],
      }
    );
    const { data } = req.body;
    const errors = [];

    const user = {
      id: currentUser.id,
      isAdmin: currentUser.role === roles.ADMIN,
      CompanyId: currentUser.CompanyId,
    };

    const batchExcelShippings = async (shipping, index) => {
      let packages = [];
      let hasErrors = false;
      let origin;
      let destination;
      let agencyId;
      const row = index + 1;

      hasErrors = validateShipping(
        shipping,
        row,
        errors,
        packages,
        currentUser
      );

      origin = await getOriginAddressData(
        shipping.originStreet,
        shipping.originNumber,
        row,
        errors
      );
      destination = await getDestinationAddressData(
        shipping,
        destination,
        agencyId,
        errors,
        hasErrors,
        row
      );

      if (!hasErrors) {
        if (!errors.length) {
          const body = {
            client: shipping.client,
            phone: shipping.phone,
            origin,
            destination,
            details: shipping.details,
            type: shipping.type,
            price: 0,
            agency: agencyId,
            dateOfDelivery: null,
            pickupInAgency: shipping.pickupInAgency,
            neighborhood: null,
            method: shipping.method,
            collectionAmount:
              Number(shipping.collectionAmount) || null,
            packages,
            rateId: null,
            userId: user.id,
          };
          await createShipping(body, user, transaction);
        }
      }
    };

    const assignments = [];
    for (let index = 0; index < data.length; index++) {
      const shipping = data[index];
      const result = await batchExcelShippings(shipping, index);
      assignments.push(result);
    }

    if (assignments) {
      let message;
      let success;
      if (errors.length) {
        message = "El excel tiene errores.";
        success = false;
        transaction.rollback();
      } else {
        message = "El procesado del excel se completo exitosamente.";
        success = true;
        await transaction.commit();
      }
      return {
        success,
        errors,
        message,
      };
    } else {
      transaction.rollback();
      return {
        success: false,
        errors,
        message: "Error al realizar el mapeo del excel.",
      };
    }
  } catch (error) {
    console.log(error);
    transaction.rollback();
    return {
      success: false,
      errors: [],
      message: "Error en el lado del servidor.",
    };
  }
};

module.exports = {
  readExcelShippings,
};
