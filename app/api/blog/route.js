import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";

export const GET = async (req) => {
    try {
        await connectToDB();
        const blogs = await Blog.find({});
        return new Response(JSON.stringify(blogs), { status : 200 });
    } catch (e) {
        return new Response("Failed to fetch all blogs", { status : 500 });
    }
}