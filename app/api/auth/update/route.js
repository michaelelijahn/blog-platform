import { connectToDB } from "@/app/utils/database";
import UserProvider from "@/models/userProvider";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectToDB();

        const { userId, newName, newEmail } = await req.json();

        let user = await UserProvider.findById(userId);

        if (newName && newName !== user.name) {
            const existingUserWithName = await UserProvider.findOne({ name: newName });
            if (existingUserWithName) {
                return NextResponse.json({ error: "Name is already in use" }, { status: 400 });
            }
        }

        if (newEmail && newEmail !== user.email) {
            const existingUserWithEmail = await UserProvider.findOne({ email: newEmail });
            if (existingUserWithEmail) {
                return NextResponse.json({ error: "Email is already in use" }, { status: 400 });
            }
        }

        if (newName) user.name = newName;
        if (newEmail) user.email = newEmail;

        await user.save();

        return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });

    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}