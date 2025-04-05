import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import Product from "../../../../model/productSchema";
// import User from "../../../../model/userSchema";
import { getSessionUser } from "@/utils/getSessionUser";
import { authOptions } from "@/auth";

export async function POST(req) {
    await connectDB();
  
    try {
      const session = await getServerSession(authOptions);
  
      if (!session || !session.user?.id) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
  
      const sellerId = session.user._id;
      const body = await req.json();
      const { category, productName, description, price, image, quantity } = body;
  
      if (!category || !productName || !description || !price || !image || !quantity) {
        return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
      }
  
      const newProduct = await Product.create({
        category,
        productName,
        description,
        price,
        image,
        quantity,
        seller_id: sellerId,
      });
  
      return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  
    } catch (error) {
      console.error("Add Product Error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}