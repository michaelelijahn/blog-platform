"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { useBlogContext } from '@/components/BlogsContext';

const page = () => {
    const [title, setTitle] = useState("");
    const [blog, setBlog] = useState("");
    const [author, setAuthor] = useState("");
    const [prevImage, setPrevImage] = useState("");
    const [file, setFile] = useState("");
    const { setRefetch } = useBlogContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/blog/${id}`);

                if (!response.ok) {
                    throw new Error("Blog not found");
                }

                const data = await response.json();
                // console.log(data);
                setTitle(data.title);
                setBlog(data.blog);
                setAuthor(data.author);
                setPrevImage(data.image);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id]);

    if (loading) {
        return <Loading/>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('image', file || prevImage);
            formData.append('title', title);
            formData.append('blog', blog);
            formData.append('author', author);

            const response = await fetch(`/api/blog/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                setRefetch(true);
                router.prefetch("/");
                router.push("/");
            } else {
                throw new Error('Failed to create blog post');
            }
        } catch(error) {
            console.error('Error creating blog post:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='mt-20 w-full'>
            <h1 className='text-center text-4xl sm:text-left py-3 mb-10 sm:mb-16 font-extrabold sm:header-text blue-gradient'>Edit Blog</h1>
            <div className='mx-auto sm:m-0 w-[50vw] h-fit min-h-[80vh] glassmorphism'>
                <form onSubmit={handleSubmit}>
                    <input 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title}
                        className='w-full text-center sm:text-left p-2 pl-4 mt-1 bg-transparent rounded-full text-2xl' 
                        placeholder='Your Blog Post Title'
                    />
                    <textarea 
                        onChange={(e) => setBlog(e.target.value)} 
                        value={blog}
                        className='w-full border border-gray-300 h-[60vh] rounded-lg my-2 pl-2 py-2' 
                    />
                    <input 
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author}
                        className='w-3/4 border border-gray-300 text-center sm:text-left p-2 pl-4 mt-1 mb-4 bg-transparent rounded-full text-md' 
                        type="text" 
                        placeholder='Author' 
                    />
                    <input 
                        type="file" 
                        name='myFile'
                        accept='.jpeg, .png, .jpg'
                        className='pb-4' 
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <div className='flex justify-between'>
                        <button type="button" className='rounded-full border border-red-600 bg-red-600 py-1.5 px-5 text-white transition-all hover:bg-red-700 hover:border-red-700 text-center text-sm flex items-center justify-center' onClick={() => router.back()}>
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className='colored-btn' 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Blog'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page