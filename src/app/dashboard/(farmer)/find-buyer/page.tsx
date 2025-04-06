"use client";

import { useState, useEffect } from "react";
import { MapPin, User } from "lucide-react";
import axios from "axios";
import { useProfile } from "@/store/useProfile";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<string>("5");

  const { profile, isLoading: profileLoading } = useProfile();

  const generateRandomPhone = () => {
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `+91 ${randomNumber}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/product/allProduct`);
        setProducts(response.data.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchNearbyBuyers = async () => {
    try {
      console.log(selectedProduct);
      setLoading(true);
      const response = await axios.post("/api/nearest/buyer", {
        numberOfBuyers: parseInt(limit),
        productId: selectedProduct,
      });
      // Add phone numbers to the buyers data
      const buyersWithPhone = response.data.nearestBuyers.map(
        (buyer: Buyer) => ({
          ...buyer,
          buyer: {
            ...buyer.buyer,
            phone: generateRandomPhone(),
          },
        })
      );
      setBuyers(buyersWithPhone);
      console.log(buyersWithPhone);
      setError(null);
    } catch (err) {
      setError("Failed to fetch nearby buyers");
      console.error("Error fetching buyers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbyBuyers();
  }, [limit, selectedProduct]);

  const handleBuyerClick = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
    setIsModalOpen(true);
  };

  const getProductName = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    return product?.productName || "";
  };

  // Convert buyers to locations format for MapView
  const buyerLocations = buyers.map((buyer) => ({
    latitude: buyer.location.latitude,
    longitude: buyer.location.longitude,
    name: buyer.location.title, // Using location title instead of buyer name
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Find Buyers For Your Produce
        </h1>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex-1 min-w-[240px]">
              {loading ? (
                <div className="text-gray-500 mt-8">Loading products...</div>
              ) : error ? (
                <div className="text-red-500 mt-8">{error}</div>
              ) : (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Select a product
                  </label>
                  <Select
                    value={selectedProduct}
                    onValueChange={setSelectedProduct}
                  >
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
              )}
            </div>
            <div className="flex-1 min-w-[240px]">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Number of Buyers
              </label>
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

          {/* <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex-1 min-w-[240px]">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Search by location
              </label>
              <Input placeholder="" />
            </div>
            <div className="flex-1 min-w-[240px]">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Number of Buyers
              </label>
              
              <Button className="">Find</Button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-md p-4 mt-4">
            <p className="text-sm text-gray-600">
              Showing {buyers.length} nearby buyers in your area.
            </p>
          </div> */}
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2 pr-6">
            <h2 className="text-xl font-semibold mb-4">Nearby Buyers</h2>
            <div className="flex items-center">
              <p className="mr-2">Your Location</p>
              <img src="/images/blue-pin.png" alt="" className="w-5 mr-6" />
              <p className="mr-2">Buyers Location</p>
              <img src="/images/red-pin.png" alt="" className="w-5" />
            </div>
          </div>
          <div className="w-full mx-auto shadow-lg rounded-xl overflow-hidden border border-gray-200 -z-10">
            <MapView
              userLocation={profile?.location}
              locations={buyerLocations}
              defaultZoom={12}
            />
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
              {buyers.map((buyer) => (
                <Card
                  key={buyer.buyer.id}
                  className="p-4 transition-all duration-300 hover:shadow-lg hover:border-green-200 cursor-pointer bg-white/60 backdrop-blur-sm"
                  onClick={() => handleBuyerClick(buyer)}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {buyer.buyer.username}
                          </h4>
                          <p className="text-sm text-green-700 font-medium">
                            {buyer.buyer.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span>{buyer.distance.toFixed(2)} km</span>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="h-4 bg-green-200"
                        />
                        <span className="truncate max-w-[200px]">
                          {buyer.location.title}
                        </span>
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
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Buyer Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-sm">
          {selectedBuyer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl text-gray-800">
                      {selectedBuyer.buyer.username}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        {selectedBuyer.buyer.category}
                      </Badge>
                      <span className="text-green-600">•</span>
                      <span className="text-gray-600">
                        {selectedBuyer.distance.toFixed(2)} km away
                      </span>
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
                      <h3 className="font-medium text-gray-800">
                        Contact Information
                      </h3>
                      <div className="text-sm space-y-1">
                        <p className="flex items-center gap-2 text-gray-600">
                          Email:
                          <span className="text-gray-800">
                            {selectedBuyer.buyer.email}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 text-gray-600">
                          Phone:
                          <span className="text-gray-800">
                            {selectedBuyer.buyer.phone}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-green-50/50 border-green-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="space-y-1.5">
                      <h3 className="font-medium text-gray-800">
                        Location Details
                      </h3>
                      <div className="text-sm space-y-1">
                        <p className="text-gray-600">
                          {selectedBuyer.location.title}
                        </p>
                        <div className="flex gap-4 text-gray-600">
                          <span>Lat: {selectedBuyer.location.latitude}</span>
                          <span>Long: {selectedBuyer.location.longitude}</span>
                        </div>
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
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Request Buy for visit
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
