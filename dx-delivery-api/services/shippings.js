const moment = require("moment");
const {
  ShippingRate,
  PostalCode,
  DeliveryZone,
  ShippingType,
} = require("../models");
const { serviceResult } = require("../helpers/constants");
const db = require("../models");
const { Op } = require("sequelize");
const { formatZones } = require("../helpers/shippings");

const getShippingsFromGroupService = async () => {};

const getShippingTypeService = async (
  originPostalCode,
  destinationPostalCode,
  user
) => {
  if (!originPostalCode || !destinationPostalCode) {
    return serviceResult({
      error: true,
      message: "Las direcciones son obligatorias para obtener un servicio",
      statusCode: 400,
    });
  }

  const shippingsNotAvailable =
    "Los envíos no están disponibles para esta zona";

  const originZone = await DeliveryZone.findAll({
    include: [
      {
        model: PostalCode,
        where: originPostalCode
          ? { code: originPostalCode, CompanyId: user.CompanyId }
          : { CompanyId: user.CompanyId },
        attributes: ["id"],
      },
    ],
    raw: true,
  });

  if (!originZone.length) {
    return serviceResult({
      error: true,
      message: shippingsNotAvailable,
      statusCode: 404,
    });
  }

  const destinationZone = await DeliveryZone.findAll({
    include: [
      {
        model: PostalCode,
        where: destinationPostalCode
          ? { code: destinationPostalCode, CompanyId: user.CompanyId }
          : { CompanyId: user.CompanyId },
        attributes: ["id"],
      },
    ],
    raw: true,
  });

  if (!destinationZone.length) {
    return serviceResult({
      error: true,
      message: shippingsNotAvailable,
      statusCode: 404,
    });
  }

  const originZonesAvailables = formatZones(originZone);
  const destinationZoneAvailables = formatZones(destinationZone);
  const weekDay = moment().format("dddd");
  const currentTime = moment().format("HH:mm:ss");

  const availableShippingTypes = await ShippingRate.findAll({
    where: {
      OriginZoneId: originZonesAvailables,
      DestinyZoneId: destinationZoneAvailables,
      CompanyId: user.CompanyId,
      isClose: false,
      day: weekDay,
      finishAt: { [Op.gte]: currentTime },
    },
    include: [
      {
        model: ShippingType,
        attributes: [],
      },
    ],
    attributes: [
      "id",
      "price",
      [db.sequelize.col("ShippingType.name"), "typeName"],
      [db.sequelize.col("ShippingType.description"), "typeDescription"],
      [db.sequelize.col("ShippingType.icon"), "typeIcon"],
    ],
    raw: true,
  });

  return serviceResult({
    error: false,
    message: "Tipos de envíos cargados correctamente",
    statusCode: 200,
    data: availableShippingTypes,
  });
};

module.exports = { getShippingsFromGroupService, getShippingTypeService };
