import z from "zod"

export const messageAcceptSchema = z.object({
    messageAccept: z.boolean()
})