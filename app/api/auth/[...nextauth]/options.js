import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/db/dbConnect";
import { login } from "@/actions/user";

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
  ],

  callbacks: {
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
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
