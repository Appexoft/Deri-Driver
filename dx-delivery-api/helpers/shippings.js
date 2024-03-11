const { Op } = require("sequelize");
const moment = require("moment");

const {
  User,
  ShippingRate,
  PostalCode,
  Agency,
  Parameter,
  PackagePrice,
  Business,
  Shipping,
  DeliveryZone,
} = require("../models");
const {
  shippingTypeFilter,
  shippingMethodsFilter,
  shippingType,
  shippingMethods,
  additionalBaseTypes,
} = require("../helpers/constants");
const Constants = require("../helpers/constants");
const { getShippingDates } = require("../helpers/shipping");
const { shippingDateFormat } = require("./date");

const calculateDeliveryPosibilities = async (
  originPostalCode,
  destinyPostalCode,
  isAgency,
  isPickup,
  userId,
  CompanyId,
) => {
  let _error;
  let result;

  try {
    if (!originPostalCode && !destinyPostalCode) {
      _error = {
        status: 400,
        message: "Las direcciones son obligatorias",
      };
      return { error: _error, result };
    }

    const currentUser = userId && (await User.findByPk(userId));

    const originPostal = await PostalCode.findAll({
      where: {
        code: originPostalCode,
      },
      include: DeliveryZone,
      row: true,
    });

    if (!originPostal.length) {
      _error = {
        status: 404,
        message: "Los envíos no disponibles para esta zona",
      };
      return { error: _error, result };
    }

    const getPosibilitiesWithPostalCodes = async (where) => {
      const avaibleShipping = await ShippingRate.findAll({
        where,
        attributes: ["typeOfShipping", "shippingMethod"],
      });

      let getTypeOfShipping = [
        ...new Set(avaibleShipping.map((item) => item.typeOfShipping)),
      ]?.filter((item) => item !== shippingType.PICK_UP);

      //REMOVE PICKUP OF LIST, REMOVE CHECK AND DEPOSIT IF THE USER DOESN'T HAVE enableCollection FLAG ACTIVE
      if (!currentUser?.enableCollection || isPickup === "true") {
        getTypeOfShipping = getTypeOfShipping.filter(
          (item) =>
            item !== shippingType.DEPOSIT && item !== shippingType.CHECK,
        );
      }

      const getTypeOfShippingFull = getTypeOfShipping.map((item) =>
        shippingTypeFilter.find((_item) => _item.id === item),
      );

      let getShippingMethod = [
        ...new Set(avaibleShipping.map((item) => item.shippingMethod)),
      ];

      //REMOVE COLLECTION IF THE USER DOESN'T HAVE enableCollection FLAG ACTIVE
      if (!currentUser?.enableCollection || isPickup === "true") {
        getShippingMethod = getShippingMethod.filter(
          (item) => item !== Constants.shippingMethods.COLLECTION,
        );
      }

      const getShippingMethodFull = getShippingMethod.map((item) =>
        shippingMethodsFilter.find((_item) => _item.id === item),
      );

      return {
        typesOfShipping: getTypeOfShippingFull,
        shippingMethods: getShippingMethodFull,
        error: !avaibleShipping?.length,
      };
    };

    if (JSON.parse(isAgency) && originPostal) {
      //AGENCY SHIPPING
      const arrayOfResults = formatZones(originPostal);
      const where = {
        OriginZoneId: arrayOfResults,
        typeOfShipping: shippingType.COMMON,
        CompanyId,
      };

      const agencies = await Agency.findAll();

      if (!agencies?.length) {
        _error = {
          status: 404,
          message: "Ocurrió un error al cargar las agencias",
        };
        return { error: _error, result };
      }

      const {
        error,
        typesOfShipping,
        shippingMethods,
      } = await getPosibilitiesWithPostalCodes(where);

      if (error) {
        _error = {
          status: 404,
          message: "Los envíos no disponibles para esta zona",
        };
        return { error: _error, result };
      }

      result = {
        typesOfShipping,
        shippingMethods,
        agencies,
      };

      return { error: _error, result };
    }

    const destinyPostal = await PostalCode.findAll({
      where: {
        code: destinyPostalCode,
      },
      include: [{ model: DeliveryZone, attributes: ["id"] }],
      attributes: ["id", "code", ["neighbourhood", "name"]],
    });

    if (!destinyPostal.length) {
      _error = {
        status: 404,
        message:
          "Los envíos no disponibles para esta zona, intenta con un envío al interior",
      };
      return { error: _error, result };
    }

    let where = {
      CompanyId,
    };

    if (originPostal) {
      const arrayOfResults = formatZones(originPostal);

      where.OriginZoneId = arrayOfResults;
    }

    if (destinyPostal) {
      const arrayOfResults = formatZones(destinyPostal);
      where.DestinyZoneId = arrayOfResults;
    }

    const {
      error,
      typesOfShipping,
      shippingMethods,
    } = await getPosibilitiesWithPostalCodes(where);

    if (error) {
      _error = {
        status: 404,
        message:
          "Los envíos no disponibles para esta zona, intenta con un envío al interior",
      };
      return { error: _error, result };
    }

    result = {
      typesOfShipping,
      shippingMethods,
      neighborhoods: destinyPostal,
    };

    return { _error, result };
  } catch (error) {
    console.error("error", error);
    _error = {
      status: 500,
      message: "Ocurrió un error en el servidor",
    };
    return { error: _error, result };
  }
};

