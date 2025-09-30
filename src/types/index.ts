import { loginSchema, signupSchema, userSchema } from '@/lib/schema';

export type ActionResult = {
  error: string | null;
  success?: string;
};

export type TypeId = {
  id: string;
};

export type TypeParams = {
  params: Promise<TypeId>;
};
