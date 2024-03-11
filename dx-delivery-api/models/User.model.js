const { roles } = require("../helpers/constants");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "user_id",
      },
      authId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: roles.CLIENT,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      ci: {
        type: DataTypes.STRING,
        unique: true,
      },
      enrollment: {
        type: DataTypes.STRING,
      },
      addressStreet: {
        type: DataTypes.STRING,
      },
      addressNumber: {
        type: DataTypes.STRING,
      },
      addressCity: {
        type: DataTypes.STRING,
      },
      addressFloor: {
        type: DataTypes.STRING,
      },
      addressLocation: {
        type: DataTypes.GEOMETRY("POINT"),
      },
      addressPostalCode: {
        type: DataTypes.STRING,
      },
      enableCollection: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "users",
      paranoid: true,
    }
  );

  // Relationships
  User.associate = function associate(models) {
    User.hasMany(models.Shipping);
    User.belongsTo(models.Business);
    User.belongsTo(models.Company, {
      foreignKey: "CompanyId",
      as: "company",
    });
    User.belongsTo(models.Branch, {
      scope: { role: roles.RIDER },
      foreignKey: "BranchId",
      as: "branch",
    });
  };

  return User;
};
