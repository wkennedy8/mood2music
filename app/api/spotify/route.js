import {
  getCurrentUser,
  fetchUserPlaylists,
  addToPlaylist,
} from "../openai/controller";

export const GET = async () => {
  try {
    const session = await isAuthenticated();
    const user = await getCurrentUser(session.user.accessToken);
    const playlists = await fetchUserPlaylists(session.user.accessToken);
    return Response.json({ user, playlists });
  } catch (error) {
    console.log(`Error Getting Spotify Data: ${error}`);
    return Response.json(error);
  }
};

// export const POST = async (req) => {
//   console.log(body);
//   // console.log(req.nextUrl);
//   try {
//     // const session = await isAuthenticated();
//     // const res = await addToPlaylist(playlistId, track);
//     return Response.json("hello world");
//   } catch (error) {
//     console.log(`Error Posting to Spotify: ${error}`);
//     return Response.json(error);
//   }
// };
