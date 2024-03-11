const { User } = require("../models");

const listRiders = async (req, res) => {
  try {
    const { CompanyId } = req.user;
    const riders = await User.findAll({
      where: {
        role: "RIDER",
        CompanyId,
      },
      attributes: ["name", "id"],
    });
    return res.status(200).json(riders);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { listRiders };
