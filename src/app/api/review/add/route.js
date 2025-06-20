import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import User from "../../../../model/userSchema";
import Review from "../../../../model/reviewSchema";
import { Rewind } from "lucide-react";

connectDB();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reviewerId = session.user.id;
    
    const { rating, description, type, userId } = await req.json();
    // console.log("rating, description, type, userId", rating, description, type, userId);

    if (!rating || !description || !type || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Create new review
    const newReview = await Review.create({
      rating,
      description,
      type,
      userId,
      reviewedBy: reviewerId,
    });

    // Push review to the user's array
    await User.findByIdAndUpdate(userId, {
      $push: { reviews: newReview._id },
    });

    const review = await Review.findById(newReview._id).populate({
      path: "reviewedBy",
      select: "username email",
    });

    return NextResponse.json({ success: true, review: review });
  } catch (error) {
    console.error("Add Review Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
