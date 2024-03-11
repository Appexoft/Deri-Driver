module.exports = (sequelize, DataTypes) => {
  const PostalCode = sequelize.define(
    "PostalCode",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "postal_code_id",
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      neighbourhood: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "postal_codes",
      paranoid: true,
    }
  );

  // Relationships
  PostalCode.associate = function associate(models) {
    PostalCode.belongsToMany(models.DeliveryZone, {
      through: models.PostalZone,
    });
    PostalCode.hasMany(models.Shipping);
    PostalCode.belongsTo(models.Company);
  };

  return PostalCode;
};
