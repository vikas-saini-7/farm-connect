"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Review {
  _id: string;
  rating: number;
  description: string;
  reviewedBy: {
    _id: string;
    username: string;
    role: string;
  };
  createdAt: string;
}

interface ReviewPageProps {
  userId: string | null;
  // reviews: Review[];
}

export default function ReviewPage({ userId }: ReviewPageProps) {
  // const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
//   const searchParams = useSearchParams();
//   const paramId = searchParams.get("paramId");

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/review/userReview?userId=${userId}`)
      setReviews(res.data.reviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReviews();
    }
  }, [userId]);

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review, idx) => (
          <div
            key={idx}
            className="w-full p-3 bg-secondary/10 rounded-lg border mb-3 relative"
          >
            <div className="flex justify-between items-start">
              <div className="text-sm font-medium">
                {review.reviewedBy?.username || "Anonymous"}
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    fill={i < review.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm mt-1">{review.description}</p>

            {/* Created at date at bottom right */}
            <div className="text-xs text-gray-500 absolute bottom-2 right-3 italic">
              {new Date(review.createdAt).toLocaleDateString()}{" "}
              {new Date(review.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
