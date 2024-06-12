import connectToDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";

// Schema for validating the incoming request
const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    old_email: Joi.string().email().required(),
});

export async function PUT(req) {
    await connectToDB();

    const { username, email, old_email, age } = await req.json();

    // Validate the request body against the schema
    const { error } = schema.validate({ username, email, old_email, age });

    if (error) {
        // If validation fails, log the error and return a response with an error message
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        });
    }
    try {
        const user = await User.findOne({ email: old_email });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Kullanıcı bulunamadı",
            });
        }

        user.username = username;
        user.email = email;
        user.age = age;

        await user.save();

        return NextResponse.json({
            success: true,
            message: "Kullanıcı verileri başarıyla güncellendi",
        });

    } catch (error) {
        console.log("Hatalı güncelleme");
        console.log(error);

        return NextResponse.json({
            success: false,
            message: "Bir hata oluştu. ",
        });
    }
}