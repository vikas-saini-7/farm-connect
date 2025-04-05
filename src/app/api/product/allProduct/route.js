import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import Product from "../../../../model/productSchema"; // or productModel.js — adjust if needed

connectDB();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sellerId = searchParams.get("seller_id");

    if (!sellerId) {
      return NextResponse.json(
        { success: false, error: "seller_id is required" },
        { status: 400 }
      );
    }

    const products = await Product.find({ seller_id: sellerId });

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET SELLER PRODUCTS ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
