import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import connectDB from "../../../../lib/connectDB";
import User from "../../../../model/userSchema";


connectDB();

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const user = await User.findById(userId);

  if (!user || user.role !== "seller") {
    return NextResponse.json({ error: "Only sellers can delete certificates" }, { status: 403 });
  }

  user.certificate = undefined;
  await user.save();

  return NextResponse.json({ message: "Certificate deleted successfully" }, { status: 200 });
}