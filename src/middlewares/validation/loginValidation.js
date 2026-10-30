import { z } from 'zod';
import { passwordSchema } from './schema/password.js';

export const loginUserValidation = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    password: passwordSchema 
})