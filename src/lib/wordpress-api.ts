
import { useState, useEffect } from 'react';

// Base URL for your WordPress site
const WP_API_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';

// Function to fetch posts from WordPress
export const fetchPosts = async (page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `${WP_API_URL}/posts?page=${page}&per_page=${perPage}&_embed`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
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

// Function to fetch a single post
export const fetchPost = async (id: number) => {
  try {
    const response = await fetch(`${WP_API_URL}/posts/${id}?_embed`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching WordPress post ${id}:`, error);
    throw error;
  }
};

// Custom hook for fetching WordPress posts
export const useWordPressPosts = (page = 1, perPage = 10) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

// Custom hook for fetching a single WordPress post
export const useWordPressPost = (id: number) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
