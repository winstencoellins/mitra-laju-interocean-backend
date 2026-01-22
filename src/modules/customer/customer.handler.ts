import prisma from "../../db/client"
import { ApiResponse } from "../../types/api-response";
import { CustomerAlreadyExistsError, CustomerNotFoundError, CustomerLocationNotFoundError } from "./customer.error";
import { CreateCustomerSchema, customerDetailSchema, CustomerDetailSchema, customerSchema, CustomerSchema, createCustomerSchema, updateCustomerSchema, UpdateCustomerSchema, CustomerLocationSchema, customerLocationSchema, CreateCustomerLocationSchema } from "./customer.schema";

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
        }
    });

    const safeUpdatedCustomer: CustomerDetailSchema = customerDetailSchema.parse(updatedCustomer);

    const response: ApiResponse<CustomerDetailSchema> = {
        data: safeUpdatedCustomer,
    }

    return response;
}

// Customer Location Handlers
export const getCustomerLocationByIdHandler = async (locationId: string, customerId: string): Promise<ApiResponse<CustomerLocationSchema>> => {
    const customerLocation = await prisma.customerLocation.findFirst(
        {
            where: {
                id: locationId,
            },
            include: {
                customerContacts: {
                    select: {
                        id: true,
                        contactName: true,
                        phoneNumber: true,
                        email: true,
                        isActive: true
                    }
                }
            }
        }
    )

    if (!customerLocation) throw new CustomerLocationNotFoundError(locationId);

    if (customerLocation.customerId !== customerId) {
        throw new CustomerNotFoundError(customerId);
    }

    const safeCustomerLocation: CustomerLocationSchema = customerLocationSchema.parse(customerLocation);

    const response: ApiResponse<CustomerLocationSchema> = {
        data: safeCustomerLocation
    }

    return response
}

export const createCustomerLocationHandler = async (customerId: string, customerLocation: CreateCustomerLocationSchema): Promise<ApiResponse<CustomerLocationSchema>> => {
    // Implementation here
    // const safeCustomer: CustomerLocationSchema = customerLocationSchema.parse(customerLocation);

    // const newLocation = await prisma.customerLocation.create({
    //     data: {
    //         addressLine1: safeCustomer.addressLine1,
    //         addressLine2: safeCustomer.addressLine2,
    //         addressLine3: safeCustomer.addressLine3,
    //         city: safeCustomer.city,
    //         province: safeCustomer.province,
    //         country: safeCustomer.country,
    //         postalCode: safeCustomer.postalCode,
    //         customerId: customerId,
    //         createdBy: "Admin", // Placeholder, replace with actual user info
    //     }
    // });
    throw new Error("Not implemented");
}

export const updateCustomerLocationHandler = async (locationId: string, customerId: string): Promise<ApiResponse<any>> => {
    // Implementation here
    throw new Error("Not implemented");
}

// Customer Contact Handlers
export const getCustomerContactByIdHandler = async (contactId: string, locationId: string): Promise<ApiResponse<any>> => {
    // Implementation here
    throw new Error("Not implemented");
}

export const createCustomerContactHandler = async (locationId: string): Promise<ApiResponse<any>> => {
    // Implementation here
    throw new Error("Not implemented");
}

export const updateCustomerContactHandler = async (contactId: string, locationId: string): Promise<ApiResponse<any>> => {
    // Implementation here
    throw new Error("Not implemented");
}