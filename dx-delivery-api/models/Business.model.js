module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define(
    "Business",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "business_id",
      },
      name: {
        type: DataTypes.STRING,
      },
      rut: {
        type: DataTypes.STRING,
      },
      businessName: {
        type: DataTypes.STRING,
      },
      shippingAutomaticHandling: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "businesses",
      paranoid: true,
    }
  );

  // Relationships
  Business.associate = function associate(models) {
    Business.hasMany(models.User);
    Business.hasOne(models.BusinessMl);
    Business.hasMany(models.Shipping);
    Business.belongsTo(models.Company);
  };

  return Business;
};
