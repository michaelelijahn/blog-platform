"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { convertToBase64 } from '@/app/utils/utils';
import Loading from '@/components/Loading';

const page = () => {
    const [title, setTitle] = useState("");
    const [blog, setBlog] = useState("");
    const [author, setAuthor] = useState("");
    const [prevImage, setPrevImage] = useState("");
    const [image, setImage] = useState({ myFile : ""});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                setImage({ ...image, myFile: base64 });
            } catch (error) {
                console.error('Error converting file to base64:', error);
            }
        }
    };

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
            const response = await fetch(`/api/blog/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    creator: session?.user.id,
                    image: image.myFile || prevImage,
                    title,
                    blog,
                    author
                }),
            });

            if (response.ok) {
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
                        onChange={(e) => handleFileUpload(e)}
                    />
                    <div className='flex justify-between'>
                        <button type="button" className='rounded-full border border-red-600 bg-red-600 py-1.5 px-5 text-white transition-all hover:bg-red-700 hover:border-red-700 text-center text-sm flex items-center justify-center' onClick={() => router.push("/")}>
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