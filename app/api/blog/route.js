import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";
import User from "@/models/user";
import UserProvider from "@/models/userProvider";

let dbConnection;

export const GET = async (req) => {
    try {
        const userId = req.headers.get('userId');
        const page = parseInt(req.headers.get('page') || '1');
        const limit = 20; // Adjust as needed

        if (!dbConnection) {
            dbConnection = await connectToDB();
        }

        const blogQuery = Blog.find({})
            .select('title author createdAt blog image creator') // Include the blog field
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean(); // Use lean for better performance

        let userQuery = UserProvider.findOne({ id: userId }).select('_id savedBlogs').lean().exec();

        const [blogs, user] = await Promise.all([blogQuery.exec(), userQuery]);

        const savedBlogIds = user ? new Set(user.savedBlogs.map(id => id.toString())) : new Set();
        const processedBlogs = blogs.map(blog => ({
            ...blog,
            savedStatus: savedBlogIds.has(blog._id.toString())
        }));

        return new Response(JSON.stringify({
            blogs: processedBlogs,
            totalPages: Math.ceil(await Blog.countDocuments() / limit)
        }), { status: 200 });

    } catch (e) {
        console.error("Error in GET /api/blog:", e);
        return new Response("Failed to fetch blogs: " + e.message, { status: 500 });
    }
}