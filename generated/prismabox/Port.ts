import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PortPlain = t.Object(
  {
    id: t.String(),
    portName: t.String(),
    portCountry: t.String(),
    isActive: t.Boolean(),
    createdBy: t.String(),
    updatedBy: __nullable__(t.String()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const PortRelations = t.Object({}, { additionalProperties: false });

export const PortPlainInputCreate = t.Object(
  {
    portName: t.String(),
    portCountry: t.String(),
    isActive: t.Optional(t.Boolean()),
    createdBy: t.String(),
    updatedBy: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const PortPlainInputUpdate = t.Object(
  {
    portName: t.Optional(t.String()),
    portCountry: t.Optional(t.String()),
    isActive: t.Optional(t.Boolean()),
    createdBy: t.Optional(t.String()),
    updatedBy: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const PortRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const PortRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const PortWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          portName: t.String(),
          portCountry: t.String(),
          isActive: t.Boolean(),
          createdBy: t.String(),
          updatedBy: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Port" },
  ),
);

export const PortWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              portName: t.String(),
              portCountry: t.String(),
              isActive: t.Boolean(),
              createdBy: t.String(),
              updatedBy: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Port" },
);

export const PortSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      portName: t.Boolean(),
      portCountry: t.Boolean(),
      isActive: t.Boolean(),
      createdBy: t.Boolean(),
      updatedBy: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PortInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const PortOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      portName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      portCountry: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isActive: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdBy: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedBy: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Port = t.Composite([PortPlain, PortRelations], {
  additionalProperties: false,
});

export const PortInputCreate = t.Composite(
  [PortPlainInputCreate, PortRelationsInputCreate],
  { additionalProperties: false },
);

export const PortInputUpdate = t.Composite(
  [PortPlainInputUpdate, PortRelationsInputUpdate],
  { additionalProperties: false },
);
