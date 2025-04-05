"use client"

import { useState } from "react"
import { MapPin, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BuyerMap } from "@/components/farmer/BuyerMap"

// Sample buyer data - in a real app, this would come from an API
const BUYERS = [
  {
    id: 1,
    name: "Green Valley Produce",
    category: "wholesaler",
    location: { lat: 40.7128, lng: -74.006 },
    address: "123 Market St, New York, NY",
    contact: "+1 (555) 123-4567",
    products: ["Vegetables", "Fruits"],
    description: "Large wholesaler specializing in organic produce.",
  },
  {
    id: 2,
    name: "Farm Fresh Co-op",
    category: "cooperative",
    location: { lat: 40.72, lng: -73.995 },
    address: "456 Co-op Lane, Brooklyn, NY",
    contact: "+1 (555) 987-6543",
    products: ["Dairy", "Eggs", "Vegetables"],
    description: "Farmer-owned cooperative focusing on local distribution.",
  },
  {
    id: 3,
    name: "City Farmers Market",
    category: "market",
    location: { lat: 40.73, lng: -74.01 },
    address: "789 Market Ave, Jersey City, NJ",
    contact: "+1 (555) 456-7890",
    products: ["All produce", "Artisanal goods"],
    description: "Weekly farmers market with multiple vendor opportunities.",
  },
  {
    id: 4,
    name: "Restaurant Supply Inc",
    category: "restaurant",
    location: { lat: 40.718, lng: -73.99 },
    address: "321 Chef Blvd, Manhattan, NY",
    contact: "+1 (555) 234-5678",
    products: ["Premium produce", "Specialty items"],
    description: "Supplies high-end restaurants with farm-fresh ingredients.",
  },
]

export default function FarmerMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedBuyer, setSelectedBuyer] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter buyers based on selected category
  const filteredBuyers = selectedCategory ? BUYERS.filter((buyer) => buyer.category === selectedCategory) : BUYERS

  const handleBuyerClick = (buyer: any) => {
    setSelectedBuyer(buyer)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Buyers For Your Produce</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Buyer Category</h2>
          <div className="max-w-md">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select buyer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wholesaler">Wholesalers</SelectItem>
                <SelectItem value="cooperative">Cooperatives</SelectItem>
                <SelectItem value="market">Farmers Markets</SelectItem>
                <SelectItem value="restaurant">Restaurants</SelectItem>
              </SelectContent>
            </Select>

            <p className="mt-4 text-sm text-gray-500">
              Select a category to see buyers in your area who are looking for fresh produce.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Nearby Buyers</h2>
          <div className="h-[500px] w-full rounded-lg overflow-hidden border border-gray-200">
            <BuyerMap buyers={filteredBuyers} onBuyerClick={handleBuyerClick} />
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Click on a marker to view buyer details. Showing {filteredBuyers.length} buyers
            {selectedCategory ? ` in the ${selectedCategory} category` : ""}.
          </p>
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
                  {selectedBuyer.category.charAt(0).toUpperCase() + selectedBuyer.category.slice(1)}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-sm text-gray-500">{selectedBuyer.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Contact</h3>
                    <p className="text-sm text-gray-500">{selectedBuyer.contact}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Products Interested In</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBuyer.products.map((product: string) => (
                      <span key={product} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Description</h3>
                  <p className="text-sm text-gray-600">{selectedBuyer.description}</p>
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
  )
}