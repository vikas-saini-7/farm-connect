// "use client";

// import { useState, useEffect } from "react";
// import { MapPin, User } from "lucide-react";
// import axios from "axios";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// // import BuyerMap from "@/components/farmer/BuyerMap";

// import dynamic from "next/dynamic";

// const MapView = dynamic(() => import("@/components/farmer/MapView"), {
//   ssr: false,
// });

// const locations = [
//   { latitude: 28.6139, longitude: 77.209, name: "Location 1" },
//   { latitude: 28.6229, longitude: 77.21, name: "Location 2" },
//   { latitude: 28.6339, longitude: 77.22, name: "Location 3" },
// ];

// const userLocation = {
//   latitude: 28.6129,
//   longitude: 77.2099,
// };

// const BUYERS = [
//   {
//     id: 1,
//     name: "Green Valley Produce",
//     category: "wholesaler",
//     location: { lat: 40.7128, lng: -74.006 },
//     address: "123 Market St, New York, NY",
//     contact: "+1 (555) 123-4567",
//     products: ["Vegetables", "Fruits"],
//     description: "Large wholesaler specializing in organic produce.",
//   },
//   {
//     id: 2,
//     name: "Farm Fresh Co-op",
//     category: "cooperative",
//     location: { lat: 40.72, lng: -73.995 },
//     address: "456 Co-op Lane, Brooklyn, NY",
//     contact: "+1 (555) 987-6543",
//     products: ["Dairy", "Eggs", "Vegetables"],
//     description: "Farmer-owned cooperative focusing on local distribution.",
//   },
//   {
//     id: 3,
//     name: "City Farmers Market",
//     category: "market",
//     location: { lat: 40.73, lng: -74.01 },
//     address: "789 Market Ave, Jersey City, NJ",
//     contact: "+1 (555) 456-7890",
//     products: ["All produce", "Artisanal goods"],
//     description: "Weekly farmers market with multiple vendor opportunities.",
//   },
//   {
//     id: 4,
//     name: "Restaurant Supply Inc",
//     category: "restaurant",
//     location: { lat: 40.718, lng: -73.99 },
//     address: "321 Chef Blvd, Manhattan, NY",
//     contact: "+1 (555) 234-5678",
//     products: ["Premium produce", "Specialty items"],
//     description: "Supplies high-end restaurants with farm-fresh ingredients.",
//   },
// ];

// interface Product {
//   _id: string;
//   productName: string;
// }

// const limitOptions = [
//   { value: "5", label: "Top 5" },
//   { value: "10", label: "Top 10" },
//   { value: "50", label: "Top 50" },
//   { value: "100", label: "Top 100" },
// ];

// export default function FarmerMarketplace() {
//   const [selectedProduct, setSelectedProduct] = useState<string>("");
//   const [selectedBuyer, setSelectedBuyer] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [limit, setLimit] = useState<string>("5");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `/api/product/allProduct?limit=${limit}`
//         );
//         setProducts(response.data.data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch products");
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [limit]);

//   const filteredBuyers = selectedProduct
//     ? BUYERS.filter((buyer) => buyer.products.includes(selectedProduct))
//     : BUYERS;

//   const handleBuyerClick = (buyer: any) => {
//     setSelectedBuyer(buyer);
//     setIsModalOpen(true);
//   };

//   const getProductName = (productId: string) => {
//     const product = products.find((p) => p._id === productId);
//     return product?.productName || "";
//   };

//   return (
//     <main className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">
//           Find Buyers For Your Produce
//         </h1>

