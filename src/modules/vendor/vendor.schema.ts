import { z } from "zod";

export const vendorSchema = z.object({
    id: z.string(),
    vendorName: z.string(),
    vendorCode: z.string(),
    npwp: z.string().nullable(),
});

export const vendorDetailSchema = z.object({
    id: z.string(),
    vendorName: z.string(),
    vendorCode: z.string(),
    npwp: z.string().nullable(),
    isActive: z.boolean(),
    createdBy: z.string(),
    updatedBy: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createVendorSchema = z.object({
    vendorName: z.string().min(1),
    vendorCode: z.string().min(1),
    npwp: z.string().nullable(),
});

export const updateVendorSchema = z.object({
    vendorName: z.string().min(1).optional(),
    vendorCode: z.string().min(1).optional(),
    npwp: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
});

export type VendorSchema = z.infer<typeof vendorSchema>;
export type VendorDetailSchema = z.infer<typeof vendorDetailSchema>;
export type CreateVendorSchema = z.infer<typeof createVendorSchema>;
export type UpdateVendorSchema = z.infer<typeof updateVendorSchema>;