import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Search } from 'lucide-react';
import { getCoordinatesFromLocation, fetchLocationSuggestions } from '@/lib/geocode';

interface FormData {
    email: string;
    phone: string;
    location: string;
    categories: string[];
    hasCertificate: boolean;
    certificate?: {
        title: string;
        issuedBy: string;
        issuedOn: string;
        fileUrl: string;
    };
}

interface Props {
    role: 'buyer' | 'seller';
    onBack: () => void;
}

interface Category {
    id: string;
    label: string;
}

export default function RegistrationForm({ role, onBack }: Props) {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        phone: '',
        location: '',
        categories: [],
        hasCertificate: false
    });

    const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    const categories: Category[] = [
        { id: 'vegetables', label: 'Vegetables' },
        { id: 'fruits', label: 'Fruits' },
        { id: 'grains', label: 'Grains' },
        { id: 'pulses', label: 'Pulses' },
        { id: 'spices', label: 'Spices & Herbs' },
        { id: 'dairy', label: 'Dairy' },
        { id: 'livestock', label: 'Livestock'}
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'location' && value.trim() !== '') {
            if (debounceTimer) clearTimeout(debounceTimer);

            const timer = setTimeout(async () => {
                const suggestions = await fetchLocationSuggestions(value);
                setLocationSuggestions(suggestions);
            }, 300); // debounce delay 300ms

            setDebounceTimer(timer);
        } else {
            setLocationSuggestions([]);
        }
    };

    const handleCertificateToggle = (hasCert: boolean) => {
        setFormData(prev => ({
            ...prev,
            hasCertificate: hasCert,
            certificate: hasCert ? { 
                title: '', 
                issuedBy: '', 
                issuedOn: '', 
                fileUrl: ''
            } : undefined
        }));
    };

    const handleCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            certificate: {
                ...(prev.certificate || { title: '', issuedBy: '', issuedOn: '', fileUrl: '' }),
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
        if (formData.categories.length === 0) {
            throw new Error("Please select at least one category");
        }

        const payload = {
            email: formData.email,
            phone: formData.phone,
            location: { title: formData.location },
            categories: formData.categories,
            role: role.charAt(0).toUpperCase() + role.slice(1),
            ...(formData.hasCertificate && formData.certificate && {
            certificate: {
                title: formData.certificate.title,
                issuedBy: formData.certificate.issuedBy,
                issuedOn: formData.certificate.issuedOn,
                fileUrl: formData.certificate.fileUrl
            }
            })
        };

        const response = await fetch('/api/onboarding', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
            
        if (!response.ok) {
            throw new Error(result.error || "Registration failed");
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
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">Thank you for joining FarmConnect as a {role}.</p>
            <button 
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={() => window.location.href = '/dashboard'}
            >
                Go to Dashboard
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-green-700">FarmConnect</h1>
                    <p className="text-gray-600">Register as a {role}</p>
                </div>
                
                {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                    {error}
                </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            placeholder="email@example.com"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            placeholder="(123) 456-7890"
                        />
                    </div>
                    
                    {/* <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                placeholder="Search your location"
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
                    </div> */}

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <div className="relative">
                            <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            placeholder="Search your location"
                            autoComplete="off"
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
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        placeholder="Organic Farming Certificate"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Issued By</label>
                                    <input
                                        type="text"
                                        name="issuedBy"
                                        value={formData.certificate?.issuedBy || ''}
                                        onChange={handleCertificateChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        placeholder="Certifying Organization"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Issued On</label>
                                    <input
                                        type="date"
                                        name="issuedOn"
                                        value={formData.certificate?.issuedOn || ''}
                                        onChange={handleCertificateChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate URL</label>
                                    <input
                                        type="url"
                                        name="fileUrl"
                                        value={formData.certificate?.fileUrl || ''}
                                        onChange={handleCertificateChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        placeholder="https://example.com/certificate.pdf"
                                        pattern="https?://.+"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Please provide a public URL to your certificate file</p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Categories of Interest</label>
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
                    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-70"
                    >
                        {isSubmitting ? 'Registering...' : 'Complete Registration'}
                    </button>
                </form>
                
                <div className="mt-4 text-center">
                    <button
                        className="text-green-600 hover:underline"
                        onClick={onBack}
                    >
                        Back to role selection
                    </button>
                </div>
            </div>
        </div>
    );
}
