module.exports = (sequelize, DataTypes) => {
  const Agency = sequelize.define(
    "Agency",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "agency_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "agencies",
      paranoid: true,
    }
  );

  // Relationships
  Agency.associate = function associate(models) {
    Agency.hasMany(models.Shipping);
  };
  return Agency;
};
