import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import Button from "../components/Button";
import useAds from "../hooks/useAds";

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Ads() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter states
  const [filters, setFilters] = useState({
    sectors: [],
    propertyTypes: [],
    ownerListed: undefined,
    priceMin: null,
    priceMax: null,
    sizeMin: null,
    sizeMax: null,
    roadType: '',
    tags: [],
    sortBy: 'relevance'
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { ads, loading, error, total, hasMore } = useAds(filters, debouncedSearchQuery, currentPage, 12);

  // Available filter options
  const sectorOptions = ["Sector 1", "Sector 7", "Sector 21", "Sector 34", "Sector 47", "IT City", "Zirakpur"];
  const propertyTypeOptions = ["plot", "kothi", "flat", "land"];
  const roadTypeOptions = ["B-Road", "Main Road", "Internal Road"];
  const tagOptions = ["Ready to Move In", "Prime Location", "Park Facing", "Corner Property", "Near Market", "Near School"];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleMultiSelectChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      sectors: [],
      propertyTypes: [],
      ownerListed: undefined,
      priceMin: null,
      priceMax: null,
      sizeMin: null,
      sizeMax: null,
      roadType: '',
      tags: [],
      sortBy: 'relevance'
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.sectors.length > 0) count++;
    if (filters.propertyTypes.length > 0) count++;
    if (filters.ownerListed !== undefined) count++;
    if (filters.priceMin !== null || filters.priceMax !== null) count++;
    if (filters.sizeMin !== null || filters.sizeMax !== null) count++;
    if (filters.roadType) count++;
    if (filters.tags.length > 0) count++;
    return count;
  }, [filters]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl sm:text-4xl">❌</span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Error Loading Properties</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">All Properties</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Explore our complete collection of premium properties
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search properties by title, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              icon={<Filter className="w-4 h-4" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              {showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
            
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sector Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {sectorOptions.map(sector => (
                      <label key={sector} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.sectors.includes(sector)}
                          onChange={() => handleMultiSelectChange('sectors', sector)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Property Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <div className="space-y-2">
                    {propertyTypeOptions.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.propertyTypes.includes(type)}
                          onChange={() => handleMultiSelectChange('propertyTypes', type)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Owner Listed Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.ownerListed === true}
                      onChange={(e) => handleFilterChange('ownerListed', e.target.checked ? true : undefined)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Owner Listed Only</span>
                  </label>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin || ''}
                      onChange={(e) => handleFilterChange('priceMin', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax || ''}
                      onChange={(e) => handleFilterChange('priceMax', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Size Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size (Marla/Units)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.sizeMin || ''}
                      onChange={(e) => handleFilterChange('sizeMin', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.sizeMax || ''}
                      onChange={(e) => handleFilterChange('sizeMax', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>

              {/* Tags Filter */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Property Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleMultiSelectChange('tags', tag)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        filters.tags.includes(tag)
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${total} ${total === 1 ? 'property' : 'properties'} found`}
          </p>
          {debouncedSearchQuery && (
            <p className="text-sm text-gray-500">
              Search results for "{debouncedSearchQuery}"
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && currentPage === 1 && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && ads.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {ads.map((ad) => (
                <PropertyCard
                  key={ad.id}
                  ad={ad}
                  onClick={() => navigate(`/ads/${ad.id}`)}
                  showFullDetails={true}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {hasMore && (
              <div className="text-center mt-8 sm:mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Properties'}
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="text-center mt-8 p-6 bg-white rounded-2xl shadow-sm">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-blue-600">{ads.length}</span> of{' '}
                <span className="font-semibold text-blue-600">{total}</span> {total === 1 ? 'property' : 'properties'}
              </p>
            </div>
          </>
        )}

        {/* No Results */}
        {!loading && ads.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl sm:text-6xl">🏠</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
              {debouncedSearchQuery || activeFiltersCount > 0 ? 'No Properties Found' : 'No Properties Available'}
            </h3>
            <p className="text-gray-500 text-base sm:text-lg mb-8">
              {debouncedSearchQuery || activeFiltersCount > 0 
                ? 'Try adjusting your search or filters to find more properties.'
                : 'We\'re currently updating our listings. Please check back soon!'
              }
            </p>
            {(debouncedSearchQuery || activeFiltersCount > 0) && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Search & Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}