const findRate = async (
  typeOfShipping,
  originPostal,
  destinyPostal,
  shippingMethod,
  biggestPackage,
  CompanyId,
) => {
  const format = "HH:mm:ss";
  const initialDate = moment().format("YYYY-MM-DD");
  const initialTime = moment().format(format);

  let currentDate = initialDate;
  let currentRequest = 0;
  let rateFound = false;
  let error;
  let nextDayFound = false;

  const nextDay = (currentDate) =>
    moment(currentDate).add(1, "day").format("YYYY-MM-DD");

  const isAvaible = (date) => {
    const limitTime = moment(date.finishAt, format);
    const isAvaible = time.isBefore(limitTime, format);
    return isAvaible;
  };

  const time = moment(initialTime, format);

  const calculateRate = async (checkNextDay = false) => {
    if (currentRequest >= process.env.REQUEST_LIMIT) {
      return (error = "Ocurrió un error al cargar el precio");
    }

    if (nextDayFound) {
      return {
        rate: rateFound,
        date: currentDate,
        error,
      };
    }

    const isSpecialDate = await ShippingRate.findOne({
      where: {
        typeOfShipping,
        shippingMethod,
        OriginZoneId: '26094521-18e5-4a68-95d3-e063498ac28f', // originPostal 
        DestinyZoneId: '26094521-18e5-4a68-95d3-e063498ac28f', // destinyPostal
        date: currentDate,
        CompanyId,
      },
      attributes: [
        "price",
        "typeOfShipping",
        "finishAt",
        "date",
        "isClose",
        "shippingMethod",
        "id",
      ],
    });

    if (isSpecialDate) {
      if (isSpecialDate.isClose) {
        currentDate = nextDay(currentDate);
        currentRequest++;
        await calculateRate(checkNextDay);
        return;
      }

      if (currentDate === initialDate) {
        if (isAvaible(isSpecialDate)) {
          return (rateFound = isSpecialDate);
        }

        currentDate = nextDay(currentDate);
        currentRequest++;
        await calculateRate(checkNextDay);
        return;
      }

      if (checkNextDay) {
        nextDayFound = true;
        return calculateRate();
      }

      return (rateFound = isSpecialDate);
    }

    const shippingRate = await ShippingRate.findOne({
      where: {
        typeOfShipping,
        shippingMethod,
        date: null,
        OriginZoneId: '26094521-18e5-4a68-95d3-e063498ac28f', // originPostal
        DestinyZoneId: '26094521-18e5-4a68-95d3-e063498ac28f', // destinyPostal
        day: moment(currentDate).format("dddd"),
        CompanyId,
      },
      attributes: [
        "price",
        "typeOfShipping",
        "finishAt",
        "date",
        "isClose",
        "shippingMethod",
        "day",
        "id",
      ],
    });

    if (shippingRate) {
      if (shippingRate.isClose) {
        currentDate = nextDay(currentDate);
        currentRequest++;
        await calculateRate(checkNextDay);
        return;
      }

      if (currentDate === initialDate) {
        if (isAvaible(shippingRate)) {
          return (rateFound = shippingRate);
        }

        currentDate = nextDay(currentDate);
        currentRequest++;
        await calculateRate(checkNextDay);
        return;
      }

      if (checkNextDay) {
        nextDayFound = true;
        return calculateRate();
      }

      return (rateFound = shippingRate);
    }

    return (error = "El envío no esta disponible");
  };

  if (!rateFound && !error) {
    await calculateRate();
  }

  if (typeOfShipping === shippingType.COMMON && !nextDayFound && !rateFound) {
    currentDate = nextDay(currentDate);
    currentRequest++;
    calculateRate(true);
  }

  // Add aditional base
  rateFound.additionalBase = 0;
  if (rateFound && shippingMethod !== shippingMethods.MESSAGERING) {
    if (biggestPackage !== "S") {
      const parameter =
        biggestPackage === "M"
          ? additionalBaseTypes.ADDITIONAL_BASE_M
          : additionalBaseTypes.ADDITIONAL_BASE_L;
      const baseAdditional = await Parameter.findOne({
        where: {
          key: parameter,
          CompanyId,
        },
        attributes: ["value"],
      });

      if (baseAdditional) {
        rateFound.additionalBase = baseAdditional.value;
      }
    }
  }

  return {
    rate: rateFound,
    date: currentDate,
    error,
  };
};

