"use client"
import { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const { data : session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [savedBlogIds, setSavedBlogIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState(false); // Track edits

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
      setSavedBlogIds(data.savedBlogs || []);
    } catch (e) {
      console.error('Error getting user details:', e);
    }
  };

  const getBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

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
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial load or when `session` or `edited` changes
  }, [session, edited]);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, userId, savedBlogIds, loading, setEdited, fetchData }}>
      {children}
    </BlogContext.Provider>
  );
};
