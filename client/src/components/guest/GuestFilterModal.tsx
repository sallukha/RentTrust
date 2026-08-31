import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, SlidersHorizontal, Check, Sparkles, DollarSign, Home, Bed, Wifi, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const GuestFilterModal: React.FC = () => {
  const { isFilterModalOpen, setIsFilterModalOpen, selectedCategory, setSelectedCategory } = useAuth();

  const [priceMax, setPriceMax] = useState<number>(5000);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [bedsCount, setBedsCount] = useState<string>('Any');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['wifi', 'parking']);

  const propertyTypes = ['All', 'Modern Lofts', 'Family Homes', 'Studios', 'Unique', 'Castles', 'Cabins'];
  const bedOptions = ['Any', '1', '2', '3', '4+'];
  const amenityOptions = [
    { id: 'wifi', label: 'Fiber WiFi' },
    { id: 'parking', label: 'Free Parking' },
    { id: 'ac', label: 'Central Air' },
    { id: 'kitchen', label: "Chef's Kitchen" },
    { id: 'hottub', label: 'Private Hot Tub' },
    { id: 'pool', label: 'Pool / Waterfront' },
  ];

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    if (selectedType !== 'All') {
      setSelectedCategory(selectedType);
    }
    setIsFilterModalOpen(false);
  };

  const handleReset = () => {
    setPriceMax(5000);
    setSelectedType('All');
    setBedsCount('Any');
    setSelectedAmenities([]);
    setSelectedCategory('All');
  };

  if (!isFilterModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsFilterModalOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Filters & Criteria</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-6">
            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Price Limit (Up to)
                </label>
                <span className="text-sm font-black text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full">
                  ${priceMax.toLocaleString()} {priceMax > 2000 ? '/month' : '/night'}
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={15000}
                step={100}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹2,000</span>
                <span>₹50,000</span>
                <span>₹1,50,000+</span>
              </div>
            </div>

            {/* Property Types */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Property / House Type
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedType === type
                        ? 'bg-slate-900 dark:bg-teal-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Bedrooms
              </label>
              <div className="grid grid-cols-5 gap-2">
                {bedOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBedsCount(opt)}
                    className={`py-2 rounded-xl text-xs font-bold text-center transition-all ${
                      bedsCount === opt
                        ? 'bg-teal-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Trust filter */}
            <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">RentalTrust Verified Only</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Pre-screened landlords & background verified properties</p>
                </div>
              </div>
              <span className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Popular Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {amenityOptions.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity.id);
                  return (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{amenity.label}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="py-3 px-4 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-3 px-5 rounded-xl bg-slate-950 dark:bg-teal-600 hover:bg-slate-850 dark:hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Show Available Properties</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
