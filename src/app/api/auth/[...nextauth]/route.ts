// // import NextAuth from "next-auth";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import GoogleProvider from "next-auth/providers/google";
// // import bcrypt from "bcrypt";
// // import type { NextAuthOptions } from "next-auth";
// // import connectDB from "@/lib/connectDB";
// // import User from "@/model/user";

// // export const authOptions: NextAuthOptions = {
// //   providers: [
// //     CredentialsProvider({
// //       name: "Credentials",
// //       credentials: {
// //         username: { label: "Username", type: "text" },
// //         password: { label: "Password", type: "password" },
// //       },
// //       async authorize(credentials) {
// //         await connectDB();
// //         if (!credentials?.username || !credentials?.password) return null;

// //         const user = await User.findOne({ username: credentials.username });
// //         if (!user) throw new Error("User not found");

// //         const isValid = await bcrypt.compare(credentials.password, user.password);
// //         if (!isValid) throw new Error("Invalid password");

// //         return {
// //           id: user._id.toString(),
// //           username: user.username,
// //           email: user.email,
// //         };
// //       },
// //     }),
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID as string,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
// //     }),
// //   ],
// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) token.id = user.id;
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       if (session.user) {
// //         session.user.id = token.id as string;
// //       }
// //       return session;
// //     },
// //   },
// //   session: {
// //     strategy: "jwt",
// //   },
// //   pages: {
// //     signIn: "/login",
// //   },
// //   secret: process.env.NEXTAUTH_SECRET,
// // };

// // const handler = NextAuth(authOptions);
// // export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import bcrypt from "bcrypt";
// import type { NextAuthOptions } from "next-auth";
// import connectDB from "@/lib/connectDB";
// import User from "@/model/user";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectDB();

//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await User.findOne({ email: credentials.email });

//         if (!user) throw new Error("User not found");

//         const isValid = await bcrypt.compare(credentials.password, user.password);

//         if (!isValid) throw new Error("Invalid password");

//         return {
//           id: user._id.toString(),
//           name: user.username,
//           email: user.email,
//         };
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       // Add user id to the token if available
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Store user id in session
//       if (session.user) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },

//   session: {
//     strategy: "jwt",
//   },

//   pages: {
//     signIn: "/login",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import connectDB from "@/lib/connectDB";
import User from "@/model/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Validate email exists
          if (!user.email) {
            throw new Error("Google account doesn't have an email address");
          }

          await connectDB();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = await User.create({
              email: user.email,
              username: user.name || user.email.split('@')[0],
              password: "", // Google users won't have a password
              // Add other required fields with default values
            });
            user.id = newUser._id.toString();
          } else {
            user.id = existingUser._id.toString();
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email; // Ensure email is added to token
      }
      return token;
    },

    async session({ session, token }) {
        console.log(session.user);
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string; // Ensure email is added to session

      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };