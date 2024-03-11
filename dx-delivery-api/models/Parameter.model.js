module.exports = (sequelize, DataTypes) => {
  const Parameter = sequelize.define(
    "Parameter",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "parameter_id",
      },
      key: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "parameters",
      paranoid: true,
    }
  );

  Parameter.associate = function associate(models) {
    Parameter.belongsTo(models.Company);
  };

  return Parameter;
};
