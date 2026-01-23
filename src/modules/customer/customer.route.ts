import { createCustomerHandler, getAllCustomersHandler, getCustomerByIdHandler, getCustomerLocationByIdHandler, updateCustomerHandler, updateCustomerLocationHandler, createCustomerLocationHandler, getCustomerContactByIdHandler, createCustomerContactHandler, updateCustomerContactHandler } from "./customer.handler"

export function customerRoutes(app: any) {
    // Customer Routes
    app.get('/customers', getAllCustomersHandler)
    app.get('/customers/:id', ({ params }: { params: { id: string } }) => getCustomerByIdHandler(params.id))
    app.post('/customers', ({ body }: { body: unknown }) => createCustomerHandler(body))
    app.put('/customers/:id', ({ params, body }: { params: { id: string }, body: unknown }) => updateCustomerHandler(params.id, body))

    // Customer Location Routes
    app.get('/customers/:id/locations/:locationId', ({ params }: { params: { id: string, locationId: string } }) => getCustomerLocationByIdHandler(params.locationId, params.id))
    app.post('/customers/:id/locations', ({ params, body }: { params: { id: string }, body: unknown }) => createCustomerLocationHandler(params.id, body))
    app.put('/customers/:id/locations/:locationId', ({ params, body }: { params: { id: string, locationId: string }, body: unknown }) => updateCustomerLocationHandler(params.locationId, params.id, body))

    // Customer Contact Routes
    app.get('/customers/:id/locations/:locationId/contacts/:contactId', ({ params }: { params: { id: string, locationId: string, contactId: string } }) => getCustomerContactByIdHandler(params.contactId, params.locationId, params.id))
    app.post('/customers/:id/locations/:locationId/contacts', ({ params, body }: { params: { id: string, locationId: string }, body: unknown }) => createCustomerContactHandler(params.locationId, params.id, body))
    app.put('/customers/:id/locations/:locationId/contacts/:contactId', ({ params, body }: { params: { id: string, locationId: string, contactId: string }, body: unknown }) => updateCustomerContactHandler(params.contactId, params.locationId, params.id, body))
}