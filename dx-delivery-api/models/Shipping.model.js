const {
  shippingState,
  shippingType,
  shippingMethods,
} = require("../helpers/constants");

module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define(
    "Shipping",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "shipping_id",
      },
      number: {
        type: DataTypes.INTEGER,
        unique: true,
        defaultValue: sequelize.Sequelize.literal(
          "nextval('shipping_number_sequence')",
        ),
      },
      state: {
        type: DataTypes.STRING,
        defaultValue: shippingState.TO_ASSIGN,
      },
      client: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      details: {
        type: DataTypes.STRING(280),
      },
      originStreet: {
        type: DataTypes.STRING,
      },
      originFloor: {
        type: DataTypes.STRING,
      },
      originNumber: {
        type: DataTypes.STRING,
      },
      originCity: {
        type: DataTypes.STRING,
      },
      originLocation: {
        type: DataTypes.GEOMETRY("POINT"),
      },
      originPostalCode: {
        type: DataTypes.STRING,
      },
      destinyStreet: {
        type: DataTypes.STRING,
      },
      destinyNumber: {
        type: DataTypes.STRING,
      },
      destinyCity: {
        type: DataTypes.STRING,
      },
      destinyFloor: {
        type: DataTypes.STRING,
      },
      destinyDepartment: {
        type: DataTypes.STRING,
      },
      limitDate: {
        type: DataTypes.DATE,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      destinyLocation: {
        type: DataTypes.GEOMETRY("POINT"),
      },
      destinyPostalCode: {
        type: DataTypes.STRING,
      },
      comments: {
        type: DataTypes.STRING,
      },
      undeliveredReason: {
        type: DataTypes.STRING,
      },
      undeliveredReasonDetails: {
        type: DataTypes.STRING,
      },
      clientDni: {
        type: DataTypes.STRING,
      },
      packageSize: {
        type: DataTypes.STRING,
      },
      isHandledByGP: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      pickupInAgency: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      collectionAmount: {
        type: DataTypes.INTEGER,
      },
      packages: {
        type: DataTypes.TEXT,
        get: function () {
          const value = this.getDataValue("packages");
          return value ? JSON.parse(value) : value;
        },
        set: function (value) {
          return this.setDataValue(
            "packages",
            value ? JSON.stringify(value) : null,
          );
        },
      },
      receiver: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "shippings",
      paranoid: true,
    },
  );

  // Relationships
  Shipping.associate = function associate(models) {
    Shipping.belongsTo(models.User, { as: "Client" });
    Shipping.belongsTo(models.User, { as: "Rider" });
    Shipping.belongsTo(models.ShippingMl);
    Shipping.belongsTo(models.DeliveryZone);
    Shipping.belongsTo(models.Business);
    Shipping.hasMany(models.ShippingImage);
    Shipping.belongsTo(models.ShippingRate);
    Shipping.belongsTo(models.Agency);
    Shipping.belongsTo(models.PostalCode, { as: "DeliveryNeighborhood" });
    Shipping.belongsTo(models.Company);
    Shipping.belongsTo(models.ShippingType);
  };

  return Shipping;
};
