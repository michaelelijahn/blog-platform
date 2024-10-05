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

        const email = `${formData.get('email')}`;
        const name = `${formData.get('name')}`;

        let creatorType = 'User';
        let user = await User.findOne({ email });

        if (!user || user.name !== name) {
            user = await UserProvider.findOne({ email });
            creatorType = 'UserProvider';
        }

        const timeStamp = Date.now();
    
        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer();
    
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timeStamp}_${image.name}`;
    
        await writeFile(path, buffer);
    
        const imgUrl = `/${timeStamp}_${image.name}`;

        const newBlog = new Blog({
            creator : user._id,
            creatorType,
            image : `${imgUrl}`,
            title: `${formData.get('title')}`,
            blog: `${formData.get('blog')}`,
            author: `${formData.get('author')}`,
        });
        
        const savedBlog = await newBlog.save();

        return NextResponse.json(savedBlog, { status: 201 });
        
    } catch (error) {
        console.error('Error creating blog:', e);
        return NextResponse.json({ error: "Failed to create a new blog" }, { status: 500 });
    }
}