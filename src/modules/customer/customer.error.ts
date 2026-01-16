import { AppError } from "../../errors/app.error";

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