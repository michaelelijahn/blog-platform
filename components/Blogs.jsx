"use client"
import React from 'react';
import BlogCard from './BlogCard';
import Loading from './Loading';
import SearchIcon from '@mui/icons-material/Search';
import { useBlogContext } from './BlogsContext';

const Blogs = ({ title, filterSaved = false }) => {
  const { blogs, loading } = useBlogContext();

  const filteredBlogs = filterSaved ? blogs.filter(blog => blog.savedStatus) : blogs;

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
      { loading ? (
        <Loading/>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:gap-8'>
          {filteredBlogs.map((blog) => (
            <BlogCard 
              key={blog._id} 
              id={blog._id} 
              title={blog.title}
              author={blog.author} 
              image={blog.image} 
              date={blog.createdAt}
            />
          ))}
          {filteredBlogs.length === 0 && <h1>No Blogs</h1>}
        </div>
      )}
    </div>
  );
};

export default Blogs;