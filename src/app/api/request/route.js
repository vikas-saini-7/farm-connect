import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";
import connectDB from "../../../lib/connectDB";
import Request from "../../../model/RequestSchema";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const requests = await Request.find({ reqTo: userId })
      .populate("reqFrom")
      .sort({ createdAt: -1 }); // Newest first

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
