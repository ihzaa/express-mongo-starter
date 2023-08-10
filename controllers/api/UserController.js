import user from "../../models/User.js";
import bcrypt from "bcrypt";

export default {
  async store(req, res) {
    try {
      const { full_name, email, role } = req.body;
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      let data = {
        full_name,
        email,
        role,
        password,
      };

      let obj = await user.create(data);

      return res.status(200).json({
        message: "STORE_SUCCESS",
        data: obj
      });
    } catch (err) {
      return res.status(err.code ?? 500).json({
        status: false,
        message: err.message,
      });
    }
  },
  async update(req, res) {
    try {
      const { full_name, email, status, role } = req.body;
      let data = {
        full_name,
        email,
        // status,
        role,
      };
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        data.password = password;
      }

      const id = req.params.id;
      let obj = await user.updateOne({ _id: id }, data);
      // let obj = await user.findByIdAndUpdate(id, data, { new: true });

      return res.status(200).json({
        message: "UPDATE_SUCCESS",
        data: obj
      });
    } catch (err) {
      return res.status(err.code ?? 500).json({
        status: false,
        message: err.message,
      });
    }
  },
  async show(req, res) {
    return res.status(200).json({
      message: "OK",
      data: res.obj
    });
  },
  async destroy(req, res) {
    try {
      const id = req.params.id;
      let obj = await user.findByIdAndDelete(id);

      return res.status(200).json({
        message: "DELETE_SUCCESS",
        data: obj
      });
    } catch (err) {
      return res.status(err.code ?? 500).json({
        status: false,
        message: err.message,
      });
    }
  },
}

// module.exports = {
//   index: async (req, res) => {
//     res.paginatedResult.data.forEach((element) => {
//       delete element.Roles.UserRole;
//     });
//     res.json(res.paginatedResult);
//   },
//   show: async (req, res) => {
//     delete res.obj.password;
//     res.json({
//       message: "Data Found!",
//       data: res.obj,
//     });
//   },
//   store: async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array()[0] });
//     }

//     const { name, username, email, RoleId } = req.body;
//     const password = await bcrypt.hash(req.body.password, 10);

//     let data = {
//       name,
//       username,
//       email,
//       password,
//     };

//     createdData = await User.create(data);
//     await UserRole.create({
//       UserId: createdData.id,
//       RoleId,
//     });
//     res.status(201).json({
//       message: "Data Successfully Created!",
//       data: {
//         id: createdData.id,
//       },
//     });
//   },
//   update: async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array()[0] });
//     }

//     const id = req.params.id;
//     const { name, username, email, RoleId } = req.body;
//     let data = {
//       name,
//       username,
//       email,
//     };

//     if (req.body.password) {
//       const password = await bcrypt.hash(req.body.password, 10);
//       data.password = password;
//     }

//     await User.update(data, {
//       where: {
//         id,
//       },
//     });
//     await UserRole.destroy({
//       where: {
//         UserId: id,
//       },
//     });
//     await UserRole.create({
//       UserId: id,
//       RoleId,
//     });
//     res.status(201).json({
//       message: "Data Successfully updated!",
//     });
//   },

//   destroy: async (req, res) => {
//     const id = req.params.id;
//     await UserRole.destroy({
//       where: {
//         UserId: id,
//       },
//     });
//     await res.obj.destroy();
//     res.json({
//       message: "Data Successfully Deleted!",
//     });
//   },
// };
