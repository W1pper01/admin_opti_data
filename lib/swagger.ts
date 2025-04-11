import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
      tags: [
        {
          name: "Movies Management",
          description: "Operations related to multiple movies"
        },
        {
          name: "Single Movie Operations",
          description: "Operations related to a specific movie"
        },
        {
          name: "Movie Comments Operations",
          description: "Operations related to all comments for a movie"
        },
        {
          name: "Single Comment Operations",
          description: "Operations related to a specific comment"
        }
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
    },
  });
  return spec;
};