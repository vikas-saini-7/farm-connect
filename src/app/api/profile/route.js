import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";
import User from "../../../model/userSchema";

export async function GET() {
    try {
        // Get session from next-auth
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Connect to database
        await connectDB();

        // Find user by id from session
        const user = await User.findById(session.user.id).select("-password");

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}