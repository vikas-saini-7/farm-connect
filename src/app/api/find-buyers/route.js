import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/model/userSchema";
import { connectDB } from "@/lib/connectDB";

export async function POST(req) {
  try {
    // Connect to database
    console.log("Hello");
    await connectDB();
    console.log("World");

    const {
      productId,
      limit = 10,
      currentUserLocation,
      searchLocation,
    } = await req.json();

    // Validate required fields
    if (!productId || !currentUserLocation) {
      return NextResponse.json(
        {
          success: false,
          error: "productId and currentUserLocation are required",
        },
        { status: 400 }
      );
    }

    // Validate location coordinates
    if (!currentUserLocation.latitude || !currentUserLocation.longitude) {
      return NextResponse.json(
        { success: false, error: "Invalid currentUserLocation coordinates" },
        { status: 400 }
      );
    }

    // Set search coordinates based on currentUserLocation or searchLocation
    const searchCoordinates = searchLocation || currentUserLocation;

    // Search radius in kilometers
    const searchRadius = 100;

    // Convert radius to approximate decimal degrees (rough approximation)
    const radiusInDegrees = searchRadius / 111;

    // Build the query
    const query = {
      role: "Buyer",
      isOnboarded: true,
      "location.latitude": {
        $gte: searchCoordinates.latitude - radiusInDegrees,
        $lte: searchCoordinates.latitude + radiusInDegrees,
      },
      "location.longitude": {
        $gte: searchCoordinates.longitude - radiusInDegrees,
        $lte: searchCoordinates.longitude + radiusInDegrees,
      },
    };

    // Find buyers
    const buyers = await User.aggregate([
      { $match: query },
      {
        $addFields: {
          distance: {
            $sqrt: {
              $add: [
                {
                  $pow: [
                    {
                      $subtract: [
                        "$location.latitude",
                        searchCoordinates.latitude,
                      ],
                    },
                    2,
                  ],
                },
                {
                  $pow: [
                    {
                      $subtract: [
                        "$location.longitude",
                        searchCoordinates.longitude,
                      ],
                    },
                    2,
                  ],
                },
              ],
            },
          },
        },
      },
      { $sort: { distance: 1 } },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          location: 1,
          role: 1,
          distance: {
            $multiply: ["$distance", 111], // Convert to approximate kilometers
          },
        },
      },
    ]).exec();

    if (!buyers) {
      return NextResponse.json(
        { success: false, error: "No buyers found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      buyers,
      total: buyers.length,
    });
  } catch (error) {
    console.error("Error in find-buyers API:", error.message);

    // Handle specific database errors
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.message },
        { status: 400 }
      );
    }

    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid data format",
          details: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
