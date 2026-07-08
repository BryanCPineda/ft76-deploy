const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "API de prueba de CRUD de usuarios",
    version: "1.0.0",
    description: "Documentación de la API para listar, buscar y crear usuarios."
  },
  servers: [
    { url: "http://localhost:3000" }
  ],
  tags: [
    {
      name: "Health",
      description: "Estado general del servidor"
    },
    {
      name: "Users",
      description: "Operaciones sobre usuarios"
    }
  ],
  components: {
    schemas: {
      WelcomeResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "server is running ok"
          }
        }
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          name: {
            type: "string",
            example: "Ana"
          },
          role: {
            type: "string",
            example: "student"
          }
        }
      },
      UserListResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "usuarios encontrados"
          },
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/User"
            }
          }
        }
      },
      UserByIdResponse: {
        type: "object",
        properties: {
          msg: {
            type: "string",
            example: "usuario encontrado"
          },
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/User"
            }
          }
        }
      },
      CreateUserRequest: {
        type: "object",
        required: ["name", "rol"],
        properties: {
          name: {
            type: "string",
            example: "Ana"
          },
          rol: {
            type: "string",
            enum: ["student"],
            example: "student"
          }
        }
      },
      CreateUserResponse: {
        type: "object",
        properties: {
          msg: {
            type: "string",
            example: "usuario creado con exito"
          },
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/User"
            }
          }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "el rol del usuario debe ser \"student\""
          }
        }
      }
    }
  },
  paths: {
    "/": {
      get: {
        tags: ["Health"],
        summary: "Mensaje de bienvenida",
        responses: {
          200: {
            description: "Servidor funcionando correctamente",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/WelcomeResponse"
                }
              }
            }
          }
        }
      }
    },
    "/users": {
      get: {
        tags: ["Users"],
        summary: "Listar usuarios",
        responses: {
          200: {
            description: "Usuarios encontrados",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserListResponse"
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Users"],
        summary: "Crear un usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateUserRequest"
              }
            }
          }
        },
        responses: {
          201: {
            description: "Usuario creado con éxito",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateUserResponse"
                }
              }
            }
          },
          400: {
            description: "Datos inválidos",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Buscar usuario por id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador del usuario",
            schema: {
              type: "integer",
              example: 1
            }
          }
        ],
        responses: {
          200: {
            description: "Usuario encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserByIdResponse"
                }
              }
            }
          },
          400: {
            description: "No existe un usuario con ese id",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    }
  }
}

module.exports = {
  swaggerSpec
}