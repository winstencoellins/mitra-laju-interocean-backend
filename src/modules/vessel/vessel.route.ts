import { t } from 'elysia'
import { createVesselHandler, getAllVesselsHandler, getVesselByIdHandler } from "./vessel.handler";

export function vesselRoutes(app: any) {
    app.get('/vessels', getAllVesselsHandler)
    app.get('/vessels/:id', ({ params }: { params: { id: string } }) => getVesselByIdHandler(params.id), {
        params: t.Object({
            id: t.String()
        })
    })
    app.post('/vessels', ({ body }: { body: unknown }) => createVesselHandler(body))
}