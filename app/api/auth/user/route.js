import { connectToDB } from "@/app/utils/database";
import User from "@/models/user";
import UserProvider from "@/models/userProvider";

export const GET = async (req, res) => {
    try {
        console.log("attempt to find email and name");

        const email = req.headers.get('email');
        const name = req.headers.get('name');

        console.log("email : ", email);
        console.log("name : ", name);

        if (!email || !name) {
            return new Response(JSON.stringify({error : "Invalid Name or Email"}), { status: 400 });
        }

        await connectToDB();
        let user = await User.findOne({ email });

        if (!user || user.name !== name) {
            user = await UserProvider.findOne({ email });
        }

        if (!user) {
            return new Response(JSON.stringify({error : "No user found"}), { status: 400 });
        }

        console.log("user : ", user);

        return new Response(JSON.stringify({
            userId : user._id,
            savedBlogs : user.savedBlogs,
        }), { status : 200 });

    } catch (e) {
        console.error("Error in finding user :", error);
        return new Response(JSON.stringify({ error: "Error in finding user"}), { status: 500 });
    }
}