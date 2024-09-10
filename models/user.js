import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, 'Password should be at least 8 characters long'],
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
    ]
  },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;