import prisma from "../../db/client"
import { ApiResponse } from "../../types/api-response";
import { CustomerAlreadyExistsError, CustomerNotFoundError, CustomerLocationNotFoundError, CustomerContactNotFoundError } from "./customer.error";
import { CreateCustomerSchema, customerDetailSchema, CustomerDetailSchema, customerSchema, CustomerSchema, createCustomerSchema, updateCustomerSchema, UpdateCustomerSchema, CreateCustomerLocationSchema, UpdateCustomerLocationSchema, updateCustomerLocationSchema, createCustomerLocationSchema, CustomerLocationDetailSchema, customerLocationDetailSchema, CustomerContactDetailSchema, customerContactDetailSchema, CreateCustomerContactSchema, createCustomerContactSchema, updateCustomerContactSchema, UpdateCustomerContactSchema } from "./customer.schema";

// Customer Handlers
export const getAllCustomersHandler = async (): Promise<ApiResponse<CustomerSchema[]>> => {
    const customers = await prisma.customer.findMany({
        select: {
            id: true,
            customerName: true,
            customerCode: true,
            npwp: true,
            isActive: true,
        }
    });

    const safeCustomers: CustomerSchema[] = customers.map((c) => customerSchema.parse(c));

    const response: ApiResponse<CustomerSchema[]> = {
        data: safeCustomers,
    }

    return response;
}

