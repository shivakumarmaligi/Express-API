const { Router } = require("express");
const { Signup, SignIn, getMe } = require("../controllers/auth");
const { Protected, authorize } = require("../middlewares/auth");
const router = Router();

router.route("/signup").post(Signup);
router.route("/signIn").post(SignIn);
router.route("/me").get(Protected, authorize("Publisher", "admin"),getMe);

module.exports = router;
