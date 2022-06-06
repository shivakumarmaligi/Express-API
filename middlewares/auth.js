const jwt = require("jsonwebtoken");
const AuthSchema = require("../models/Auth");
const { sucess, error, info } = require("consola");
const { JWT_SECRET } = require("../config/index");

exports.Protected = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      res.status(401).json({
        message: "Invalid Token || you are not authorized to access this page",
      })
    );
  }

  // Verify Encoded Token
  try {
    let decoded = jwt.verify(token, JWT_SECRET);
    req.user = await AuthSchema.findById(decoded.id);
    next();
  } catch (err) {
    return next(
      res.status(401).json({
        message: "Invalid Token || you are not authorized to access this page",
      })
    );
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(401).json({ message: `${req.user.role} is not authorized` })
      );
    }
    next();
  };
};
