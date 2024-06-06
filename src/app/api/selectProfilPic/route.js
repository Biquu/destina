import connectToDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    imageIndex: Joi.string().required(),
    email: Joi.string().email().required(),
});

export async function POST(req) {

    await connectToDB();

    const { imageIndex, email } = await req.json();

    const { error } = schema.validate({ imageIndex, email });


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

        user.profileImage = imageIndex;
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Profil resmi başarıyla güncellendi",
        });

    } catch (error) {
        console.log("Resim güncelleme hatası");
        console.log(error);

        return NextResponse.json({
            success: false,
            message: "Bir hata oluştu. ",
        });
    }
}
