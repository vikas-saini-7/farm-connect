// import { NextResponse } from "next/server";
// import connectDB from "../../../../lib/connectDB";
// import User from "../../../../model/userSchema";

// connectDB();

// export async function GET(_, { params }) {
//   try {
//     const { sellerId } = params;

//     const seller = await User.findById(sellerId)
//       .select("username role location reviews")
//       .populate({
//         path: "reviews",
//         select: "rating description reviewedBy createdAt",
//         populate: {
//           path: "reviewedBy",
//           select: "username",
//         },
//       });

//     if (!seller || seller.role !== "seller") {
//       return NextResponse.json({ error: "Seller not found" }, { status: 404 });
//     }

//     return NextResponse.json({ seller }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching seller profile:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/connectDB";
import User from "@/model/userSchema";

export async function GET(request, { params }) {
  await connectDB();

  try {
    const { userId } = params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
