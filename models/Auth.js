const bcryptjs = require("bcryptjs");
const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRE, JWT_SECRET } = require("../config");


const AuthSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please add username"],
      minlength: [6, "username should be minimum 6 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add emailaddress"],
      // match:
      //   /^(?:[\w\!\#\$\%\&\'\\+\-\/\=\?\^\`\{\|\}\~]+\.)[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
      match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "publisher"],
      default: "user",
    },
  },
  { timestamps: true }
);

AuthSchema.pre("save", async function () {
  let salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Way to create schema custom method--- Create A custom method--->getJWTtoken is custom meth
AuthSchema.methods.getJWTtoken = function () {
  // jwt.sign(payload, jwt, secret, options=>CallBack);
  return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}

module.exports = model("user", AuthSchema);
