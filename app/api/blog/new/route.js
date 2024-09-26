import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectToDB();

        const { creator, image, title, blog, author } = await req.json();

        const newBlog = new Blog({
            // creator,
            image : image === 'default' ? '/assets/blog_pic_6.png' : image,
            title,
            blog,
            author
        });
        
        const savedBlog = await newBlog.save();
        console.log('Saved blog:', savedBlog);

        return NextResponse.json(savedBlog, { status: 201 });
    } catch (e) {
        console.error('Error creating blog:', e);
        return NextResponse.json({ error: "Failed to create a new blog" }, { status: 500 });
    }
}