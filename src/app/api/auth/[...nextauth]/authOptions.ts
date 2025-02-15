import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import connectDB from "@/lib/connectDB";
import userModel from "@/models/user.model";
import bcryptjs from "bcryptjs";
export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          await connectDB();
          if (!credentials || !credentials.email || !credentials.password) {
            throw new Error(`Please fill all credential`);
          }
          const user = await userModel.findOne({ email: credentials.email });
          if (!user) {
            throw new Error(`User not found. Please enter correct credentials`);
          }
          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error(`Invalid credentials`);
          }
          const { username, email, image } = user;
          return {
            username,
            email,
            image,
          };
        } catch (error) {
          console.log(`Error at authorize function ${error}`);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      // console.log("account object in signIn callback", account);
      // console.log("profile object in signIn callback", profile);
      // console.log("user object in signIn callback", user);
      await connectDB();
      let data = await userModel.findOne({ email: user?.email });
      if (account?.provider === "google") {
        if (!data) {
          data = await userModel.create({
            username: profile?.name,
            email: profile?.email,
            image: profile?.image,
          });
        }
        account.userId = data._id.toString();
      }
      else if(account?.provider === "credentials"){
        account.userId = data._id.toString();
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log("Token in jwt", token);
      console.log("User in jwt", user);
      console.log("account in jwt", account);
      if (user) {
        (token.name = user.name || user.username),
          (token.email = user.email),
          (token._id = account?.userId || user._id);
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user._id = token._id),
          (session.user.name = token.name),
          (session.user.email = token.email),
          (session.user.image = token.image);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
