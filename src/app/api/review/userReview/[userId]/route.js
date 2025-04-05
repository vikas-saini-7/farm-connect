import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/connectDB";
import User from "../../../../../model/userSchema";


connectDB();

export async function GET(req, { params }) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId).populate({
      path: "reviews",
      populate: {
        path: "reviewedBy",
        select: "username role",
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ reviews: user.reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}