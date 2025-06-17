import { NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";
import User from "../../../model/userSchema";
import { getCoordinatesFromLocation } from "../../../lib/geocode";

connectDB();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received payload:", body); // Debug logging
    
    const { 
      email, 
      role, 
      phone: contactNumber, 
      location, 
      categories,
      certificate 
    } = body;

    // Validate required fields
    if (!email || !role || !contactNumber || !location?.title || !categories?.length) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const locationTitle = location.title;

    const { latitude, longitude } = await getCoordinatesFromLocation(location.title);

    // Transform certificate data to ensure consistent field names
    const transformedCertificate = certificate ? {
      title: certificate.title,
      issuedBy: certificate.issuedBy,
      issuedOn: certificate.issuedOn,
      certificateUrl: certificate.fileUrl // Map frontend's fileUrl to certificateUrl
    } : undefined;

    console.log("Transformed certificate:", transformedCertificate); // Debug logging

    // Create/update user with all fields
    const user = await User.findOneAndUpdate(
      { email },
      {
        role,
        contactNumber,
        location: {
          title: locationTitle,
          latitude,
          longitude,
        },
        categories,
        ...(transformedCertificate && { certificate: transformedCertificate }),
        isOnboarded: true
      },
      { 
        upsert: true,
        new: true,
        runValidators: true 
      }
    );



    return NextResponse.json(
      { 
        success: true, 
        data: user,
        certificate: user.certificate // Include in response for verification
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("ONBOARDING ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import connectDB from "../../../lib/connectDB";
// import User from "../../../model/userSchema";
// import { getCoordinatesFromLocation } from "../../../lib/geocode";

// connectDB();

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("Received payload:", body);
    
//     const { 
//       email, 
//       role, 
//       phone: contactNumber, 
//       location, 
//       categories,
//       certificate 
//     } = body;

//     // Validate required fields
//     if (!email || !role || !contactNumber || !location?.title || !categories?.length) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Geocode the location
//     const { latitude, longitude } = await getCoordinatesFromLocation(location.title);
    
//     // Transform certificate data to match schema
//     const transformedCertificate = certificate ? {
//       title: certificate.title,
//       issuedBy: certificate.issuedBy,
//       issuedOn: certificate.issuedOn,
//       certificateUrl: certificate.fileUrl
//     } : undefined;

//     // Create/update user with geocoded location
//     const user = await User.findOneAndUpdate(
//       { email },
//       {
//         role,
//         contactNumber,
//         location: {
//           title: location.title,
//           latitude,
//           longitude
//         },
//         category: categories[0], // Using first category as per your schema
//         ...(transformedCertificate && { certificate: transformedCertificate }),
//         isOnboarded: true
//       },
//       { 
//         upsert: true,
//         new: true,
//         runValidators: true 
//       }
//     );

//     return NextResponse.json(
//       { 
//         success: true, 
//         data: {
//           id: user._id,
//           email: user.email,
//           role: user.role,
//           location: user.location,
//           category: user.category
//         }
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("ONBOARDING ERROR:", error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: error.message.includes('Location not found') 
//           ? 'Could not find coordinates for the specified location' 
//           : 'Onboarding failed' 
//       },
//       { status: 500 }
//     );
//   }
// }