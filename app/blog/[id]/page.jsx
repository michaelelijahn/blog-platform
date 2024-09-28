"use client"
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { formatDate, renderParagraphs } from '@/app/utils/utils';
import Header from '@/components/Header';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Loading from '@/components/Loading';
import { useBlogContext } from '@/components/BlogsContext';
import { useSession } from 'next-auth/react';


const Page = () => {
    const [loading, setLoading] = useState(true);
    const { setEdited, userId } = useBlogContext();
    const [isCreator, setIsCreator] = useState(false);
    const [blog, setBlog] = useState("");
    const [error, setError] = useState("");
    const params = useParams();
    const { id } = params;
    const router = useRouter();
    const { data: session } = useSession();
    
    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/blog/${id}`);

                if (!response.ok) {
                    throw new Error("Blog not found");
                }

                const data = await response.json();
                console.log(data);
                setBlog(data);
                setIsCreator(userId === data.creator);
            } catch (e) {
                console.log(e);
                setError("Failed to load blog");
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id]);

    useEffect(() => {
        if (userId && blog) {
            setIsCreator(userId === blog.creator);
            console.log("user id : ", userId);
            console.log("creator : ", blog.creator);
        }
    }, [userId, blog])

    const handleDeleteBlog = async (e) => {
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setEdited(true);
          router.prefetch("/");
          router.push("/");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete blog post');
        }
      } catch (e) {
        console.error('Error deleting blog post:', e);
        setError(e.message);
      }
    }

    if (loading) {
        return <Loading/>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <>
            <Header />
            <div className='flex flex-col'>
                {blog.image && (
                    <Image 
                        alt='blog image' 
                        className='rounded-lg shadow-lg mb-10 w-full h-[40vw]' 
                        src={blog.image} 
                        width={1000} 
                        height={150} 
                        layout="responsive"
                    />
                )}
                <div className='flex justify-between'>
                    <div>
                        <h1 className='font-bold text-4xl mb-5'>{blog.title}</h1>
                        <div className='flex gap-6 mb-4 text-sm text-gray-600'>
                            <p>By {blog.author}</p>
                            <p className='flex justify-center items-center gap-1'>
                                <FiberManualRecordIcon fontSize='sm' /> 
                                {formatDate(blog.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
                {renderParagraphs(blog.blog)}
                {(session?.user?.id && isCreator) && 
                    <div className='flex gap-2 my-8 font-semibold'>
                    <button className='colored-btn' onClick={() => { router.push(`/edit-blog/${id}`)}}>Edit Blog</button>
                    <button className='rounded-full border border-red-600 bg-red-600 py-1.5 px-5 text-white transition-all hover:bg-red-700 hover:border-red-700 text-center text-sm flex items-center justify-center' onClick={handleDeleteBlog}>Delete Blog</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Page