module.exports = (sequelize, DataTypes) => {
  const PackagePrice = sequelize.define(
    "PackagePrice",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "package_price_id",
      },
      packageSize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "package_prices",
      paranoid: true,
    }
  );

  // Relationships
  PackagePrice.associate = function associate(models) {
    PackagePrice.belongsTo(models.Company);
    PackagePrice.belongsTo(models.ShippingType);
  };

  return PackagePrice;
};
