"use strict";

module.exports = (sequelize, DataTypes) => {
  const ShippingImage = sequelize.define(
    "ShippingImage",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "shipping_image_id",
      },
      uri: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "shipping_images",
      paranoid: true,
    }
  );

  // Relationships
  ShippingImage.associate = function associate(models) {
    ShippingImage.belongsTo(models.Shipping);
  };

  return ShippingImage;
};
