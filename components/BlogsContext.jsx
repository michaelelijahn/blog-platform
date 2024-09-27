"use client"
import { createContext, useState, useContext, useEffect } from 'react';
import { CREATOR_SECRET } from '@/app/utils/utils'
import { useSession } from 'next-auth/react';
import { get } from 'mongoose';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [edited, setEdited] = useState(false);
  const { data : session } = useSession();
  const [isCreator, setIsCreator] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [savedBlogIds, setSavedBlogIds] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      const response = await fetch('/api/auth/user', {
        method: 'GET', 
        headers: { 
          'Content-Type': 'application/json',
          'email': session?.user?.email,
          'name': session?.user?.name,
        },
      });

      const data = await response.json();
      setUserId(data.userId);
      setSavedBlogIds(data.savedBlogs);
    } catch (e) {
      console.error('Error getting user details:', e);
    }
  }

  const getBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      console.log("blogs data : ", blogs);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getUser();
        await getBlogs();

      } catch (e) {
        console.log("error : ", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [session, edited])

  useEffect(() => {
    if (session?.user?.email === CREATOR_SECRET) {
      setIsCreator(true);
    }
  }, [session]);

  return (
    <BlogContext.Provider value={{ edited, setEdited, isCreator, blogs, userId, savedBlogIds, loading }}>
      {children}
    </BlogContext.Provider>
  );
};