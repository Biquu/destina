import connectToDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";


// Schema for validating the incoming request
const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  // Connect to the database
  await connectToDB();

  // Parse the incoming request body
  const { username, email, password, age, gender } = await req.json();

  // Validate the request body against the schema
  const { error } = schema.validate({ username, email, password, age, gender });

  if (error) {
    // If validation fails, log the error and return a response with an error message
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Check if the user with the provided email already exists in the database
    const isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist) {
      // If the user already exists, return an error response
      return NextResponse.json({
        success: false,
        message: "This user already exists",
      });
    } else {
      // Hash the password
      const hashPassword = await hash(password, 12);

      // Create a new user in the database
      const newlyCreatedUser = await User.create({
        username,
        email,
        password: hashPassword,
        age,
        gender,
        elo: 1000, // Default ELO score for new users
      });

      const token = jwt.sign({ email: newlyCreatedUser.email, _id: newlyCreatedUser._id },"defaultSecretKey",{ expiresIn: "1D" }
      );

      const finalData = {
        token,
        user: {
          email: newlyCreatedUser.email,
          username: newlyCreatedUser.username,
          _id: newlyCreatedUser._id,
          elo: newlyCreatedUser.elo,
          profileImage: newlyCreatedUser.profileImage,
          interests: newlyCreatedUser.interests,
          registrationDate: newlyCreatedUser.registrationDate,
          lastLoginDate: newlyCreatedUser.lastLoginDate,
          age: newlyCreatedUser.age,
          gender: newlyCreatedUser.gender,
        }
      };

      if (newlyCreatedUser) {
        // If user creation is successful, return a success response
        return NextResponse.json({
          success: true,
          message: "Registration successful",
          finalData,
        });
      }
    }
  } catch (error) {
    // If an error occurs, log the error and return a generic error response
    console.log("err registration");
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "An error occurred :(",
    });
  }
}
