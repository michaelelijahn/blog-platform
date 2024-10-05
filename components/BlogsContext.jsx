"use client"
import { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { setRef } from '@mui/material';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const updateBlogSavedStatus = (id, savedStatus) => {
    setBlogs(prevBlogs => 
      prevBlogs.map(blog => 
        blog._id === id ? { ...blog, savedStatus } : blog
      )
    );
  };

  const getBlogs = async () => {
    try {
      // console.log("trying to get blogs");
      const response = await fetch('/api/blog', {
        method: 'GET', 
        headers: { 
          'Content-Type': 'application/json',
          'email': session?.user?.email,
          'name': session?.user?.name,
        },
      });
      const data = await response.json();
      console.log("all blogs :", data);
      setBlogs(data.blogs);
      setUserId(data.userId || null);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await getBlogs(); // Fetch blogs first
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    if (refetch) {
      setRefetch(false);
    }
    // console.log("session : ", session);
  }, [session, refetch]);

  return (
    <BlogContext.Provider value={{ 
      blogs, 
      setBlogs, 
      userId, 
      loading, 
      updateBlogSavedStatus,
      refetchData: fetchData,
      setRefetch
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;