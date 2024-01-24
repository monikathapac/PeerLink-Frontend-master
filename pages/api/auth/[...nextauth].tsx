import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await fetch("https://api.offshare.online/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        if (response.status === 200) {
          var date = new Date();
          let user = await response.json();
          user.expires = new Date().setDate(date.getDate() + 59);
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      var now: Date = new Date();

      if (user && user.expires > now) {
        token.token = user.token;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.image = user.image;
        token.expires = user.expires;
      }
      return token;
    },

    session: async ({ session, token }) => {
      session.token = token.token;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.image = token.image;
      session.role = token.role;
      session.expires = token.expires;

      return session;
    },
  },
  secret: "Project UNO!",
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 58 * 24 * 60 * 60,
  },
});
