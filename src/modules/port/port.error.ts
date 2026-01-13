import { AppError } from "../../errors/app.error";

export class PortNotFoundError extends AppError {
    constructor(portId: string) {
        super(
            `Port with ID ${portId} not found.`,
            "PORT_NOT_FOUND",
            404
        );
    }
}

export class PortAlreadyExistsError extends AppError {
    constructor(portName: string, portCountry: string) {
        super(
            `Port with name ${portName} and country ${portCountry} already exists.`,
            "PORT_ALREADY_EXISTS",
            409
        )
    }
}