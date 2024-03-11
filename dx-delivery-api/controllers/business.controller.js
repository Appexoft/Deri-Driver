const { Business } = require("../models");

const updateBusiness = (req, res) => {
  try {
    const { BusinessId, CompanyId } = req.user;
    const { business } = req.body;

    if (!BusinessId) {
      return res.status(400).send("No pertences a una empresa");
    }

    const updatedBusiness = Business.update(
      {
        shippingAutomaticHandling: business.shippingAutomaticHandling,
      },
      {
        where: {
          id: BusinessId,
          CompanyId,
        },
      }
    );
    return res.status(200).json({ business: updatedBusiness });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { updateBusiness };
