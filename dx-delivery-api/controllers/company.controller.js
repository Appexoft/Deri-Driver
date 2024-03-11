const { Company } = require("../models");

const listCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      attributes: ["id", "name"],
    });
    return res.status(200).send(companies);
  } catch (error) {
    return res.status(500).send("Ocurrió un error al listar los proveedores");
  }
};

module.exports = { listCompanies };
