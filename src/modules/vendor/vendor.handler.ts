import { VendorLocation } from "../../../generated/prismabox/VendorLocation";
import prisma from "../../db/client";
import { ApiResponse } from "../../types/api-response";
import { VendorAlreadyExistsError, VendorNotFoundError, VendorLocationNotFoundError, VendorContactNotFoundError, VendorLocationNotInVendorError, VendorContactNotInLocationError } from "./vendor.error";
import { createVendorSchema, CreateVendorSchema, vendorDetailSchema, VendorDetailSchema, vendorSchema, VendorSchema, UpdateVendorSchema, updateVendorSchema, VendorLocationDetailSchema, vendorLocationDetailSchema, createVendorLocationSchema, CreateVendorLocationSchema, UpdateVendorLocationSchema, updateVendorLocationSchema, VendorContactDetailSchema, vendorContactDetailSchema, CreateVendorContactSchema, createVendorContactSchema, updateVendorContactSchema, UpdateVendorContactSchema } from "./vendor.schema";

export const getAllVendorsHandler = async (): Promise<ApiResponse<VendorSchema[]>> => {
    const vendors = await prisma.vendor.findMany({
        select: {
            id: true,
            vendorName: true,
            vendorCode: true,
            npwp: true,
        }
    });

    const safeVendors: VendorSchema[] = vendors.map((v) => vendorSchema.parse(v))

    const response: ApiResponse<VendorSchema[]> = {
        data: safeVendors,
    }

    return response;
}

export const getVendorByIdHandler = async (vendorId: string): Promise<ApiResponse<VendorDetailSchema>> => {
    const vendor = await prisma.vendor.findUnique({
        where: {
            id: vendorId
        },
        include: {
            vendorLocations: {
                select: {
                    id: true,
                    addressLine1: true,
                    addressLine2: true,
                    addressLine3: true,
                    city: true,
                    province: true,
                    country: true,
                    postalCode: true,
                    isActive: true,
                    vendorContacts: {
                        select: {
                            id: true,
                            contactName: true,
                            phoneNumber: true,
                            email: true,
                            isActive: true,
                        }
                    }
                },
            },
        }
    });

    if (!vendor) {
        throw new VendorNotFoundError(vendorId);
    }

    const safeVendor: VendorDetailSchema = vendorDetailSchema.parse(vendor);

    const response: ApiResponse<VendorDetailSchema> = {
        data: safeVendor,
    }

    return response;
}

export const createVendorHandler = async (vendor: unknown): Promise<ApiResponse<VendorDetailSchema>> => {
    const safeVendor: CreateVendorSchema = createVendorSchema.parse(vendor);

    const vendorExists = await prisma.vendor.findFirst({
        where: {
            vendorName: safeVendor.vendorName,
            vendorCode: safeVendor.vendorCode,
        }
    });

    if (vendorExists) {
        throw new VendorAlreadyExistsError(safeVendor.vendorName, safeVendor.vendorCode);
    }

    const newVendor = await prisma.vendor.create({
        data: {
            vendorName: safeVendor.vendorName,
            vendorCode: safeVendor.vendorCode,
            npwp: safeVendor.npwp,
            createdBy: "Admin", // Placeholder, replace with actual user info
        },
        include: {
            vendorLocations: true,
        }
    });

    const safeResponse: VendorDetailSchema = vendorDetailSchema.parse(newVendor);

    const response: ApiResponse<VendorDetailSchema> = {
        data: safeResponse,
    }

    return response;
}

export const updateVendorHandler = async (vendorId: string, vendor: unknown): Promise<ApiResponse<VendorDetailSchema>> => {
    const safeVendor: UpdateVendorSchema = updateVendorSchema.parse(vendor);

    const existingVendor = await prisma.vendor.findUnique({
        where: {
            id: vendorId
        }
    });

    if (!existingVendor) {
        throw new VendorNotFoundError(vendorId);
    }

    const vendorWithSameNameOrCode = await prisma.vendor.findFirst({
        where: {
            vendorName: safeVendor.vendorName,
            vendorCode: safeVendor.vendorCode,
            NOT: {
                id: vendorId
            }
        }
    });

    if (vendorWithSameNameOrCode) {
        throw new VendorAlreadyExistsError(safeVendor.vendorName!, safeVendor.vendorCode!);
    }

    const updatedVendor = await prisma.vendor.update({
        where: {
            id: vendorId
        },
        data: {
            ...safeVendor,
            updatedBy: "Admin" // Placeholder, replace with actual user info
        },
        include: {
            vendorLocations: {
                select: {
                    id: true,
                    addressLine1: true,
                    addressLine2: true,
                    addressLine3: true,
                    city: true,
                    province: true,
                    country: true,
                    postalCode: true,
                    isActive: true,
                    vendorContacts: {
                        select: {
                            id: true,
                            contactName: true,
                            phoneNumber: true,
                            email: true,
                            isActive: true,
                        }
                    }
                },
            },
        },
    });

    const safeResponse: VendorDetailSchema = vendorDetailSchema.parse(updatedVendor);

    const response: ApiResponse<VendorDetailSchema> = {
        data: safeResponse,
    }

    return response;
}

