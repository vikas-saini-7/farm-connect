"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RoleSelection from '@/components/onboarding/RoleSelection';
import RegistrationForm from '@/components/onboarding/RegistrationForm';
import Footer from '@/components/onboarding/Footer';

export default function CropConnectOnboarding() {

  const [currentStep, setCurrentStep] = useState<'role-selection' | 'registration'>('role-selection');
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller'>('buyer');

  const handleRoleSelect = (role: 'buyer' | 'seller') => {
    setSelectedRole(role);
    setCurrentStep('registration');
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {currentStep === 'role-selection' ? (
        <RoleSelection onRoleSelect={handleRoleSelect} />
      ) : (
        <RegistrationForm 
          role={selectedRole} 
          onBack={() => setCurrentStep('role-selection')} 
        />
      )}
      <Footer />
    </div>
  );
}

// "use client"
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { Search, ShoppingBag, UserIcon } from 'lucide-react';
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// // Types
// interface FormData {
//   email: string;
//   phone: string;
//   location: string;
//   categories: string[];
//   hasCertificate: boolean;
//   certificate?: {
//     title: string;
//     issuedBy: string;
//     issuedOn: string;
//     fileUrl: string;
//   };
// }

// interface Category {
//   id: string;
//   label: string;
// }

// // Main App Component
// export default function CropConnectOnboarding() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

//   const [currentStep, setCurrentStep] = useState<'role-selection' | 'registration'>('role-selection');
//   const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller'>('buyer');

//   const handleRoleSelect = (role: 'buyer' | 'seller') => {
//     setSelectedRole(role);
//     setCurrentStep('registration');
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex flex-col">
//       {currentStep === 'role-selection' ? (
//         <RoleSelection onRoleSelect={handleRoleSelect} />
//       ) : (
//         <RegistrationForm 
//           role={selectedRole} 
//           onBack={() => setCurrentStep('role-selection')} 
//         />
//       )}
//       <Footer />
//     </div>
//   );
// }

// // Role Selection Screen
// function RoleSelection({ onRoleSelect }: { onRoleSelect: (role: 'buyer' | 'seller') => void }) {
//   return (
//     <div className="flex-1 flex flex-col items-center justify-center p-4">
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-green-700 mb-2">Welcome to FarmConnect</h1>
//         <p className="text-gray-600 text-lg">Please select your role to get started</p>
//       </div>
      
//       <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
//         {/* Buyer Card */}
//         <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//             <ShoppingBag className="w-8 h-8 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold mb-2">Buyer</h2>
//           <p className="text-center text-gray-600 mb-4">Browse and purchase crops directly from farmers</p>
          
//           <p className="font-medium mb-2">As a buyer, you'll be able to:</p>
//           <ul className="mb-6 space-y-2">
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">•</span>
//               <span>Browse crops by category</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">•</span>
//               <span>Connect with local farmers</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">•</span>
//               <span>Get competitive prices</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">•</span>
//               <span>Leave reviews and ratings</span>
//             </li>
//           </ul>
          
//           <button 
//             onClick={() => onRoleSelect('buyer')}
//             className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors mt-auto"
//           >
//             Continue as Buyer
//           </button>
//         </div>
        
//         {/* Seller Card */}
//         <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//             <UserIcon className="w-8 h-8 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold mb-2">Seller</h2>
//           <p className="text-center text-gray-600 mb-4">Sell your crops directly to customers</p>
          
//           <p className="font-medium mb-2">As a seller, you'll be able to:</p>
//           <ul className="mb-6 space-y-2">
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">•</span>
//               <span>List your crops for sale</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">•</span>
//               <span>Reach a wider customer base</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">•</span>
//               <span>Set your own prices</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-green-600 mr-2">•</span>
//               <span>Build your reputation with ratings</span>
//             </li>
//           </ul>
          
//           <button 
//             onClick={() => onRoleSelect('seller')}
//             className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors mt-auto"
//           >
//             Continue as Seller
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Registration Form Component
// function RegistrationForm({ role, onBack }: { role: 'buyer' | 'seller', onBack: () => void }) {
//   const [formData, setFormData] = useState<FormData>({
//     email: '',
//     phone: '',
//     location: '',
//     categories: [],
//     hasCertificate: false
//   });
//   const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const availableLocations: string[] = [
//     'Pune', 'Mumbai', 'Banglore', 'Jaipur',
//     'Delhi', 'Ahilyanagar', 'Nashik', 'Indore',
//     'Surat', 'Ahemdabad', 'Nanded', 'Latur', 'Beed', 'Buldhana', 'Dharashiv', 'Jalna',
//     'Sambhajinagar', 'Thane', 'Ratnagiri', 'Dhule', 'Jalgaon', 'Satare',
//     'Sangli', 'Solapur', 'Kolhapur', 'Nagpur'
//   ];

