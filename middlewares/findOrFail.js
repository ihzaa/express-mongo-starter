import mongoose from "mongoose";

const findOrFail = (model, options = {
  where: {},
  select: {}
}) => {
  return async (req, res, next) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) throw { code: 422, message: "ID_NOT_VALID" }
      res.obj = await model
        .findOne({ _id: id })
        .select(
          typeof options.select === 'string' ? options.select : { ...options.select }
        );

      if (res.obj !== null) {
        next();
      } else {
        res.status(404).json({
          message: "Data Not Found!",
          status: false
        });
      }
    } catch (e) {
      res.status(e.code ?? 500).json({ message: e.message });
    }
  };
};

export default findOrFail;