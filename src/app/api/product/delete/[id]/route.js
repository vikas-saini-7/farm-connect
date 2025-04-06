import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/connectDB";
import Product from "../../../../../model/productSchema";
// import { authOptions } from "../../../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import { getUserIdFromSession } from "../../../../../lib/getUserId";

// import { getUserIdFromSession } from "@/lib/getUserId"; 

export async function DELETE(req, { params }) {
  await connectDB();

  console.log("params",params);
  const productId = params.id;

  if (!productId) {
    return NextResponse.json({ success: false, error: "Product ID missing" }, { status: 400 });
  }

  try {
    const sellerId = await getUserIdFromSession();

    if (!sellerId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    if (product.seller_id.toString() !== sellerId) {
      return NextResponse.json({ success: false, error: "Not allowed to delete this product" }, { status: 403 });
    }

    await Product.findByIdAndDelete(productId);

    return NextResponse.json({ success: true, message: "Product deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}