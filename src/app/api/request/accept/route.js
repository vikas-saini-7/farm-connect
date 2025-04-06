import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import connectDB from "../../../../lib/connectDB";
import Request from "../../../../model/RequestSchema";



export async function GET() {
    await connectDB();
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const buyerId = session.user.id;
  
    try {
      const requests = await Request.find({ buyerId }).populate("sellerId", "username email");
      return NextResponse.json({ success: true, requests });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }