import React from 'react';
import { ShoppingBag, UserIcon } from 'lucide-react';

interface Props {
  onRoleSelect: (role: 'buyer' | 'seller') => void;
}

export default function RoleSelection({ onRoleSelect }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-2">Welcome to FarmConnect</h1>
        <p className="text-gray-600 text-lg">Please select your role to get started</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Buyer Card */}
        <RoleCard 
          icon={<ShoppingBag className="w-8 h-8 text-green-600" />}
          title="Buyer"
          description="Browse and purchase crops directly from farmers"
          features={[
            "Browse crops by category",
            "Connect with local farmers",
            "Get competitive prices",
            "Leave reviews and ratings"
          ]}
          onClick={() => onRoleSelect('buyer')}
        />

        {/* Seller Card */}
        <RoleCard 
          icon={<UserIcon className="w-8 h-8 text-green-600" />}
          title="Seller"
          description="Sell your crops directly to customers"
          features={[
            "List your crops for sale",
            "Reach a wider customer base",
            "Set your own prices",
            "Build your reputation with ratings"
          ]}
          onClick={() => onRoleSelect('seller')}
        />
      </div>
    </div>
  );
}

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  onClick: () => void;
}

function RoleCard({ icon, title, description, features, onClick }: RoleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-center text-gray-600 mb-4">{description}</p>
      <p className="font-medium mb-2">As a {title.toLowerCase()}, you'll be able to:</p>
      <ul className="mb-6 space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={onClick}
        className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors mt-auto"
      >
        Continue as {title}
      </button>
    </div>
  )
}