export const getCustomerByIdHandler = async (customerId: string): Promise<ApiResponse<CustomerDetailSchema>> => {
    const customer = await prisma.customer.findUnique({
        where: {
            id: customerId
        },
        include: {
            customerLocations: {
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
                    customerContacts: {
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

    if (!customer) {
        throw new CustomerNotFoundError(customerId);
    }

    const safeCustomer: CustomerDetailSchema = customerDetailSchema.parse(customer);

    const response: ApiResponse<CustomerDetailSchema> = {
        data: safeCustomer,
    }

    return response;
}

export const createCustomerHandler = async (customer: unknown): Promise<ApiResponse<CustomerDetailSchema>> => {
    const safeCustomer: CreateCustomerSchema = createCustomerSchema.parse(customer);

    const existingCustomer = await prisma.customer.findFirst({
        where: {
            customerName: safeCustomer.customerName,
            customerCode: safeCustomer.customerCode,
        }
    });

    if (existingCustomer) {
        throw new CustomerAlreadyExistsError(safeCustomer.customerName, safeCustomer.customerCode);
    }

    const newCustomer = await prisma.customer.create({
        data: {
            customerName: safeCustomer.customerName,
            customerCode: safeCustomer.customerCode,
            npwp: safeCustomer.npwp,
            createdBy: "Admin", // Placeholder, replace with actual user info
        },
        include: {
            customerLocations: true,
        }
    });

    const safeNewCustomer: CustomerDetailSchema = customerDetailSchema.parse(newCustomer);

    const response: ApiResponse<CustomerDetailSchema> = {
        data: safeNewCustomer,
    }

    return response;
}

export const updateCustomerHandler = async (customerId: string, customer: unknown): Promise<ApiResponse<CustomerDetailSchema>> => {
    const safeCustomer: UpdateCustomerSchema = updateCustomerSchema.parse(customer);

    const existingCustomer = await prisma.customer.findUnique({
        where: {
            id: customerId
        }
    });

    if (!existingCustomer) {
        throw new CustomerNotFoundError(customerId);
    }

    const customerWithSameNameAndCode = await prisma.customer.findFirst({
        where: {
            customerName: safeCustomer.customerName,
            customerCode: safeCustomer.customerCode,
            NOT: {
                id: customerId
            }
        }
    });

    if (customerWithSameNameAndCode) {
        throw new CustomerAlreadyExistsError(safeCustomer.customerName!, safeCustomer.customerCode!);
    }

    const updatedCustomer = await prisma.customer.update({
        where: {
            id: customerId
        },
        data: {
            ...safeCustomer,
            updatedBy: "Admin", // Placeholder, replace with actual user info
        },
        include: {
            customerLocations: true,
        }
    });

    const safeUpdatedCustomer: CustomerDetailSchema = customerDetailSchema.parse(updatedCustomer);

    const response: ApiResponse<CustomerDetailSchema> = {
        data: safeUpdatedCustomer,
    }

    return response;
}

// Customer Location Handlers
export const getCustomerLocationByIdHandler = async (locationId: string, customerId: string): Promise<ApiResponse<CustomerLocationDetailSchema>> => {
    const customerLocation = await prisma.customerLocation.findFirst(
        {
            where: {
                id: locationId,
            },
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
                createdBy: true,
                updatedBy: true,
                createdAt: true,
                updatedAt: true,
                customerId: true,
            }
        }
    )

    if (!customerLocation) throw new CustomerLocationNotFoundError(locationId);

    if (customerLocation.customerId !== customerId) {
        throw new CustomerNotFoundError(customerId);
    }

    const safeCustomerLocation: CustomerLocationDetailSchema = customerLocationDetailSchema.parse(customerLocation);

    const response: ApiResponse<CustomerLocationDetailSchema> = {
        data: safeCustomerLocation
    }

    return response
}

export const createCustomerLocationHandler = async (customerId: string, customerLocation: unknown): Promise<ApiResponse<CustomerLocationDetailSchema>> => {
    const safeCustomerLocation: CreateCustomerLocationSchema = createCustomerLocationSchema.parse(customerLocation);

    const newLocation = await prisma.customerLocation.create({
        data: {
            addressLine1: safeCustomerLocation.addressLine1,
            addressLine2: safeCustomerLocation.addressLine2,
            addressLine3: safeCustomerLocation.addressLine3,
            city: safeCustomerLocation.city,
            province: safeCustomerLocation.province,
            country: safeCustomerLocation.country,
            postalCode: safeCustomerLocation.postalCode,
            customerId: customerId,
            createdBy: "Admin", // Placeholder, replace with actual user info
        },
        select: {
            id: true,
            customerId: true,
            addressLine1: true,
            addressLine2: true,
            addressLine3: true,
            city: true,
            province: true,
            country: true,
            postalCode: true,
            createdBy: true,
            updatedBy: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
        }
    });

    const safeNewLocation: CustomerLocationDetailSchema = customerLocationDetailSchema.parse(newLocation);

    const response: ApiResponse<CustomerLocationDetailSchema> = {
        data: safeNewLocation
    }

    return response;
}

export const updateCustomerLocationHandler = async (locationId: string, customerId: string, customerLocation: unknown): Promise<ApiResponse<CustomerLocationDetailSchema>> => {
    const safeCustomerLocation: UpdateCustomerLocationSchema = updateCustomerLocationSchema.parse(customerLocation);

    const existingCustomerLocation = await prisma.customerLocation.findUnique({
        where: {
            id: locationId
        }
    });

    if (!existingCustomerLocation) {
        throw new CustomerLocationNotFoundError(locationId);
    }

    if (existingCustomerLocation.customerId !== customerId) {
        throw new CustomerNotFoundError(customerId);
    }

    const updatedCustomerLocation = await prisma.customerLocation.update({
        where: {
            id: locationId
        },
        data: {
            ...safeCustomerLocation,
            updatedBy: "Admin", // Placeholder, replace with actual user info
        },
        select: {
            id: true,
            customerId: true,
            addressLine1: true,
            addressLine2: true,
            addressLine3: true,
            city: true,
            province: true,
            country: true,
            postalCode: true,
            createdBy: true,
            updatedBy: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
        }
    });

    const safeUpdatedCustomerLocation: CustomerLocationDetailSchema = customerLocationDetailSchema.parse(updatedCustomerLocation);

    const response: ApiResponse<CustomerLocationDetailSchema> = {
        data: safeUpdatedCustomerLocation
    }

    return response;
}

// Customer Contact Handlers
export const getCustomerContactByIdHandler = async (contactId: string, locationId: string, customerId: string): Promise<ApiResponse<CustomerContactDetailSchema>> => {
    // Implementation here
    const customerContact = await prisma.customerContact.findUnique({
        where: {
            id: contactId
        },
        select: {
            id: true,
            customerLocationId: true,
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

    if (!customerContact) {
        throw new CustomerContactNotFoundError(contactId);
    }

    if (customerContact.customerLocationId !== locationId) {
        throw new CustomerLocationNotFoundError(locationId);
    }

    const customerLocation = await prisma.customerLocation.findUnique({
        where: {
            id: locationId
        }
    });

    if (!customerLocation) {
        throw new CustomerLocationNotFoundError(locationId);
    }

    if (customerLocation.customerId !== customerId) {
        throw new CustomerNotFoundError(customerId);
    }

    const safeCustomerContact: CustomerContactDetailSchema = customerContactDetailSchema.parse(customerContact);

    const response: ApiResponse<CustomerContactDetailSchema> = {
        data: safeCustomerContact
    }

    return response;
}

export const createCustomerContactHandler = async (locationId: string, customerId: string, customerContact: unknown): Promise<ApiResponse<CustomerContactDetailSchema>> => {
    const safeCustomerContact: CreateCustomerContactSchema = createCustomerContactSchema.parse(customerContact);

    const existingCustomer = await prisma.customer.findUnique({
        where: {
            id: customerId
        }
    });

    if (!existingCustomer) {
        throw new CustomerNotFoundError(customerId);
    }

    const existingCustomerLocation = await prisma.customerLocation.findUnique({
        where: {
            id: locationId
        }
    });

    if (!existingCustomerLocation) {
        throw new CustomerLocationNotFoundError(locationId);
    }

    if (existingCustomerLocation.customerId !== customerId) {
        throw new CustomerNotFoundError(customerId);
    }

    const newCustomerContact = await prisma.customerContact.create({
        data: {
            contactName: safeCustomerContact.contactName,
            phoneNumber: safeCustomerContact.phoneNumber,
            email: safeCustomerContact.email,
            customerLocationId: locationId,
            createdBy: "Admin", // Placeholder, replace with actual user info
        },
        select: {
            id: true,
            customerLocationId: true,
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

    const safeNewCustomerContact: CustomerContactDetailSchema = customerContactDetailSchema.parse(newCustomerContact);

    const response: ApiResponse<CustomerContactDetailSchema> = {
        data: safeNewCustomerContact
    }

    return response;
}

export const updateCustomerContactHandler = async (contactId: string, locationId: string, customerId: string, customerContact: unknown): Promise<ApiResponse<CustomerContactDetailSchema>> => {
    const safeCustomerContact: UpdateCustomerContactSchema = updateCustomerContactSchema.parse(customerContact);

    const existingCustomerContact = await prisma.customerContact.findUnique({
        where: {
            id: contactId
        }
    });

    if (!existingCustomerContact) {
        throw new CustomerContactNotFoundError(contactId);
    }

    if (existingCustomerContact.customerLocationId !== locationId) {
        throw new CustomerLocationNotFoundError(locationId);
    }

    const existingCustomerLocation = await prisma.customerLocation.findUnique({
        where: {
            id: locationId
        }
    });

    if (!existingCustomerLocation) {
        throw new CustomerLocationNotFoundError(locationId);
    }
    
    if (existingCustomerLocation.customerId !== customerId) {
        throw new CustomerNotFoundError(customerId);
    }

    const existingCustomer = await prisma.customer.findUnique({
        where: {
            id: customerId
        }
    });

    if (!existingCustomer) {
        throw new CustomerNotFoundError(customerId);
    }

    const updatedCustomerContact = await prisma.customerContact.update({
        where: {
            id: contactId
        },
        data: {
            ...safeCustomerContact,
            updatedBy: "Admin", // Placeholder, replace with actual user info
        },
        select: {
            id: true,
            customerLocationId: true,
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

    const safeUpdatedCustomerContact: CustomerContactDetailSchema = customerContactDetailSchema.parse(updatedCustomerContact);

    const response: ApiResponse<CustomerContactDetailSchema> = {
        data: safeUpdatedCustomerContact
    }

    return response;
}