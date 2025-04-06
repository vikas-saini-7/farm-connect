import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import connectDB from "../../../../lib/connectDB";
import Request from "../../../../model/RequestSchema";
import User from "../../../../model/userSchema";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sellerId = session.user.id;
  const { buyerId } = await req.json();

  if (!buyerId) {
    return NextResponse.json({ error: "Buyer ID is required" }, { status: 400 });
  }

  try {
    const buyer = await User.findById(buyerId);
    if (!buyer || buyer.role !== "Buyer") {
      return NextResponse.json({ error: "Invalid buyer" }, { status: 404 });
    }

    const request = new Request({ sellerId, buyerId });
    await request.save();

    return NextResponse.json({ success: true, request });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
