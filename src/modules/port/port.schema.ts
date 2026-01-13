import { t } from "elysia"

export const PortSchema = t.Object({
    id: t.String({ format: 'uuid' }),
    portName: t.String(),
    portCountry: t.String(),
    isActive: t.Boolean(),
})

export const CreatePortSchema = t.Object({
    portName: t.String(),
    portCountry: t.String(),
    isActive: t.Boolean().Optional(),
    createdBy: t.String(),
    updatedBy: t.String(),
})