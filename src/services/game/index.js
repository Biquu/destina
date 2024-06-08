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
