export const createGame = async ({ title, userId, type, duration, capacity }) => {
    const res = await fetch('/api/games/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, userId, type, duration, capacity }),
    });
    const data = await res.json();
    return data;
  };
  
  export const joinGame = async ({ userId, code }) => {
    const res = await fetch('/api/games/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, code }),
    });
    const data = await res.json();
    return data;
  };
  