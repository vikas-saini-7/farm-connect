// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/auth";
// import { NextResponse } from "next/server";
// import connectDB from "../../../lib/connectDB";
// import User from "../../../model/userSchema";

// export async function GET() {
//     try {
//         // Get session from next-auth
//         const session = await getServerSession(authOptions);

//         if (!session) {
//             return NextResponse.json(
//                 { error: "Not authenticated" },
//                 { status: 401 }
//             );
//         }

//         // Connect to database
//         await connectDB();

//         // Find user by id from session
//         const user = await User.findById(session.user.id).select("-password");

//         if (!user) {
//             return NextResponse.json(
//                 { error: "User not found" },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json({
//             message: "User found",
//             data: user
//         });

//     } catch (error) {
//         return NextResponse.json(
//             { error: error.message },
//             { status: 500 }
//         );
//     }
// }

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/auth";
import { NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";
import User from "../../../model/userSchema";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(session.user.id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User found", data: user });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH handler (new)

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    // Now update fields based on the received payload
    user.username = body.username || user.username;
    user.contactNumber = body.contactNumber || user.contactNumber;
    user.location = body.location || user.location;
    user.categories = body.categories || user.categories;

    if (body.certificate) {
      user.hasCertificate = true;
      user.certificate = {
        title: body.certificate.title,
        issuedBy: body.certificate.issuedBy,
        issuedOn: body.certificate.issuedOn,
        fileUrl: body.certificate.fileUrl
      };
    } else {
      user.hasCertificate = false;
      user.certificate = undefined;
    }

    await user.save();

    return NextResponse.json({ message: "Profile updated successfully" });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
