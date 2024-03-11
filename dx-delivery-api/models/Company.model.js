module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "company_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      rut: {
        type: DataTypes.STRING,
      },
      businessName: {
        type: DataTypes.STRING,
      },
      referredCode: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      tableName: "companies",
      paranoid: true,
    }
  );

  // Relationships
  Company.associate = function associate(models) {
    Company.hasMany(models.PackagePrice);
    Company.hasMany(models.Branch);
    Company.hasMany(models.PackagePrice);
    Company.hasMany(models.Business);
    Company.hasMany(models.ShippingRate);
    Company.hasMany(models.DeliveryZone);
    Company.hasMany(models.Shipping);
    Company.hasMany(models.Parameter);
    Company.hasMany(models.CompanyMl);
    Company.hasMany(models.User, { foreignKey: "CompanyId", as: "company" });
    Company.hasMany(models.ShippingType);
  };

  return Company;
};
