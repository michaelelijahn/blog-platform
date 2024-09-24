import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";
import { NextResponse } from 'next/server';

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