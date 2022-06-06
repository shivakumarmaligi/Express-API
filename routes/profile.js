const { Router } = require("express");
const { CreateProfile, GetProfile, GetAllProfile, UpdateProfile, DeleteProfile } = require("../controllers/profile");
const router = Router();
const multer = require("multer");
const { store_data } = require("../middlewares/profile");
const upload_data = multer({ store_data });

router.route("/createProfile").post(upload_data.single("profile_photo"), CreateProfile);
router.route("/getProfile/:id").get(GetProfile);
router.route("/getAllProfile/").get(GetAllProfile);
router
    .route("/updateProfile/:id")
    .put(upload_data.single("profile_photo"), UpdateProfile);
router.route("/deleteProfile/:id").delete(DeleteProfile);


module.exports = router;