// File: app/dashboard/(buyer)/manage-requests/seller-profile/[sellerId]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  CheckCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ReviewPage from "@/components/dashboard/ReviewPage";
import ReviewForm from "@/components/dashboard/ReviewForm";
import ReviewComponent from "@/components/dashboard/ReviewComponent";

interface Seller {
  _id: string;
  username: string;
  email: string;
  contactNumber: string;
  role: string;
  location: {
    title: string;
    latitude: number;
    longitude: number;
  };
  certificate?: {
    title: string;
    issuedBy: string;
    issuedOn: string;
    certificateUrl?: string;
  };
  categories: string[];
  createdAt: string;
  updatedAt: string;
}

const SellerProfilePage = () => {
  const searchParams = useSearchParams();
  const sellerId = searchParams.get("paramId");
  const {data: session, status} = useSession();
  const buyerId = session?.user.id;

  const [profile, setProfile] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerProfile = async () => {
      try {
        const res = await axios.get(`/api/user/${sellerId}`);
        setProfile(res.data.user);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load seller profile");
      } finally {
        setLoading(false);
      }
    };

    if (sellerId) fetchSellerProfile();
  }, [sellerId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!profile) return <div className="text-center py-10">No data found</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="bg-white border-b p-6 rounded-md shadow">
        <div className="flex gap-6">
          <Avatar className="h-24 w-24 border-2">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="text-4xl font-bold">
              {profile.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {profile.username}
            </h2>
            <div className="flex gap-2">
              <Badge>{profile.role}</Badge>
              {profile.categories.map((cat, i) => (
                <Badge key={i} variant="outline">
                  {cat}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Member since {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="col-span-2">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-primary" />
                {profile.email}
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="h-4 w-4 text-primary" />
                {profile.contactNumber}
              </div>
              <div className="flex gap-2 items-center">
                <MapPin className="h-4 w-4 text-primary" />
                {profile.location?.title}
              </div>
              <div className="flex gap-2 items-center">
                <Calendar className="h-4 w-4 text-primary" />
                Joined on {new Date(profile.createdAt).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Certification</h3>
            {profile.certificate ? (
              <div className="space-y-1">
                <p className="font-medium">{profile.certificate.title}</p>
                <p className="text-sm text-muted-foreground">
                  Issued by: {profile.certificate.issuedBy}
                </p>
                <p className="text-sm text-muted-foreground">
                  Issued on:{" "}
                  {new Date(profile.certificate.issuedOn).toLocaleDateString()}
                </p>
                {profile.certificate.certificateUrl && (
                  <a
                    href={profile.certificate.certificateUrl}
                    target="_blank"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No certificate uploaded.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <ReviewComponent userId={buyerId} />
    </div>
  );
};

export default SellerProfilePage;
