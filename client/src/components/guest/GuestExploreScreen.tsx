import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  Crosshair,
  Layers,
  Heart,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Sparkles,
  Plus,
  Minus,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PropertyListing } from '../../types';

export const GuestExploreScreen: React.FC = () => {
  const {
    openPropertyDetail,
    savedPropertyIds,
    toggleSaveProperty,
    searchFilterText,
    setSearchFilterText,
    setIsFilterModalOpen,
    properties,
  } = useAuth();

  const [activeFilterChip, setActiveFilterChip] = useState<'price' | 'houseType' | 'bedsBaths' | 'amenities'>('price');
  const [selectedMapPropId, setSelectedMapPropId] = useState<string>('prop-skyline-vista');
  const [mapLayer, setMapLayer] = useState<'standard' | 'satellite' | 'dark'>('standard');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [gpsCentered, setGpsCentered] = useState<boolean>(false);

  const filterChips = [
    { id: 'price', label: 'Price' },
    { id: 'houseType', label: 'House Type' },
    { id: 'bedsBaths', label: 'Beds/Baths' },
    { id: 'amenities', label: 'Amenities' },
  ];

  const filteredProperties = properties.filter((prop) => {
    if (!searchFilterText) return true;
    return (
      prop.title.toLowerCase().includes(searchFilterText.toLowerCase()) ||
      prop.neighborhood.toLowerCase().includes(searchFilterText.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchFilterText.toLowerCase())
    );
  });

  const activeProperty =
    properties.find((p) => p.id === selectedMapPropId) || properties[1] || properties[0];

  const handleGpsCenter = () => {
    setGpsCentered(true);
    setSelectedMapPropId('prop-skyline-vista');
    setTimeout(() => setGpsCentered(false), 2000);
  };

  const toggleLayer = () => {
    setMapLayer((prev) => (prev === 'standard' ? 'satellite' : prev === 'satellite' ? 'dark' : 'standard'));
  };

  return (
    <div id="guest-explore-screen" className="w-full space-y-3 pb-2">
      {/* Neighborhood Search Bar matching Image 1 */}
      <div className="relative">
        <div className="flex items-center bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-700/90 rounded-full shadow-xs hover:shadow-md transition-shadow px-4 py-2.5">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-2.5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search neighborhood..."
            value={searchFilterText}
            onChange={(e) => setSearchFilterText(e.target.value)}
            className="w-full bg-transparent text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors ml-1"
            aria-label="Filter settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Chips matching Image 1 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filterChips.map((chip) => {
          const isActive = activeFilterChip === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              id={`filter-chip-${chip.id}`}
              onClick={() => {
                setActiveFilterChip(chip.id as any);
                setIsFilterModalOpen(true);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                isActive
                  ? 'bg-[#0e1628] text-white dark:bg-white dark:text-slate-950 ring-2 ring-teal-500/30'
                  : 'bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Interactive Map View with Floating Price Pins & Controls matching Image 1 */}
      <div className="relative w-full h-[360px] sm:h-[400px] rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-inner bg-[#e5e9ec] dark:bg-[#1a2332]">
        {/* Custom Stylized Vector Map Surface */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            mapLayer === 'satellite'
              ? 'bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] bg-slate-900 opacity-90'
              : mapLayer === 'dark'
              ? 'bg-[#0f172a]'
              : 'bg-[#e8ecef] dark:bg-[#1e293b]'
          }`}
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {/* Stylized River / Water Body */}
          <svg className="w-full h-full opacity-40 dark:opacity-30 absolute inset-0 pointer-events-none">
            <path
              d="M -20,180 Q 80,120 180,210 T 400,160 T 600,220"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="48"
              strokeLinecap="round"
            />
            {/* Roads */}
            <path
              d="M 50,-20 L 50,450 M 150,-20 L 150,450 M 260,-20 L 260,450 M 340,-20 L 340,450"
              stroke="#cbd5e1"
              strokeWidth="4"
            />
            <path
              d="M -20,80 L 450,80 M -20,160 L 450,160 M -20,260 L 450,260 M -20,330 L 450,330"
              stroke="#cbd5e1"
              strokeWidth="4"
            />
            {/* Green Parks */}
            <rect x="200" y="40" width="70" height="90" rx="12" fill="#86efac" opacity="0.6" />
            <rect x="40" y="280" width="90" height="60" rx="10" fill="#86efac" opacity="0.6" />
          </svg>
        </div>

        {/* GPS Pulse Indicator when centered */}
        {gpsCentered && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <div className="w-16 h-16 rounded-full bg-teal-500/20 animate-ping" />
            <div className="w-4 h-4 rounded-full bg-teal-500 border-2 border-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg" />
          </div>
        )}

        {/* Floating Price Pins matching Image 1 */}
        {properties.map((prop) => {
          const isSelected = selectedMapPropId === prop.id;

          return (
            <motion.div
              key={prop.id}
              style={{
                top: `${prop.coordinates.mapY}%`,
                left: `${prop.coordinates.mapX}%`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMapPropId(prop.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            >
              <div className="flex flex-col items-center">
                {/* Price Pill Marker */}
                <div
                  className={`px-3 py-1 rounded-full text-xs font-black shadow-lg transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#0e1628] text-white ring-2 ring-teal-400 scale-110 shadow-xl'
                      : 'bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white hover:bg-slate-100 border border-slate-300/80 dark:border-slate-700'
                  }`}
                >
                  <span>{prop.priceTag}</span>
                </div>
                {/* Pin Stem */}
                <div
                  className={`w-0.5 h-2 ${
                    isSelected ? 'bg-[#0e1628] dark:bg-teal-400 h-3' : 'bg-slate-400'
                  }`}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Floating Map Tools on Right matching Image 1 */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* GPS Center button */}
          <button
            type="button"
            id="map-gps-btn"
            onClick={handleGpsCenter}
            className="w-10 h-10 rounded-2xl bg-white/95 dark:bg-slate-850/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-md flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
            aria-label="Center on my location"
          >
            <Crosshair className="w-5 h-5 text-slate-800 dark:text-slate-100" />
          </button>

          {/* Map Layer Switcher */}
          <button
            type="button"
            id="map-layer-btn"
            onClick={toggleLayer}
            className="w-10 h-10 rounded-2xl bg-white/95 dark:bg-slate-850/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-md flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
            aria-label="Change map view"
          >
            <Layers className="w-5 h-5 text-slate-800 dark:text-slate-100" />
          </button>

          {/* Zoom In/Out */}
          <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-850/95 shadow-md">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
              className="p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              className="p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Property Snap Carousel Overlay matching Image 1 */}
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar snap-x snap-mandatory">
            {filteredProperties.map((prop) => {
              const isSaved = savedPropertyIds.includes(prop.id);
              const isCurrentSelection = selectedMapPropId === prop.id;

              return (
                <div
                  key={prop.id}
                  onClick={() => openPropertyDetail(prop)}
                  className={`snap-center flex-shrink-0 w-[84%] sm:w-[320px] rounded-2xl bg-white dark:bg-slate-850 border p-3 shadow-xl cursor-pointer transition-all hover:scale-[1.02] ${
                    isCurrentSelection
                      ? 'border-teal-500 ring-2 ring-teal-500/20'
                      : 'border-slate-200/80 dark:border-slate-700/80'
                  }`}
                >
                  {/* Photo with Badge & Heart */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2.5">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />

                    {/* Tag badge */}
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-wider">
                      {prop.type === 'sale' ? 'FOR SALE' : 'FOR RENT'}
                    </span>

                    {/* Heart button */}
                    <button
                      type="button"
                      onClick={(e) => toggleSaveProperty(prop.id, e)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs flex items-center justify-center text-slate-800 dark:text-white"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isSaved ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title & Price matching Image 1 */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                        {prop.shortTitle || prop.title}
                      </h4>
                      <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-white flex-shrink-0">
                        {prop.price}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span>{prop.location}</span>
                    </p>

                    {/* Specs chips matching Image 1 */}
                    <div className="flex items-center gap-3 pt-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3 text-slate-400" />
                        <span>{prop.beds}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3 h-3 text-slate-400" />
                        <span>{prop.baths}</span>
                      </span>
                      {prop.sqft && (
                        <span className="flex items-center gap-1">
                          <Maximize2 className="w-3 h-3 text-slate-400" />
                          <span>{prop.sqft.toLocaleString()} sqft</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