const getShippingRate = async (
  originPostalCode,
  destinyPostalCode,
  typeOfShipping,
  packages, // Expected input [{"S": 2, "L":3}]
  shippingMethod,
  CompanyId,
) => {
  let _error;
  let result;
  try {
    const findAdditionalCost = async (_package, mount) => {
      if (!mount) {
        return 0;
      }
      const existPackage = await PackagePrice.findOne({
        where: {
          packageSize: _package,
          typeOfShipping,
          CompanyId,
        },
        raw: true,
      });

      if (existPackage) {
        return Number(existPackage.price) * Number(mount);
      }

      return 0;
    };

    let additionalCost = 0;
    let biggestPackage = "S";

    if (
      shippingMethod !== shippingMethods.MESSAGERING &&
      shippingMethod !== shippingMethods.COLLECTION
    ) {
      const _packages = JSON.parse(packages);
      // Get biggest package
      biggestPackage = _packages.some((e) => e.L)
        ? "L"
        : _packages.some((e) => e.M)
        ? "M"
        : "S";

      let additionalCostes = [];
      await Promise.all(
        _packages.map(async ({ S, M, L }) => {
          // Add aditional cost only if the sum of packages is more than 1 and is not the same as biggest package
          if (L && !(biggestPackage === "L" && `${L}` === "1")) {
            const isBiggestPackage = biggestPackage === "L";
            additionalCostes.push(
              await findAdditionalCost("L", isBiggestPackage ? L - 1 : L),
            );
          }
          if (M && !(biggestPackage === "M" && `${M}` === "1")) {
            const isBiggestPackage = biggestPackage === "M";
            additionalCostes.push(
              await findAdditionalCost("M", isBiggestPackage ? M - 1 : M),
            );
          }
          if (S && !(biggestPackage === "S" && `${S}` === "1")) {
            const isBiggestPackage = biggestPackage === "S";
            additionalCostes.push(
              await findAdditionalCost("S", isBiggestPackage ? S - 1 : S),
            );
          }
        }),
      );
      // sum all aditional costes
      additionalCostes.forEach((e) => (additionalCost += e));
    }

    const originPostal = await PostalCode.findAll({
      where: {
        code: originPostalCode,
      },
      include: DeliveryZone,
      row: true,
    });

    const originPostalCodes = formatZones(originPostal);

    const destinyPostal = await PostalCode.findAll({
      where: {
        code: destinyPostalCode || process.env.AGENCY_POSTAL_CODE,
      },
      include: DeliveryZone,
      row: true,
    });

    const destinyPostalCodes = formatZones(destinyPostal);

    if (!originPostal?.length) {
      _error = {
        status: 404,
        message:
          "Los envíos no disponibles para esta zona, intenta con un envío al interior",
      };
      return {
        error: _error,
        result,
      };
    }

    const { rate, date, error } = await findRate(
      typeOfShipping,
      originPostalCodes,
      destinyPostalCodes,
      shippingMethod,
      biggestPackage,
      CompanyId,
    );

    if (error) {
      _error = {
        status: 404,
        message: error,
      };
      return {
        error: _error,
        result,
      };
    }
    const totalAmount =
      rate.price + parseInt(rate.additionalBase) + additionalCost;

    result = {
      rate,
      date,
      totalAmount,
    };
    return {
      error: _error,
      result,
    };
  } catch (error) {
    console.error("error", error);
    _error = {
      status: 500,
      message: "Ocurrió un error en el servidor",
    };
    return {
      result,
      error: _error,
    };
  }
};

