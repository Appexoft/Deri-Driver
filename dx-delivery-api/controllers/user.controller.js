const { User, Business, Company } = require("../models");
const { roles } = require("../helpers/constants");
const { Op } = require("sequelize");
const db = require("../models/index");

const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const currentUser = await User.findByPk(id, {
      attributes: [
        "ci",
        "email",
        "name",
        "phone",
        "role",
        "id",
        "enrollment",
        "BusinessId",
        "addressStreet",
        "addressNumber",
        "addressFloor",
        "addressPostalCode",
        "addressLocation",
      ],
      include: [
        {
          model: Business,
          as: "Business",
        },
        {
          model: Company,
          as: "company",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!currentUser) {
      return res.status(200).json({
        user: null,
        message: "El usuario no existe",
      });
    }

    return res.status(200).json({ user: currentUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

const signup = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const { name: email, sub } = req.user;
    const { phone, name, businessName, providerId, rut } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "El nombre de la empresa es requerido",
        field: "business",
      });
    }

    if (!phone) {
      return res.status(400).json({
        message: "El teléfono es requerido",
        field: "phone",
      });
    }

    if (!rut) {
      return res.status(400).json({
        message: "El RUT es requerido",
        field: "rut",
      });
    }

    if (!businessName) {
      return res.status(400).json({
        message: "La razón social es requerida",
        field: "businessName",
      });
    }

    if (!providerId) {
      return res.status(400).json({
        message: "Se debe seleccionar un provedor",
        field: "provider",
      });
    }

    const authTaken = await User.findOne({
      where: {
        authId: sub,
      },
      transaction: t,
      paranoid: false,
    });

    const emailTaken = await User.findOne({
      where: {
        email,
      },
      transaction: t,
    });

    if (emailTaken && emailTaken?.email !== authTaken?.email) {
      return res.status(400).send("Esta email ya esta siendo utilizado");
    }

    let newUser;

    if (authTaken) {
      if (!authTaken.deletedAt) {
        return res
          .status(400)
          .send("Esta cuenta de auth0 ya esta siendo utilizada");
      }

      // The user was deleted and he wants signup
      // Update user
      authTaken.set(
        {
          authId: sub,
          role: roles.CLIENT,
          email,
        },
        {
          transaction: t,
        }
      );
      await authTaken.save();
      await authTaken.restore();
      newUser = authTaken;
    }

    if (!newUser) {
      newUser = await User.create(
        {
          authId: sub,
          role: roles.CLIENT,
          email,
        },
        {
          transaction: t,
          attributes: ["ci", "email", "name", "phone", "role", "id"],
          include: [
            {
              model: Business,
              as: "Business",
            },
          ],
        }
      );
    }

    const cleanRut = rut.trim().replace(/\s/g, "");
    const validRut = Number.isInteger(Number(cleanRut));

    if (!validRut) {
      await t.rollback();
      return res.status(400).json({
        message: "El rut es inválido",
        field: "rut",
      });
    }

    const rutTaken = await Business.findOne({
      where: {
        rut: { [Op.iLike]: rut },
      },
    });

    if (rutTaken) {
      await t.rollback();
      return res.status(400).json({
        message: "El rut ya se encuentra registrado",
        field: "rut",
      });
    }

    const nameOfBusinessTaken = await Business.findOne({
      where: {
        name: { [Op.iLike]: name },
      },
    });

    if (nameOfBusinessTaken) {
      await t.rollback();
      return res.status(400).json({
        message: "El nombre de la empresa ya se encuentra registrado",
        field: "business",
      });
    }

    const businessNameTaken = await Business.findOne({
      where: {
        businessName: { [Op.iLike]: businessName },
      },
    });

    if (businessNameTaken) {
      await t.rollback();
      return res.status(400).json({
        message: "La razón social ya se encuentra registrada",
        field: "businessName",
      });
    }

    const selectedProvider = await Company.findByPk(providerId, {
      attributes: ["id"],
    });

    if (!selectedProvider) {
      return res.status(400).json({
        message: "El provedor seleccionado es inválido",
        field: "provider",
      });
    }

    const newBusiness = await Business.create(
      {
        name,
        rut: cleanRut,
        businessName,
      },
      { transaction: t }
    );

    await newUser.setBusiness(newBusiness, { transaction: t });
    await newUser.setCompany(selectedProvider, { transaction: t });
    await newBusiness.setCompany(selectedProvider, { transaction: t });
    await t.commit();
    return res.status(200).json({ user: newUser });
  } catch (error) {
    await t.rollback();
    return res.status(500).send("Ocurrió un error al completar el perfil");
  }
};

module.exports = { getUser, signup };
