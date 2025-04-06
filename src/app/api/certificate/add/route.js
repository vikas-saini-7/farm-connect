import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import connectDB from "../../../../lib/connectDB";
import User from "../../../../model/userSchema";

connectDB();

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { title, issuedBy, issuedOn, certificateUrl } = await req.json();

  if (!title || !issuedBy || !issuedOn) {
    return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
  }

  const user = await User.findById(userId);
  if (!user || user.role !== "seller") {
    return NextResponse.json({ error: "Only sellers can add certificates" }, { status: 403 });
  }

  user.certificate = { title, issuedBy, issuedOn, certificateUrl };
  await user.save();

  return NextResponse.json({ message: "Certificate added successfully", certificate: user.certificate }, { status: 200 });
}
