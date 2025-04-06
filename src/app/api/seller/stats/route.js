import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import connectDB from "../../../../lib/connectDB";
import User from "../../../../model/userSchema";
import Product from "../../../../model/productSchema";
import Review from "../../../../model/reviewSchema";

connectDB();

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sellerId = session.user.id;

    const seller = await User.findById(sellerId);

    if (!seller || seller.role !== "Seller") {
      return NextResponse.json({ error: "Access denied. Only sellers can view stats." }, { status: 403 });
    }

    // Total products added by seller
    const totalProducts = await Product.countDocuments({ seller_id: sellerId });

    // All reviews for seller
    const reviews = await Review.find({ userId: sellerId, type: "Seller" });

    const totalReviews = reviews.length;

    // Average rating
    const averageRating =
      totalReviews > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(2)
        : 0;

    // Prepare certificate info if available
    const certificate = seller.certificate?.title
      ? {
          title: seller.certificate.title,
          issuedBy: seller.certificate.issuedBy,
          issuedOn: seller.certificate.issuedOn,
          certificateUrl: seller.certificate.certificateUrl,
        }
      : null;

    return NextResponse.json(
      {
        totalProducts,
        totalReviews,
        averageRating,
        certificate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching seller stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
