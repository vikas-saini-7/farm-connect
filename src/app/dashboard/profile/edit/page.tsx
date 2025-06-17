'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface FormData {
  username: string;
  contactNumber: string;
  location: string;
  categories: string[];
  hasCertificate: boolean;
  certificate?: {
    title: string;
    issuedBy: string;
    issuedOn: string;
    certificateUrl: string;
  };
}

interface Category {
  id: string;
  label: string;
}

export default function EditProfilePage() {

  const [formData, setFormData] = useState<FormData>({
    username: '',
    contactNumber: '',
    location: '',
    categories: [],
    hasCertificate: false,
    certificate: {
      title: '',
      issuedBy: '',
      issuedOn: '',
      certificateUrl: '',
    },
  });

  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const availableLocations: string[] = [
    'Pune', 'Mumbai', 'Bangalore', 'Jaipur', 'Delhi',
    'Ahilyanagar', 'Nashik', 'Indore', 'Surat', 'Ahmedabad',
    'Nanded', 'Latur', 'Beed', 'Buldhana', 'Dharashiv',
    'Jalna', 'Sambhajinagar', 'Thane', 'Ratnagiri', 'Dhule',
    'Jalgaon', 'Satara', 'Sangli', 'Solapur', 'Kolhapur', 'Nagpur',
    'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad',
    'Bhandara', 'Chandrapur', 'Gadchiroli', 'Gondia',
    'Hingoli', 'Mumbai City', 'Mumbai Suburban',
    'Nandurbar', 'Osmanabad', 'Palghar', 'Parbhani',
    'Raigad', 'Sindhudurg', 'Wardha', 'Washim', 'Yavatmal'
  ];

  const categories: Category[] = [
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'grains', label: 'Grains' },
    { id: 'pulses', label: 'Pulses' },
    { id: 'spices', label: 'Spices & Herbs' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'livestock', label: 'Livestock' }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/profile', { method: 'GET' });
            const result = await response.json();
            console.log(result);
            const data = result.data;

            setFormData({
                username: data.username || '',
                contactNumber: data.contactNumber || '',
                location: data.location?.title || '',
                categories: data.categories || [],
                hasCertificate: !!data.certificate,  // check if certificate object exists
                certificate: data.certificate || undefined
            });

        } catch (err) {
            console.error("Failed to load profile");
        }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'location' && value.trim() !== '') {
      const filtered = availableLocations.filter(loc =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleCertificateToggle = (hasCert: boolean) => {
    setFormData(prev => ({
      ...prev,
      hasCertificate: hasCert,
      certificate: hasCert
        ? { title: '', issuedBy: '', issuedOn: '', certificateUrl: '' }
        : undefined
    }));
  };

  const handleCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      certificate: {
        ...(prev.certificate || { title: '', issuedBy: '', issuedOn: '', certificateUrl: '' }),
        [name]: value
      }
    }));
  };

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
    setLocationSuggestions([]);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => {
      const currentCategories = [...prev.categories];
      if (currentCategories.includes(categoryId)) {
        return { ...prev, categories: currentCategories.filter(id => id !== categoryId) };
      } else {
        return { ...prev, categories: [...currentCategories, categoryId] };
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        username: formData.username,
        contactNumber: formData.contactNumber,
        location: { title: formData.location },
        categories: formData.categories,
        ...(formData.hasCertificate && formData.certificate && {
          certificate: {
            title: formData.certificate.title,
            issuedBy: formData.certificate.issuedBy,
            issuedOn: formData.certificate.issuedOn,
            certificateUrl: formData.certificate.certificateUrl
          }
        })
      };

      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Profile update failed");
      }

      setFormSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-green-600">Profile updated successfully!</h2>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Edit Profile</h1>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* contactNumber */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">contactNumber</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>

            {locationSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
                {locationSuggestions.map((location) => (
                  <li
                    key={location}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(category => (
                <div
                  key={category.id}
                  className={`border rounded-md px-3 py-2 cursor-pointer transition-colors ${
                    formData.categories.includes(category.id)
                      ? 'bg-green-100 border-green-500'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  <span className="text-sm">{category.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any certification?</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.hasCertificate === true}
                  onChange={() => handleCertificateToggle(true)}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.hasCertificate === false}
                  onChange={() => handleCertificateToggle(false)}
                  className="mr-2"
                />
                No
              </label>
            </div>

            {formData.hasCertificate && (
              <div className="mt-4 space-y-4 p-4 border border-gray-200 rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.certificate?.title || ''}
                    onChange={handleCertificateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issued By</label>
                  <input
                    type="text"
                    name="issuedBy"
                    value={formData.certificate?.issuedBy || ''}
                    onChange={handleCertificateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issued On</label>
                  <input
                    type="date"
                    name="issuedOn"
                    value={formData.certificate?.issuedOn || ''}
                    onChange={handleCertificateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate URL</label>
                  <input
                    type="url"
                    name="certificateUrl"
                    value={formData.certificate?.certificateUrl || ''}
                    onChange={handleCertificateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
