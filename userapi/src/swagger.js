const swaggerJsdoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DSTI DevOps API',
      version: '0.1.0',
      description: 'Simple user management API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Alice Doe' },
            email: { type: 'string', example: 'alice@example.com' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string', example: 'Alice Doe' },
            email: { type: 'string', format: 'email', example: 'alice@example.com' },
          },
        },
      },
    },
    paths: {
      '/users': {
        get: {
          summary: 'List users',
          responses: {
            200: {
              description: 'Array of users',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Create user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserInput' },
              },
            },
          },
          responses: {
            201: {
              description: 'User created',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' },
                },
              },
            },
            400: { description: 'Validation error' },
          },
        },
      },
      '/users/{id}': {
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        get: {
          summary: 'Get user by id',
          responses: {
            200: {
              description: 'User found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' },
                },
              },
            },
            404: { description: 'User not found' },
          },
        },
        put: {
          summary: 'Update user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserInput' },
              },
            },
          },
          responses: {
            200: {
              description: 'User updated',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' },
                },
              },
            },
            400: { description: 'Validation error' },
            404: { description: 'User not found' },
          },
        },
        delete: {
          summary: 'Delete user',
          responses: {
            204: { description: 'User deleted' },
            404: { description: 'User not found' },
          },
        },
      },
    },
  },
  apis: [],
});

module.exports = swaggerSpec;
