import { NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";
import User from "../../../model/userSchema";

connectDB();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, role, contactNumber, location, category } = body;

    if (!email || !role || !contactNumber || !location || !category) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if (user.isOnboarded) {
      return NextResponse.json(
        { success: false, error: "User already onboarded" },
        { status: 400 }
      );
    }

    user.role = role;
    user.contactNumber = contactNumber;
    user.location = location;
    user.category = category;
    user.isOnboarded = true;

    await user.save();

    return NextResponse.json({ success: true, data: user }, { status: 200 });

  } catch (error) {
    console.error("ONBOARDING ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
