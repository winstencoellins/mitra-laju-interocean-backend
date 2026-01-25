import { createVendorContactHandler, createVendorHandler, createVendorLocationHandler, getAllVendorsHandler, getVendorByIdHandler, getVendorContactByIdHandler, getVendorLocationByIdHandler, updateVendorContactHandler, updateVendorHandler, updateVendorLocationHandler } from "./vendor.handler"

export function vendorRoutes(app: any) {
    // Vendor Routes
    app.get('/vendors', getAllVendorsHandler)
    app.get('/vendors/:id', ({ params }: { params: { id: string } }) => getVendorByIdHandler(params.id))
    app.post('/vendors', ({ body }: { body: unknown }) => createVendorHandler(body))
    app.put('/vendors/:id', ({ params, body }: { params: { id: string }, body: unknown }) => updateVendorHandler(params.id, body))

    // Vendor Location Routes
    app.get('/vendors/:id/locations/:locationId', ({ params }: { params: { id: string, locationId: string } }) => getVendorLocationByIdHandler(params.locationId, params.id))
    app.post('/vendors/:id/locations', ({ params, body }: { params: { id: string }, body: unknown }) => createVendorLocationHandler(params.id, body))
    app.put('/vendors/:id/locations/:locationId', ({ params, body }: { params: { id: string, locationId: string }, body: unknown }) => updateVendorLocationHandler(params.locationId, params.id, body))

    // Vendor Contact Routes
    app.get('/vendors/:id/locations/:locationId/contacts/:contactId', ({ params }: { params: { id: string, locationId: string, contactId: string } }) => getVendorContactByIdHandler(params.contactId, params.locationId, params.id))
    app.post('/vendors/:id/locations/:locationId/contacts', ({ params, body }: { params: { id: string, locationId: string }, body: unknown }) => createVendorContactHandler(params.locationId, params.id, body))
    app.put('/vendors/:id/locations/:locationId/contacts/:contactId', ({ params, body }: { params: { id: string, locationId: string, contactId: string }, body: unknown }) => updateVendorContactHandler(params.contactId, params.locationId, params.id, body))
}