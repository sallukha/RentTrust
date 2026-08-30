import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  X,
  ShieldCheck,
  Building2,
  Sparkles,
  Wifi,
  Snowflake,
  Thermometer,
  Car,
  Refrigerator,
  Flame,
  UploadCloud,
  Check,
  Image as ImageIcon,
  Plus,
  Trash2,
  Lock,
  FileText,
  Receipt,
  Calendar,
  DollarSign,
  MapPin,
  Edit3,
  Rocket,
  PartyPopper,
  ArrowRight,
  Home,
  LayoutDashboard,
  Inbox,
  MessageSquare,
  Menu,
  CheckCircle2,
  AlertCircle,
  Cigarette,
  PawPrint,
  Users,
  Info,
  Loader,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PropertyListing } from '../types';
import { apiService } from '../services/api';

export interface ListPropertyFormData {
  // Step 1: Basic Details
  title: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  address: string;
  city: string;
  zipCode: string;
  
  // Step 2: Photos - Store both preview URL and File object
  coverPhotoFile: File | null;
  coverPhotoPreview: string;
  livingRoomPhotoFile: File | null;
  livingRoomPhotoPreview: string;
  kitchenPhotoFile: File | null;
  kitchenPhotoPreview: string;
  bedroomPhotoFile: File | null;
  bedroomPhotoPreview: string;

  // Step 3: Amenities
  coreAmenities: {
    wifi: boolean;
    ac: boolean;
    heating: boolean;
    parking: boolean;
    laundry: boolean;
  };
  kitchenAmenities: {
    fullKitchen: boolean;
    microwave: boolean;
    coffeeMaker: boolean;
  };
  safetyAmenities: {
    smokeAlarm: boolean;
    fireExtinguisher: boolean;
  };

  // Step 4: Description
  descriptionTitle: string;
  detailedDescription: string;
  highlights: string[];

  // Step 5: Pricing & Terms
  monthlyRent: string;
  securityDeposit: string;
  leaseDuration: string;
  availableFrom: string;

  // Step 6: House Rules
  petsAllowed: boolean;
  petRestrictions: string;
  smokingAllowed: boolean;
  eventsAllowed: boolean;
  customRules: string;

  // Step 7: Ownership Verification
  deedUploaded: boolean;
  deedFileName: string;
  utilityUploaded: boolean;
  utilityFileName: string;
}

const DEFAULT_HIGHLIGHTS = [
  'Quiet',
  'Pet Friendly',
  'Near Metro',
  'Newly Renovated',
  'High Ceilings',
  'Natural Light',
  'In-unit Laundry',
  'Balcony',
];

const SAMPLE_IMAGES = {
  cover: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&auto=format&fit=crop&q=80',
  livingRoom: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&auto=format&fit=crop&q=80',
  bedroom: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1000&auto=format&fit=crop&q=80',
  bathroom: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&auto=format&fit=crop&q=80',
};

