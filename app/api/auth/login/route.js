import { connectToDB } from "@/app/utils/database";
import User from "@/models/user";
import UserProvider from "@/models/userProvider";

export const POST = async (req) => {
    try {
        const { email, password } = await req.json();

        await connectToDB();

        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify("Please enter a valid email address"), { status: 400 });
        }

        if (!passwordRegex.test(password)) {
            return new Response(JSON.stringify("Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"), { status: 400 });
        }

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return new Response(JSON.stringify({ 
                message: "User logged in successfully", 
                userId: userExists._id,
                email: userExists.email,
                name: userExists.name,
                isCreator: userExists.isCreator
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: "Email does not exists" }), { status: 404 });
        }
    } catch (error) {
        return new Response(JSON.stringify(`Unable to register user, please try again later`), { status: 500 });
    }
}