// Vendor Location Handlers
export const getVendorLocationByIdHandler = async (locationId: string, vendorId: string): Promise<ApiResponse<VendorLocationDetailSchema>> => {
    const vendorLocation = await prisma.vendorLocation.findUnique({
        where: {
            id: locationId
        },
        select: {
            id: true,
            vendorId: true,
            addressLine1: true,
            addressLine2: true,
            addressLine3: true,
            city: true,
            province: true,
            country: true,
            postalCode: true,
            isActive: true,
            createdBy: true,
            updatedBy: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    if (!vendorLocation) {
        throw new VendorLocationNotFoundError(locationId);
    }

    if (vendorLocation.vendorId !== vendorId) {
        throw new VendorLocationNotInVendorError(vendorId);
    }

    const safeVendorLocation: VendorLocationDetailSchema = vendorLocationDetailSchema.parse(vendorLocation);

    const response: ApiResponse<VendorLocationDetailSchema> = {
        data: safeVendorLocation,
    }

    return response;
}

export const createVendorLocationHandler = async (vendorId: string, vendorLocation: unknown): Promise<ApiResponse<VendorLocationDetailSchema>> => {
    const safeVendorLocation: CreateVendorLocationSchema = createVendorLocationSchema.parse(vendorLocation);

    const existingVendor = await prisma.vendor.findUnique({
        where: {
            id: vendorId
        }
    });

    if (!existingVendor) {
        throw new VendorNotFoundError(vendorId);
    }

    const newVendorLocation = await prisma.vendorLocation.create({
        data: {
            ...safeVendorLocation,
            vendorId: vendorId,
            createdBy: "Admin", // Placeholder, replace with actual user info
        },
        select: {
            id: true,
            vendorId: true,
            addressLine1: true,
            addressLine2: true,
            addressLine3: true,
            city: true,
            province: true,
            country: true,
            postalCode: true,
            isActive: true,
            createdBy: true,
            updatedBy: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    const safeNewVendorLocation: VendorLocationDetailSchema = vendorLocationDetailSchema.parse(newVendorLocation);

    const response: ApiResponse<VendorLocationDetailSchema> = {
        data: safeNewVendorLocation,
    }

    return response;
}

export const updateVendorLocationHandler = async (locationId: string, vendorId: string, vendorLocation: unknown): Promise<ApiResponse<VendorLocationDetailSchema>> => {
    const safeVendorLocation: UpdateVendorLocationSchema = updateVendorLocationSchema.parse(vendorLocation);

    const existingVendorLocation = await prisma.vendorLocation.findUnique({
        where: {
            id: locationId
        }
    });

    if (!existingVendorLocation) {
        throw new VendorLocationNotFoundError(locationId);
    }

    if (existingVendorLocation.vendorId !== vendorId) {
        throw new VendorLocationNotInVendorError(vendorId);
    }

    const existingVendor = await prisma.vendor.findUnique({
        where: {
            id: vendorId
        }
    });

    if (!existingVendor) {
        throw new VendorNotFoundError(vendorId);
    }

    const updatedVendorLocation = await prisma.vendorLocation.update({
        where: {
            id: locationId
        },
        data: {
            ...safeVendorLocation,
            updatedBy: "Admin", // Placeholder, replace with actual user info
        },
        select: {
            id: true,
            vendorId: true,
            addressLine1: true,
            addressLine2: true,
            addressLine3: true,
            city: true,
            province: true,
            country: true,
            postalCode: true,
            isActive: true,
            createdBy: true,
            updatedBy: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    const safeUpdatedVendorLocation: VendorLocationDetailSchema = vendorLocationDetailSchema.parse(updatedVendorLocation);

    const response: ApiResponse<VendorLocationDetailSchema> = {
        data: safeUpdatedVendorLocation,
    }

    return response;
}

// Vendor Contact Handlers
export const getVendorContactByIdHandler = async (contactId: string, locationId: string, vendorId: string): Promise<ApiResponse<VendorContactDetailSchema>> => {
    const vendorContact = await prisma.vendorContact.findUnique({
        where: {
            id: contactId
        }
    });

    if (!vendorContact) {
        throw new VendorContactNotFoundError(contactId);
    }

    if (vendorContact.vendorLocationId !== locationId) {
        throw new VendorContactNotInLocationError(contactId);
    }

    const vendorLocation = await prisma.vendorLocation.findUnique({
        where: {
            id: locationId
        }
    });

    if (!vendorLocation) {
        throw new VendorLocationNotFoundError(locationId);
    }

    if (vendorLocation.vendorId !== vendorId) {
        throw new VendorLocationNotInVendorError(vendorId);
    }

    const vendor = await prisma.vendor.findUnique({
        where: {
            id: vendorId
        }
    });

    if (!vendor) {
        throw new VendorNotFoundError(vendorId);
    }

    const safeVendorContact: VendorContactDetailSchema = vendorContactDetailSchema.parse(vendorContact);

    const response: ApiResponse<VendorContactDetailSchema> = {
        data: safeVendorContact,
    }

    return response;
}

export const createVendorContactHandler = async (locationId: string, vendorId: string, vendorContact: unknown): Promise<ApiResponse<VendorContactDetailSchema>> => {
    const safeVendorContact: CreateVendorContactSchema = createVendorContactSchema.parse(vendorContact);

    const existingVendorLocation = await prisma.vendorLocation.findUnique({
        where: {
            id: locationId
        }
    });
    
    if (!existingVendorLocation) {
        throw new VendorLocationNotFoundError(locationId);
    }

    if (existingVendorLocation.vendorId !== vendorId) {
        throw new VendorLocationNotInVendorError(vendorId);
    }

    const existingVendor = await prisma.vendor.findUnique({
        where: {
            id: vendorId
        }
    });

    if (!existingVendor) {
        throw new VendorNotFoundError(vendorId);
    }

    const newVendorContact = await prisma.vendorContact.create({
        data: {
            ...safeVendorContact,
            vendorLocationId: locationId,
            createdBy: "Admin", // Placeholder, replace with actual user info
        },
        select: {
            id: true,
            vendorLocationId: true,
            contactName: true,
            phoneNumber: true,
            email: true,
            isActive: true,
            createdBy: true,
            updatedBy: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    const safeNewVendorContact: VendorContactDetailSchema = vendorContactDetailSchema.parse(newVendorContact);

    const response: ApiResponse<VendorContactDetailSchema> = {
        data: safeNewVendorContact,
    }

    return response;
}

export const updateVendorContactHandler = async (contactId: string, locationId: string, vendorId: string, vendorContact: unknown): Promise<ApiResponse<VendorContactDetailSchema>> => {
    const safeVendorContact: UpdateVendorContactSchema = updateVendorContactSchema.parse(vendorContact);

    const existingVendorContact = await prisma.vendorContact.findUnique({
        where: {
            id: contactId
        }
    });

    if (!existingVendorContact) {
        throw new VendorContactNotFoundError(contactId);
    }

    if (existingVendorContact.vendorLocationId !== locationId) {
        throw new VendorContactNotInLocationError(contactId);
    }

    const existingVendorLocation = await prisma.vendorLocation.findUnique({
        where: {
            id: locationId
        }
    });

    if (!existingVendorLocation) {
        throw new VendorLocationNotFoundError(locationId);
    }

    if (existingVendorLocation.vendorId !== vendorId) {
        throw new VendorLocationNotInVendorError(vendorId);
    }

    const existingVendor = await prisma.vendor.findUnique({
        where: {
            id: vendorId
        }
    });

    if (!existingVendor) {
        throw new VendorNotFoundError(vendorId);
    }

    const updatedVendorContact = await prisma.vendorContact.update({
        where: {
            id: contactId
        },
        data: {
            ...safeVendorContact,
            updatedBy: "Admin", // Placeholder, replace with actual user info
        },
    });

    const safeUpdatedVendorContact: VendorContactDetailSchema = vendorContactDetailSchema.parse(updatedVendorContact);

    const response: ApiResponse<VendorContactDetailSchema> = {
        data: safeUpdatedVendorContact,
    }

    return response;
}