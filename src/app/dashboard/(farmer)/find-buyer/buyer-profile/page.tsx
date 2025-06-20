"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Calendar, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewPage from "@/components/dashboard/ReviewPage";
import ReviewComponent from "@/components/dashboard/ReviewComponent";

interface Buyer {
  _id: string;
  username: string;
  email: string;
  contactNumber: string;
  role: string;
  category?: string;
  location: {
    title: string;
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function BuyerProfile() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const buyerId = searchParams.get("paramId");
  const userId = session?.user.id;

  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const fetchBuyer = async () => {
      try {
        const res = await axios.get(`/api/user/${buyerId}`);
        setBuyer(res.data.user);
      } catch (err) {
        console.error("Failed to fetch buyer data", err);
      } finally {
        setLoading(false);
      }
    };

    if (buyerId) fetchBuyer();
  }, [buyerId]);

  const handleRequestClick = async () => {
    if (!buyer?._id) return;
    const res = await axios.post("/api/request/send", { buyerId: buyer._id });
    if (res.status === 200) {
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
    }
  };
  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!buyer) return <div className="text-center p-10">Buyer not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="mb-6">
        <CardContent className="flex gap-6 p-6">
          <Avatar className="h-24 w-24 border-2">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="text-3xl font-bold">
              {buyer.username.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{buyer.username}</h2>
            <div className="flex gap-2 mt-2">
              <Badge>{buyer.role}</Badge>
              {buyer.category && <Badge variant="outline">{buyer.category}</Badge>}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Member since {new Date(buyer.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <div className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-primary" /> {buyer.email}
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="h-4 w-4 text-primary" /> {buyer.contactNumber}
              </div>
              <div className="flex gap-2 items-center">
                <MapPin className="h-4 w-4 text-primary" /> {buyer.location?.title}
              </div>
              <div className="flex gap-2 items-center">
                <Calendar className="h-4 w-4 text-primary" />
                Joined on {new Date(buyer.createdAt).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <ReviewComponent userId={userId} />
      </div>

      <div className="mt-6 flex justify-end">
        {showConfirmation ? (
          <div className="flex items-center text-green-600 font-medium gap-2">
            <CheckCircle className="h-5 w-5" />
            Request Sent!
          </div>
        ) : (
          <Button onClick={handleRequestClick}>Send Request</Button>
        )}
      </div>
    </div>
  );
}
