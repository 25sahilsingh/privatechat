import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbacks: {
        async redirect({ url, baseUrl }) {
          return baseUrl;
        },
      },
    }),
  ],
};
const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;
