import connectToDB from "@/database";
import User from "@/models/user";
import { compare } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export async function POST(req) {
  await connectToDB();

  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "Bu e-postaya sahip bir hesap bulunamadı!",
      });
    }

    const checkPassword = await compare(password, checkUser.password);
    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Hatalı şifre. Lütfen tekrar deneyiniz!",
      });
    }

    const finalData = {
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

    return NextResponse.json({
      success: true,
      message: "Giriş Başarılı :)",
      finalData,
    });
  } catch (error) {
    console.log("err login", error);

    return NextResponse.json({
      success: false,
      message: "Bir hata oluştu :(",
    });
  }
}
