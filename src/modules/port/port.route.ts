import { createPortHandler, getAllPortsHandler, getPortByIdHandler } from "./port.handler";
import { CreatePortSchema } from "./port.schema";

export function portRoutes(app: any) {
    app.get("/ports", getAllPortsHandler)
    app.get("/ports/:id", ({ params }: { params: { id: string } }) => getPortByIdHandler(params.id))
    app.post("/ports", ({ body }: { body: unknown }) => createPortHandler(body))
}