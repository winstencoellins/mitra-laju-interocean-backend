import { AppError } from "../../errors/app.error"

// Vendor Errors
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

// Vendor Location Errors
export class VendorLocationNotFoundError extends AppError {
    constructor(locationId: string) {
        super(`Vendor location with ID ${locationId} not found.`, "VENDOR_LOCATION_NOT_FOUND_ERROR", 404);
    }
}

export class VendorLocationNotInVendorError extends AppError {
    constructor(locationId: string) {
        super(`Location with ID ${locationId} is not associated with the vendor.`, "VENDOR_LOCATION_NOT_IN_VENDOR_ERROR", 403);
    }
}

// Vendor Contact Errors
export class VendorContactNotFoundError extends AppError {
    constructor(contactId: string) {
        super(`Vendor contact with ID ${contactId} not found.`, "VENDOR_CONTACT_NOT_FOUND_ERROR", 404);
    }
}

export class VendorContactNotInLocationError extends AppError {
    constructor(contactId: string) {
        super(`Contact with ID ${contactId} is not associated with this location.`, "VENDOR_CONTACT_NOT_IN_LOCATION_ERROR", 403);
    }
}