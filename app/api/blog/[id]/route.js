import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";
import { NextResponse } from 'next/server';
import { writeFile } from "fs/promises";

export const GET = async (req, { params }) => {

    try {

        const { id } = params;

        if (!id) {
            return new Response("Blog ID not found", { status : 404 });
        }

        await connectToDB();
        const blog = await Blog.findById(id);

        if (!blog) {
            return new Response("Blog not found", { status : 404 });
        }

        return new Response(JSON.stringify(blog), { status : 200 });
    } catch (e) {
        return new Response("Failed to get blog", { status : 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;

    try {
        await connectToDB();

        const formData = await req.formData();

        const timeStamp = Date.now();
    
        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer();
    
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timeStamp}_${image.name}`;
    
        await writeFile(path, buffer);
    
        const imgUrl = `/${timeStamp}_${image.name}`;

        const title = `${formData.get('title')}`;
        const blog = `${formData.get('blog')}`;
        const author = `${formData.get('author')}`;

        const existingBlog = await Blog.findById(id);

        if (!existingBlog) {
            return new Response("Blog not found", { status : 404 });
        }
        
        existingBlog.image = imgUrl;
        existingBlog.title = title;
        existingBlog.author = author;
        existingBlog.blog = Array.isArray(blog) ? blog.join('\n\n') : blog;

        await existingBlog.save();
        return new Response(JSON.stringify(existingBlog), { status : 200 });
    } catch (e) {
        console.error('Error creating blog:', e);
        return new Response("Failed to update blog", { status : 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;
    
    try {
        await connectToDB();

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting blog post:", error);
        return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
    }
}