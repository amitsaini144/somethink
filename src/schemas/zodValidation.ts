import z from "zod"

export const usernameValidation = z
  .string()
  .min(2, 'Username must be at least 2 characters')
  .max(20, 'Username must be no more than 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const signInSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(5, 'Password must have 5 characters')
})

export const messageAcceptSchema = z.object({
    messageAccept: z.boolean()
})

export const messageSchema = z.object({
    content: z.string().min(10, { message: 'Minimum 10 character required' }).max(300, { message: 'maximum 300 characters allowed' })
})

export const verifySchema = z.object({
    code: z.string().length(6, {message: 'Verification code must be 6 digits'})
  })