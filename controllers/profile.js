const ProfileSchema = require("../models/Profile");
const { success, error, info } = require("consola");
const multer = require("multer");
const { store_data } = require("../middlewares/profile");
const upload = multer({ store_data: store_data });

/*
    @ACCESS PUBLIC
    @ HTTP REQUEST POST
    @HTTP URL - api/profile/createProfile
*/
// !Creating A Profile in DB
exports.CreateProfile = async (req, res) => {
  try {
    let {
      profile_name,
      profile_designation,
      profile_experience,
      profile_email,
      profile_linkedIn_url,
      profile_gitHub_url,
      profile_location,
      profile_skills,
      profile_phone,
    } = req.body;
    let payload = new ProfileSchema({
      profile_name,
      profile_designation,
      profile_experience,
      profile_email,
      profile_linkedIn_url,
      profile_gitHub_url,
      profile_location,
      profile_skills,
      profile_photo:req.file,
      profile_phone,
    });

    let newProfile = await ProfileSchema.create(payload);
    res
      .status(201)
      .json({ message: "Successfully Profile Created", newProfile });
  } catch (err) {
    error(err);
    res.status(501).json({ message: "SEVER ERROR" });
  }
};

/*
    @ACCESS PUBLIC
    @ HTTP REQUEST GET
    @HTTP URL - api/profile/getAllProfile
*/
// !Getting all Profiles
exports.GetAllProfile = async (req, res) => {
  try {
    let payload = await ProfileSchema.find({});
     res.status(200).json({ message: "Succefully Fetched the Data", payload });
  } catch (err) {
    error(err);
    res.status(501).json({ message: "SEVER ERROR" });
  }
};

/*
    @ACCESS PUBLIC
    @ HTTP REQUEST GET
    @HTTP URL - api/profile/getProfile/:id
*/
// !Getting a Particular Profile Data
exports.GetProfile = async (req, res) => {
  try {
    let payload = await ProfileSchema.findOne({ _id: req.params.id });
    res.status(200).json({ message: "Succefully Fetched the Data", payload });
  } catch (err) {
    error(err);
    res.status(501).json({ message: "SEVER ERROR" });
  }
};

/*
    @ACCESS PUBLIC
    @ HTTP REQUEST PUT
    @HTTP URL - api/profile/getProfile/:id
*/
// !Update a Particular Data of a Profile
exports.UpdateProfile = async (req, res) => {
  try {
    let { profile_name,
      profile_designation,
      profile_experience,
      profile_email,
      profile_linkedIn_url,
      profile_gitHub_url,
      profile_location,
      profile_skills,
      profile_phone, } = req.body;
    let payload = await ProfileSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        profile_name,
        profile_designation,
        profile_experience,
        profile_email,
        profile_linkedIn_url,
        profile_gitHub_url,
        profile_location,
        profile_skills,
        profile_photo: req.file,
        profile_phone,
      },
      {new: true}
    );
    await payload.save();
    res.status(201).json({ message: "Successfully Updated Profile", payload });
    
  } catch (err) {
    error(err);
  }
};

/*
    @ACCESS PUBLIC
    @ HTTP REQUEST DELETE
    @HTTP URL - api/profile/deleteProfile/:id
*/
exports.DeleteProfile = async (req, res) => {
  try {
    await ProfileSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Successfully Profile Deleted" });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "SERVER ERROR" });
  }
};

