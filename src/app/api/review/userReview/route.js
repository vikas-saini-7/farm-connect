// import { NextResponse } from "next/server";
// import connectDB from "../../../../lib/connectDB";
// import User from "../../../../model/userSchema";

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");
//     console.log("userId", userId);

//     if (!userId) {
//       return NextResponse.json({ error: "User ID is required" }, { status: 400 });
//     }

//     const user = await User.findById(userId).populate({
//       path: "reviews",
//       populate: {
//         path: "reviewedBy",
//         select: "username role",
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({ reviews: user.reviews }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user reviews:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "../../../../lib/connectDB";
// import User from "../../../../model/userSchema";
import Review from "../../../../model/reviewSchema";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid User ID format" }, { status: 400 });
    }

    const reviews = await Review.find({userId})
      .populate({
        path: "reviewedBy",
        select: "username email",
      });

    // if (!reviews) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    return NextResponse.json({ reviews: reviews }, { status: 200 });

  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return NextResponse.json({ error: "Server error: " + error.message }, { status: 500 });
  }
}
