import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: { 
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
    lowercase: true,
    trim: true,
    match: [
      /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
      'Please enter a valid username. It should be 1-30 characters long, and can only contain letters, numbers, underscores and periods. It cannot contain two consecutive periods or end with a period.'
    ]
  },
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