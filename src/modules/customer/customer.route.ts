import { createCustomerHandler, getAllCustomersHandler, getCustomerByIdHandler, updateCustomerHandler } from "./customer.handler"

export function customerRoutes(app: any) {
    app.get('/customers', getAllCustomersHandler)
    app.get('/customers/:id', ({ params }: { params: { id: string } }) => getCustomerByIdHandler(params.id))
    app.post('/customers', ({ body }: { body: unknown }) => createCustomerHandler(body))
    app.put('/customers/:id', ({ params, body }: { params: { id: string }, body: unknown }) => updateCustomerHandler(params.id, body))
}