export const ListPropertyScreen: React.FC = () => {
  const { setCurrentScreen, setSelectedProperty } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [customHighlightInput, setCustomHighlightInput] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isPublishedModalOpen, setIsPublishedModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeBottomNav, setActiveBottomNav] = useState<'dashboard' | 'properties' | 'requests' | 'messages' | 'menu'>('properties');

  const [formData, setFormData] = useState<ListPropertyFormData>({
    title: 'Modern Downtown Loft',
    propertyType: 'Apartment',
    bedrooms: '2',
    bathrooms: '1.5',
    sqft: '1200',
    address: '123 Horizon Ave, Apt 4B',
    city: 'Seattle',
    zipCode: '98101',
    coverPhotoFile: null,
    coverPhotoPreview: SAMPLE_IMAGES.cover,
    livingRoomPhotoFile: null,
    livingRoomPhotoPreview: SAMPLE_IMAGES.livingRoom,
    kitchenPhotoFile: null,
    kitchenPhotoPreview: SAMPLE_IMAGES.kitchen,
    bedroomPhotoFile: null,
    bedroomPhotoPreview: SAMPLE_IMAGES.bedroom,
    coreAmenities: {
      wifi: true,
      ac: true,
      heating: true,
      parking: true,
      laundry: true,
    },
    kitchenAmenities: {
      fullKitchen: true,
      microwave: true,
      coffeeMaker: true,
    },
    safetyAmenities: {
      smokeAlarm: true,
      fireExtinguisher: true,
    },
    descriptionTitle: 'Sunny Studio in the Heart of Downtown',
    detailedDescription:
      'Experience urban living at its finest in this sun-drenched modern loft. Features soaring 12ft exposed ceilings, floor-to-ceiling panoramic windows, polished concrete flooring, a chef-grade kitchen with quartz countertops, and smart building access.',
    highlights: ['Quiet', 'Pet Friendly', 'Near Metro', 'High Ceilings', 'Natural Light'],
    monthlyRent: '2400',
    securityDeposit: '2400',
    leaseDuration: '12 Months (Standard)',
    availableFrom: '2026-09-01',
    petsAllowed: true,
    petRestrictions: 'Dogs under 40lbs only',
    smokingAllowed: false,
    eventsAllowed: false,
    customRules: 'Quiet hours observed between 10:00 PM and 7:00 AM. Recycling bins located in basement.',
    deedUploaded: true,
    deedFileName: 'Horizon_Deed_Seattle_Title2026.pdf',
    utilityUploaded: true,
    utilityFileName: 'Seattle_City_Light_July2026.pdf',
  });

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleAiAssist = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        detailedDescription:
          `Welcome to this impeccably designed ${prev.propertyType.toLowerCase()} located on ${prev.address || 'Horizon Ave'}. Boasting ${prev.bedrooms} expansive bedrooms and ${prev.bathrooms} baths with ${prev.sqft} sq ft of bespoke living space. Enjoy generous natural light, ultra-fast fiber WiFi connectivity, modern in-unit laundry, and secure escrow tenancy verified by RentalTrust.`,
        descriptionTitle: `${prev.bedrooms} Bed Modern Urban ${prev.propertyType} in ${prev.city || 'Downtown'}`,
      }));
      setIsAiGenerating(false);
    }, 600);
  };

  const toggleHighlight = (item: string) => {
    setFormData((prev) => {
      const exists = prev.highlights.includes(item);
      if (exists) {
        return { ...prev, highlights: prev.highlights.filter((h) => h !== item) };
      } else if (prev.highlights.length < 5) {
        return { ...prev, highlights: [...prev.highlights, item] };
      }
      return prev;
    });
  };

  const handleAddCustomHighlight = () => {
    if (customHighlightInput.trim() && formData.highlights.length < 5) {
      if (!formData.highlights.includes(customHighlightInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          highlights: [...prev.highlights, customHighlightInput.trim()],
        }));
      }
      setCustomHighlightInput('');
    }
  };

  const handleImageUpload = (field: 'coverPhoto' | 'livingRoomPhoto' | 'kitchenPhoto' | 'bedroomPhoto', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        [`${field}File`]: file,
        [`${field}Preview`]: preview,
      } as any));
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Collect the image files - use at least one for upload
      const imageFiles: File[] = [];
      if (formData.coverPhotoFile) imageFiles.push(formData.coverPhotoFile);
      if (formData.livingRoomPhotoFile) imageFiles.push(formData.livingRoomPhotoFile);
      if (formData.kitchenPhotoFile) imageFiles.push(formData.kitchenPhotoFile);
      if (formData.bedroomPhotoFile) imageFiles.push(formData.bedroomPhotoFile);

      if (imageFiles.length === 0) {
        setSubmitError('Please upload at least one property photo');
        setIsSubmitting(false);
        return;
      }

      // Prepare the property data
      const amenities = [];
      if (formData.coreAmenities.wifi) amenities.push('WiFi');
      if (formData.coreAmenities.ac) amenities.push('Air Conditioning');
      if (formData.coreAmenities.heating) amenities.push('Heating');
      if (formData.coreAmenities.parking) amenities.push('Parking');
      if (formData.coreAmenities.laundry) amenities.push('In-unit Laundry');

      // Call the API to create the property
      const property = await apiService.createProperty({
        title: formData.title,
        description: formData.detailedDescription,
        address: {
          street: formData.address,
          city: formData.city,
          state: 'WA',
          zipCode: formData.zipCode,
          country: 'USA',
        },
        pricePerMonth: Number(formData.monthlyRent),
        securityDeposit: Number(formData.securityDeposit),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        amenities,
        images: imageFiles,
      });

      // Show success modal
      setIsPublishedModalOpen(true);

      // Reset form after a delay
      setTimeout(() => {
        setIsPublishedModalOpen(false);
        setCurrentScreen('dashboard');
      }, 3000);
    } catch (error: any) {
      console.error('Failed to create property:', error);
      setSubmitError(
        error.message || 'Failed to create property. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress percentage calculation
  const progressPercent = Math.round((currentStep / 8) * 100);

  return (
    <div
      id="list-property-wizard"
      className="w-full max-w-md mx-auto flex flex-col font-sans text-slate-900 dark:text-slate-100 pb-6 select-none"
    >
      {/* Top Header Bar */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{currentStep === 1 ? 'Dashboard' : 'Property Detail'}</span>
            </button>

            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Step {currentStep} of 8
              </span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                {currentStep === 1 && 'Basic Details'}
                {currentStep === 2 && 'Property Photos'}
                {currentStep === 3 && 'Amenities & Features'}
                {currentStep === 4 && 'Describe your property'}
                {currentStep === 5 && 'Pricing & Terms'}
                {currentStep === 6 && 'House Rules'}
                {currentStep === 7 && 'Ownership Verification'}
                {currentStep === 8 && 'Final Review'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCurrentScreen('dashboard')}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Close and Return to Dashboard"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Line */}
          <div className="mt-2.5 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full"
              initial={{ width: `${((currentStep - 1) / 8) * 100}%` }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Screen Body Container */}
      <div className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-8 space-y-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: Basic Details */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Trust Verification Alert Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                  Every property on <strong className="font-bold">RentalTrust</strong> is verified. Our team will review the details before publishing.
                </p>
              </div>

              {/* Basic Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-l-4 border-slate-900 dark:border-white pl-2.5">
                  <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    Basic Information
                  </h2>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Listing Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Modern Minimalist Loft in Downtown"
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs transition-all appearance-none cursor-pointer"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Condominium">Condominium</option>
                    <option value="Studio Loft">Studio Loft</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Single Family Home">Single Family Home</option>
                    <option value="Luxury Penthouse">Luxury Penthouse</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      placeholder="2"
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Bathrooms
                    </label>
                    <input
                      type="text"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      placeholder="1.5"
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Square Footage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.sqft}
                      onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                      placeholder="1200"
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs pr-14"
                    />
                    <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">
                      sq ft
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-l-4 border-slate-900 dark:border-white pl-2.5">
                  <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    Location
                  </h2>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street Address"
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="10001"
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs"
                    />
                  </div>
                </div>

                {/* Draggable Map Preview Strip */}
                <div className="relative h-28 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 flex items-center justify-center group cursor-grab">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80"
                    alt="Map Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg animate-bounce">
                      <MapPin className="w-5 h-5 fill-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[11px] font-bold text-slate-800 dark:text-slate-200 shadow-md">
                      ⓘ Drag the map to adjust pin location
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-4 rounded-2xl bg-slate-950 dark:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-850 dark:hover:bg-emerald-500 shadow-lg cursor-pointer transition-all active:scale-98"
                >
                  <span>Continue to Photos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('dashboard')}
                  className="w-full py-2.5 text-center text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Save & Exit
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Property Photos */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Property Photos
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  High-quality photos help your property stand out. Add at least 5 photos for better visibility.
                </p>
              </div>

              {/* Cover Photo */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Cover Photo
                </label>
                {formData.coverPhotoPreview ? (
                  <div className="relative h-48 rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-sm group">
                    <img
                      src={formData.coverPhotoPreview}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <input
                        type="file"
                        id="coverPhotoInput"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload('coverPhoto', file);
                        }}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('coverPhotoInput')?.click()}
                        className="px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-md cursor-pointer hover:bg-slate-100"
                      >
                        Change
                      </button>
                    </div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Main Cover
                    </div>
                  </div>
                ) : (
                  <div className="h-44 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-900/60 flex flex-col items-center justify-center gap-2 text-center p-4 cursor-pointer hover:border-emerald-500 transition-colors relative">
                    <input
                      type="file"
                      id="coverPhotoInput"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload('coverPhoto', file);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-xs text-slate-700 dark:text-slate-300">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                      Upload Cover Photo
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      PNG, JPG up to 10MB
                    </span>
                  </div>
                )}
              </div>

              {/* Additional Photos Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Additional Photos
                  </label>
                  <span className="text-xs font-bold text-slate-500">4 of 4+ added</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Living Room */}
                  <div className="h-32 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-900/60 relative overflow-hidden flex flex-col items-center justify-center gap-1 cursor-pointer group">
                    <input
                      type="file"
                      id="livingRoomInput"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload('livingRoomPhoto', file);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {formData.livingRoomPhotoPreview ? (
                      <img
                        src={formData.livingRoomPhotoPreview}
                        alt="Living Room"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Living Room
                        </span>
                      </>
                    )}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] text-white font-bold">
                      Living Room
                    </div>
                  </div>

                  {/* Kitchen */}
                  <div className="h-32 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-900/60 relative overflow-hidden flex flex-col items-center justify-center gap-1 cursor-pointer group">
                    <input
                      type="file"
                      id="kitchenInput"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload('kitchenPhoto', file);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {formData.kitchenPhotoPreview ? (
                      <img
                        src={formData.kitchenPhotoPreview}
                        alt="Kitchen"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Kitchen
                        </span>
                      </>
                    )}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] text-white font-bold">
                      Kitchen
                    </div>
                  </div>

                  {/* Bedroom */}
                  <div className="h-32 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-900/60 relative overflow-hidden flex flex-col items-center justify-center gap-1 cursor-pointer group">
                    <input
                      type="file"
                      id="bedroomInput"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload('bedroomPhoto', file);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {formData.bedroomPhotoPreview ? (
                      <img
                        src={formData.bedroomPhotoPreview}
                        alt="Bedroom"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Bedroom
                        </span>
                      </>
                    )}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] text-white font-bold">
                      Bedroom
                    </div>
                  </div>

                  {/* Placeholder for 4th photo */}
                  <div className="h-32 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-900/60 relative overflow-hidden flex flex-col items-center justify-center gap-1 cursor-pointer group">
                    <Plus className="w-5 h-5 text-slate-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      +2 more
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-4 rounded-2xl bg-slate-950 dark:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-850 dark:hover:bg-emerald-500 shadow-lg cursor-pointer transition-all active:scale-98"
                >
                  <span>Continue to Amenities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('dashboard')}
                  className="w-full py-2.5 text-center text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Save & Exit
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Amenities & Features */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  What does your place offer?
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Select all the amenities available to guests. The more you add, the more attractive your property becomes.
                </p>
              </div>

              {/* Core Amenities */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Core Amenities
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { key: 'wifi', label: 'Fast WiFi', icon: Wifi },
                    { key: 'ac', label: 'Air Conditioning', icon: Snowflake },
                    { key: 'heating', label: 'Heating', icon: Thermometer },
                    { key: 'parking', label: 'Free Parking', icon: Car },
                    { key: 'laundry', label: 'In-unit Laundry', icon: Building2 },
                  ].map((amenity) => {
                    const isChecked =
                      formData.coreAmenities[amenity.key as keyof typeof formData.coreAmenities];
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={amenity.key}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            coreAmenities: {
                              ...formData.coreAmenities,
                              [amenity.key]: !isChecked,
                            },
                          })
                        }
                        className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-slate-200 dark:bg-slate-800 border-slate-900 dark:border-emerald-500 shadow-xs'
                            : 'bg-slate-100/80 dark:bg-slate-900/60 border-transparent hover:border-slate-300'
                        }`}
                      >
                        <div className="flex flex-col gap-2">
                          <Icon className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {amenity.label}
                          </span>
                        </div>
                        {isChecked && (
                          <div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-emerald-500 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Kitchen & Dining */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Kitchen & Dining
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { key: 'fullKitchen', label: 'Full Kitchen', icon: Refrigerator },
                    { key: 'microwave', label: 'Microwave', icon: Sparkles },
                    { key: 'coffeeMaker', label: 'Coffee Maker', icon: Building2 },
                  ].map((amenity) => {
                    const isChecked =
                      formData.kitchenAmenities[amenity.key as keyof typeof formData.kitchenAmenities];
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={amenity.key}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            kitchenAmenities: {
                              ...formData.kitchenAmenities,
                              [amenity.key]: !isChecked,
                            },
                          })
                        }
                        className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-slate-200 dark:bg-slate-800 border-slate-900 dark:border-emerald-500 shadow-xs'
                            : 'bg-slate-100/80 dark:bg-slate-900/60 border-transparent hover:border-slate-300'
                        }`}
                      >
                        <div className="flex flex-col gap-2">
                          <Icon className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {amenity.label}
                          </span>
                        </div>
                        {isChecked && (
                          <div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-emerald-500 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety */}
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Safety
                </label>
                <div className="space-y-2">
                  {/* Smoke Alarm */}
                  <div
                    onClick={() =>
                      setFormData({
                        ...formData,
                        safetyAmenities: {
                          ...formData.safetyAmenities,
                          smokeAlarm: !formData.safetyAmenities.smokeAlarm,
                        },
                      })
                    }
                    className="p-3.5 rounded-2xl bg-slate-200 dark:bg-slate-800/80 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Flame className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">
                          Smoke Alarm
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          Recommended by local laws
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-slate-900 dark:border-white flex items-center justify-center ${
                        formData.safetyAmenities.smokeAlarm
                          ? 'bg-slate-900 dark:bg-white'
                          : 'bg-transparent'
                      }`}
                    />
                  </div>

                  {/* Fire Extinguisher */}
                  <div
                    onClick={() =>
                      setFormData({
                        ...formData,
                        safetyAmenities: {
                          ...formData.safetyAmenities,
                          fireExtinguisher: !formData.safetyAmenities.fireExtinguisher,
                        },
                      })
                    }
                    className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">
                          Fire Extinguisher
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          Located in kitchen
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-slate-400 dark:border-slate-600 flex items-center justify-center ${
                        formData.safetyAmenities.fireExtinguisher
                          ? 'bg-slate-900 dark:bg-white border-slate-900'
                          : 'bg-transparent'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-4 rounded-2xl bg-slate-950 dark:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-850 dark:hover:bg-emerald-500 shadow-lg cursor-pointer transition-all active:scale-98"
                >
                  <span>Continue to Description</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Describe your property */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Describe your property
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Paint a picture for potential tenants. Highlight what makes your place special.
                </p>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Listing Title <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">
                    {formData.descriptionTitle.length}/60
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={60}
                  value={formData.descriptionTitle}
                  onChange={(e) => setFormData({ ...formData, descriptionTitle: e.target.value })}
                  placeholder="e.g. Sunny Studio in the Heart of Downtown"
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs"
                />
              </div>

              {/* Detailed Description with AI Assist */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Detailed Description <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAiAssist}
                    disabled={isAiGenerating}
                    className="flex items-center gap-1 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isAiGenerating ? 'animate-spin' : ''}`} />
                    <span>{isAiGenerating ? 'Synthesizing...' : '✨ AI Assist'}</span>
                  </button>
                </div>
                <div className="relative">
                  <textarea
                    rows={5}
                    value={formData.detailedDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, detailedDescription: e.target.value })
                    }
                    placeholder="Tell us about the space, the neighborhood, and any special features..."
                    className="w-full px-4 py-3 pb-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none shadow-2xs resize-none"
                  />
                  <span className="absolute bottom-2.5 right-3.5 text-[11px] font-medium text-slate-400">
                    {formData.detailedDescription.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
              </div>

              {/* Property Highlights */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    Property Highlights
                  </h3>
                  <p className="text-xs text-slate-500">Select up to 5 key features that stand out.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {DEFAULT_HIGHLIGHTS.map((item) => {
                    const isSelected = formData.highlights.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleHighlight(item)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 dark:bg-emerald-600 dark:border-emerald-500'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Highlight Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={customHighlightInput}
                    onChange={(e) => setCustomHighlightInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustomHighlight()}
                    placeholder="Add custom highlight..."
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomHighlight}
                    className="px-4 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-black hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-4 rounded-2xl bg-slate-950 dark:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-850 dark:hover:bg-emerald-500 shadow-lg cursor-pointer transition-all active:scale-98"
                >
                  <span>Continue to Pricing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Pricing & Terms */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Set your terms
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Establish competitive pricing and transparent terms to attract verified renters.
                </p>
              </div>

              {/* Pricing Card */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Monthly Rent
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 font-black text-slate-400">$</span>
                    <input
                      type="number"
                      value={formData.monthlyRent}
                      onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-base font-black focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Security Deposit
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 font-black text-slate-400">$</span>
                    <input
                      type="number"
                      value={formData.securityDeposit}
                      onChange={(e) =>
                        setFormData({ ...formData, securityDeposit: e.target.value })
                      }
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-base font-black focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <p className="text-[11px] font-medium text-slate-400">
                    Typically 1x monthly rent.
                  </p>
                </div>
              </div>

              {/* Terms Card */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Lease Duration
                  </label>
                  <select
                    value={formData.leaseDuration}
                    onChange={(e) => setFormData({ ...formData, leaseDuration: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                  >
                    <option value="12 Months (Standard)">12 Months (Standard)</option>
                    <option value="6 Months (Short-term)">6 Months (Short-term)</option>
                    <option value="Month-to-Month (Flexible)">Month-to-Month (Flexible)</option>
                    <option value="24 Months (Long-term)">24 Months (Long-term)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Available From
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      value={formData.availableFrom}
                      onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-4 rounded-2xl bg-slate-950 dark:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-850 dark:hover:bg-emerald-500 shadow-lg cursor-pointer transition-all active:scale-98"
                >
                  <span>Continue to Rules</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: House Rules */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  House Rules
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Set the boundaries for your property to ensure a smooth tenancy. These rules will be clearly displayed to potential renters.
                </p>
              </div>

              {/* Rule 1: Pets Allowed */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PawPrint className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        Pets Allowed
                      </div>
                      <div className="text-xs font-medium text-slate-500">
                        Permit cats, dogs, or other animals.
                      </div>
                    </div>
                  </div>
                  {/* Switch */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, petsAllowed: !formData.petsAllowed })}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                      formData.petsAllowed ? 'bg-slate-950 dark:bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        formData.petsAllowed ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {formData.petsAllowed && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                      Specific Pet Restrictions
                    </label>
                    <input
                      type="text"
                      value={formData.petRestrictions}
                      onChange={(e) => setFormData({ ...formData, petRestrictions: e.target.value })}
                      placeholder="e.g. Dogs under 40lbs only"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Rule 2: Smoking Allowed */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cigarette className="w-5 h-5 text-rose-500" />
                  <div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      Smoking Allowed
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      Permit smoking inside the property.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, smokingAllowed: !formData.smokingAllowed })
                  }
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                    formData.smokingAllowed ? 'bg-slate-950 dark:bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      formData.smokingAllowed ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Rule 3: Events & Parties */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-indigo-500" />
                  <div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      Events & Parties
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      Allow gatherings of 10+ people.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, eventsAllowed: !formData.eventsAllowed })
                  }
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                    formData.eventsAllowed ? 'bg-slate-950 dark:bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      formData.eventsAllowed ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Rule 4: Custom Rules */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    Custom Rules
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Add any specific rules unique to your property (e.g., quiet hours, trash day protocols).
                </p>
                <textarea
                  rows={3}
                  value={formData.customRules}
                  onChange={(e) => setFormData({ ...formData, customRules: e.target.value })}
                  placeholder="Enter custom rules here..."
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-4 rounded-2xl bg-slate-950 dark:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-850 dark:hover:bg-emerald-500 shadow-lg cursor-pointer transition-all active:scale-98"
                >
                  <span>Continue to Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 7: Ownership Verification */}
          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Ownership Verification
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  To maintain trust, we need to verify you own this property.
                </p>
              </div>

              {/* Deed Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Property Deed / Title
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload a clear photo or PDF
                  </p>
                </div>
                {formData.deedUploaded ? (
                  <div className="w-full p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200 truncate">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{formData.deedFileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deedUploaded: false })}
                      className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        deedUploaded: true,
                        deedFileName: 'Horizon_Deed_Seattle_Title2026.pdf',
                      })
                    }
                    className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md cursor-pointer transition-all active:scale-98"
                  >
                    Choose File
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  OR
                </span>
                <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              </div>

              {/* Utility Bill Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Receipt className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Utility Bill
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Must show your name and property address
                  </p>
                </div>
                {formData.utilityUploaded ? (
                  <div className="w-full p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-200 truncate">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{formData.utilityFileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, utilityUploaded: false })}
                      className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        utilityUploaded: true,
                        utilityFileName: 'Seattle_City_Light_July2026.pdf',
                      })
                    }
                    className="w-full py-3 rounded-2xl bg-blue-100 dark:bg-blue-900/60 hover:bg-blue-200 text-blue-800 dark:text-blue-200 font-bold text-xs shadow-xs cursor-pointer transition-all active:scale-98"
                  >
                    Choose File
                  </button>
                )}
              </div>

              {/* Encryption Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Your documents are encrypted and only used for verification purposes. They will never be shared with renters.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-4 rounded-2xl bg-slate-950 dark:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-850 dark:hover:bg-emerald-500 shadow-lg cursor-pointer transition-all active:scale-98"
                >
                  <span>Review Listing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 8: Final Review */}
          {currentStep === 8 && (
            <motion.div
              key="step-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Confetti / Popper Icon Header */}
              <div className="flex flex-col items-center text-center pt-2 space-y-2">
                <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white shadow-xs">
                  <PartyPopper className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Almost There!
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed mt-1">
                    Review your property details before publishing. Make sure everything looks perfect.
                  </p>
                </div>
              </div>

              {/* Review Card 1: Basics */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Basics
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={formData.coverPhoto}
                    alt="Property Thumbnail"
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-100 dark:border-slate-800"
                  />
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                      {formData.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      Entire {formData.propertyType} • {formData.bedrooms} Beds • {formData.bathrooms} Bath
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Card 2: Rent & Deposit */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Rent & Deposit
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left">
                  <div>
                    <span className="text-[11px] font-medium text-slate-500">Monthly Rent</span>
                    <p className="text-base font-black text-slate-900 dark:text-white">
                      ${Number(formData.monthlyRent).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-500">Security Deposit</span>
                    <p className="text-base font-black text-slate-900 dark:text-white">
                      ${Number(formData.securityDeposit).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Card 3: Location */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Location
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {formData.address}, {formData.city}, WA {formData.zipCode}
                  </p>
                </div>
              </div>

              {/* Review Card 4: Amenities */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Amenities
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {formData.coreAmenities.laundry && (
                    <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      In-unit W/D
                    </span>
                  )}
                  {formData.coreAmenities.ac && (
                    <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Central Air
                    </span>
                  )}
                  {formData.coreAmenities.parking && (
                    <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Parking
                    </span>
                  )}
                  {formData.petsAllowed && (
                    <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      Pet Friendly
                    </span>
                  )}
                </div>
              </div>

              {/* Review Card 5: Rules */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Rules
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(6)}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Cigarette className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {formData.smokingAllowed ? 'Smoking Permitted' : 'No Smoking'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  type="button"
                  onClick={handlePublish}
                  className="w-full py-4 rounded-2xl bg-slate-950 dark:bg-emerald-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-850 dark:hover:bg-emerald-500 shadow-xl cursor-pointer transition-all active:scale-98"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Publish Property</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Landlord Bottom Nav matching reference screenshots */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2.5 px-2">
          <button
            type="button"
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${
              activeBottomNav === 'dashboard'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveBottomNav('properties')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${
              activeBottomNav === 'properties'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span>Properties</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${
              activeBottomNav === 'requests'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Requests</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${
              activeBottomNav === 'messages'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('landlord-profile')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${
              activeBottomNav === 'menu'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Celebration Modal on Successful Publish */}
      <AnimatePresence>
        {(isPublishedModalOpen || isSubmitting) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 text-center space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 z-10"
            >
              {isSubmitting ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 mx-auto flex items-center justify-center animate-spin">
                    <Loader className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      Creating Property...
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Uploading images to Cloudinary and saving to database...
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      Property Created! ✨
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Your property <strong className="text-slate-800 dark:text-slate-200">{formData.title}</strong> has been successfully listed on RentalTrust.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left text-xs space-y-1.5 border border-slate-200/60 dark:border-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Monthly Rent</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ${Number(formData.monthlyRent).toLocaleString()} / mo
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Bedrooms</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {formData.bedrooms}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Location</span>
                      <span className="font-bold text-emerald-600">{formData.city}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPublishedModalOpen(false);
                        setCurrentScreen('dashboard');
                      }}
                      className="w-full py-3.5 rounded-2xl bg-slate-950 dark:bg-emerald-600 text-white font-bold text-xs hover:bg-slate-850 dark:hover:bg-emerald-500 transition-colors cursor-pointer"
                    >
                      View in Landlord Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPublishedModalOpen(false);
                        setCurrentScreen('guest-home');
                      }}
                      className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Browse Marketplace
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error Alert */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-4 right-4 z-40 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-red-900 dark:text-red-200">{submitError}</p>
          </div>
          <button
            onClick={() => setSubmitError(null)}
            className="text-red-600 hover:text-red-700 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
