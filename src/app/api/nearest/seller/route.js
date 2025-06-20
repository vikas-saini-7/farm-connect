import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import Product from "../../../../model/productSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import User from "../../../../model/userSchema";

connectDB();

// Distance calculator (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}


export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const buyerId = session.user.id;
    const { numberOfSellers = 5, category } = await req.json();

    // Fetch seller's location
    const buyer = await User.findById(buyerId);
    if (!buyer || !buyer.location) {
      return NextResponse.json({ error: "Seller location not found" }, { status: 404 });
    }

    const { latitude: buyerLat, longitude: buyerLon } = buyer.location;

    // Build the query based on whether productId is provided
    let query = { role: "Seller", categories: category, location: { $exists: true }  };

    // Find buyers and populate relevant fields
    const sellers = await User.find(query)
      .select('username email phone location categories image');

    const sellersWithDistance = sellers
      .map((seller) => {
        const { latitude, longitude } = seller.location || {};
        if (latitude == null || longitude == null) return null;

        const distance = getDistance(buyerLat, buyerLon, latitude, longitude);
        return {
          seller: {
            id: seller._id,
            username: seller.username,
            email: seller.email,
            phone: seller.phone,
            image: seller.image,
            categories: seller.categories
          },
          distance,
          location: seller.location,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, numberOfSellers);

    return NextResponse.json({ nearestSellers: sellersWithDistance }, { status: 200 });
  } catch (error) {
    console.error("Error finding nearest sellers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}