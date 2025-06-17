import connectDB from "@/lib/connectDB";
import User from "../../../../model/userSchema";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hash = await bcrypt.hash(body.password, 10);

    const newUser = new User({
      username: body.username,
      email: body.email,
      password: hash,
    });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("Server error:", err.message);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
