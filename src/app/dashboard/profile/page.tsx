"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Phone, Mail, User, Calendar, Package } from "lucide-react";

interface UserData {
  username: string;
  email: string;
  contactNumber: string;
  location: string;
  category: string;
  role: string;
  reviews: string[];
  createdAt: string;
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setUserData({
      username: "John Doe",
      email: "john@example.com",
      contactNumber: "+1234567890",
      location: "California, USA",
      category: "Fruits",
      role: "Seller",
      reviews: ["Great service!", "High quality products", "Very responsive seller", "Fresh produce always"],
      createdAt: "2024-04-05",
    });
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <Avatar className="h-32 w-32 border-4 border-white border">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-2xl">
                {userData.username.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{userData.username}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="text-sm" variant="secondary">{userData.role}</Badge>
                    <Badge className="text-sm" variant="outline">{userData.category}</Badge>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    Edit Profile
                  </button>
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
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{userData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>{userData.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p>{userData.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p>{new Date(userData.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Products Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Total Products', 'Active Listings', 'Sold Items'].map((item, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg border">
                      <Package className="h-6 w-6 text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                      <p className="text-2xl font-semibold">0</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Reviews */}
          <div className="md:col-span-1">
            <Card className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
                <div className="space-y-4">
                  {userData.reviews.map((review, index) => (
                    <div key={index} className="p-3 bg-secondary/10 rounded-lg border">
                      <div className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                        <p className="text-sm">{review}</p>
                      </div>
                    </div>
                  ))}
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