'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { mockUsers, type MockUser } from '@/lib/mock-users';
import { signOut } from '@/auth';

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const SignupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export type SignupState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function registerUser(
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const validatedFields = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create account.',
    };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    return {
      message: 'An account with this email already exists.',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: MockUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword,
  };

  mockUsers.push(newUser);

  await signIn('credentials', {
    email,
    password,
    redirect: false,
  });

  redirect('/');
}