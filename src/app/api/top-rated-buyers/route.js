import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "../../../lib/connectDB";
import User from "../../../model/userSchema";
import Review from "../../../models/reviewSchema";

connectDB();

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get reviews where type is Buyer
    const buyerReviews = await Review.aggregate([
      { $match: { type: "Buyer" } },
      {
        $group: {
          _id: "$userId",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 }
        }
      },
      { $sort: { averageRating: -1, totalReviews: -1 } },
      { $limit: 10 }
    ]);

    // 2. Fetch user details
    const buyerIds = buyerReviews.map(b => b._id);
    const buyers = await User.find({ _id: { $in: buyerIds }, role: "Buyer" });

    // 3. Combine data
    const topRatedBuyers = buyerReviews.map(review => {
      const user = buyers.find(b => b._id.toString() === review._id.toString());
      return {
        buyerId: user._id,
        name: user.username,
        averageRating: review.averageRating.toFixed(1),
        totalReviews: review.totalReviews,
        location: user.location || null
      };
    });

    return NextResponse.json(topRatedBuyers, { status: 200 });

  } catch (error) {
    console.error("Error fetching top rated buyers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