//         {/* Filter Section */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           {/* <h2 className="text-xl font-semibold mb-4">Select Product</h2> */}
//           <div className="flex flex-wrap gap-6 mb-4">
//             <div className="flex-1 min-w-[240px]">
//               {loading ? (
//                 <div className="text-gray-500 mt-8">Loading products...</div>
//               ) : error ? (
//                 <div className="text-red-500 mt-8">{error}</div>
//               ) : (
//                 <div>
//                   <label className="text-sm font-medium text-gray-700 mb-2 block">
//                     Select a product
//                   </label>
//                   <Select
//                     value={selectedProduct}
//                     onValueChange={setSelectedProduct}
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select a product" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {products.map((product) => (
//                         <SelectItem key={product._id} value={product._id}>
//                           {product.productName}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}
//             </div>
//             <div className="flex-1 min-w-[240px]">
//               <label
//                 htmlFor="limit"
//                 className="text-sm font-medium text-gray-700 mb-2 block"
//               >
//                 Number of Records
//               </label>
//               <Select value={limit} onValueChange={setLimit}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select limit" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {limitOptions.map((option) => (
//                     <SelectItem key={option.value} value={option.value}>
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="bg-gray-50 rounded-md p-4 mt-4">
//             <p className="text-sm text-gray-600">
//               Select a product to see buyers interested in purchasing it.
//             </p>
//           </div>
//         </div>

//         {/* Map Section */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Nearby Buyers</h2>
//           {/* <div className="h-[500px] w-full rounded-lg overflow-hidden border border-gray-200">
//             <BuyerMap buyers={filteredBuyers} onBuyerClick={handleBuyerClick} />
//           </div> */}
//           <div className="w-full mx-auto shadow-lg rounded-xl overflow-hidden border border-gray-200">
//             <MapView
//               locations={locations}
//               userLocation={userLocation}
//               defaultZoom={12}
//             />
//           </div>

//           <p className="mt-4 text-sm text-gray-500">
//             Click on a marker to view buyer details. Showing{" "}
//             {filteredBuyers.length} buyers
//             {selectedProduct
//               ? ` interested in ${getProductName(selectedProduct)}`
//               : ""}
//             .
//           </p>
//         </div>
//       </div>

//       {/* Buyer Details Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="sm:max-w-md">
//           {selectedBuyer && (
//             <>
//               <DialogHeader>
//                 <DialogTitle>{selectedBuyer.name}</DialogTitle>
//                 <DialogDescription>
//                   {selectedBuyer.category.charAt(0).toUpperCase() +
//                     selectedBuyer.category.slice(1)}
//                 </DialogDescription>
//               </DialogHeader>

//               <div className="grid gap-4 py-4">
//                 <div className="flex items-start gap-3">
//                   <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
//                   <div>
//                     <h3 className="font-medium">Address</h3>
//                     <p className="text-sm text-gray-500">
//                       {selectedBuyer.address}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <User className="h-5 w-5 text-gray-500 mt-0.5" />
//                   <div>
//                     <h3 className="font-medium">Contact</h3>
//                     <p className="text-sm text-gray-500">
//                       {selectedBuyer.contact}
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-medium mb-1">Products Interested In</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedBuyer.products.map((product: string) => (
//                       <span
//                         key={product}
//                         className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
//                       >
//                         {product}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-medium mb-1">Description</h3>
//                   <p className="text-sm text-gray-600">
//                     {selectedBuyer.description}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <Button onClick={() => setIsModalOpen(false)}>Close</Button>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </main>
//   );
// }

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
        const response = await axios.get(`/api/product/allProduct?limit=${limit}`);
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
  }, [limit]);

  useEffect(() => {
    const fetchNearbyBuyers = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/nearest/buyer', {
          numberOfBuyers: parseInt(limit)
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

    fetchNearbyBuyers();
  }, [limit]);

  const handleBuyerClick = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
    setIsModalOpen(true);
  };

  const getProductName = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    return product?.productName || "";
  };

  // Convert buyers to locations format for MapView
  const buyerLocations = buyers.map(buyer => ({
    latitude: buyer.location.latitude,
    longitude: buyer.location.longitude,
    name: buyer.name
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

          <div className="bg-gray-50 rounded-md p-4 mt-4">
            <p className="text-sm text-gray-600">
              Showing {buyers.length} nearby buyers in your area.
            </p>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Nearby Buyers</h2>
          <div className="w-full mx-auto shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <MapView
              locations={buyerLocations}
              defaultZoom={12}
            />
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