import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";
import User from "@/models/user";
import UserProvider from "@/models/userProvider";

let dbConnection;

export const GET = async (req) => {
    try {
        console.log('API Request');
        const email = req.headers.get('email');
        const name = req.headers.get('name');
        const page = parseInt(req.headers.get('page') || '1');
        const limit = 20; // Adjust as needed

        if (!dbConnection) {
            // console.log('DB Connection');
            dbConnection = await connectToDB();
            // console.log('DB Connection');
        }

        // Fetch blogs with pagination
        // console.log('Fetch Blogs');
        const blogQuery = Blog.find({})
            .select('title author createdAt blog image creator') // Include the blog field
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean(); // Use lean for better performance

        let userQuery = Promise.resolve(null);
        if (email !== "undefined" && name !== "undefined") {
            userQuery = User.findOne({ email })
                .select('_id savedBlogs')
                .lean()
                .exec()
                .then(user => user || UserProvider.findOne({ email }).select('_id savedBlogs').lean().exec());
        }

        // Execute queries in parallel
        const [blogs, user] = await Promise.all([blogQuery.exec(), userQuery]);
        // console.log('Fetch Blogs');

        if (email !== "undefined" && name !== "undefined" && !user) {
            return new Response("User not found", { status: 401 });
        }

        // console.log('Process Blogs');
        const savedBlogIds = user ? new Set(user.savedBlogs.map(id => id.toString())) : new Set();
        const processedBlogs = blogs.map(blog => ({
            ...blog,
            savedStatus: savedBlogIds.has(blog._id.toString())
        }));
        // console.log('Process Blogs');

        // console.log('API Request');
        return new Response(JSON.stringify({
            userId: user ? user._id : null,
            blogs: processedBlogs,
            totalPages: Math.ceil(await Blog.countDocuments() / limit)
        }), { status: 200 });

    } catch (e) {
        console.error("Error in GET /api/blog:", e);
        return new Response("Failed to fetch blogs: " + e.message, { status: 500 });
    }
}