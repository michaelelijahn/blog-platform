import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";
import User from "@/models/user";
import UserProvider from "@/models/userProvider";

export const GET = async (req) => {
    try {
        // console.log("trying to get all blogs");
        // const startTime = Date.now();

        const email = req.headers.get('email');
        const name = req.headers.get('name');

        // console.log("email  test : ", email);
        // console.log("name  test : ", name);

        if (!email || !name) {
            return new Response("Missing email or name", { status : 401 });
        }

        await connectToDB();
        let user = await User.findOne({ email });
        
        if (!user || user.name !== name) {
            user = await UserProvider.findOne({ email });
        }
        
        if (!user) {
            return new Response("User not found", { status: 401 });
        }
        // console.log("user test : ", user); 

        const blogs = await Blog.find({});
        // console.log("blogs : ", blogs);
        // const endTime = Date.now();
        // console.log(`getBlogs API took ${endTime - startTime} ms`); 

        const savedBlogIds = new Set(user.savedBlogs.map(id => id.toString()));

        // console.log("savedBlogIds test : ", savedBlogIds);

        // console.log("updatedBlogs attempt ");

        let updatedBlogs = blogs.map(blog => ({
            ...blog._doc,
            savedStatus: savedBlogIds.has(blog._id.toString())
        }));

        // console.log("updatedBlogs test : ", updatedBlogs);
        return new Response(JSON.stringify({
            userId: user._id,
            blogs: updatedBlogs,
        }), { status : 200 });
    } catch (e) {
        return new Response("Failed to fetch all blogs", { status : 500 });
    }
}