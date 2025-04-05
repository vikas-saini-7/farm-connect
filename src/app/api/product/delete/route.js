import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Product from "@/models/Product";
import { getUserIdFromSession } from "@/utils/getUserId"; 

export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const sellerId = await getUserIdFromSession();

    if (!sellerId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const productId = params._id;

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Check if the logged-in seller owns the product
    if (product.seller_id.toString() !== sellerId) {
      return NextResponse.json({ success: false, error: "Not authorized to delete this product" }, { status: 403 });
    }

    await Product.findByIdAndDelete(productId);

    return NextResponse.json({ success: true, message: "Product deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
