import { Elysia } from "elysia";
import { portRoutes } from "./modules/port/port.route";
import { logger } from "@bogeychan/elysia-logger";
import { AppError } from "./errors/app.error";
import { ZodError } from "zod";
import { ApiResponse } from "./types/api-response";
import { vesselRoutes } from "./modules/vessel/vessel.route";
import openapi from "@elysiajs/openapi";
import { customerRoutes } from "./modules/customer/customer.route";
import { vendorRoutes } from "./modules/vendor/vendor.route";

export const app = new Elysia();

app.use(openapi())

app.use(
  logger({
    level: "error"
  })
)

app
  .error({ AppError })
  .onError(({ error }): ApiResponse<any> => {
    if (error instanceof ZodError) {
      return {
        data: null,
        error: {
          code: "ZOD_VALIDATION_ERROR",
          message: error.message
        }
      }
    }

    if (error instanceof AppError) {
      return {
        data: null,
        error: {
          code: error.code,
          message: error.message,
        }
      }
    }

    console.error(error)
    return {
      data: null,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong. Please try again later."
      }
    }
  })

app.get("/", () => "Hello Elysia")

portRoutes(app)
vesselRoutes(app)
customerRoutes(app)
vendorRoutes(app)

app.listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
