// auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { mockUsers, type MockUser } from '@/lib/mock-users';

function getUser(email: string): MockUser | undefined {
  return mockUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          const user = getUser(email);
          if (!user) {
            console.log(`[AUTH] User not found: ${email}`);
            return null;
          }

          // TypeScript now knows user.password exists!
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return { id: user.id, name: user.name, email: user.email };
          } else {
            console.log('[AUTH] Password mismatch for user:', email);
          }
        } else {
          console.log('[AUTH] Zod Validation Failed:', parsedCredentials.error.format());
        }

        return null;
      },
    }),
  ],
});