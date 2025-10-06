import { z } from 'zod';

export const roleEnum = z.enum(['admin', 'member']);

export const loginSchema = z.object({
  email: z
    .email({ error: 'Email & password tidak valid' })
    .min(1, 'Email tidak boleh kosong'),
  password: z
    .string({ error: 'Email & password tidak valid' })
    .min(1, 'Password tidak boleh kosong')
    .min(6, 'Password harus memiliki setidaknya 6 karakter'),
});

export type LoginType = z.infer<typeof loginSchema>;

export const signupSchema = loginSchema.extend({
  name: z
    .string({ error: 'Nama tidak valid' })
    .min(3, 'Nama harus memiliki setidaknya 3 karakter'),
});

export type SignupType = z.infer<typeof signupSchema>;

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  role: roleEnum,
  avatar: z.url().optional(),
});

export type UserType = z.infer<typeof userSchema>;

export const threadsSchema = z.object({
  title: z.string().min(5, {
    message: 'Judul diskusi minimal harus 5 karakter.',
  }),
  content: z.string().min(10, {
    message: 'Konten diskusi minimal harus 10 karakter.',
  }),
  tags: z.string().min(1, {
    message: 'Setidaknya harus ada satu tag.',
  }),
});
