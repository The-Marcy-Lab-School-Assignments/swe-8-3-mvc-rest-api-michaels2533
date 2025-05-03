import handleFetch from "./handleFetch"

export const getAllJokes = async () => {
  const [alljokes, error] = await handleFetch('/api/jokes/')
  return [alljokes, error];
}

export const getJokeById = async (id) => {
  const [joke, error] = await handleFetch(`/api/joke/${id}`);
  return [joke, error];
}

export const createJoke = async (jokeName) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ jokeName })
  }

  const [newjoke, error] = await handleFetch(`/api/joke/`, options);
  return [newjoke, error];
}

export const deleteJoke = async (id) => {
  const options = {
    method: "DELETE",
  };
  const [success, error] = await handleFetch(`/api/joke/${id}`, options);
  return [success, error];
}

export const updateJokeName = async (id, jokeName) => {
  const options = {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ jokeName })
  };

  const [updatedjoke, error] = await handleFetch(`/api/joke/${id}`, options);
  return [updatedjoke, error];
}