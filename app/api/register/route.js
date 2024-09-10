import { connectToDB } from "@/app/utils/database";
import User from "@/models/user";
import bcrypt from "bcrypt";

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
            console.log("User already exists");
            return new Response(JSON.stringify(`User with this email already exists`), { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ email, password: hashedPassword });
        return new Response(JSON.stringify(`User ${email} registered successfully.`), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(`Unable to register user, please try again later`), { status: 500 });
    }
}