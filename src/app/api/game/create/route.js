import connectToDB from "@/database";
import Game from "@/models/game";
import Joi from "joi";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";


// Define the schema for the request body

const schema = Joi.object({
    title: Joi.string().required(),
    userId: Joi.string().required(),
    type: Joi.string().required(),
    duration: Joi.number().required().integer().min(1).required(),
    capacity: Joi.number().required().integer().min(1).required(),

});


export async function POST(req){

    await connectToDB();

    // Parse the incoming request body
    const {title, userId, type, duration, capacity} = await req.json();

    // Validate the request body against the schema
    const {error} = schema.validate({title, userId, type, duration, capacity});

    if(error){
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        });
    }

    try{
        const game = new Game({
            title,
            userId,
            type,
            duration,
            capacity,
            code: nanoid(6),
            participants: [{participant: userId, sessionScore: 0}],
        });

        await game.save();

        return NextResponse.json({
            success: true,
            message: "Game created successfully!",
            data: game,
        });
    } catch (error){
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating the game!",
        });
    }


}
    