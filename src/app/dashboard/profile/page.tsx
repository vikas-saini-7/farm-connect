"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Package,
  Award,
  CheckCircle,
} from "lucide-react";
import { useProfile } from "@/store/useProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Interface } from "readline";
import ReviewPage from "@/components/dashboard/ReviewPage";
import ProfileReview from "@/components/dashboard/ProfileReview";

const ProfilePage = () => {
  const review = [];

  const { profile, isLoading, error, fetchProfile } = useProfile();
  const {data: session, status} = useSession();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen">
        No profile data found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <Avatar className="h-32 w-32 border-4 border-white">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-3xl uppercase">
                {profile.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="justify-end text-gray-500">
                    <h1>
                      Last updated at {new Date(profile.updatedAt).toLocaleDateString()}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-gray-900 capitalize">
                      {profile.username}
                    </h1>
                    {profile?.certificate && (
                      <div className="relative group">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          Verified User
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="text-sm" variant="secondary">
                      {profile.role}
                    </Badge>
                    {profile?.category && (
                      <Badge className="text-sm" variant="outline">
                        {profile.category}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link href="/dashboard/profile/edit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Info Cards */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>{profile.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Location
                        </p>
                        <p>{profile.location.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Member Since
                        </p>
                        <p>
                          {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <img
                    className="h-49"
                    src="https://thumbs.dreamstime.com/b/dry--chickpeas-field-chick-peas-also-known-as-harbara-harbhara-hindi-harvesting-golden-farm-243086391.jpg"
                    alt="img"
                  />
                  <img
                    className="h-49"
                    src="https://img.freepik.com/premium-photo/fields-wheat-end-summer-fully-ripe_1048944-23610597.jpg?w=360"
                    alt="img"
                  />
                  <img
                    className="h-49 w-62"
                    src="https://imgs.search.brave.com/hOS8csuUQ7YkZ3ohk4rwPghGbVhUW0UMZnjCeBBj0nA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcy/MzY2MTc5L3Bob3Rv/L3doZWF0LWNyb3Au/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXo4dTFrb1FpZUdx/Y0VrS1VtQ0N6NWt3/c3Q1a3ZmSjNwaTJS/ekM4ODNmb3M9"
                    alt="img"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Certificate and Reviews */}
          <div className="md:col-span-1 space-y-6">
            {/* Certificate Card */}
            <Card className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Certification</h2>
                {profile.certificate ? (
                  <div className="p-4 bg-secondary/10 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <Award className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">
                          {profile.certificate.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Issued by: {profile.certificate.issuedBy}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Issued on:{" "}
                          {new Date(
                            profile.certificate.issuedOn
                          ).toLocaleDateString()}
                        </p>
                        {profile.certificate.certificateUrl && (
                          <a
                            href={profile.certificate.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-sm hover:underline mt-2 inline-block"
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No certificates available
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Reviews Card */}
            <Card className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
                <div className="space-y-3 max-h-70 overflow-y-auto pr-1">
                  {session?.user.id && <ProfileReview userId={session?.user.id} />}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
