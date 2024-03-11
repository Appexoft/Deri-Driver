module.exports = (sequelize, DataTypes) => {
  const ShippingMl = sequelize.define(
    "ShippingMl",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "shippingml_id",
      },
      flex: {
        type: DataTypes.BOOLEAN,
      },
      idMl: {
        type: DataTypes.BIGINT,
        unique: true,
      },
      baseCostMl: {
        type: DataTypes.DECIMAL,
      },
      deliveryTypeMl:{
        type: DataTypes.STRING,
      },
      estimatedDeliveryMl: {
        type: DataTypes.DATE,
      },
      estimatedDeliveryLimitMl: {
        type: DataTypes.DATE,
      },
      shippingMethodMl:{
        type: DataTypes.STRING,
      },
      logisticTypeMl:{
        type: DataTypes.STRING,
      },
      statusMl: {
        type: DataTypes.STRING,
      },
      subStatusMl: {
        type: DataTypes.STRING,
      },
      siteMl: {
        type: DataTypes.STRING,
      },
      modeMl: {
        type: DataTypes.STRING,
      },
      clientMl: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "shippings_ml",
      paranoid: true,
    }
  );

  // Relationships
  ShippingMl.associate = function associate(models) {
    ShippingMl.hasOne(models.Shipping);
  };

  return ShippingMl;
};
