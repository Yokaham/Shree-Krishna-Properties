import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

const useAds = (filters = {}, searchQuery = '', page = 1, pageSize = 12) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchAds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('ads').select('*', { count: 'exact' });

      // Search functionality
      if (searchQuery.trim()) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }

      // Filters
      if (filters.sectors && filters.sectors.length > 0) {
        query = query.in('sector', filters.sectors);
      }

      if (filters.propertyTypes && filters.propertyTypes.length > 0) {
        query = query.in('property_type', filters.propertyTypes);
      }

      if (filters.ownerListed !== undefined) {
        query = query.eq('owner_listed', filters.ownerListed);
      }

      if (filters.priceMin !== undefined && filters.priceMin !== null) {
        query = query.gte('price', filters.priceMin);
      }

      if (filters.priceMax !== undefined && filters.priceMax !== null) {
        query = query.lte('price', filters.priceMax);
      }

      if (filters.sizeMin !== undefined && filters.sizeMin !== null) {
        query = query.gte('size', filters.sizeMin);
      }

      if (filters.sizeMax !== undefined && filters.sizeMax !== null) {
        query = query.lte('size', filters.sizeMax);
      }

      if (filters.roadType) {
        query = query.contains('features', [filters.roadType]);
      }

      if (filters.tags && filters.tags.length > 0) {
        // Check if any of the selected tags exist in the features array
        const tagConditions = filters.tags.map(tag => `features.cs.{${tag}}`).join(',');
        query = query.or(tagConditions);
      }

      // Sorting
      switch (filters.sortBy) {
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        default:
          // Default: prioritize owner-listed, then newest
          query = query.order('owner_listed', { ascending: false }).order('created_at', { ascending: false });
      }

      // Pagination
      const offset = (page - 1) * pageSize;
      query = query.range(offset, offset + pageSize - 1);

      const { data, error, count } = await query;

      if (error) {
        setError(error.message);
        setAds([]);
      } else {
        setAds(data || []);
        setTotal(count || 0);
        setHasMore((count || 0) > offset + pageSize);
      }
    } catch (err) {
      setError('Failed to fetch properties');
      setAds([]);
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery, page, pageSize]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  return {
    ads,
    loading,
    error,
    total,
    hasMore,
    refetch: fetchAds
  };
};

export default useAds;