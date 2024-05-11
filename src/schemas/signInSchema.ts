import z from "zod"

export const signInSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(5, 'Password must have 5 characters')
})