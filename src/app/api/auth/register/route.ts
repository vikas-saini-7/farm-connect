import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const existingUser = await User.findOne({ username: body.username });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);

    const newUser = new User({
      username: body.username,
      email: body.email,
      password: hash,
    });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Server Error", error: err }, { status: 500 });
  }
}
