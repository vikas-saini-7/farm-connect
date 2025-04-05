import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import Product from "../../../../model/productSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "../../../../model/userSchema";



connectDB();

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const buyerId = session.user.id;
    const { productName, numberOfSellers } = await req.json();

    if (!productName || !numberOfSellers) {
      return NextResponse.json(
        { error: "Missing productName or numberOfSellers" },
        { status: 400 }
      );
    }

    // Fetch buyer's location
    const buyer = await User.findById(buyerId);
    if (!buyer || !buyer.location) {
      return NextResponse.json({ error: "Buyer location not found" }, { status: 404 });
    }

    const { latitude: buyerLat, longitude: buyerLon } = buyer.location;

    // Find all products matching the productName
    const matchingProducts = await Product.find({ productName });

    // Collect seller IDs
    const sellerIds = [...new Set(matchingProducts.map(p => p.seller_id.toString()))];

    // Get seller data with location
    const sellers = await User.find({ _id: { $in: sellerIds }, location: { $exists: true } });

    // Attach distance and filter only sellers with location
    const sellersWithDistance = sellers.map(seller => {
      const { latitude, longitude } = seller.location;
      const distance = calculateDistance(buyerLat, buyerLon, latitude, longitude);
      return {
        sellerId: seller._id,
        name: seller.username,
        distance,
        location: seller.location,
      };
    });

    // Sort by distance
    const nearestSellers = sellersWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, numberOfSellers);

    return NextResponse.json({ nearestSellers }, { status: 200 });
  } catch (error) {
    console.error("Error finding nearest sellers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}