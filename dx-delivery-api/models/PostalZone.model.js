module.exports = (sequelize, DataTypes) => {
  const PostalZone = sequelize.define(
    "PostalZone",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      PostalCodeId: {
        type: DataTypes.UUID,
        references: {
          model: "postal_codes",
          key: "postal_code_id",
        },
      },
      DeliveryZoneId: {
        type: DataTypes.UUID,
        references: {
          model: "delivery_zones",
          key: "delivery_zone_id",
        },
      },
    },
    {
      tableName: "postal_codes_delivery_zones",
      paranoid: true,
    }
  );

  return PostalZone;
};
