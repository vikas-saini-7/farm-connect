import React from "react";
import Link from "next/link";
import { BarChart3, ShoppingCart, Users, Leaf } from "lucide-react";
import { useProfile } from "@/store/useProfile";

const Dashboard = () => {
  const profile = useProfile((state) => state.profile);

  return (
    <div className="p-7 bg-gray-50">
      {profile?.role === "Seller" ? (
        <>
          <h1 className="text-3xl font-semibold mb-6 text-green-700">
            Welcome back, {profile.username} 👨‍🌾
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 mb-8 h-80">
            <Link
              href="/dashboard/products"
              className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:bg-green-50 transition"
            >
              <Leaf className="text-green-600" size={32} />
              <div>
                <h2 className="text-xl font-medium text-black">
                  View Products
                </h2>
                <p className="text-sm text-gray-500">Active Listings</p>
              </div>
            </Link>

            <Link
              href="/dashboard/find-buyer"
              className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:bg-yellow-50 transition"
            >
              <ShoppingCart className="text-yellow-600" size={32} />
              <div>
                <h2 className="text-xl font-medium text-black">
                  Explore Buyers
                </h2>
                <p className="text-sm text-gray-500">
                  See nearby buyers using map
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard/contact"
              className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:bg-blue-50 transition"
            >
              <Users className="text-blue-600" size={32} />
              <div>
                <h2 className="text-xl font-medium text-black">
                  Use Contacts For Guidance
                </h2>
                <p className="text-sm text-gray-500">Talk to the experts</p>
              </div>
            </Link>

            <Link
              href="/dashboard/analytics"
              className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:bg-blue-50 transition"
            >
              <BarChart3 className="text-purple-600" size={32} />
              <div>
                <h2 className="text-xl font-medium text-black">Analytics</h2>
                <p className="text-sm text-gray-500">View future analysis</p>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Next Steps
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Add more product images</li>
                <li>Update your certification</li>
                <li>Connect with new buyers</li>
                <li>See Weather Predictions</li>
                <li>Get Community Support</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-4">
                <Link href={"/dashboard/products/create"}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition cursor-pointer">
                    Add/Edit Product
                  </button>
                </Link>
                <Link href={"/dashboard/find-buyer"}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition cursor-pointer">
                    View Buyers
                  </button>
                </Link>
                <Link href={"/dashboard/calender"}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer">
                    Open Calendar
                  </button>
                </Link>
                <Link href={"/dashboard/weather"}>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition cursor-pointer">
                    See Weather
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>Dashboard</>
      )}
      
      {profile?.role === "Buyer" ? (
        <>
          <h1 className="text-3xl font-semibold mb-6 text-green-700">
            Welcome back, {profile.username} 👨‍🌾
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 mb-8 h-80">
            <Link
              href="/dashboard/manage-requests"
              className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:bg-green-50 transition"
            >
              <Leaf className="text-green-600" size={32} />
              <div>
                <h2 className="text-xl font-medium text-black">
                  Manage Requests
                </h2>
                <p className="text-sm text-gray-500">Active Listings</p>
              </div>
            </Link>

            <Link
              href="/dashboard/find-farmer"
              className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:bg-yellow-50 transition"
            >
              <ShoppingCart className="text-yellow-600" size={32} />
              <div>
                <h2 className="text-xl font-medium text-black">
                  Explore Farmers
                </h2>
                <p className="text-sm text-gray-500">
                  See nearby buyers using map
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard/contact-buyer"
              className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:bg-blue-50 transition"
            >
              <Users className="text-blue-600" size={32} />
              <div>
                <h2 className="text-xl font-medium text-black">
                  Use Contacts For Guidance
                </h2>
                <p className="text-sm text-gray-500">Talk to the experts</p>
              </div>
            </Link>

            <Link
              href="/dashboard/analytics"
              className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:bg-blue-50 transition"
            >
              <BarChart3 className="text-purple-600" size={32} />
              <div>
                <h2 className="text-xl font-medium text-black">Analytics</h2>
                <p className="text-sm text-gray-500">View future analysis</p>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Next Steps
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Find nearby farmers</li>
                <li>Manage farmer's requests</li>
                <li>Connect with new farmers</li>
                <li>See price analysis per month</li>
                <li>Get Community Support</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-4">
                <Link href={"/dashboard/manage-requests"}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition cursor-pointer">
                    See Requests
                  </button>
                </Link>
                <Link href={"/dashboard/find-farmer"}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition cursor-pointer">
                    View Farmers
                  </button>
                </Link>
                <Link href={"/dashboard/calender"}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer">
                    Open Calendar
                  </button>
                </Link>
                <Link href={"/dashboard/analytics"}>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition cursor-pointer">
                    See Analytics
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>Dashboard</>
      )}
    </div>
  );
};

export default Dashboard;
