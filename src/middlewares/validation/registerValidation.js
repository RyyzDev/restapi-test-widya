import { z } from 'zod';
import { passwordSchema } from './schema/password.js';


// fungsi validasi utama
export const registerUserValidation = z.object({
  name: z.string().min(2, { message: 'Nama minimal 2 karakter' }),
  email: z.string().email({ message: 'Format email tidak valid' }),
  password: passwordSchema,
  gender: z.enum(['MALE', 'FEMALE'], {
    message: 'Pilihan Jenis Kelamin Tidak Valid',
  }),
});
