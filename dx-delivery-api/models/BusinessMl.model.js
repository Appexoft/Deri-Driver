module.exports = (sequelize, DataTypes) => {
  const BusinessMl = sequelize.define(
    "BusinessMl",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique:true,
        field: 'businessml_id',
      },
      token: {
        type: DataTypes.STRING,
      },
      tokenType: {
        type: DataTypes.STRING,
      },
      scope: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      refreshTokenExpiration: {
        type: DataTypes.DATE,
      },
      tokenExpiration: {
        type: DataTypes.DATE,
      },
      clientMl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "businesses_ml",
      paranoid: true,
    }
  );

  // Relationships
  BusinessMl.associate = function associate(models) {
    BusinessMl.belongsTo(models.Business);
  };

  return BusinessMl;
};
