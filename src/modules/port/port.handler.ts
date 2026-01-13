import prisma from "../../db/client";
import { ApiResponse } from "../../types/api-response";
import { PortAlreadyExistsError, PortNotFoundError } from "./port.error";
import { portDetailSchema, portSchema, PortSchema, PortDetailSchema, CreatePortSchema, createPortSchema } from "./port.schema";

export const getAllPortsHandler = async (): Promise<ApiResponse<PortSchema[]>> => {
    const ports = await prisma.port.findMany({
        select: {
            id: true,
            portName: true,
            portCountry: true,
            isActive: true
        }
    })

    const safePorts: PortSchema[] = ports.map((p) => portSchema.parse(p))

    const response: ApiResponse<PortSchema[]> = {
        data: safePorts,
    }

    return response
}

export const getPortByIdHandler = async (portId: string): Promise<ApiResponse<PortDetailSchema>> => {
    const port = await prisma.port.findUnique({
        where: {
            id: portId
        }
    })

    if (!port) throw new PortNotFoundError(portId)

    const safePort: PortDetailSchema = portDetailSchema.parse(port)

    const response: ApiResponse<PortDetailSchema> = {
        data: safePort
    }

    return response
}

export const createPortHandler = async (port: unknown): Promise<ApiResponse<PortDetailSchema>> => {
    const safePort: CreatePortSchema = createPortSchema.parse(port)

    const existingPort = await prisma.port.findFirst({
        where: {
            portName: safePort.portName,
            portCountry: safePort.portCountry
        }
    })

    if (existingPort) {
        throw new PortAlreadyExistsError(safePort.portName, safePort.portCountry)
    }

    const newPort = await prisma.port.create({
        data: {
            portName: safePort.portName,
            portCountry: safePort.portCountry,
            createdBy: "Admin"
        }
    })

    const safeResponse: PortDetailSchema = portDetailSchema.parse(newPort)

    const response: ApiResponse<PortDetailSchema> = {
        data: safeResponse
    }

    return response
}

export const updatePortByIdHandler = async () => {
    // Implement here
}