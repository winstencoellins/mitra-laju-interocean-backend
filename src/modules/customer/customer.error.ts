import { AppError } from "../../errors/app.error";

// Customer Errors
export class CustomerNotFoundError extends AppError {
    constructor(customerId: string) {
        super(`Customer with ID ${customerId} not found.`, "CUSTOMER_NOT_FOUND_ERROR", 404);
    }
}

export class CustomerAlreadyExistsError extends AppError {
    constructor(customerName: string, customerCode: string) {
        super(`Customer with name ${customerName} and code ${customerCode} already exists.`, "CUSTOMER_ALREADY_EXISTS_ERROR", 409);
    }
}

export class CustomerLocationNotInCustomerError extends AppError {
    constructor(locationId: string) {
        super(`Location with ID ${locationId} is not associated with the customer.`, "CUSTOMER_LOCATION_NOT_IN_CUSTOMER_ERROR", 403);
    }
}

// Customer Location Errors
export class CustomerLocationNotFoundError extends AppError {
    constructor(locationId: string) {
        super(`Customer location with ID ${locationId} not found.`, "CUSTOMER_LOCATION_NOT_FOUND_ERROR", 404);
    }
}

export class CustomerContactNotInLocationError extends AppError {
    constructor(contactId: string) {
        super(`Contact with ID ${contactId} is not associated with this location.`, "CUSTOMER_CONTACT_NOT_IN_LOCATION_ERROR", 403);
    }
}

// Customer Contact Errors
export class CustomerContactNotFoundError extends AppError {
    constructor(contactId: string) {
        super(`Customer contact with ID ${contactId} not found.`, "CUSTOMER_CONTACT_NOT_FOUND_ERROR", 404);
    }
}