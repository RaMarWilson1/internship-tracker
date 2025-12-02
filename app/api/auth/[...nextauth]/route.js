//*** RaMar Wilson
//*** Database Systems - Final Project
//*** November 4, 2024
//*** NextAuth configuration for user authentication

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Find user in database
          const [users] = await pool.query(
            'SELECT * FROM Users WHERE email = ?',
            [credentials.email]
          );

          if (users.length === 0) {
            return null;
          }

          const user = users[0];

          // Check password (for now, simple comparison - we'll add bcrypt later)
          if (credentials.password === user.password_hash) {
            return {
              id: user.user_id,
              email: user.email,
              name: `${user.first_name} ${user.last_name}`,
            };
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };