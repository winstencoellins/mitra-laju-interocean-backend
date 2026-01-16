import prisma from "../../db/client";
import { ApiResponse } from "../../types/api-response";
import { VendorAlreadyExistsError, VendorNotFoundError } from "./vendor.error";
import { createVendorSchema, CreateVendorSchema, vendorDetailSchema, VendorDetailSchema, vendorSchema, VendorSchema, UpdateVendorSchema, updateVendorSchema } from "./vendor.schema";

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
        }
    });

    const safeResponse: VendorDetailSchema = vendorDetailSchema.parse(updatedVendor);

    const response: ApiResponse<VendorDetailSchema> = {
        data: safeResponse,
    }

    return response;
}