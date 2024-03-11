module.exports = (sequelize, DataTypes) => {
  const ShippingType = sequelize.define(
    "ShippingType",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "shipping_type_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
      },
      icon: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "shipping_types",
      paranoid: true,
    }
  );

  // Relationships
  ShippingType.associate = function associate(models) {
    ShippingType.belongsTo(models.Company);
    ShippingType.hasMany(models.ShippingRate);
    ShippingType.hasMany(models.Shipping);
    ShippingType.hasMany(models.PackagePrice);
  };

  return ShippingType;
};
