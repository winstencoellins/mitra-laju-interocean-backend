import { z } from "zod";

// Vendor Contact Schemas
export const vendorContactSchema = z.object({
    id: z.string(),
    contactName: z.string(),
    phoneNumber: z.string(),
    email: z.email().nullable(),
    isActive: z.boolean(),
});

export const vendorContactDetailSchema = z.object({
    id: z.string(),
    contactName: z.string(),
    phoneNumber: z.string(),
    email: z.email().nullable(),
    isActive: z.boolean(),
    createdBy: z.string(),
    updatedBy: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createVendorContactSchema = z.object({
    contactName: z.string().min(1),
    phoneNumber: z.string().min(1),
    email: z.email().nullable(),
});

export const updateVendorContactSchema = z.object({
    contactName: z.string().min(1).optional(),
    phoneNumber: z.string().min(1).optional(),
    email: z.email().nullable().optional(),
    isActive: z.boolean().optional(),
});

// Vendor Location Schemas
export const vendorLocationSchema = z.object({
    id: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().nullable(),
    addressLine3: z.string().nullable(),
    city: z.string(),
    province: z.string(),
    country: z.string(),
    postalCode: z.string().nullable(),
    vendorContacts: z.array(vendorContactSchema),
    isActive: z.boolean(),
});

export const vendorLocationDetailSchema = z.object({
    id: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().nullable(),
    addressLine3: z.string().nullable(),
    city: z.string(),
    province: z.string(),
    country: z.string(),
    postalCode: z.string().nullable(),
    isActive: z.boolean(),
    createdBy: z.string(),
    updatedBy: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const createVendorLocationSchema = z.object({
    addressLine1: z.string().min(1),
    addressLine2: z.string().nullable(),
    addressLine3: z.string().nullable(),
    city: z.string().min(1),
    province: z.string().min(1),
    country: z.string().min(1),
    postalCode: z.string().nullable(),
});

export const updateVendorLocationSchema = z.object({
    addressLine1: z.string().min(1).optional(),
    addressLine2: z.string().nullable().optional(),
    addressLine3: z.string().nullable().optional(),
    city: z.string().min(1).optional(),
    province: z.string().min(1).optional(),
    country: z.string().min(1).optional(),
    postalCode: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
});

// Vendor Schemas
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
    vendorLocations: z.array(vendorLocationSchema),
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

export type VendorLocationSchema = z.infer<typeof vendorLocationSchema>;
export type VendorLocationDetailSchema = z.infer<typeof vendorLocationDetailSchema>;
export type CreateVendorLocationSchema = z.infer<typeof createVendorLocationSchema>;
export type UpdateVendorLocationSchema = z.infer<typeof updateVendorLocationSchema>;

export type VendorContactSchema = z.infer<typeof vendorContactSchema>;
export type VendorContactDetailSchema = z.infer<typeof vendorContactDetailSchema>;
export type CreateVendorContactSchema = z.infer<typeof createVendorContactSchema>;
export type UpdateVendorContactSchema = z.infer<typeof updateVendorContactSchema>;