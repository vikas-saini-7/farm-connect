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

    const sellerId = session.user.id;
    const { numberOfBuyers = 5, productId } = await req.json();

    // Fetch seller's location
    const seller = await User.findById(sellerId);
    if (!seller || !seller.location) {
      return NextResponse.json({ error: "Seller location not found" }, { status: 404 });
    }

    const { latitude: sellerLat, longitude: sellerLon } = seller.location;

    // Build the query based on whether productId is provided
    let query = { role: "Buyer", location: { $exists: true } };

    if (productId) {
      const product = await Product.findById(productId);
      if (product && product.category) {
        query.categories = product.category; // Find buyers with matching category
      }
    }

    // Find buyers and populate relevant fields
    const buyers = await User.find(query)
      .select('username email phone location categories image'); // Select only needed fields

    // console.log(buyers);

    const buyersWithDistance = buyers
      .map((buyer) => {
        const { latitude, longitude } = buyer.location || {};
        if (latitude == null || longitude == null) return null;

        const distance = getDistance(sellerLat, sellerLon, latitude, longitude);
        return {
          buyer: {
            id: buyer._id,
            username: buyer.username,
            email: buyer.email,
            phone: buyer.phone,
            image: buyer.image,
            category: buyer.category
          },
          distance,
          location: buyer.location,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, numberOfBuyers);

    return NextResponse.json({ nearestBuyers: buyersWithDistance }, { status: 200 });
  } catch (error) {
    console.error("Error finding nearest buyers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}