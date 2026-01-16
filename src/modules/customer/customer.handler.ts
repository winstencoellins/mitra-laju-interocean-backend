import prisma from "../../db/client"
import { ApiResponse } from "../../types/api-response";
import { CustomerAlreadyExistsError, CustomerNotFoundError } from "./customer.error";
import { CreateCustomerSchema, customerDetailSchema, CustomerDetailSchema, customerSchema, CustomerSchema, createCustomerSchema, updateCustomerSchema, UpdateCustomerSchema } from "./customer.schema";

// Customer Handlers
export const getAllCustomersHandler = async (): Promise<ApiResponse<CustomerSchema[]>> => {
    const customers = await prisma.customer.findMany({
        select: {
            id: true,
            customerName: true,
            customerCode: true,
            npwp: true,
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