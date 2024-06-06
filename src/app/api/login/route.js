import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Schema for validating the incoming request
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export async function POST(req) {
  // Connect to the database
  await connectToDB();

  // Parse the incoming request body
  const { email, password } = await req.json();

  

  // Validate the request body against the schema
  const { error } = schema.validate({ email, password });

  if (error) {
    // If validation fails, return a response with an error message
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Check if the user with the provided email exists in the database
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      // If the user does not exist, return an error response
      return NextResponse.json({
        success: false,
        message: "No account found with this email!",
      });
    }

    // Compare the provided password with the stored hashed password
    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      // If the password does not match, return an error response
      return NextResponse.json({
        success: false,
        message: "Incorrect password. Please try again!",
      });
    }

    const token = jwt.sign(
      { email: checkUser.email, _id: checkUser._id },
      "defaultSecretKey",
      { expiresIn: "1D" }
    );

    console.log('Generated Token:', token);

    // Prepare the final data to be sent in the response
    const finalData = {
      token,
      user: {
        email: checkUser.email,
        username: checkUser.username,
        _id: checkUser._id,
        elo: checkUser.elo,
        profileImage: checkUser.profileImage,
        interests: checkUser.interests,
        registrationDate: checkUser.registrationDate,
        lastLoginDate: checkUser.lastLoginDate,
        age: checkUser.age,
        gender: checkUser.gender,
      },
    };

    // Return a success response with the final data
    return NextResponse.json({
      success: true,
      message: "Login successful :)",
      finalData,
    });
  } catch (error) {
    // If an error occurs, log the error and return a generic error response
    console.log("err login", error);

    return NextResponse.json({
      success: false,
      message: "An error occurred :(",
    });
  }
}
