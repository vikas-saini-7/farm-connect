import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import connectDB from "@/lib/connectDB";
import User from "@/model/userSchema";

export async function getProfileBySession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return null;
  }

  await connectDB();

  const user = await User.findById(session.user.id).lean() as {
    _id: any;
    email: string;
    isOnboarded: boolean;
    username: string;
  } | null;
  console.log(user);

  if (!user) return null;

  return {
    id: user._id,
    email: user.email,
    isOnboarded: user.isOnboarded,
    username: user.username,
  };
}
