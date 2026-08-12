// src/lib/mock-users.ts
import bcrypt from 'bcryptjs';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string; // Matched to 'password' as expected by your auth.ts
}

// Global scope prevents mockUsers array from wiping on Next.js dev server reloads
const globalForMock = globalThis as unknown as { mockUsers: MockUser[] };

export const mockUsers: MockUser[] = globalForMock.mockUsers || [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    // Pre-hashed bcrypt string for password: "password123"
    password: '$2a$10$wN38I1VdKzXN1w7OqR5R.O5Zt7X3vYgO0KkR7Y9PZ6A3R8Q9S0T1U',
  },
];

if (process.env.NODE_ENV !== 'production') {
  globalForMock.mockUsers = mockUsers;
}

export async function getUserByEmail(email: string): Promise<MockUser | undefined> {
  return mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function addMockUser(
  name: string,
  email: string,
  passwordHash: string
): Promise<MockUser> {
  const newUser: MockUser = {
    id: String(mockUsers.length + 1),
    name,
    email,
    password: passwordHash,
  };
  mockUsers.push(newUser);
  return newUser;
}