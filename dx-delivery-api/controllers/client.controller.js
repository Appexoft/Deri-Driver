const { getClients } = require("../helpers/shippings");

const listClients = async (req, res) => {
  try {
    const { CompanyId } = req.user;
    const { result: clients, error } = await getClients(CompanyId);

    if (error) {
      return res.status(error.status).send(error.message);
    }

    return res.status(200).json(clients);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { listClients };
