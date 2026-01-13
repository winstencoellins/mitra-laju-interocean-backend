import prisma from "../../db/client";
import { ApiResponse } from "../../types/api-response";
import { VesselAlreadyExistsError, VesselNotFoundError } from "./vessel.error";
import { CreateVesselSchema, vesselDetailSchema, VesselDetailSchema, vesselSchema, VesselSchema, createVesselSchema } from "./vessel.schema";

export const getAllVesselsHandler = async (): Promise<ApiResponse<VesselSchema[]>> => {
    const vessels = await prisma.vessel.findMany({
        select: {
            id: true,
            vesselName: true,
            voyageNumber: true,
            etd: true,
            closingReefer: true,
            isActive: true
        }
    })

    const safeVessels: VesselSchema[] = vessels.map((v) => vesselSchema.parse(v));

    const response: ApiResponse<VesselSchema[]> = {
        data: safeVessels,
    }

    return response;
};

export const getVesselByIdHandler = async (vesselId: string): Promise<ApiResponse<VesselDetailSchema>> => {
    const vessel = await prisma.vessel.findUnique({
        where: {
            id: vesselId
        }
    });

    if (!vessel) {
        throw new VesselNotFoundError(vesselId);
    }

    const safeVessel: VesselDetailSchema = vesselDetailSchema.parse(vessel);

    const response: ApiResponse<VesselDetailSchema> = {
        data: safeVessel,
    }

    return response;
}

export const createVesselHandler = async (vessel: unknown): Promise<ApiResponse<VesselDetailSchema>> => {
    const safeVessel: CreateVesselSchema = createVesselSchema.parse(vessel);

    const existingVessel = await prisma.vessel.findFirst({
        where: {
            vesselName: safeVessel.vesselName,
            voyageNumber: safeVessel.voyageNumber
        }
    });

    if (existingVessel) {
        throw new VesselAlreadyExistsError(safeVessel.vesselName, safeVessel.voyageNumber);
    }
    
    const newVessel = await prisma.vessel.create({
        data: {
            vesselName: safeVessel.vesselName,
            voyageNumber: safeVessel.voyageNumber,
            etd: safeVessel.etd ? safeVessel.etd : undefined,
            closingReefer: safeVessel.closingReefer ? safeVessel.closingReefer : undefined,
            isActive: true,
            createdBy: "Admin" // Placeholder, replace with actual user info
        }
    });

    const safeResponse: VesselDetailSchema = vesselDetailSchema.parse(newVessel);

    const response: ApiResponse<VesselDetailSchema> = {
        data: safeResponse,
    }

    return response;
}