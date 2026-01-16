import { z } from "zod";

export const createVesselSchema = z.object({
    vesselName: z.string().min(1),
    voyageNumber: z.string().min(1),
    etd: z.iso.datetime().nullable(),
    closingReefer: z.iso.datetime().nullable(),
});

export const updateVesselSchema = z.object({
    vesselName: z.string().min(1).optional(),
    voyageNumber: z.string().min(1).optional(),
    etd: z.iso.datetime().nullable().optional(),
    closingReefer: z.iso.datetime().nullable().optional(),
    isActive: z.boolean().optional(),
});

export const vesselSchema = z.object({
    id: z.string(),
    vesselName: z.string(),
    voyageNumber: z.string(),
    etd: z.date().nullable(),
    closingReefer: z.date().nullable(),
    isActive: z.boolean(),
});

export const vesselDetailSchema = z.object({
    id: z.string(),
    vesselName: z.string(),
    voyageNumber: z.string(),
    etd: z.date().nullable(),
    closingReefer: z.date().nullable(),
    isActive: z.boolean(),
    createdBy: z.string(),
    updatedBy: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type CreateVesselSchema = z.infer<typeof createVesselSchema>;
export type UpdateVesselSchema = z.infer<typeof updateVesselSchema>;
export type VesselSchema = z.infer<typeof vesselSchema>;
export type VesselDetailSchema = z.infer<typeof vesselDetailSchema>;