import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import User from "../../../../model/userSchema";

connectDB();

export async function GET(_, { params }) {
  try {
    const { sellerId } = params;

    const seller = await User.findById(sellerId)
      .select("username role location reviews")
      .populate({
        path: "reviews",
        select: "rating description reviewedBy createdAt",
        populate: {
          path: "reviewedBy",
          select: "username",
        },
      });

    if (!seller || seller.role !== "seller") {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json({ seller }, { status: 200 });
  } catch (error) {
    console.error("Error fetching seller profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
