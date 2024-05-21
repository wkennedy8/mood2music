import SpotifyProvider from "next-auth/providers/spotify";
import { fetchUserPlaylists, getCurrentUser } from "../../openai/controller";

const scope =
  "playlist-modify-public playlist-modify-private user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

export const options = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: { scope },
      },
    }),
  ],
  secret: process.env.JWT,
  callbacks: {
    async jwt({ token, account }) {
      // console.log(`TOKEN FROM OPTIONS:`);
      // console.log(token);
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      // const user = await getCurrentUser(token.accessToken);
      // const playlists = await fetchUserPlaylists(token.accessToken);
      // token.user = user;
      // token.playlists = playlists;
      // if (token.expires_at * 1000 > Date.now()) {
      //   const newToken = await refreshToken(token.refreshToken);
      //   token.accessToken = newToken.access_token;
      //   token.expires_at = newToken.expires_in;

      //   // return newToken;
      // }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      const spotifyUser = await getCurrentUser(token.accessToken);
      const playlists = await fetchUserPlaylists(token.accessToken);
      session.spotifyUser = spotifyUser;
      session.playlists = playlists;
      return session;
    },
  },
};
