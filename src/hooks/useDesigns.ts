'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface DesignFromAPI {
  id: number;
  title: string;
  description: string;
  country: string;
  style: string;
  occasion: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  image_url: string;
  thumbnail_url: string;
  tags: string[];
  pixabay_id: number | null;
  views: number;
  likes: number;
  photographer: string | null;
  source: string;
  created_at: string;
}

// Adapt API design to match existing Design interface used by components
export interface Design {
  id: number;
  title: string;
  description: string;
  country: string;
  style: string;
  occasion: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  imageUrl: string;
  tags: string[];
  views?: number;
  likes?: number;
  photographer?: string | null;
}

function adaptDesign(d: DesignFromAPI): Design {
  return {
    id: d.id,
    title: d.title,
    description: d.description,
    country: d.country,
    style: d.style,
    occasion: d.occasion,
    difficulty: d.difficulty,
    imageUrl: d.image_url,
    tags: d.tags,
    views: d.views,
    likes: d.likes,
    photographer: d.photographer,
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

interface UseDesignsOptions {
  country?: string;
  style?: string;
  difficulty?: string;
  search?: string;
  limit?: number;
}

export function useDesigns(options: UseDesignsOptions = {}) {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef(1);

  const buildUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(options.limit || 24));
      if (options.country && options.country !== 'All') params.set('country', options.country);
      if (options.style && options.style !== 'All') params.set('style', options.style);
      if (options.difficulty && options.difficulty !== 'All') params.set('difficulty', options.difficulty);
      if (options.search) params.set('search', options.search);
      return `/api/designs?${params.toString()}`;
    },
    [options.country, options.style, options.difficulty, options.search, options.limit]
  );

  // Fetch initial designs
  const fetchDesigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    pageRef.current = 1;

    try {
      const res = await fetch(buildUrl(1));
      if (!res.ok) throw new Error(`Failed to fetch designs: ${res.status}`);
      const data = await res.json();
      setDesigns((data.designs || []).map(adaptDesign));
      setPagination(data.pagination);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load designs';
      setError(message);
      setDesigns([]);
    } finally {
      setLoading(false);
    }
  }, [buildUrl]);

  // Load more (infinite scroll)
  const loadMore = useCallback(async () => {
    if (!pagination?.hasMore || loadingMore) return;
    setLoadingMore(true);

    const nextPage = pageRef.current + 1;
    try {
      const res = await fetch(buildUrl(nextPage));
      if (!res.ok) throw new Error('Failed to load more');
      const data = await res.json();
      pageRef.current = nextPage;
      setDesigns((prev) => [...prev, ...(data.designs || []).map(adaptDesign)]);
      setPagination(data.pagination);
    } catch {
      // silently fail for load more
    } finally {
      setLoadingMore(false);
    }
  }, [buildUrl, pagination, loadingMore]);

  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  return {
    designs,
    loading,
    loadingMore,
    error,
    pagination,
    loadMore,
    refetch: fetchDesigns,
  };
}
