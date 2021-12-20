/* eslint-disable new-cap */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
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
import { FirebaseAdapter } from '@next-auth/firebase-adapter';

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
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  events: {
    async createUser(message) {
      updateDoc(doc(db, `users/${message.user.id}`), {
        emailVerified: false,
      });
    },
  },
  callbacks: {
    async session({ session, user }) {
      session.user.uid = user.id;
      return session;
    },
  },
  adapter: FirebaseAdapter(firebaseClient),
});
