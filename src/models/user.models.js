import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrpyt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true, //to make this more searchable
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true, //to make this more searchable
    },
    avatar: {
      type: String, // cloudinary link to the image
      required: true,
    },
    coverImage: {
      type: String, // cloudinary link to the image
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose hook to perform middlewares actions
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // if password is not modified then we will not hash it again
  this.password = bcrpyt.hash(this.password, 10); // this function  changes the password to hashed password
  next(); //calling the next function in the middleware chain
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrpyt.compare(password, this.password);
  //compairing the password send by the user with the hashed password in the database
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this.id, // this.is comming form database
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this.id, // this.is comming form database
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    }
  );
};

export const User = mongoose.model("User", userSchema);
