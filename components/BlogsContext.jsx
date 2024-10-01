// "use client"
// import { createContext, useState, useContext, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// const BlogContext = createContext();

// export const useBlogContext = () => useContext(BlogContext);

// export const BlogProvider = ({ children }) => {
//   const { data: session } = useSession();
//   const [blogs, setBlogs] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [savedBlogIds, setSavedBlogIds] = useState([]);
//   const [savedBlogs, setSavedBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const addSavedBlog = (id) => {
//     const blog = blogs.find((blog) => blog._id === id);
//     if (blog) {
//       setSavedBlogs((prev) => [...prev, blog]);
//       setBlogs((prevBlogs) => prevBlogs.map((blog) => blog._id === id ? {...blog, savedStatus: true} : blog));
//     }
//   }

//   const removeSavedBlog = (id) => {
//     setSavedBlogs((prev) => prev.filter((blog) => blog._id !== id));
//     setBlogs((prevBlogs) => prevBlogs.map((blog) => blog._id === id ? {...blog, savedStatus: false} : blog));
//   }

//   const getUser = async () => {
//     try {
//       const response = await fetch('/api/auth/user', {
//         method: 'GET', 
//         headers: { 
//           'Content-Type': 'application/json',
//           'email': session?.user?.email,
//           'name': session?.user?.name,
//         },
//       });
//       const data = await response.json();
//       setUserId(data.userId);
//       setSavedBlogIds(data.savedBlogs || []);
//     } catch (e) {
//       console.error('Error getting user details:', e);
//     }
//   };

//   const getBlogs = async () => {
//     try {
//       const response = await fetch('/api/blog');
//       const data = await response.json();
//       const temp = data.map((blog) => ({
//         ...blog,
//         savedStatus: savedBlogIds.includes(blog._id),
//       }));
//       setBlogs(temp);
//       setSavedBlogs(temp.map((blog) => savedBlogIds.includes(blog._id)));

//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     await Promise.all([getUser(), getBlogs()]);
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (blogs && savedBlogIds) {
//       setSavedBlogs(blogs.filter((b) => b.savedStatus === true));
//     }
//   }, [savedBlogIds, blogs])

//   useEffect(() => {
//     if (session && session.user) {
//       fetchData();
//     }
//   }, [session]);

//   return (
//     <BlogContext.Provider value={{ blogs, setBlogs, userId, loading, savedBlogs, savedBlogs, addSavedBlog, removeSavedBlog }}>
//       {children}
//     </BlogContext.Provider>
//   );
// };

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
      // console.log("all blogs test :", data);
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