import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "@/db/dbConnect";
import { login } from "@/actions/user";
import User from "@/models/User";

dbConnect();

export const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const data = await login({ email, password });

        if (data.type === "success") return data.user;
        else throw data;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "github" || account?.provider === "google") {
          const { name, email, image } = user;
          const existingUser = await User.findOne({ email });
          if (existingUser) return existingUser;
          else {
            await User.create({ name, email, image });
            return true;
          }
        } else return user || false;
      } catch (error) {
        console.log("SIGNIN->", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      try {
        // console.log("token->", token, "\nuser->", user);
        if (user) {
          token._id = user._id?.toString();
          token.email = user.email;
        }
        const existingUser = await User.findOne({ email: token.email }).select(
          "_id"
        );
        token._id = existingUser._id;
        return token;
      } catch (error) {
        console.log("JWT->", error);
        return token;
      }
    },

    async session({ session, token }) {
      // console.log("session->", session, "\ntoken->", token);
      return { ...session, user: { ...token } };
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
  session: {
    strategy: "jwt",
  },
};
