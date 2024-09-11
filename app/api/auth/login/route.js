import { connectToDB } from "@/app/utils/database";
import User from "@/models/user";

export const POST = async (req) => {
    try {
        const { email, password } = await req.json();

        await connectToDB();

        // const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        // if (!usernameRegex.test(username)) {
        //     return new Response(JSON.stringify('Please enter a valid username. It should be 1-30 characters long, and can only contain letters, numbers, underscores and periods. It cannot contain two consecutive periods or end with a period.'), { status: 400 });
        // }

        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify("Please enter a valid email address"), { status: 400 });
        }

        if (!passwordRegex.test(password)) {
            return new Response(JSON.stringify("Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"), { status: 400 });
        }

        const userExists = await User.findOne({ email: email });
        const { username } = userExists;

        if (userExists) {
            return new Response(JSON.stringify(`User ${username} is successfully signed in.`), { status: 200 });
        } else {
            return new Response(JSON.stringify(`User ${username} with email ${email} does not exist.`), { status: 404 });
        }
    } catch (error) {
        return new Response(JSON.stringify(`Unable to register user, please try again later`), { status: 500 });
    }
}