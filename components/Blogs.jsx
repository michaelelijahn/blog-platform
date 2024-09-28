"use client"
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import Loading from './Loading';
import SearchIcon from '@mui/icons-material/Search';
import { useBlogContext } from './BlogsContext';

const Blogs = ({ title }) => {
  const { blogs, savedBlogIds, loadingBlogs, loadingUser, fetchData } = useBlogContext(); // Access separate loading states
  const [allBlogs, setAllBlogs] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);

  useEffect(() => {
    if (blogs && savedBlogIds) {
      const updatedBlogs = blogs.map((blog) => ({
        ...blog,
        savedStatus: savedBlogIds.includes(blog._id),
      }));
      setAllBlogs(updatedBlogs);
      setSavedBlogs(updatedBlogs.filter((b) => b.savedStatus === true));
    }
  }, [blogs, savedBlogIds]);

  useEffect(() => {
    fetchData();
  }, [title]);

  // Create a combined loading state for the initial page load only
  const initialLoading = loadingBlogs || loadingUser;

  return (
    <div className='flex flex-col items-center sm:items-start'>
      <span className='flex gap-2 sm:text-start mb-10 w-[70vw] max-w-[700px] md:w-[45vw] lg:w-[40vw] lg:max-w-[1200px] pl-3 border border-solid border-gray-300 py-1 rounded-full'>
        <SearchIcon/>
        <input 
          type="text" 
          className='w-full border-none outline-none focus:ring-0 focus:outline-none bg-transparent'
          placeholder={`I'm looking for...`}
        />
      </span>
      <p className='font-semibold text-2xl py-2 mb-4'>{title}</p>
      { initialLoading ? (
        <Loading/> // Show loading spinner only on initial load
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:gap-8'>
          { title !== 'Saved Blogs' && allBlogs.length > 0 && allBlogs.map((b) => (
            <BlogCard 
              key={b._id} 
              id={b._id} 
              title={b.title}
              author={b.author} 
              image={b.image} 
              date={b.createdAt}
              savedStatus={b.savedStatus}
            />
          ))}
          { title === 'Saved Blogs' && savedBlogs.length === 0 && <h1>No Saved Blogs</h1>}
          { title === 'Saved Blogs' && savedBlogs.length > 0 && savedBlogs.map((b) => (
            <BlogCard 
              key={b._id} 
              id={b._id} 
              title={b.title}
              author={b.author} 
              image={b.image} 
              date={b.createdAt}
              savedStatus={b.savedStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
