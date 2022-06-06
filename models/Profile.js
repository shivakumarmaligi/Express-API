const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
  {
    profile_name: {
      type: String,
      required: true,
    },
    profile_designation: {
      type: String,
      required: true,
    },
    profile_experience: {
      type: String,
      required: true,
    },
    profile_email: {
      type: String,
      required: true,
    },
    profile_linkedIn_url: {
      type: String,
      required: true,
    },
    profile_gitHub_url: {
      type: String,
      required: true,
    },
    profile_location: {
      type: String,
      required: true,
    },
    skills: {
      type: [""],
      required: true,
    },
    profile_photo: {
      type: [""],
      default: "",
    },
    profile_phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("profile", ProfileSchema);
