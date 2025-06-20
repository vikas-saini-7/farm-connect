"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";

interface ReviewFormProps {
  userId: string;
  type: "Seller" | "Buyer";
  onReviewAdded?: (review: any) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ userId, type, onReviewAdded }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rating || !text.trim()) {
      alert("Please provide a rating and a review.");
      return;
    }

    const reviewData = {
      userId,
      rating,
      description: text.trim(),
      type,
    };

    try {
      const response = await axios.post("/api/review/add", reviewData);

      if (response.status === 201 || response.status === 200) {
        if (onReviewAdded) onReviewAdded(response.data);
        setRating(0);
        setText("");
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting the review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => {
          const index = i + 1;
          return (
            <Star
              key={index}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(0)}
              className={`h-6 w-6 cursor-pointer ${
                index <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
              }`}
              fill={index <= (hover || rating) ? "currentColor" : "none"}
            />
          );
        })}
      </div>

      <textarea
        className="w-full border rounded p-2 resize-none"
        placeholder="Write your review..."
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
      >
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