const createShipping = async (body = {}, user = {},transaction = null) => {
  let error;
  let result;
  try {
    const {
      name,
      client,
      phone,
      origin,
      destination,
      comments,
      details,
      type,
      UserId,
      price,
      agency,
      dateOfDelivery,
      pickupInAgency,
      neighborhood,
      method,
      collectionAmount,
      packages,
      rateId,
    } = body;

    const { id, isAdmin, CompanyId } = user;

    let businessId = null;
    let clientId = null;

    const { startDate } = getShippingDates(type, null);
  
    if (isAdmin && UserId) {
      const user = await User.findOne({
        where: {
          id: UserId,
          CompanyId,
        },
        include: [
          {
            model: Business,
          },
        ],
      });
      if (!user) {
        error = {
          status: 404,
          message: "No encontró el usuario solicitado",
        };
        return {
          result,
          error,
        };
      }
      clientId = user.id;

      if (user.Business) {
        businessId = user.BusinessId;
      }
    } else {
      const user = await User.findOne({
        where: {
          id,
          CompanyId,
        },
        include: [
          {
            model: Business,
          },
        ],
      });
      if (!user) {
        error = {
          status: 404,
          message: "No encontró el usuario solicitado",
        };
        return {
          result,
          error,
        };
      }

      clientId = user.id;
      if (user.Business) {
        businessId = user.BusinessId;
      }
    }

    let postalCodeWhere = {};
    if (neighborhood) {
      postalCodeWhere = {
        id: neighborhood,
      };
    } else {
      postalCodeWhere = {
        code: destination.postalCode || process.env.AGENCY_POSTAL_CODE,
      };
    }

    const destinyPostalCode = await PostalCode.findAll({
      where: postalCodeWhere,
      include: [{ model: DeliveryZone, where: { CompanyId } }],
    });

    const deliveryZone = destinyPostalCode && formatZones(destinyPostalCode)[0];

    const shipping = await Shipping.create({
      name,
      client,
      phone,
      type,
      originStreet: origin.streetName,
      originNumber: origin.streetNumber,
      originFloor: origin.streetFloor,
      originCity: origin.city,
      originPostalCode: origin.postalCode,
      originLocation: {
        type: "Point",
        coordinates: [origin.location.lat, origin.location.long],
      },
      destinyStreet: !pickupInAgency ? destination.streetName : null,
      destinyNumber: !pickupInAgency ? destination.streetNumber : null,
      destinyFloor: !pickupInAgency ? destination.streetFloor : null,
      destinyCity: destination.city,
      destinyPostalCode: destination.postalCode,
      destinyLocation: {
        type: "Point",
        coordinates: [destination?.location?.lat, destination?.location?.long],
      },
      destinyDepartment: destination.department,
      comments,
      details,
      limitDate: dateOfDelivery,
      startDate,
      BusinessId: businessId,
      ClientId: clientId,
      DeliveryZoneId: deliveryZone,
      price,
      AgencyId: agency,
      pickupInAgency,
      DeliveryNeighborhoodId: neighborhood,
      shippingMethod: method,
      collectionAmount,
      packages,
      ShippingRateId: rateId,
      CompanyId,
    },{ transaction });

    result = shipping;

    return {
      error,
      result,
    };
  } catch (err) {
    error = {
      status: 500,
      message: "Ocurrió un error en el servidor",
    };
    return {
      error,
      result,
    };
  }
};

const getClients = async (CompanyId) => {
  let error;
  let result;
  try {
    const clients = await User.findAll({
      attributes: ["name", "email", "role", "id", "phone"],
      include: [
        { model: Business, attributes: ["businessName", "name", "rut"] },
      ],
      where: {
        role: {
          [Op.not]: Constants.roles.RIDER,
        },
        CompanyId,
      },
      raw: true,
    });
    return {
      error,
      result: clients,
    };
  } catch (err) {
    console.error("error", error);
    error = {
      status: 500,
      message: "Ocurrió un error en el servidor",
    };
    return {
      error,
      result,
    };
  }
};

const formatZones = (postalCodeModel) =>
  (postalCodeModel || []).map((item) => item.id).flat();

const getShippingFromDates = async (
  shippingsDates,
  where,
  page = 1,
  limit = 5,
) => {
  const offset = (page - 1) * limit;
  const shippingsDetails = await Promise.all(
    shippingsDates.map(async ({ date }) => {
      const start = moment(date).startOf("day").format(shippingDateFormat);
      const end = moment(date).endOf("day").format(shippingDateFormat);
      const shippingByDate = await Shipping.findAndCountAll({
        where: {
          ...where,
          createdAt: {
            [Op.between]: [start, end],
          },
        },
        include: [
          { model: User, as: "Rider", attributes: ["id", "name"] },
          {
            model: DeliveryZone,
            attributes: ["id", "name"],
          },
          {
            model: User,
            as: "Client",
            attributes: ["id", "name"],
          },
          {
            model: Business,
            attributes: ["id", "name"],
          },
        ],
        offset,
        limit,
        attributes: [
          "id",
          "number",
          "client",
          "state",
          "originStreet",
          "originNumber",
          "destinyStreet",
          "destinyNumber",
          "createdAt",
          "limitDate",
          "isHandledByGP",
          "pickupInAgency",
          "destinyDepartment",
          "destinyCity",
          "type",
          "shippingMethod",
          "packages",
          "receiver",
          "details",
          "BusinessId",
        ],
        order: [["createdAt", "DESC"]],
      });
      return {
        id: date,
        amount: shippingByDate.count,
        list: shippingByDate.rows,
        group: "date",
      };
    }),
  );
  return shippingsDetails;
};

module.exports = {
  calculateDeliveryPosibilities,
  findRate,
  getShippingRate,
  createShipping,
  getClients,
  formatZones,
  getShippingFromDates,
};
