import connectToDB from "@/database";
import Game from "@/models/game";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectToDB();
  
    const { gameId } = req.query;

    try {
        const game = await Game.findOne({ code: gameId });

        if (!game) {
            return NextResponse.json({
                success: false,
                message: "Game not found",
            });
        }

        return NextResponse.json({
            success: true,
            game,
        });
    } catch (error) {
        console.log("err fetching game", error);

        return NextResponse.json({
            success: false,
            message: "An error occurred while fetching the game :(",
        });
    }
}
