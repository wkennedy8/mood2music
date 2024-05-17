import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const isAuthenticated = async () => {
  const session = await getServerSession(options);
  if (!session || Math.floor(Date.now()) >= session.user?.expires_at * 1000) {
    return false;
  }
  return session;
};
