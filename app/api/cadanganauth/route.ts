// import NextAuth, { AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcryptjs';

// const prisma = new PrismaClient();

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials?.email },
//         });

//         if (
//           user &&
//           bcrypt.compareSync(credentials?.password || '', user.password)
//         ) {
//           return user; // Return user if authenticated
//         }

//         return null; // Return null if authentication fails
//       },
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/login', // Custom login page
//     error: '/auth/error', // Custom error page
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       if (token) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   adapter: PrismaAdapter(prisma),
// };

// const handler = NextAuth(authOptions);
// export const GET = handler;
// export const POST = handler;
