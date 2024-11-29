"use client"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useBlogContext } from '@/components/BlogsContext';

const CreateBlogPage = () => {
    const { setRefetch } = useBlogContext();
    const [formData, setFormData] = useState({
        title: "",
        blog: "",
        author: "",
        file: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const formatBlogContent = (content) => {
        return content.replace(/\n/g, "<br>");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting || !session) return;
        setIsSubmitting(true);

        try {
            const submitFormData = new FormData();
            submitFormData.append('id', session?.user?.id);
            if (formData.file) {
                submitFormData.append('image', formData.file);
            }
            submitFormData.append('title', formData.title);
            // submitFormData.append('blog', formData.blog);
            submitFormData.append('blog', formatBlogContent(formData.blog));
            submitFormData.append('author', formData.author);

            const response = await fetch("/api/blog/new", {
                method: 'POST',
                body: submitFormData, 
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
            <h1 className='text-center text-4xl sm:text-left py-3 mb-10 sm:mb-16 font-extrabold sm:header-text blue-gradient'>Create Your Own Blog</h1>
            <div className='mx-auto sm:m-0 w-[50vw] h-fit min-h-[80vh] glassmorphism'>
                <form onSubmit={handleSubmit}>
                    <input 
                        name="title"
                        onChange={handleChange} 
                        value={formData.title}
                        className='w-full text-center sm:text-left p-2 pl-4 mt-1 bg-transparent rounded-full text-2xl' 
                        placeholder='Your Blog Post Title'
                    />
                    <textarea 
                        name="blog"
                        onChange={handleChange} 
                        value={formData.blog}
                        className='w-full border border-gray-300 h-[60vh] rounded-lg my-2 pl-2 py-2' 
                    />
                    <input 
                        name="author"
                        onChange={handleChange}
                        value={formData.author}
                        className='w-3/4 border border-gray-300 text-center sm:text-left p-2 pl-4 mt-1 mb-4 bg-transparent rounded-full text-md' 
                        type="text" 
                        placeholder='Author' 
                    />
                    <input 
                        type="file" 
                        name='file'
                        accept='.jpeg, .png, .jpg'
                        className='pb-4' 
                        onChange={handleChange}
                    />
                    <div className='flex justify-between'>
                        <button type="button" className='rounded-full border border-red-600 bg-red-600 py-1.5 px-5 text-white transition-all hover:bg-red-700 hover:border-red-700 text-center text-sm flex items-center justify-center' onClick={() => router.push("/")}>
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className='colored-btn' 
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Blog'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBlogPage