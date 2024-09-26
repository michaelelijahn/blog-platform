import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";
import User from "@/models/user";
import UserProvider from "@/models/userProvider";
import { getSession } from "next-auth/react";


export const POST = async (req) => {

    try {
        const { id, email } = await req.json();

        if (!id) {
            return new Response("Blog ID not provided", { status: 400 });
        }

        await connectToDB();

        
        // Try finding the user in User collection first
        let user = await User.findOne({ email }).populate('savedBlogs');

        // If not found, try the UserProvider collection
        if (!user) {
            user = await UserProvider.findOne({ email }).populate('savedBlogs');
        }

        console.log("User found:", user);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        console.log(user);

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

// export const GET = async (req) => {
//     const session = await getSession();

//     if (!session) {
//         return new Response("You must be logged in to view saved blogs", { status: 401 });
//     }

//     try {
//         await connectToDB();

//         const user = (User.findOne({ email: session.user.email }) || UserProvider.findOne({ email: session.user.email })).populate('savedBlogs');

//         if (!user) {
//             return new Response("User not found", { status: 404 });
//         }

//         return new Response(JSON.stringify(user.savedBlogs), { status: 200 });

//     } catch (error) {
//         console.error('Error fetching saved blogs:', error);
//         return new Response("Failed to fetch saved blogs", { status: 500 });
//     }
// }