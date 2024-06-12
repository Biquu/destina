import connectToDB from "@/database";
import Game from "@/models/game";
import Joi from "joi";
import { NextResponse } from "next/server";

// Define the schema for the request body
const schema = Joi.object({
    userId: Joi.string().required(),
    username: Joi.string().required(),
    profileImage: Joi.string().required(),
    duration: Joi.number().required().integer().min(1),
    capacity: Joi.number().required().integer().min(1),
    code: Joi.string().required(),
});

export async function POST(req) {
    await connectToDB();

    // Parse the incoming request body
    const { userId, username, profileImage, duration, capacity, code } = await req.json();

    // Validate the request body against the schema
    const { error } = schema.validate({ userId, username, profileImage, duration, capacity, code });

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        });
    }

    try {
        const game = new Game({
            userId,
            username,
            profileImage,
            duration,
            capacity,
            code,
            participants: [{ participant: userId, username: username, profileImage: profileImage, sessionScore: 0 }],
        });

        await game.save();

        return NextResponse.json({
            success: true,
            message: "Game created successfully!",
            data: game,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating the game!",
        });
    }
}
