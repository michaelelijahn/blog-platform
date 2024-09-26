"use client"
import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import Loading from './Loading'
import SearchIcon from '@mui/icons-material/Search';
import { useSession } from 'next-auth/react';
import { useBlogContext } from './BlogsContext';

const Blogs = ({ title }) => {
  const { edited, setEdited } = useBlogContext();
  const [ blogs, setBlogs] = useState([]);
  const [ savedBlogs, setSavedBlogs ] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  
  useEffect(() => {
    if (blogs.length === 0 || savedBlogs.length === 0 || edited) {
      const fetchBlogData = async () => {
        setLoading(true);
        await getSavedBlogs();
        await getBlogs();
        setLoading(false);
        setEdited(false);
      }
      fetchBlogData();
    }
  }, [session, edited]);

  const getSavedBlogs = async () => {
    try {
      const response = await fetch('/api/blog/saved', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'email': session?.user?.email,
          'name': session?.user?.name,
        },
      });

      const data = await response.json();
      console.log("all saved blogs : ", data);
      setSavedBlogs(data);
    } catch (e) {
      console.error('Error fetching saved blogs:', e);
    }
  }

  const getBlogs = async () => {
    
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      console.log("all blogs data : ", data);
      setBlogs(data);

    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

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
      <p className='font-semibold text-2xl py-2 mb-4'>Blogs</p>
      {loading ? (
        <Loading/>
      ) : (
        blogs.length > 0 &&
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:gap-8'>
          {blogs.map((b) => {
            const isSaved = savedBlogs.length > 0 && savedBlogs.find((savedBlog) => savedBlog._id === b._id);

            return <BlogCard 
              key={b._id} 
              id={b._id} 
              title={b.title}
              author={b.author} 
              image={b.image} 
              date={b.createdAt}
              savedStatus={isSaved}
              setEdited={setEdited}
            />
          })}
        </div>
      )}
    </div>
  )
}

export default Blogs;
