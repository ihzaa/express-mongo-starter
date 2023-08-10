import jsonwebtoken from "jsonwebtoken";
import user from "../models/User.js";

const { verify } = jsonwebtoken;

const validateToken = async (req, res, next) => {
  const accessToken = req.header("x-access-token");

  if (!accessToken) return res.status(400).json({ status: false, message: "UNAUTHORIZED" });
  try {
    const validToken = verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
    if (validToken) {
      req.user = await user.findOne({ _id: validToken.id });
      return next();
    } else {
      throw {
        message: 'UNAUTHORIZED'
      }
    }
  } catch (err) {
    let message = err.message;
    if (message === 'invalid signature') message = 'INVALID_TOKEN';
    else if (message === 'jwt expired') message = 'ACCESS_TOKEN_EXPIRED';
    else message = 'INVALID_TOKEN';
    return res.status(401).json({ status: false, message });
  }
};

export default validateToken;
