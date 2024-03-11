module.exports = (sequelize, DataTypes) => {
  const Rider = sequelize.define(
    "riders",
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        field: "rider_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
      ci: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      enrollment: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "riders",
      timestamps: false,
    }
  );

  return Rider;
};
