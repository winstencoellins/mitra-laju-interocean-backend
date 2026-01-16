import { z } from "zod";

export const customerSchema = z.object({
    id: z.string(),
    customerName: z.string(),
    customerCode: z.string(),
    npwp: z.string().nullable(),
})

export const customerDetailSchema = z.object({
    id: z.string(),
    customerName: z.string(),
    customerCode: z.string(),
    npwp: z.string().nullable(),
    isActive: z.boolean(),
    createdBy: z.string(),
    updatedBy: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createCustomerSchema = z.object({
    customerName: z.string().min(1),
    customerCode: z.string().min(1),
    npwp: z.string().nullable(),
});

export const updateCustomerSchema = z.object({
    customerName: z.string().min(1).optional(),
    customerCode: z.string().min(1).optional(),
    npwp: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
});

export type CustomerSchema = z.infer<typeof customerSchema>;
export type CustomerDetailSchema = z.infer<typeof customerDetailSchema>;
export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;