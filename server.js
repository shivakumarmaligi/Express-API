const express = require("express");
const morgan = require("morgan");
const { NODE_ENV, PORT } = require("./config");
const { DBConnection } = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AuthRoute = require("./routes/auth");
const ProfileRoute = require("./routes/profile");
// External imports
const colors = require("colors");
const { success, error } = require("consola");

const app = express();

let StartServer = async () => {
  try {
    /**============ DataBase Connection Starts Here============= */
    DBConnection();
    /**============ DataBase Connection Ends Here============= */

    /**============ Middleware Section Starts Here============= */
    if (NODE_ENV === "development") {
      app.use(morgan("dev"));
    }
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    /**============ Middleware Section Starts Here============= */

    /*============== Load Routes Block Starts Here============ */
    app.use("/api/auth", AuthRoute);
    app.use("/api/profile", ProfileRoute);
    /*============== Load Routes Block Starts Here============ */
    /**============ Listen Port Starts Here============= */
    app.listen(PORT, err => {
      if (err) {
        error(`${err}`.red.bold);
      } else {
        success(`Server is Listening on port 5000`.green.bold);
      }
    });
    /**============ Listen Port Ends Here============= */
  } catch (err) {
      error(`${err}`.red.bold);
  }
};

StartServer();