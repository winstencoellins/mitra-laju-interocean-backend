import { z } from "zod"

export const createPortSchema = z.object({
    portName: z.string().min(1),
    portCountry: z.string().min(1),
})

export const portSchema = z.object({
    id: z.string(),
    portName: z.string(),
    portCountry: z.string(),
    isActive: z.boolean()
})

export const portDetailSchema = z.object({
    id: z.string(),
    portName: z.string(),
    portCountry: z.string(),
    isActive: z.boolean(),
    createdBy: z.string(),
    updatedBy: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().nullable()
})

export type CreatePortSchema = z.infer<typeof createPortSchema>;
export type PortSchema = z.infer<typeof portSchema>
export type PortDetailSchema = z.infer<typeof portDetailSchema>