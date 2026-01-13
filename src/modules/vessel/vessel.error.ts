import { AppError } from "../../errors/app.error";

export class VesselNotFoundError extends AppError {
    constructor(vesselId: string) {
        super(`Vessel with ID ${vesselId} not found`, "VESSEL_NOT_FOUND", 404);
    }
}

export class VesselAlreadyExistsError extends AppError {
    constructor(vesselName: string, voyageNumber: string) {
        super(`Vessel with name ${vesselName} and voyage number ${voyageNumber} already exists`, "VESSEL_ALREADY_EXISTS", 409);
    }
}