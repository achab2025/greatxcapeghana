
import { useState, useEffect } from 'react';

// Base URL for your WordPress site - replace with your actual WordPress URL
const WP_API_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';

/**
 * Function to fetch posts from WordPress
 * @param page Page number
 * @param perPage Posts per page
 * @returns Posts, total pages and total posts
 */
export const fetchPosts = async (page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `${WP_API_URL}/posts?page=${page}&per_page=${perPage}&_embed`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts = await response.json();
    return {
      posts,
      totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '1', 10),
      total: parseInt(response.headers.get('X-WP-Total') || '0', 10)
    };
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    throw error;
  }
};

/**
 * Function to fetch a single post by ID
 * @param id Post ID
 * @returns Post data
 */
export const fetchPost = async (id: number) => {
  try {
    const response = await fetch(`${WP_API_URL}/posts/${id}?_embed`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching WordPress post ${id}:`, error);
    throw error;
  }
};

/**
 * Function to fetch posts by category
 * @param categoryId Category ID
 * @param page Page number
 * @param perPage Posts per page
 * @returns Posts, total pages and total posts
 */
export const fetchPostsByCategory = async (categoryId: number, page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `${WP_API_URL}/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts by category: ${response.status}`);
    }
    
    const posts = await response.json();
    return {
      posts,
      totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '1', 10),
      total: parseInt(response.headers.get('X-WP-Total') || '0', 10)
    };
  } catch (error) {
    console.error(`Error fetching posts by category ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Function to fetch WordPress categories
 * @returns Categories list
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${WP_API_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    throw error;
  }
};

/**
 * Custom hook for fetching WordPress posts
 * @param page Page number
 * @param perPage Posts per page
 * @returns Posts, loading state, error and pagination
 */
export const useWordPressPosts = (page = 1, perPage = 10) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await fetchPosts(page, perPage);
        setPosts(result.posts);
        setPagination({
          total: result.total,
          totalPages: result.totalPages
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    getPosts();
  }, [page, perPage]);

  return { posts, isLoading, error, pagination };
};

/**
 * Custom hook for fetching a single WordPress post
 * @param id Post ID
 * @returns Post, loading state and error
 */
export const useWordPressPost = (id: number) => {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await fetchPost(id);
        setPost(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      getPost();
    }
  }, [id]);

  return { post, isLoading, error };
};

/**
 * Custom hook for fetching WordPress categories
 * @returns Categories, loading state and error
 */
export const useWordPressCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await fetchCategories();
        setCategories(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    getCategories();
  }, []);

  return { categories, isLoading, error };
};
