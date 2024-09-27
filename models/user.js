import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { 
    type: String,
    required: [true, "Name is required"],
    trim: true,
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
  },
  isCreator: {
    type: Boolean,
    default: false,
  },
  savedBlogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }],
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;