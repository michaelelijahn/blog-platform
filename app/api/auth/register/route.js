import { connectToDB } from "@/app/utils/database";
import User from "@/models/user";
import bcrypt from "bcrypt";

const CREATOR_SECRET = process.env.CREATOR_SECRET;

export const POST = async (req) => {
    try {
        const { name, email, password } = await req.json();
        
        if (!name || !email || !password) {
            return new Response(JSON.stringify({ error: "Name, email, and password are required" }), { status: 400 });
        }

        console.log("Attempting to connect to database");
        await connectToDB();
        console.log("Successfully connected to database");

        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: "Please enter a valid email address" }), { status: 400 });
        }

        if (!passwordRegex.test(password)) {
            return new Response(JSON.stringify({ error: "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" }), { status: 400 });
        }

        console.log("Checking if user already exists");
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            console.log("User already exists");
            return new Response(JSON.stringify({ error: "User with this email already exists" }), { status: 400 });
        }

        console.log("Hashing password");
        const hashedPassword = await bcrypt.hash(password, 10);
        const isCreator = email === CREATOR_SECRET;
        console.log("Is Creator:", isCreator);

        console.log("Attempting to create new user");
        try {
            const newUser = await User.create({ name, email, password: hashedPassword, isCreator });
            console.log("New user created successfully:", newUser);

            return new Response(JSON.stringify({ 
                message: "User created successfully", 
                userId: newUser._id,
                email: newUser.email,
                name: newUser.name,
                isCreator: newUser.isCreator
            }), { status: 201 });
        } catch (createError) {
            console.error("Error in User.create():", createError);
            if (createError.code === 11000) {
                return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });
            }
            throw createError;
        }
    } catch (error) {
        console.error("Error in user registration:", error);
        return new Response(JSON.stringify({ error: "Unable to register user, please try again later", details: error.message }), { status: 500 });
    }
}