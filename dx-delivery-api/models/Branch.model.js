const { roles } = require("../helpers/constants");

module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define(
    "Branch",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "branch_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      streetName: {
        type: DataTypes.STRING,
      },
      streetFloor: {
        type: DataTypes.STRING,
      },
      streetNumber: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
      },
      serviceHours: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "branches",
      paranoid: true,
    }
  );

  Branch.associate = function associate(models) {
    Branch.belongsTo(models.Company);
    Branch.hasMany(models.DeliveryZone);
    Branch.hasMany(models.User, {
      scope: { role: roles.RIDER },
      foreignKey: "BranchId",
      as: "branch",
    });
  };

  return Branch;
};
