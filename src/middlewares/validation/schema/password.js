//import zod
import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'Kata sandi minimal harus 8 karakter' })
  .max(20, { message: 'Kata sandi maksimal 20 karakter' })
  .regex(/[A-Z]/, { message: 'Kata sandi harus mengandung minimal 1 huruf besar' })
  .regex(/[a-z]/, { message: 'Kata sandi harus mengandung minimal 1 huruf kecil' })
  .regex(/[0-9]/, { message: 'Kata sandi harus mengandung minimal 1 angka' })
  .regex(/[^A-Za-z0-9]/, { message: 'Kata sandi harus mengandung minimal 1 karakter spesial' });
