import { connectToDB } from "@/app/utils/database";
import Blog from "@/models/blog";

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

