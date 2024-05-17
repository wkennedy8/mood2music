const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "sk-proj-fEw8haP4z7Du4Z4m0NF8T3BlbkFJctrThxS2p15C35zFmFp5",
});

async function main(mood) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a professional DJ. I will provide a specific mood, and you will ONLY respond with a song title and artist that is reflective of that mood. For example: Jesus Walks - Kanye West. No other words will be used",
      },
      { role: "user", content: `My current mood is ${mood}.` },
    ],
    model: "gpt-4-turbo",
  });

  const title = completion.choices[0].message.content.split("-")[0].trim();
  const artist = completion.choices[0].message.content.split("-")[1].trim();
  return { title, artist };
}

const fetchToken = async () => {
  try {
    const auth = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: "grant_type=client_credentials&client_id=a14b3cd6b4a245ee9f44c08d10662532&client_secret=4e37e8428b8e4ebcb142508c2811d078",
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

const searchTracks = async (token, songObj) => {
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
    const d = await response.json();
    console.log(d);
    if (d.error.message == "The access token expired") {
      token = refreshToken();
      searchTracks(token, songObj);
    }
    const tracks = d.tracks.items;
    let songId;
    for (let i = 0; i < tracks.length; i++) {
      for (let j = 0; j < tracks[i].artists.length; j++) {
        if (tracks[i].artists[j].name == songObj.artist) {
          // console.log("found match");
          // console.log(tracks[i].name);
          // console.log(tracks[i].id);
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

const refreshToken = async (token) => {
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

// export async function GET(req) {
//   const url = req.nextUrl.searchParams;
//   const mood = url.get("q");

//   try {
//     const songObj = await main(mood);
//     const token = await fetchToken();
//     const track = await searchTracks(token, songObj);

//     console.log(track);
//     return Response.json("Hello World");
//   } catch (error) {
//     console.log(`Error Fetching Song: ${error}`);
//   }
// }

// const searchSong = async (title, artist) => {
//   try {
//     const options = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: "grant_type=client_credentials&client_id=a14b3cd6b4a245ee9f44c08d10662532&client_secret=4e37e8428b8e4ebcb142508c2811d078",
//     };
//     const token = await axios.post("https://accounts.spotify.com/api/token");
//     console.log(token);
//   } catch (error) {
//     console.log(`SPOTIFY Error: ${error}`);
//   }
// };

export const loginToSpotify = async () => {};
