import connectToDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { username, email, password, age, gender } = await req.json();

  const { error } = schema.validate({ username, email, password, age, gender });

  if (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist) {
      return NextResponse.json({
        success: false,
        message: "Bu kullanıcı mevcut",
      });
    } else {
      const hashPassword = await hash(password, 12);

      const newlyCreatedUser = await User.create({
        username,
        email,
        password: hashPassword,
        age,
        gender,
        elo: 1000, // Default ELO score for new users
      });

      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Kayıt Olma Başarılı",
        });
      }
    }
  } catch (error) {
    console.log("err registration");
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Bir hata oluştu :(",
    });
  }
}
