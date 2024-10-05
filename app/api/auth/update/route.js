import { connectToDB } from "@/app/utils/database";
import User from "@/models/user";
import UserProvider from "@/models/userProvider";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectToDB();

        const { userId, newName, newEmail } = await req.json();

        let user = await User.findById(userId);

        if (!user) {
            user = await UserProvider.findById(userId);
        }

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update user information
        if (newName) user.name = newName;
        if (newEmail) user.email = newEmail;

        // Save the updated user
        await user.save();

        return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });

    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}