//   const categories: Category[] = [
//     { id: 'vegetables', label: 'Vegetables' },
//     { id: 'fruits', label: 'Fruits' },
//     { id: 'grains', label: 'Grains' },
//     { id: 'pulses', label: 'Pulses' },
//     { id: 'spices', label: 'Spices & Herbs' },
//     { id: 'dairy', label: 'Dairy' },
//     { id: 'livestock', label: 'Livestock'}
//   ];

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     if (name === 'location' && value.trim() !== '') {
//       const filtered = availableLocations.filter(loc => 
//         loc.toLowerCase().includes(value.toLowerCase())
//       );
//       setLocationSuggestions(filtered);
//     } else {
//       setLocationSuggestions([]);
//     }
//   };

//   const handleCertificateToggle = (hasCert: boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       hasCertificate: hasCert,
//       certificate: hasCert ? { 
//         title: '', 
//         issuedBy: '', 
//         issuedOn: '', 
//         fileUrl: ''
//       } : undefined
//     }));
//   };

//   const handleCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       certificate: {
//         ...(prev.certificate || { title: '', issuedBy: '', issuedOn: '', fileUrl: '' }),
//         [name]: value
//       }
//     }));
//   };

//   const handleLocationSelect = (location: string) => {
//     setFormData(prev => ({ ...prev, location }));
//     setLocationSuggestions([]);
//   };

//   const handleCategoryToggle = (categoryId: string) => {
//     setFormData(prev => {
//       const currentCategories = [...prev.categories];
//       if (currentCategories.includes(categoryId)) {
//         return { ...prev, categories: currentCategories.filter(id => id !== categoryId) };
//       } else {
//         return { ...prev, categories: [...currentCategories, categoryId] };
//       }
//     });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
    
//     try {
//       if (formData.categories.length === 0) {
//         throw new Error("Please select at least one category");
//       }

//       const payload = {
//         email: formData.email,
//         phone: formData.phone,
//         location: { title: formData.location },
//         categories: formData.categories,
//         role: role.charAt(0).toUpperCase() + role.slice(1),
//         ...(formData.hasCertificate && formData.certificate && {
//           certificate: {
//             title: formData.certificate.title,
//             issuedBy: formData.certificate.issuedBy,
//             issuedOn: formData.certificate.issuedOn,
//             fileUrl: formData.certificate.fileUrl
//           }
//         })
//       };

//       const response = await fetch('/api/onboarding', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       const result = await response.json();
        
//       if (!response.ok) {
//         throw new Error(result.error || "Registration failed");
//       }
      
//       setFormSubmitted(true);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An unexpected error occurred");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (formSubmitted) {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center p-4">
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
//           <p className="text-gray-600 mb-6">Thank you for joining FarmConnect as a {role}.</p>
//           <button 
//             className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//             onClick={() => window.location.href = '/dashboard'}
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-green-700">FarmConnect</h1>
//           <p className="text-gray-600">Register as a {role}</p>
//         </div>
        
//         {error && (
//           <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//               placeholder="email@example.com"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//               placeholder="(123) 456-7890"
//             />
//           </div>
          
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//                 placeholder="Search your location"
//               />
//               <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
//             </div>
            
//             {locationSuggestions.length > 0 && (
//               <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
//                 {locationSuggestions.map((location) => (
//                   <li 
//                     key={location}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleLocationSelect(location)}
//                   >
//                     {location}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any certification?</label>
//             <div className="flex gap-4 mb-2">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={formData.hasCertificate === true}
//                   onChange={() => handleCertificateToggle(true)}
//                   className="mr-2"
//                 />
//                 Yes
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   checked={formData.hasCertificate === false}
//                   onChange={() => handleCertificateToggle(false)}
//                   className="mr-2"
//                 />
//                 No
//               </label>
//             </div>

//             {formData.hasCertificate && (
//               <div className="mt-4 space-y-4 p-4 border border-gray-200 rounded-md">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.certificate?.title || ''}
//                     onChange={handleCertificateChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//                     placeholder="Organic Farming Certificate"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Issued By</label>
//                   <input
//                     type="text"
//                     name="issuedBy"
//                     value={formData.certificate?.issuedBy || ''}
//                     onChange={handleCertificateChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//                     placeholder="Certifying Organization"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Issued On</label>
//                   <input
//                     type="date"
//                     name="issuedOn"
//                     value={formData.certificate?.issuedOn || ''}
//                     onChange={handleCertificateChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Certificate URL</label>
//                   <input
//                     type="url"
//                     name="fileUrl"
//                     value={formData.certificate?.fileUrl || ''}
//                     onChange={handleCertificateChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
//                     placeholder="https://example.com/certificate.pdf"
//                     pattern="https?://.+"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Please provide a public URL to your certificate file</p>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Categories of Interest</label>
//             <div className="grid grid-cols-2 gap-2">
//               {categories.map(category => (
//                 <div 
//                   key={category.id}
//                   className={`border rounded-md px-3 py-2 cursor-pointer transition-colors ${
//                     formData.categories.includes(category.id)
//                       ? 'bg-green-100 border-green-500'
//                       : 'border-gray-300 hover:bg-gray-50'
//                   }`}
//                   onClick={() => handleCategoryToggle(category.id)}
//                 >
//                   <span className="text-sm">{category.label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-70"
//           >
//             {isSubmitting ? 'Registering...' : 'Complete Registration'}
//           </button>
//         </form>
        
//         <div className="mt-4 text-center">
//           <button 
//             className="text-green-600 hover:underline"
//             onClick={onBack}
//           >
//             Back to role selection
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Footer Component
// function Footer() {
//   return (
//     <footer className="py-4 text-center text-gray-600 text-sm">
//       © 2025 FarmConnect. All rights reserved.
//     </footer>
//   );
// }