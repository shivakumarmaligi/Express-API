const AuthSchema = require("../models/Auth");
const { success, error, info } = require("consola");
const bcrypt = require("bcryptjs");
const { JWT_COOKIE_EXPIRE } = require("../config/index");

/*  @ACCESS PUBLIC
    @ HTTP REQUEST POST
    @HTTP URL - api/auth/signup
 */

exports.Signup = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    let payload = new AuthSchema({
      username,
      email,
      password,
      role,
    });

    // save into database
    let user = await AuthSchema.create(payload);
    // Getting Data from DB to generate JWT token
    // let TOKEN = user.getJWTtoken();
    // ?after JWT payload is encoded in the form Token
    // res.status(201).json({ message: "succesfully user registered", TOKEN });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    error(err);
    res.status(501).json({ message: "SERVER ERROR" });
  }
};

/*  @ACCESS PUBLIC
    @ HTTP REQUEST POST
    @HTTP URL - api/auth/signIn
 */

exports.SignIn = async (req, res) => {
  // res.send("ok is working signIn");
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "EMAIL AND PASSWORD REQUIRED" });
    }
    //   CHECK USET EXISTS OR NOT
    //   fetching from DataBase
    let user = await AuthSchema.findOne({ email }).select("+password");
    //   console.log(user);
    if (!user) {
      return res
        .status(401)
        .json({ message: "EMAIL NOT EXISTS IN OUR DATABSE" });
    }

    //   COMPARE PASSWORD
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "PASSWORD NOT MATCHED" });
    }
    // let TOKEN = user.getJWTtoken();
    // res.status(201).json({ message: "succesfully LOGGED IN", TOKEN });
    sendTokenResponse(user, 201, res);

    //   cHECK PASSWORD
  } catch (err) {
    error(err);
    res.status(501).json({ message: "SERVER ERROR" });
  }
};

function sendTokenResponse(user, statusCode, res) {
  let token = user.getJWTtoken();
  let options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  console.log(options);
  res
    .status(statusCode)
    .cookie("TOKEN", token, options)
    .json({ message: "succesfully stored", token });
  // res.end("Ok");
}

// !this LOGIC or BLOCK only for authenticated users once login after TOKEN
exports.getMe = async (req, res, next) => {
  try {
    let user = await AuthSchema.findById(req.user.id);
    res.status(200).json({ message: "Successfulley fetched", user });
  } catch (err) {
    error(err);
    res.status(501).json({ message: "SERVER ERROR" });
  }
};
