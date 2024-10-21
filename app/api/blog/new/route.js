import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";
import User from "@/models/user";
import UserProvider from "@/models/userProvider";
import { NextResponse } from 'next/server';
import { writeFile } from "fs/promises";

export async function POST(req) {
    try {
        await connectToDB();

        const formData = await req.formData();
        
        const userId = `${formData.get('id')}`;
        let user = await UserProvider.findOne({ id: userId });

        const timeStamp = Date.now();
    
        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer();
    
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timeStamp}_${image.name}`;
    
        await writeFile(path, buffer);
    
        const imgUrl = `/${timeStamp}_${image.name}`;

        const newBlog = new Blog({
            creator : user._id,
            image : `${imgUrl}`,
            title: `${formData.get('title')}`,
            blog: `${formData.get('blog')}`,
            author: `${formData.get('author')}`,
        });
        
        const savedBlog = await newBlog.save();

        return NextResponse.json(savedBlog, { status: 201 });
        
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json({ error: "Failed to create a new blog" }, { status: 500 });
    }
}