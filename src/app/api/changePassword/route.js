import connectToDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    password: Joi.string().min(6).required(),
    new_password: Joi.string().min(6).required(),
    confirm_new_password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

export async function PUT(request){
    await connectToDB();

    const { password, new_password, confirm_new_password, email } = await request.json();

    const { error } = schema.validate({ password, new_password, confirm_new_password });

    if (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Kullanıcı bulunamadı",
            });
        }

        if (new_password !== confirm_new_password) {
            return NextResponse.json({
                success: false,
                message: "Yeni şifreler uyuşmuyor",
            });
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return NextResponse.json({
                success: false,
                message: "Eski şifre hatalı",
            });
        }

        user.password = new_password;

        await user.save();

        return NextResponse.json({
            success: true,
            message: "Şifre başarıyla güncellendi",
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