const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function main(mood) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a professional DJ. I will provide a specific mood, and you will ONLY respond with a song title and artist that is reflective of that mood. For example: Jesus Walks - Kanye West. No other words will be used. Also, never recommend the same song.",
      },
      { role: "user", content: `My current mood is ${mood}.` },
    ],
    model: "gpt-4-turbo",
  });

  const title = completion.choices[0].message.content.split("-")[0].trim();
  const artist = completion.choices[0].message.content.split("-")[1].trim();
  return { title, artist };
}

export const fetchToken = async () => {
  try {
    const auth = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
    };
    const res = await fetch("https://accounts.spotify.com/api/token", auth);
    const data = await res.json();
    console.log(data);
    const token = data.access_token;

    return token;
  } catch (error) {
    console.log(`Error Fetching Spotify Token ${error}`);
  }
};

export const searchTracks = async (token, songObj) => {
  try {
    var parameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${songObj.title}&type=track`,
      parameters
    );
    const data = await response.json();
    const tracks = data.tracks.items;
    let songId;
    for (let i = 0; i < tracks.length; i++) {
      for (let j = 0; j < tracks[i].artists.length; j++) {
        if (tracks[i].artists[j].name == songObj.artist) {
          songId = tracks[i].id;
        }
      }
    }

    if (songId) {
      const resp = await fetch(
        `https://api.spotify.com/v1/tracks/${songId}`,
        parameters
      );
      const track = await resp.json();
      return track;
    }
  } catch (error) {
    console.log(`Error Searching Tracks ${error}`);
  }
};

export const refreshToken = async (token) => {
  try {
    const auth = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: token,
      },
      json: true,
    };
    const res = await fetch("https://accounts.spotify.com/api/token", auth);
    const data = await res.json();
    const refresh_token = data.access_token;
    return refresh_token;
  } catch (error) {
    console.log(`Error Refreshing Token ${error}`);
  }
};
