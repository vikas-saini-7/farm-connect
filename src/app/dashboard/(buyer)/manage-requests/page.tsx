"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface RequestData {
  _id: string;
  createdAt: string;
  reqFrom: {
    _id: string;
    username: string;
    email: string;
    contactNumber: string;
    location: {
      title: string;
      latitude: number;
      longitude: number;
    };
    categories: string[];
  };
}

export default function BuyerRequestsPage() {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/api/request");
        setRequests(res.data.requests);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-black">
          Requests from Farmers
        </h2>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          {requests.length} request(s)
        </Badge>
      </div>

      <div className="grid gap-4">
        {requests.map((req) => {
          const farmer = req.reqFrom;
          return (
            <Card
              key={req._id}
              className="border-l-4 border-green-400 text-black p-4 transition-all duration-300 hover:shadow-lg bg-green-50/60 cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/manage-requests/seller-profile?paramId=${farmer._id}`)
              }
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                      <User className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black">{farmer.username}</h4>
                      <div className="flex flex-wrap gap-2">
                        {farmer.categories.map((category, idx) => (
                          <Badge
                            key={idx}
                            className="bg-green-100 text-green-800 hover:bg-green-200"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-black space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="truncate max-w-[200px]">
                        {farmer.location.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-black/70">
                      <Clock className="h-4 w-4" />
                      Requested on:{" "}
                      <span className="font-medium text-black">
                        {formatDate(req.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors cursor-pointer"
                >
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
