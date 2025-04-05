"use client";

import { useState, useEffect } from "react";
import { MapPin, User } from "lucide-react";
import axios from "axios";

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

const MapView = dynamic(() => import("@/components/farmer/MapView"), {
  ssr: false,
});

interface Product {
  _id: string;
  productName: string;
}

interface Buyer {
  buyerId: string;
  name: string;
  distance: number;
  category?: string;
  location: {
    latitude: number;
    longitude: number;
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
      setBuyers(response.data.nearestBuyers);
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
    name: buyer.name,
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
          <h2 className="text-xl font-semibold mb-4">Nearby Buyers</h2>
          <div className="w-full mx-auto shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <MapView locations={buyerLocations} defaultZoom={12} />
          </div>

          {/* Buyers List */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Buyer Details</h3>
            <div className="grid gap-4">
              {buyers.map((buyer) => (
                <div
                  key={buyer.buyerId}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleBuyerClick(buyer)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{buyer.name}</h4>
                      <p className="text-sm text-gray-500">
                        Distance: {buyer.distance.toFixed(2)} km
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Buyer Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedBuyer && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBuyer.name}</DialogTitle>
                <DialogDescription>
                  Distance: {selectedBuyer.distance.toFixed(2)} km away
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-gray-500">
                      Latitude: {selectedBuyer.location.latitude}
                      <br />
                      Longitude: {selectedBuyer.location.longitude}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
