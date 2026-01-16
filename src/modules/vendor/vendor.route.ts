import { createVendorHandler, getAllVendorsHandler, getVendorByIdHandler, updateVendorHandler } from "./vendor.handler"

export function vendorRoutes(app: any) {
    app.get('/vendors', getAllVendorsHandler)
    app.get('/vendors/:id', ({ params }: { params: { id: string } }) => getVendorByIdHandler(params.id))
    app.post('/vendors', ({ body }: { body: unknown }) => createVendorHandler(body))
    app.put('/vendors/:id', ({ params, body }: { params: { id: string }, body: unknown }) => updateVendorHandler(params.id, body))
}