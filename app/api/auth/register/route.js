import { connectToDB } from "@/app/utils/database";
import User from "@/models/user";
import bcrypt from "bcrypt";

export const POST = async (req) => {
    try {
        const { username, email, password } = await req.json();
        console.log("Register api");
        await connectToDB();
        console.log("successfully connected to database");

        const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        if (!usernameRegex.test(username)) {
            return new Response(JSON.stringify('Please enter a valid username. It should be 1-30 characters long, and can only contain letters, numbers, underscores and periods. It cannot contain two consecutive periods or end with a period.'), { status: 400 });
        }
        console.log("passed username test");

        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify("Please enter a valid email address"), { status: 400 });
        }
        console.log("passed email test");

        if (!passwordRegex.test(password)) {
            return new Response(JSON.stringify("Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"), { status: 400 });
        }
        console.log("passed password test");

        const userExists = await User.findOne({ email: email });
        if (userExists) {
            console.log("User already exists");
            return new Response(JSON.stringify(`User with this email already exists`), { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("passed all checks");
        await User.create({ username, email, password: hashedPassword });
        console.log("successfully created a user")
        return new Response(JSON.stringify(`User ${username} registered successfully.`), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(`Unable to register user, please try again later`), { status: 500 });
    }
}