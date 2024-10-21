import { connectToDB } from "@/app/utils/database";
import UserProvider from "@/models/userProvider";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google" 

const CREATOR_SECRET = process.env.CREATOR_SECRET; 

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await UserProvider.findOne({
                email: session.user.email
            });
    
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ user }) {
            try {
                await connectToDB();
                const userExists = await UserProvider.findOne({
                    email: user.email
                });

                if (!userExists) {
                    const isCreator = user.email === CREATOR_SECRET;
                    await UserProvider.create({
                        name: user.name.toLowerCase(),
                        email: user.email,
                        image: user.image,
                        isCreator: isCreator,
                    });
                }
                return true;
            } catch (e) {
                console.log("error in signing in using oauth",e);
                return false;
            }
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     return null;
//                 }

//                 await connectToDB();
//                 const user = await User.findOne({ email: credentials.email });
//                 if (!user) {
//                     return null;
//                 }

//                 const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
//                 if (!isPasswordValid) {
//                     return null;
//                 }

//                 return {
//                     id: user._id.toString(),
//                     name: user.name,
//                     email: user.email,
//                     isCreator: user.isCreator,
//                 }
//             }
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user, account }) {
//             if (user) {
//                 token.id = user.id;
//                 token.name = user.name;
//                 token.email = user.email;
//                 token.isCreator = user.isCreator;
//                 token.provider = account ? account.provider : 'credentials';
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             try {
//                 session.user.id = token.id;
//                 session.user.name = token.name;
//                 session.user.email = token.email;
//                 session.user.isCreator = token.isCreator;
//                 session.user.provider = token.provider;
//                 return session;
//             } catch (e) {
//                 console.error("session callback error : ", e);
//                 return session;
//             }
//         },
//         async signIn({ user, account }) {
//             await connectToDB();
//             if (account.provider === "google") {
//                 const userProvider = await UserProvider.findOne({ email: user.email });
//                 if (!userProvider) {
//                     const isCreator = user.email === CREATOR_SECRET;
//                     await UserProvider.create({
//                         name: user.name.toLowerCase(),
//                         email: user.email,
//                         image: user.image,
//                         isCreator: isCreator,
//                     });
//                 }
//                 user.isCreator = userProvider ? userProvider.isCreator : (user.email === CREATOR_SECRET);
//             }
//             return true;
//         }
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "/sign-in"
//     },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };