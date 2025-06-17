import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/auth";

export async function getUserIdFromSession() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return null;
  }

  return session.user.id; // this is _id from your user model
}