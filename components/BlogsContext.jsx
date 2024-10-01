"use client"

import { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateBlogSavedStatus = (id, savedStatus) => {
    setBlogs(prevBlogs => 
      prevBlogs.map(blog => 
        blog._id === id ? { ...blog, savedStatus } : blog
      )
    );
  };

  const getBlogs = async () => {
    try {
      const response = await fetch('/api/blog', {
        method: 'GET', 
        headers: { 
          'Content-Type': 'application/json',
          'email': session?.user?.email,
          'name': session?.user?.name,
        },
      });
      const data = await response.json();
      console.log("all blogs :", data)
      setBlogs(data.blogs);
      setUserId(data.userId);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    if (session && session.user) {
      await getBlogs(); // Fetch blogs first
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  return (
    <BlogContext.Provider value={{ 
      blogs, 
      setBlogs, 
      userId, 
      loading, 
      updateBlogSavedStatus,
      refetchData: fetchData
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;