const { User } = require("../models");

const validateUserInCompany = async (sub) => {
    try {
        const user = await User.findOne({ where: { authId: sub } });
        if (!user.CompanyId) {
            return null;
        }
        return user;
    } catch (error) {
        return error;
    }
};

module.exports = {
    validateUserInCompany,
};
