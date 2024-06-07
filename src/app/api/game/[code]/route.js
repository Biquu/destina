import connectToDB from '@/database';
import Game from '@/models/game';

export async function GET(req, { params }) {
  const { code } = params;

  await connectToDB();

  try {
    const game = await Game.findOne({ code });
    if (!game) {
      return new Response(JSON.stringify({ error: 'Game not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(game), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
