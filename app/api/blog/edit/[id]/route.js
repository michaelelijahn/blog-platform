import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    const { id } = params;

    try {
        await connectToDB();

        const { creator, image, title, blog, author } = await req.json();
        console.log(creator, image, title, blog, author);
        const existingBlog = await Blog.findById(id);

        if (!existingBlog) {
            return new Response("Blog not found", { status : 404 });
        }

        existingBlog.creator = creator;
        existingBlog.image = image;
        existingBlog.title = title;
        existingBlog.author = author;
        existingBlog.blog = Array.isArray(blog) ? blog.join('\n\n') : blog;
        
        await existingBlog.save();
        console.log("testts")
        return new Response(JSON.stringify(existingBlog), { status : 200 });

    } catch (e) {
        console.error('Error creating blog:', e);
        return new Response("Failed to update blog", { status : 500 });
    }
}