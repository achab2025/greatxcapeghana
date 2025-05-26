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
 * Function to fetch houses from WordPress (assuming houses are a custom post type)
 * @param page Page number
 * @param perPage Houses per page
 * @returns Houses, total pages and total posts
 */
export const fetchWordPressHouses = async (page = 1, perPage = 10) => {
  try {
    // Assuming houses are stored as a custom post type 'houses'
    const response = await fetch(
      `${WP_API_URL}/houses?page=${page}&per_page=${perPage}&_embed`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch houses: ${response.status}`);
    }
    
    const houses = await response.json();
    return {
      houses: houses.map((house: any) => ({
        id: house.id.toString(),
        name: house.title.rendered,
        description: house.content.rendered.replace(/<[^>]*>/g, ''), // Strip HTML
        maxOccupancy: house.acf?.max_occupancy || 4, // Assuming ACF fields
        pricePerNight: house.acf?.price_per_night || 100,
        amenities: house.acf?.amenities ? house.acf.amenities.split(',') : [],
        status: house.acf?.status || 'available',
        imageUrl: house._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'
      })),
      totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '1', 10),
      total: parseInt(response.headers.get('X-WP-Total') || '0', 10)
    };
  } catch (error) {
    console.error('Error fetching WordPress houses:', error);
    throw error;
  }
};

/**
 * Function to send booking data to WordPress
 * @param bookingData Booking information
 * @returns Response from WordPress
 */
export const sendBookingToWordPress = async (bookingData: any) => {
  try {
    const response = await fetch(`${WP_API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers if required
      },
      body: JSON.stringify({
        title: `Booking - ${bookingData.guestName}`,
        content: `Booking for ${bookingData.houseName} from ${bookingData.checkInDate} to ${bookingData.checkOutDate}`,
        status: 'publish',
        acf: {
          guest_name: bookingData.guestName,
          guest_email: bookingData.guestInfo?.email,
          guest_phone: bookingData.guestInfo?.phone,
          house_id: bookingData.houseId,
          house_name: bookingData.houseName,
          check_in_date: bookingData.checkInDate,
          check_out_date: bookingData.checkOutDate,
          total_amount: bookingData.totalAmount,
          booking_status: bookingData.bookingStatus,
          payment_status: bookingData.paymentStatus,
          extra_services: JSON.stringify(bookingData.extraServices || [])
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create booking: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending booking to WordPress:', error);
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

/**
 * Custom hook for fetching WordPress houses
 * @param page Page number
 * @param perPage Houses per page
 * @returns Houses, loading state, error and pagination
 */
export const useWordPressHouses = (page = 1, perPage = 10) => {
  const [houses, setHouses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  useEffect(() => {
    const getHouses = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await fetchWordPressHouses(page, perPage);
        setHouses(result.houses);
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
    
    getHouses();
  }, [page, perPage]);

  return { houses, isLoading, error, pagination };
};
