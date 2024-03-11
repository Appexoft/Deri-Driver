module.exports = (sequelize, DataTypes) => {
  const DeliveryZone = sequelize.define(
    "DeliveryZone",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "delivery_zone_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "delivery_zones",
      paranoid: true,
    }
  );

  // Relationships
  DeliveryZone.associate = function associate(models) {
    DeliveryZone.hasMany(models.Shipping);
    DeliveryZone.belongsToMany(models.PostalCode, {
      through: models.PostalZone,
    });
    DeliveryZone.belongsTo(models.Branch);
    DeliveryZone.hasOne(models.ShippingRate, { as: "OriginZone" });
    DeliveryZone.hasOne(models.ShippingRate, { as: "DestinyZone" });
    DeliveryZone.belongsTo(models.Company);
  };

  return DeliveryZone;
};
