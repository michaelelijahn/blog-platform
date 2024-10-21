import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";
import UserProvider from "@/models/userProvider";

export async function POST (req) {

    try {
        const { id, userId } = await req.json();

        if (!id) {
            return new Response("Blog ID not provided", { status: 400 });
        }

        await connectToDB();
        
        let user = await UserProvider.findOne({ id: userId }).populate('savedBlogs');

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        const alreadySaved = user.savedBlogs.some((savedBlog) => savedBlog._id.equals(id));

        if (alreadySaved) {
            user.savedBlogs.pull(id);
            await user.save();
            return new Response(JSON.stringify({ message: "Blog unsaved successfully" }), { status: 200 });
        } else {
            const blogExists = Blog.findById(id);

            if (!blogExists) {
                return new Response("Blog not found", { status: 404 });
            }

            user.savedBlogs.push(id);
            await user.save();
            return new Response(JSON.stringify({ message: "Blog saved successfully" }), { status: 200 });
        }
    } catch (error) {
        console.error('Error saving blog:', error);
        return new Response("Failed to save/unsave blog", { status: 500 });
    }
}
