const { Op } = require("sequelize");
const moment = require("moment");
const db = require("../models/index");
const { generateMeliPdf, generateGpPdf } = require("../helpers/pdf");

const {
  Shipping,
  ShippingMl,
  User,
  DeliveryZone,
  Business,
  ShippingImage,
  PostalCode,
  Agency,
} = require("../models");
const {
  shippingState,
  shippingTypeFilter,
  shippingSateFilter,
  undeliveredReasons,
  roles,
  shippingMethodsFilter,
  pickupCenters,
  shippingsStateFilters,
} = require("../helpers/constants");

const { fetchSuggestedLocations, fetchGeocode } = require("../helpers/google");
const {
  createShipping: _createShipping,
  calculateDeliveryPosibilities,
  getShippingRate: _getShippingRate,
  getShippingFromDates,
} = require("../helpers/shippings");
const {
  getShippingsFromGroupService,
  getShippingTypeService,
} = require("../services/shippings");
const { shippingDateFormat } = require("../helpers/date");

const listShippings = async (req, res) => {
  try {
    const {
      page = 1,
      term,
      group = "date",
      stateFilter = shippingsStateFilters.ALL,
    } = req.query;

    const { id, role, isAdmin, CompanyId } = req.user;
    const limit = 5;
    const offset = (page - 1) * limit;

    let where = {
      CompanyId,
    };

    let associationWhere = {};
    let riderWhere = {};

    if (role === roles.RIDER && !isAdmin) {
      const rider = await User.findByPk(id);
      if (!rider) {
        return res.status(404).send("El rider no fue encontrado");
      }
      riderWhere.id = rider.id;
    }

    where.deletedAt = {
      [Op.eq]: null,
    };

    if (
      stateFilter &&
      shippingsStateFilters[stateFilter] &&
      stateFilter !== shippingsStateFilters.ALL
    ) {
      where.state = stateFilter;
    }

    if (term) {
      const results = await db.sequelize.query(
        `
        SELECT *
        FROM ${Shipping.tableName}
        WHERE _search @@ to_tsquery(:query);
      `,
        {
          model: Shipping,
          replacements: { query: `${term.split(" ").join(":* & ")}:*` },
        }
      );
      const ids = results.map((s) => s.dataValues.shipping_id);
      if (ids.length > 0) {
        where.id = {
          [Op.or]: ids,
        };
      } else {
        where.number = Number(term) || 0;
      }
    }

    const hasRider = Object.keys(riderWhere).length;
    const hasDeliveryZone = Object.keys(associationWhere).length;

    const shippingsDates = await Shipping.findAll({
      where,
      distinct: true,
      include: [
        {
          model: User,
          as: "Rider",
          where: hasRider ? riderWhere : null,
          attributes: [],
        },
        {
          model: DeliveryZone,
          where: hasDeliveryZone ? associationWhere : null,
          attributes: [],
        },
        {
          model: User,
          as: "Client",
          attributes: [],
        },
        {
          model: Business,
          attributes: [],
        },
      ],
      offset,
      limit,
      attributes: [
        [
          db.sequelize.fn("DATE", db.sequelize.col("Shipping.createdAt")),
          "date",
        ],
      ],
      group,
      order: [[db.sequelize.col("date"), "DESC"]],
      raw: true,
    });

    const shippingsDetails = await getShippingFromDates(shippingsDates, where);

    return res.status(200).send(shippingsDetails);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getShippingsFromGroup = (req, res) => {
  try {
    //TODO
    getShippingsFromGroupService();

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send(error);
  }
};

const isUUID = (uuid) => {
  let s = "" + uuid;

  s = s.match(
    "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
  );
  if (s === null) {
    return false;
  }
  return true;
};

const getShipping = async (req, res) => {
  try {
    const { id, isAdmin, isRider, BusinessId, CompanyId } = req.user;

    const { isFromQR } = req.query;
    let { shippingId } = req.params;
    if (!isUUID(shippingId)) {
      const shippingMl = await ShippingMl.findOne({
        where: { CompanyId, idMl: shippingId },
        include: [
          {
            model: Shipping,
            attributes: ["id"],
          },
        ],
      });
      if (shippingMl) {
        shippingId = shippingMl.Shipping?.id;
      }
    }
    if (isFromQR === "true") {
      const shipping = await Shipping.findOne({
        where: {
          id: shippingId,
          CompanyId,
        },
      });

      if (!shipping.isHandledByGP) {
        shipping.isHandledByGP = true;
        await shipping.save();
      }

      if (isRider && shipping.ClientId !== id) {
        const rider = await User.findOne({
          where: {
            CompanyId,
            id,
          },
          row: true,
        });
        if (
          shipping.state === shippingState.TO_ASSIGN ||
          shipping.state === shippingState.IN_PROGRESS
        ) {
          await shipping.setRider(rider);
          if (shipping.state === shippingState.TO_ASSIGN) {
            shipping.state = shippingState.IN_PROGRESS;
            await shipping.save();
          }
        }
        //Business Logic
        if (shipping.state === shippingState.IN_STORE) {
          await shipping.setRider(rider);
          shipping.state = shippingState.DELIVERY_IN_PROGRESS;
          await shipping.save();
        }
      }
    }
    const shipping = await Shipping.findOne({
      where: {
        id: shippingId,
        CompanyId,
      },
      attributes: [
        "id",
        "number",
        "state",
        "type",
        "originStreet",
        "originNumber",
        "destinyStreet",
        "destinyNumber",
        "comments",
        "createdAt",
        "limitDate",
        "undeliveredReason",
        "undeliveredReasonDetails",
        "RiderId",
        "phone",
        "details",
        "originFloor",
        "originCity",
        "originPostalCode",
        "originLocation",
        "destinyFloor",
        "destinyCity",
        "destinyPostalCode",
        "destinyLocation",
        "destinyDepartment",
        "pickupInAgency",
        "client",
        "clientDni",
        "ClientId",
        "BusinessId",
        "shippingMethod",
        "packages",
        "price",
        "receiver",
        "CompanyId",
      ],
      include: [
        {
          model: ShippingImage,
        },
        { model: User, as: "Rider", attributes: ["id", "name"] },
        {
          model: Agency,
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "Client",
          attributes: ["id", "name"],
        },
        {
          model: PostalCode,
          as: "DeliveryNeighborhood",
          attributes: ["id", ["neighbourhood", "name"]],
        },
      ],
    });

    if (!shipping) {
      return res.status(404).send("El pedido no fue encontrado");
    }

    if (
      shipping.CompanyId === CompanyId &&
      (isAdmin ||
        shipping.RiderId === id ||
        shipping.ClientId === id ||
        shipping.BusinessId === BusinessId)
    ) {
      return res.status(200).json({
        shipping,
      });
    } else {
      return res
        .status(403)
        .send("No tiene permisos para recuperar los datos del envío");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const asignShippingRider = async (req, res) => {
  try {
    const { shippingId, riderId } = req.params;
    const { CompanyId } = req.user;

    if (!shippingId) {
      return res.status(500).json("El campo shippingId es obligatorio");
    }

    if (!riderId) {
      return res.status(500).json("El campo riderId es obligatorio");
    }

    const attributes = [
      "id",
      "number",
      "state",
      "type",
      "originStreet",
      "originNumber",
      "destinyStreet",
      "destinyNumber",
      "comments",
      "createdAt",
      "limitDate",
      "undeliveredReason",
      "undeliveredReasonDetails",
      "RiderId",
      "phone",
      "details",
      "originFloor",
      "originCity",
      "originPostalCode",
      "originLocation",
      "destinyFloor",
      "destinyCity",
      "destinyPostalCode",
      "destinyLocation",
      "destinyDepartment",
      "pickupInAgency",
      "client",
      "clientDni",
      "ClientId",
      "shippingMethod",
      "packages",
      "price",
      "receiver",
    ];

    const shipping = await Shipping.findOne({
      where: {
        id: shippingId,
        CompanyId,
      },
      attributes,
    });

    if (!shipping) {
      return res.status(404).send("El pedido no fue encontrado");
    }

    const rider = await User.findOne({
      where: {
        id: riderId,
        CompanyId,
      },
      row: true,
    });

    if (!rider) {
      return res.status(404).json("El rider no fue encontrado");
    }

    if (rider.role !== roles.RIDER) {
      return res.status(400).json("Este usuario no es rider");
    }

    if (shipping.state === shippingState.DELIVERED) {
      return res.status(404).send("El pedido ya ha sido finalizado");
    }

    await shipping.setRider(rider);

    if (shipping.state === shippingState.TO_ASSIGN) {
      shipping.state = shippingState.IN_PROGRESS;
      await shipping.save();
    }

    await shipping.reload({
      attributes,
      include: [
        {
          model: ShippingImage,
        },
        { model: User, as: "Rider" },
      ],
    });

    return res.status(200).json({ shipping });
  } catch (error) {
    res.status(500).send(error);
  }
};

const asignRiderToShippings = async (req, res) => {
  const attributes = ["id", "state", "RiderId"];
  const { CompanyId } = req.user;
  const t = await db.sequelize.transaction();

  const batchShippings = async (shippingId, rider, transaction) => {
    const shipping = await Shipping.findOne({
      where: {
        id: shippingId,
        CompanyId,
      },
      attributes,
      include: [{ model: User, as: "Rider" }],
      transaction,
    });

    if (shipping.state === shippingState.DELIVERED) {
      return;
    }

    await shipping.setRider(rider);

    if (shipping.state === shippingState.TO_ASSIGN) {
      shipping.state = shippingState.IN_PROGRESS;
      await shipping.save({ transaction });
    }

    return shipping;
  };

  try {
    const { riderId } = req.params;
    const { shippings } = req.body;

    if (!riderId) {
      return res.status(400).send("El campo riderId es obligatorio");
    }

    if (!Array.isArray(shippings) && !shippings.length) {
      return res.status(400).send("No hay pedidos para asginar");
    }

    const rider = await User.findOne({
      where: { id: riderId, CompanyId },
      row: true,
    });

    if (!rider) {
      return res.status(404).send("El rider no fue encontrado");
    }

    if (rider.role !== roles.RIDER) {
      return res.status(400).json("Este usuario no es rider");
    }

    const assignments = await Promise.all(
      shippings.map((shipping) => batchShippings(shipping, rider, t))
    );

    await t.commit();

    if (!assignments) {
      return res.status(500).send("Error al asignar riders");
    }

    return res.status(200).json(assignments);
  } catch (error) {
    t.rollback();
    return res.status(500).send(error);
  }
};

const createShipping = async (req, res) => {
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
    } = req.body;

    const body = {
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
    };

    const { error, result: shipping } = await _createShipping(body, req.user);

    if (error) {
      return res.status(error.status).send(error.message);
    }

    return res.status(200).json(shipping);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const updateShipping = async (req, res) => {
  try {
    const { shippingId } = req.params;
    const { shipping } = req.body;
    const { CompanyId } = req.user;

    if (!shippingId) {
      return res.status(400).json("El campo shippingId es obligatorio");
    }

    if (!shipping || !Object.keys(shipping)) {
      return res.status(404).json("No hay nuevos campos para actualizar");
    }

    //Business LOGIC
    if (shipping.state === shippingState.IN_STORE) {
      shipping.RiderId = null;
    }

    const newShipping = await Shipping.update(shipping, {
      where: {
        id: shippingId,
        CompanyId,
      },
      include: [
        { model: User, as: "Rider" },
        {
          model: User,
          as: "Client",
          attributes: ["id", "name"],
        },
      ],
      attributes: [
        "id",
        "number",
        "state",
        "type",
        "originStreet",
        "originNumber",
        "destinyStreet",
        "destinyNumber",
        "comments",
        "createdAt",
        "limitDate",
        "undeliveredReason",
        "undeliveredReasonDetails",
        "RiderId",
        "phone",
        "details",
        "originFloor",
        "originCity",
        "originPostalCode",
        "originLocation",
        "destinyFloor",
        "destinyCity",
        "destinyPostalCode",
        "destinyLocation",
        "destinyDepartment",
        "pickupInAgency",
        "client",
        "clientDni",
        "ClientId",
        "shippingMethod",
        "packages",
        "price",
        "receiver",
      ],
      returning: true,
      plain: true,
    });

    return res.status(200).json({ shipping: newShipping });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const listShippingFilters = async (req, res) => {
  try {
    const { isAdmin } = req.user;
    let filter = {
      shippingState: shippingSateFilter,
      shippingType: shippingTypeFilter,
      shippingMethod: shippingMethodsFilter,
    };

    if (isAdmin) {
      const deliveryZone = await DeliveryZone.findAll();
      //TODO Change to Client
      const business = await Business.findAll();
      filter = {
        ...filter,
        deliveryZone,
        business,
      };
    }

    return res.status(200).json({
      ...filter,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const listUndeliveredReasons = (req, res) => {
  res.status(200).json({ undeliveredReasons });
};

const getAddressGeocode = async (req, res) => {
  try {
    const queryAddress = req.query.place_id;
    const onlyDirection = req.query.onlyDirection;
    const data = await fetchGeocode(undefined, queryAddress);

    //Shoud be replaced when we improve the error handler
    if (!data) {
      return res.status(404).send("No se encontro la direccion");
    }

    if (!data.postalCode) {
      return res.status(400).send("La dirección no es válida");
    }

    if (onlyDirection === "true") {
      return res.status(200).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getSuggestedLocations = async (req, res) => {
  try {
    const queryAddress = req.query.address;
    const data = await fetchSuggestedLocations(queryAddress);

    //Shoud be replaced when we improve the error handler
    if (!data) {
      return res.status(404).send("No se encontraron direcciones sugeridas");
    }

    res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const addImageToShipping = async (req, res) => {
  try {
    const { shippingId } = req.params;
    const { CompanyId } = req.user;

    if (req.newFiles?.length) {
      req.newFiles.map(async (file) => {
        if (!shippingId) {
          return res.status(400).send("shippingId es requerido");
        }

        if (!file.Location) {
          return res.status(400).send("Error al obtener la imagen");
        }

        const shipping = await Shipping.findOne({
          where: {
            id: shippingId,
            CompanyId,
          },
        });

        if (!shipping) {
          return res.status(404).send("El pedido no existe");
        }

        const image = await ShippingImage.create({
          uri: file.Location,
          ShippingId: shippingId,
        });

        if (!image) {
          return res.status(500).send("Error al crear la imagen");
        }
      });
    }

    if (req.deletedFiles?.length) {
      req.deletedFiles.map(async (image) => {
        await ShippingImage.destroy({
          where: {
            id: image.id,
          },
        });
      });
    }

    return res.status(200).json("Imagenes guardadas correctamente");
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getShippingPdf = async (req, res) => {
  try {
    const { id, isAdmin } = req.user;
    const { shippingId } = req.params;
    const { selectedShippings } = req.query;

    if (!shippingId && !selectedShippings) {
      return res.status(400).json({
        error: "No se seleccionaron pedidos",
      });
    }

    const shippingIds = shippingId || JSON.parse(selectedShippings);

    const shippings = await Shipping.findAll({
      where: { id: shippingIds },
      include: [
        { model: User, as: "Client", attributes: ["id", "name", "phone"] },
        { model: Business, as: "Business", attributes: ["id", "name"] },
        { model: Agency, as: "Agency", attributes: ["id", "name"] },
        {
          model: PostalCode,
          as: "DeliveryNeighborhood",
          attributes: ["id", "neighbourhood"],
        },
      ],
      raw: true,
    });

    const isOneShipping = shippings?.length === 1;

    if (isOneShipping && shippings[0]?.ShippingMlId) {
      await generateMeliPdf(res, shippings[0], isAdmin, id);
    } else {
      await generateGpPdf(res, req, isAdmin, id, shippings);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getShippingRate = async (req, res) => {
  try {
    const {
      originPostalCode,
      destinyPostalCode,
      typeOfShipping,
      packages, // Expected input [{"S": 2, "L":3}]
      shippingMethod,
    } = req.query;

    const { CompanyId } = req.user;

    const exist = Number(destinyPostalCode);

    const { result, error } = await _getShippingRate(
      originPostalCode,
      exist ? destinyPostalCode : process.env.AGENCY_POSTAL_CODE,
      typeOfShipping,
      packages, // Expected input [{"S": 2, "L":3}]
      shippingMethod,
      CompanyId
    );

    if (error) {
      return res.status(error.status).send(error.message);
    }

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const shippingHandledByGP = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { shippings } = req.body;
    const { CompanyId } = req.user;

    const attributes = [
      "id",
      "number",
      "state",
      "originStreet",
      "originNumber",
      "destinyStreet",
      "destinyNumber",
      "comments",
      "createdAt",
      "undeliveredReason",
      "undeliveredReasonDetails",
      "phone",
      "details",
      "RiderId",
      "originFloor",
      "originCity",
      "originPostalCode",
      "originLocation",
      "destinyFloor",
      "destinyCity",
      "destinyPostalCode",
      "destinyLocation",
      "clientDni",
      "client",
      "isHandledByGP",
    ];

    const batchShippings = async (_shipping, transaction) => {
      const shipping = await Shipping.findOne({
        where: {
          id: _shipping.id,
          CompanyId,
        },
        attributes,
        transaction,
        include: [{ model: User, as: "Rider" }],
      });

      if (!shipping.Rider) {
        shipping.isHandledByGP = _shipping.isHandledByGP;
      }

      await shipping.save({ transaction });

      return shipping;
    };

    const updatedShippings = await Promise.all(
      shippings.map((shipping) => batchShippings(shipping, t))
    );

    await t.commit();

    return res.status(200).json({ shippings: updatedShippings });
  } catch (error) {
    t.rollback();
    return res.status(500).send(error);
  }
};

const determineDeliveryPossibilities = async (req, res) => {
  const { originPostalCode, destinyPostalCode, isAgency, isPickup } = req.query;

  const { id, CompanyId } = req.user;

  try {
    const { error, result } = await calculateDeliveryPosibilities(
      originPostalCode,
      destinyPostalCode,
      isAgency,
      isPickup,
      id,
      CompanyId
    );

    if (error) {
      return res.status(error.status).send(error.message);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const checkPostalCode = async (req, res) => {
  try {
    const { postalCode } = req.query;

    if (!postalCode) {
      return res.status(400).send("El código postal es obligatorio");
    }

    const existPostalCode = await PostalCode.findOne({
      where: {
        code: postalCode,
      },
    });

    if (!existPostalCode) {
      return res.status(404).send("Los envíos no disponibles para esta zona");
    }

    return res.status(200).send({ pickup: pickupCenters });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteShippings = async (req, res) => {
  const { id, CompanyId } = req.user;

  const t = await db.sequelize.transaction();
  try {
    const { shippings } = req.body;

    if (!shippings) {
      return res.status(500).json("El campo shippings es obligatorio");
    }

    //Validate permissions
    //TODO CHECK FOR SUPERADMIN

    shippings.forEach((shipping) => {
      if (
        shipping.ClientId !== id &&
        shipping.state === shippingState.TO_ASSIGN &&
        shipping.CompanyId !== CompanyId
      ) {
        throw "No tienes permisos para realizar esta accion";
      }
    });

    const shippingIds = shippings.map((shipping) => shipping.id);
    const now = db.sequelize.literal("CURRENT_TIMESTAMP");
    const shippingsDeleted = await Shipping.update(
      { state: shippingState.CANCELLED, deletedAt: now },
      {
        where: {
          id: shippingIds,
        },
        t,
      }
    );

    await t.commit();

    return res.status(200).json({ shippingsDeleted });
  } catch (error) {
    t.rollback();
    return res.status(500).send(error);
  }
};

const deleteMultipleShippingsByArrayId = async (req, res) => {
  const { shippingSelectedById } = req.body;
  try {
    const now = moment().format();
    const shippingResult = await Shipping.update(
      { deletedAt: now },
      { where: { shipping_id: shippingSelectedById } },
    );
    if (!shippingResult) {
      return res.status(404).json({
        msg: "No existen datos",
      });
    }
    return res.status(200).json({
      shippingResult,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateShippingsState = async (req, res) => {
  const { id, isAdmin, CompanyId } = req.user;

  const t = await db.sequelize.transaction();

  try {
    const { shippings = [], state, all, date } = req.body;

    let shippingsToUpdate = shippings;

    if (all) {
      if (isAdmin) {
        const start = moment(date).startOf("day").format(shippingDateFormat);
        const end = moment(date).endOf("day").format(shippingDateFormat);

        let where = {
          CompanyId,
          createdAt: {
            [Op.between]: [start, end],
          },
          state: {
            [Op.not]: [shippingState.CANCELLED, shippingState.DELIVERED],
          },
          isHandledByGP: true,
        };

        const shippingsByDate = await Shipping.findAll({
          where,
          attributes: ["id"],
          raw: true,
        });

        shippingsToUpdate = shippingsByDate.map((shipping) => shipping.id);
      } else {
        const shippingsByDate = await Shipping.findAll({
          where: {
            CompanyId,
            state: {
              [Op.and]: {
                [Op.not]: [shippingState.CANCELLED, shippingState.DELIVERED],
                [Op.or]: [shippingState.TO_ASSIGN, shippingState.IN_PROGRESS],
              },
            },
            RiderId: id,
            isHandledByGP: true,
          },
          attributes: ["id"],
          raw: true,
        });
        shippingsToUpdate = shippingsByDate.map((shipping) => shipping.id);
      }
    }

    if (!shippingsToUpdate) {
      return res.status(400).json("No hay pedidos para actualizar");
    }

    let where = {
      id: shippingsToUpdate,
    };

    let payload = {
      state,
    };

    if (!isAdmin) {
      where.state = {
        [Op.or]: [shippingState.TO_ASSIGN, shippingState.IN_PROGRESS],
      };
      // //Business Logic
      payload.RiderId = null;
    }

    await Shipping.update(payload, {
      where,
      t,
    });

    await t.commit();

    return res.status(200).send("Pedidos actualizados correctamente");
  } catch (error) {
    t.rollback();
    return res.status(500).json({ error });
  }
};

const getShippingType = async (req, res) => {
  const errorMessage = "Ocurrió un error al obtener los tipos de pedidos";
  try {
    const { originPostalCode, destinyPostalCode } = req.query;
    const result = await getShippingTypeService(
      originPostalCode,
      destinyPostalCode,
      req.user,
    );

    if (!result) {
      throw errorMessage;
    }

    const { error, statusCode, message, data } = result;

    if (error) {
      return res.status(statusCode).send(message);
    }

    return res.status(statusCode).send(data);
  } catch (error) {
    return res.status(500).send(errorMessage);
  }
};

module.exports = {
  listShippings,
  listShippingFilters,
  asignShippingRider,
  updateShipping,
  getShipping,
  listUndeliveredReasons,
  createShipping,
  getAddressGeocode,
  addImageToShipping,
  asignRiderToShippings,
  getShippingPdf,
  getShippingRate,
  shippingHandledByGP,
  determineDeliveryPossibilities,
  checkPostalCode,
  deleteShippings,
  deleteMultipleShippingsByArrayId,
  getSuggestedLocations,
  updateShippingsState,
  getShippingsFromGroup,
  getShippingType,
};
