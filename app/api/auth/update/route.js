import { connectToDB } from "@/app/utils/database";
import User from "@/models/user";
import UserProvider from "@/models/userProvider";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectToDB();

        const { userId, newName, newEmail } = await req.json();

        let user = await User.findById(userId);
        let userModel = User;

        if (!user) {
            user = await UserProvider.findById(userId);
            userModel = UserProvider;
        }

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if new name is already in use
        if (newName && newName !== user.name) {
            const existingUserWithName = await User.findOne({ name: newName }) || await UserProvider.findOne({ name: newName });
            if (existingUserWithName) {
                return NextResponse.json({ error: "Name is already in use" }, { status: 400 });
            }
        }

        // Check if new email is already in use
        if (newEmail && newEmail !== user.email) {
            const existingUserWithEmail = await User.findOne({ email: newEmail }) || await UserProvider.findOne({ email: newEmail });
            if (existingUserWithEmail) {
                return NextResponse.json({ error: "Email is already in use" }, { status: 400 });
            }
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