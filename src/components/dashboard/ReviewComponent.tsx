// import React, { useEffect, useState } from "react";
// // import ReviewForm from "./ReviewForm";
// import ReviewPage from "./ReviewPage";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import { Star } from "lucide-react";

// interface ReviewData {
//   _id: string;
//   rating: number;
//   description: string;
//   reviewedBy: {
//     _id: string;
//     username: string;
//     role: string;
//   };
//   createdAt: string;
// }

// const ReviewComponent = ({ userId }: { userId: String | undefined }) => {
//   const searchParams = useSearchParams();
//   const paramId = searchParams.get("paramId");
//   const [reviews, setReviews] = useState<ReviewData[]>([]);
//   const [rating, setRating] = useState<number>(0);
//   const [hover, setHover] = useState<number>(0);
//   const [text, setText] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!rating || !text.trim()) {
//       alert("Please provide a rating and a review.");
//       return;
//     }

//     const reviewData = {
//       userId: paramId,
//       rating,
//       description: text.trim(),
//       type: "Seller",
//     };

//     try {
//       const response = await axios.post("/api/review/add", reviewData);

//       if (response.status === 201 || response.status === 200) {
//         setReviews((prev) => [...prev, response.data.review]);
//         setRating(0);
//         setText("");
//       } else {
//         alert("Failed to submit review. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("An error occurred while submitting the review.");
//     }
//   };
//   const fetchReviews = async () => {
//       try {
//         const res = await axios.get(
//           `/api/review/userReview?userId=${paramId}`
//         );
//         setReviews(res.data.reviews);
//       } catch (error) {
//         console.error("Failed to fetch reviews:", error);
//       }
//     };
//   useEffect(() => {
//     console.log("paramId", paramId)

//     if (paramId) {
//       fetchReviews();
//     }
//   }, []);

//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex gap-1">
//           {[...Array(5)].map((_, i) => {
//             const index = i + 1;
//             return (
//               <Star
//                 key={index}
//                 onClick={() => setRating(index)}
//                 onMouseEnter={() => setHover(index)}
//                 onMouseLeave={() => setHover(0)}
//                 className={`h-6 w-6 cursor-pointer ${
//                   index <= (hover || rating)
//                     ? "text-yellow-500"
//                     : "text-gray-300"
//                 }`}
//                 fill={index <= (hover || rating) ? "currentColor" : "none"}
//               />
//             );
//           })}
//         </div>

//         <textarea
//           className="w-full border rounded p-2 resize-none"
//           placeholder="Write your review..."
//           rows={4}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />

//         <button
//           type="submit"
//           className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
//         >
//           Submit
//         </button>
//       </form>
//       <h3 className="text-lg font-semibold mt-6 mb-4">Recent Reviews</h3>
//       <ReviewPage userId={paramId} reviews={reviews} />
//     </div>
//   );
// };

// export default ReviewComponent;


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ReviewPage from "./ReviewPage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReviewData {
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
interface ReviewComponentProps {
  userId: string | undefined;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ userId }) => {
  const searchParams = useSearchParams();
  const paramId = searchParams.get("paramId");

  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/review/userReview?userId=${paramId}`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    if (paramId) {
      fetchReviews();
    }
  }, [paramId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rating || !text.trim()) {
      alert("Please provide a rating and review.");
      return;
    }

    const reviewData = {
      userId: paramId,
      rating,
      description: text.trim(),
      type: "Seller",
    };

    try {
      const response = await axios.post("/api/review/add", reviewData);
      if (response.status === 201 || response.status === 200) {
        setReviews((prev) => [...prev, response.data.review]);
        setRating(0);
        setText("");
        setOpen(false);
      } else {
        alert("Failed to submit review.");
      }
    } catch (err) {
      console.error("Review error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mt-6 mb-4">Recent Reviews</h3>
        <ReviewPage userId={paramId} reviews={reviews} />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="border-black cursor-pointer" variant="outline">Leave a Review</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
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
                        index <= (hover || rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      fill={
                        index <= (hover || rating) ? "currentColor" : "none"
                      }
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
              <Button type="submit" className="w-full cursor-pointer">
                Submit Review
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReviewComponent;
