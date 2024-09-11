import { connectToDB } from "@/app/utils/database";
import UserProvider from "@/models/userProvider";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            try {
                await connectToDB();
                const userExists = await UserProvider.findOne({
                    email: user.email
                });

                if (!userExists) {
                    await UserProvider.create({
                        name: user.name.replace(" ", "").toLowerCase(),
                        email: user.email,
                        image: user.image,
                    });
                }
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };