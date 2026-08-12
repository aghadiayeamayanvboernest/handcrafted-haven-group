import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Auth.js (NextAuth v5) with username/password (Credentials) auth.
 * Users live in the Supabase `users` table with bcrypt-hashed passwords.
 * Sessions are stateless JWTs. The `email` field carries the username so
 * it stays a stable identifier across the app (e.g. seller storefronts).
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        const username = String(creds?.username ?? "").trim().toLowerCase();
        const password = String(creds?.password ?? "");
        if (!username || !password) return null;

        // Lazy-load so these Node modules stay out of the edge bundle.
        const { getUserByUsername } = await import("@/lib/db");
        const bcrypt = (await import("bcryptjs")).default;

        const user = await getUserByUsername(username);
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name ?? user.username,
          email: user.username,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  trustHost: true,
});
