const { Op } = require("sequelize");

const permissionMiddleware = (permissions) => {
  if (typeof permissions == "string") {
    permissions = [permissions];
  }
  return async (req, res, next) => {
    try {
      const Roles = req.user.Roles[0];
      if (Roles.name === "Super-Admin") {
        next();
      } else {
        const isExist = await req.user.Roles[0].countPermissions({
          where: {
            name: { [Op.in]: permissions },
          },
        });
        if (isExist > 0) {
          next();
        } else {
          res
            .status(403)
            .json({ message: "User doesn't have the right access!" });
        }
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};

module.exports = { permissionMiddleware };
