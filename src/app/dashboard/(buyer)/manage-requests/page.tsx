"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { User, MapPin, Clock } from "lucide-react";

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
  const [selectedBuyer, setSelectedBuyer] = useState<
    RequestData["reqFrom"] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyerClick = (buyer: RequestData["reqFrom"]) => {
    setSelectedBuyer(buyer);
    setIsModalOpen(true);
  };

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
          Requests from Farmers 🤌🙏🥺🤌🏻
        </h2>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          {requests.length} request(s)
        </Badge>
      </div>

      <div className="grid gap-4">
        {requests.map((req, idx) => {
          const farmer = req.reqFrom;
          return (
            <Card
              key={idx}
              className="border-l-4 border-green-400 text-black p-4 transition-all duration-300 hover:shadow-lg hover:text-black cursor-pointer bg-green-50/60 backdrop-blur-sm"
              onClick={() => handleBuyerClick(farmer)}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                      <User className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black">
                        {farmer.username}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {farmer.categories.map((category, catIdx) => (
                          <Badge
                            key={catIdx}
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
                  className="hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors"
                >
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Buyer Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-sm">
          {selectedBuyer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                    <User className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl text-black">
                      {selectedBuyer.username}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2">
                      {selectedBuyer.categories.map((category, idx) => (
                        <Badge
                          key={idx}
                          className="bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          {category}
                        </Badge>
                      ))}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <Separator className="bg-green-100" />

              <div className="grid gap-6 py-4">
                <Card className="p-4 bg-green-50/50 border-green-100">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="space-y-1.5">
                      <h3 className="font-bold">
                        Contact Information
                      </h3>
                      <div className="text-sm space-y-1">
                        <p className="text-black">
                          <span className="font-medium">Email:</span> {selectedBuyer.email}
                        </p>
                        <p className="text-black">
                          <span className="font-medium">Contact Number:</span> {selectedBuyer.contactNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-green-50/50 border-green-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-black">
                        Location Details
                      </h3>
                      <div className="text-sm space-y-1">
                        <p className="text-black">
                          {selectedBuyer.location.title}
                        </p>
                        {/* <div className="flex gap-4 text-black">
                          <span>Lat: {selectedBuyer.location.latitude}</span>
                          <span>Long: {selectedBuyer.location.longitude}</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}