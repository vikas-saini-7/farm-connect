"use client";

import { useState, useEffect } from "react";
import { MapPin, User } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useProfile } from "@/store/useProfile";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const MapView = dynamic(() => import("@/components/farmer/MapView"), {
  ssr: false,
});

interface Product {
  _id: string;
  productName: string;
}

interface Buyer {
  buyer: {
    category: string;
    email: string;
    id: string;
    username: string;
    phone: string;
  };
  distance: number;
  location: {
    latitude: number;
    longitude: number;
    title: string;
  };
}

const limitOptions = [
  { value: "5", label: "Top 5" },
  { value: "10", label: "Top 10" },
  { value: "50", label: "Top 50" },
  { value: "100", label: "Top 100" },
];

export default function FarmerMarketplace() {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [limit, setLimit] = useState<string>("5");
  const { profile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`/api/product/allProduct`);
      setProducts(response.data.data);
    };
    fetchProducts();
  }, []);

  const fetchNearbyBuyers = async () => {
    if (!selectedProduct) return;
    const response = await axios.post("/api/nearest/buyer", {
      numberOfBuyers: parseInt(limit),
      productId: selectedProduct,
    });

    const buyersWithPhones = response.data.nearestBuyers.map((buyer: Buyer) => ({
      ...buyer,
      buyer: {
        ...buyer.buyer,
        phone: `+91 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      },
    }));

    setBuyers(buyersWithPhones);
  };

  useEffect(() => {
    fetchNearbyBuyers();
  }, [limit, selectedProduct]);

  const handleBuyerClick = (buyer: Buyer) => {
    router.push(`/dashboard/find-buyer/buyer-profile?paramId=${buyer.buyer.id}`);
  };

  const buyerLocations = buyers.map((buyer) => ({
    latitude: buyer.location.latitude,
    longitude: buyer.location.longitude,
    name: buyer.location.title,
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Buyers For Your Produce</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex gap-6 flex-wrap">
          <div className="min-w-[240px] flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-2">Select a product</label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product._id} value={product._id}>
                    {product.productName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[240px] flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-2">Number of Buyers</label>
            <Select value={limit} onValueChange={setLimit}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select limit" />
              </SelectTrigger>
              <SelectContent>
                {limitOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2 pr-6">
            <h2 className="text-xl font-semibold mb-4">Nearby Buyers</h2>
            <div className="flex items-center">
              <p className="mr-2">Your Location</p>
              <img src="/images/blue-pin.png" className="w-5 mr-6" />
              <p className="mr-2">Buyers Location</p>
              <img src="/images/red-pin.png" className="w-5" />
            </div>
          </div>
          <div className="w-full mx-auto shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <MapView userLocation={profile?.location} locations={buyerLocations} defaultZoom={12} />
          </div>

          {/* Buyers List */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Buyer Details
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                {buyers.length} buyers found
              </Badge>
            </h3>
            <div className="grid gap-4">
              {buyers.map((buyer, idx) => (
                <Card
                  key={idx}
                  className="p-4 hover:shadow-lg hover:border-green-200 cursor-pointer transition-all"
                  onClick={() => handleBuyerClick(buyer)}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{buyer.buyer.username}</h4>
                          <p className="text-sm text-green-700 font-medium">{buyer.buyer.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span>{buyer.distance.toFixed(2)} km</span>
                        </div>
                        <Separator orientation="vertical" className="h-4 bg-green-200" />
                        <span className="truncate max-w-[200px]">{buyer.location.title}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
