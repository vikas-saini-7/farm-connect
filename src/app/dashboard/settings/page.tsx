import React from "react";

const page = () => {
  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Account Settings */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Change Photo
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Your Phone Number"
              />
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Price Alerts</h3>
                <p className="text-sm text-gray-500">
                  Get notified when prices change
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">New Orders</h3>
                <p className="text-sm text-gray-500">
                  Get notified for new orders
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Language and Region */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Language and Region</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                <option>English</option>
                <option>Hindi</option>
                <option>Punjabi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Region
              </label>
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                <option>North India</option>
                <option>South India</option>
                <option>East India</option>
                <option>West India</option>
                <option>Central India</option>
              </select>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
