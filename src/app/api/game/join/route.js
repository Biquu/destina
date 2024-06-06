import connectToDB from "@/database";
import Game from "@/models/game";
import Joi from "joi";
import { NextResponse } from "next/server";

// Schema for validating the incoming request
const schema = Joi.object({
    userId: Joi.string().required(),
    code: Joi.string().required(),
});

export async function POST(req) {
    await connectToDB();

    // Parse the incoming request body
    const { userId, code } = await req.json();

    // Validate the request body against the schema
    const { error } = schema.validate({ userId, code });

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        });
    }

    try {
        const game = await Game.findOne({ code });

        if (!game) {
            return NextResponse.json({
                success: false,
                message: "Game not found",
            });
        }

        if (game.participants.length >= game.capacity) {
            return NextResponse.json({
                success: false,
                message: "Game is already full",
            });
        }

        if (game.participants.find(participant => participant.participant.toString() === userId)) {
            return NextResponse.json({
                success: false,
                message: "User already joined the game",
            });
        }

        game.participants.push({ participant: userId, sessionScore: 0 });
        await game.save();

        return NextResponse.json({
            success: true,
            message: "Joined game successfully",
            game,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "An error occurred while joining the game!",
        });
    }
}
