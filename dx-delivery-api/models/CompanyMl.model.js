const { encrypt } = require('../helpers/encrypt');

module.exports = (sequelize, DataTypes) => {
  const CompanyMl = sequelize.define(
    "CompanyMl",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "company_ml_id",
      },
      clientId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      clientSecret: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "companies_ml",
      paranoid: true,
      hooks: {
        beforeCreate(attributes) {
          attributes.clientSecret = encrypt(attributes.clientSecret);
        }
      }
    }
  );

  // Relationships
  CompanyMl.associate = function associate(models) {
    CompanyMl.belongsTo(models.Company, {
      foreignKey: "CompanyId",
      as: "company",
    });
  };

  return CompanyMl;
};
