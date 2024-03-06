import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false, // Make lastname optional
  },
  securityQuestions: [
    {
      type: String,
      required: true
    }
  ],
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  codeForget: {
    type: String,
    default: "",
  },
  imageUser: {
    type: String,
    required: false, // Make imageUser optional
  },
  role: {
    type: String,
    enum: ["admin", "challenged", "company", "superAdmin"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
