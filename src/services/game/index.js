export const createGame = async ({
  userId,
  username,
  duration,
  capacity,
  code,
}) => {
  const res = await fetch("/api/game/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, username, duration, capacity, code }),
  });
  const data = await res.json();
  return data;
};

export const joinGame = async ({ userId, username, code }) => {
  const res = await fetch("/api/game/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, username, code }),
  });
  const data = await res.json();
  return data;
};

export const fetchGameByCode = async (code) => {
  try {
    const res = await fetch(`/api/game/${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch game:', error);
    return { error: 'Failed to fetch game data' };
  }
};
