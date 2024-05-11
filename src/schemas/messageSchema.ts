import z from "zod"

export const messageSchema = z.object({
    content: z.string().min(10, { message: 'Minimum 10 character required' }).max(300, { message: 'maximum 300 characters allowed' })
})