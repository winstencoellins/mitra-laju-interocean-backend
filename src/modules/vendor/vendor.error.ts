import { AppError } from "../../errors/app.error"

export class VendorNotFoundError extends AppError {
    constructor(vendorId: string) {
        super(`Vendor with ID ${vendorId} not found.`, "VENDOR_NOT_FOUND_ERROR", 404);
    }
}

export class VendorAlreadyExistsError extends AppError {
    constructor(vendorName: string, vendorCode: string) {
        super(`Vendor with name ${vendorName} and code ${vendorCode} already exists.`, "VENDOR_ALREADY_EXISTS_ERROR", 409);
    }
}