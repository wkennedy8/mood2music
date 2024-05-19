import { main, searchTracks } from "./controller";
import { isAuthenticated } from "@/utils/isAuthenticated";

export async function GET(req) {
  const mood = req.nextUrl.search.split("=")[1];
  try {
    const session = await isAuthenticated();
    const token = session.user.accessToken;

    const songObj = await main(mood);
    const track = await searchTracks(token, songObj);
    return Response.json({ track });
  } catch (error) {
    console.log(`Error Fetching Data for ${mood}`);
    console.log(error);
    return Response.json({ error });
  }
}
