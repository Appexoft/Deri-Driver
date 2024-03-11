module.exports = (sequelize, DataTypes) => {
  const PackageType = sequelize.define(
    "PackageType",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "package_type_id",
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "package_types",
      paranoid: true,
    },
  );

  return PackageType;
};
