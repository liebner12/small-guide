/* eslint-disable new-cap */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CustomAdapter from '../../../logic/adapter/auth';

import {
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase';

const firebaseClient = {
  db,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/register',
  },
  callbacks: {
    async session({ session, user, token }) {
      session.user.uid = user.id;
      return session;
    },
  },
  adapter: CustomAdapter(firebaseClient),
});
