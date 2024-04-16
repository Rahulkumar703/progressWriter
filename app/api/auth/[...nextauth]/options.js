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

        if (data.user) return data.user;
        throw data;
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
      if (account?.provider === "github" || account?.provider === "google") {
        const { name, email, image } = user;
        const existingUser = await User.findOne({ email });
        if (existingUser) return true;
        else {
          await User.create({ name, email, image });
          return true;
        }
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
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
