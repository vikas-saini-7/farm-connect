import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/connectDB";
import Product from "../../../../../model/productSchema";
import { getUserIdFromSession } from "../../../../../lib/getUserId"; // helper function you created

// PUT - Update product
export async function PUT(req, { params }) {
  await connectDB();

  try {
    const sellerId = await getUserIdFromSession();

    if (!sellerId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const productId = params.id;

    // Find the product by _id
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Check ownership
    if (product.seller_id.toString() !== sellerId) {
      return NextResponse.json({ success: false, error: "Not allowed to update this product" }, { status: 403 });
    }

    const body = await req.json();
    const { category, productName, description, price, image, quantity } = body;

    // Update fields
    product.category = category || product.category;
    product.productName = productName || product.productName;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.quantity = quantity || product.quantity;

    // Save updated product
    await product.save();

    return NextResponse.json({ success: true, data: product }, { status: 200 });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
