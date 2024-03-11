const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const ShippingRate = sequelize.define(
    "ShippingRate",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "shipping_rate_id",
      },
      finishAt: {
        type: DataTypes.TIME,
        defaultValue: moment().startOf("day").format(),
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      isClose: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      day: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "shipping_rates",
      paranoid: true,
    }
  );

  // Relationships
  ShippingRate.associate = function associate(models) {
    ShippingRate.belongsTo(models.DeliveryZone, { as: "OriginZone" });
    ShippingRate.belongsTo(models.DeliveryZone, { as: "DestinyZone" });
    ShippingRate.hasMany(models.Shipping);
    ShippingRate.belongsTo(models.Company);
    ShippingRate.belongsTo(models.ShippingType);
  };

  return ShippingRate;
};
