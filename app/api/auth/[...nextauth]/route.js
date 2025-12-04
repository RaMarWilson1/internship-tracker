//*** RaMar Wilson
//*** Database Systems - Final Project
//*** December 2, 2025
//*** NextAuth configuration for user authentication

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Find user in database
          const [users] = await pool.query(
            'SELECT * FROM Users WHERE email = ?',
            [credentials.email]
          );

          if (users.length === 0) {
            return null;
          }

          const user = users[0];

          // Check password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.user_id.toString(),
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };