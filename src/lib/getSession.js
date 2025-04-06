// utils/getUserId.js
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/auth"; // Adjust path based on where your auth config is

export async function getLoggedInUserId(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}
