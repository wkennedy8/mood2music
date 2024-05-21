const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
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

export const requestNewSong = async (currentSong, mood) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a professional DJ. I will provide a specific mood, and the previous song I was listening to. You will ONLY respond with a song title and artist that is reflective of that mood and is not the same as the previous song I was listening to. For example: Jesus Walks - Kanye West. No other words will be used.",
        },
        {
          role: "user",
          content: `My current mood is ${mood}, and the previous song I was listening to is ${currentSong}`,
        },
      ],
      model: "gpt-4-turbo",
    });

    const title = completion.choices[0].message.content.split("-")[0].trim();
    const artist = completion.choices[0].message.content.split("-")[1].trim();
    return { title, artist };
  } catch (error) {
    console.log(`Error requesting new song: ${error}`);
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

export const refreshToken = async (refreshToken) => {
  try {
    const basicAuth = new Buffer.from(
      `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");
    const auth = {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      }),
    };
    const res = await fetch("https://accounts.spotify.com/api/token", auth);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(`Error Refreshing Token ${error}`);
  }
};

export const getCurrentUser = async (token) => {
  try {
    var parameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`https://api.spotify.com/v1/me`, parameters);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error getting current user: ${error}`);
  }
};

export const fetchUserPlaylists = async (token) => {
  try {
    var parameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `https://api.spotify.com/v1/me/playlists`,
      parameters
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.log(`Error fetching user playlists ${error}`);
  }
};

export const addToPlaylist = async (token, playlistId, trackUri) => {
  try {
    var parameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uris: [trackUri],
      }),
    };
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      parameters
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error posting to spotify playlist endpoint: ${error}`);
  }
};
