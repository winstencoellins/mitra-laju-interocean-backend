import { z } from "zod";

// Customer Contact Schemas
export const customerContactSchema = z.object({
    id: z.string(),
    contactName: z.string(),
    phoneNumber: z.string(),
    email: z.email().nullable(),
    isActive: z.boolean(),
})

export const customerContactDetailSchema = z.object({
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

export const createCustomerContactSchema = z.object({
    contactName: z.string().min(1),
    phoneNumber: z.string().min(1),
    email: z.email().nullable(),
});

export const updateCustomerContactSchema = z.object({
    contactName: z.string().min(1).optional(),
    phoneNumber: z.string().min(1).optional(),
    email: z.email().nullable().optional(),
    isActive: z.boolean().optional(),
});

// Customer Location Schemas
export const customerLocationSchema = z.object({
    id: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().nullable(),
    addressLine3: z.string().nullable(),
    city: z.string(),
    province: z.string(),
    country: z.string(),
    postalCode: z.string().nullable(),
    customerContacts: z.array(customerContactSchema),
    isActive: z.boolean(),
})

export const customerLocationDetailSchema = z.object({
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

export const createCustomerLocationSchema = z.object({
    addressLine1: z.string().min(1),
    addressLine2: z.string().nullable(),
    addressLine3: z.string().nullable(),
    city: z.string().min(1),
    province: z.string().min(1),
    country: z.string().min(1),
    postalCode: z.string().nullable(),
});

export const updateCustomerLocationSchema = z.object({
    addressLine1: z.string().min(1).optional(),
    addressLine2: z.string().nullable().optional(),
    addressLine3: z.string().nullable().optional(),
    city: z.string().min(1).optional(),
    province: z.string().min(1).optional(),
    country: z.string().min(1).optional(),
    postalCode: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
});

// Customer Schemas
export const customerSchema = z.object({
    id: z.string(),
    customerName: z.string(),
    customerCode: z.string(),
    npwp: z.string().nullable(),
    isActive: z.boolean(),
})

export const customerDetailSchema = z.object({
    id: z.string(),
    customerName: z.string(),
    customerCode: z.string(),
    npwp: z.string().nullable(),
    customerLocations: z.array(customerLocationSchema),
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

export type CustomerLocationSchema = z.infer<typeof customerLocationSchema>;
export type CustomerLocationDetailSchema = z.infer<typeof customerLocationDetailSchema>;
export type CreateCustomerLocationSchema = z.infer<typeof createCustomerLocationSchema>;
export type UpdateCustomerLocationSchema = z.infer<typeof updateCustomerLocationSchema>;

export type CustomerContactSchema = z.infer<typeof customerContactSchema>;
export type CustomerContactDetailSchema = z.infer<typeof customerContactDetailSchema>;
export type CreateCustomerContactSchema = z.infer<typeof createCustomerContactSchema>;
export type UpdateCustomerContactSchema = z.infer<typeof updateCustomerContactSchema>;