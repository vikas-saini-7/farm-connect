import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  try {
    const products = await Product.find().populate("seller_id", "username email"); // Optional: show seller info
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    console.error("GET ALL PRODUCTS ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
