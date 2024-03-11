const { PackageType } = require("../models");

const getAll = async (req, res) => {
  try {
    const resultPackageTypes = await PackageType.findAll({
      where: { deletedAt: null },
    });

    if (!resultPackageTypes) {
      return res.status(404).json({
        msg: "No existen datos",
      });
    }
    return res.status(200).json(resultPackageTypes);
  } catch (error) {
    return res.status(500).json({
      msg: "Ocurrió algun error",
    });
  }
};

module.exports = {
  getAll,
};
