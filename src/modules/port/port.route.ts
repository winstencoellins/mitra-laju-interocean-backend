import { createPortHandler, getAllPortsHandler, getPortByIdHandler, updatePortByIdHandler } from "./port.handler";

export function portRoutes(app: any) {
    app.get("/ports", getAllPortsHandler)
    app.get("/ports/:id", ({ params }: { params: { id: string } }) => getPortByIdHandler(params.id))
    app.post("/ports", ({ body }: { body: unknown }) => createPortHandler(body))
    app.put("/ports/:id", ({ params, body }: { params: { id: string }, body: unknown }) => updatePortByIdHandler(params.id, body))
}