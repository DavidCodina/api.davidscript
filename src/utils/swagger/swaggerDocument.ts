import { OpenAPIV3_1 } from 'openapi-types'
import { version } from 'package.json'
import { healthRoutePathsObject } from 'routes//healthRoute/docs'
//import { authRoutesPathsObject } from 'routes/authRoutes/docs'
//import { userRoutesPathsObject } from 'routes/userRoutes/docs'

// import {
//   todoRoutesPathsObject,
//   todoRoutesSchemasObject
// } from 'routes/todoRoutes/docs'

type SwaggerDocument = OpenAPIV3_1.Document
// type PathsObject = OpenAPIV3_1.PathsObject
// type PathItemObject = OpenAPIV3_1.PathItemObject

/* ======================

====================== */
// https://swagger.io/specification/

export const swaggerDocument: SwaggerDocument = {
  openapi: '3.1.1',
  info: {
    title: 'REST API Docs',
    summary: 'Summary: A basic REST API setup...',
    description:
      'Description: API endponts for health, auth, users and todos...',
    termsOfService: 'https://davidscript.com/terms',
    contact: {
      name: 'David Codina',
      url: 'https://davidscript.com',
      email: 'davidmcodina@icloud.com'
    },
    // To properly license your project under the MIT License (or any other license),
    // you need to include an actual license file in your project's root directory.
    license: {
      //name: 'MIT', url: 'https://opensource.org/licenses/MIT'
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    },
    version: version
  },
  // schemes is not needed in OpenAPI 3.0.0 and later.
  // servers replaces the functionality of schemes by specifying the URLs and protocols.
  // schemes: [],
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development Server'
      // variables?: { [key: string]: ServerVariable } | undefined;
    },
    { url: 'https://api.davidscript.com', description: 'Production Server' }
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            // https://swagger.io/docs/specification/v3_0/data-models/data-types/
            // format is an open value, so you can use any formats, even not
            // those defined by the OpenAPI Specification.
            format: 'MongoDB ObjectId',
            description: 'MongoDB ObjectId'
          },
          userName: {
            type: 'string'
          },
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          email: {
            type: 'string',
            format: 'email'
          },
          // Even though it exists in the database model, it should never be included.
          // password: { type: 'string' },
          phone: {
            // This seems to be the closest we can come to indicating that
            // it may or may not be present in the response data.
            type: ['string', 'null'],

            // pattern: '^\\+?[1-9]\\d{1,14}$'
            description: 'Optional. It will be string or undefined.'
          },
          roles: {
            type: ['array', 'null'],

            description: 'Not optional, but may not be returned in response.',
            items: {
              type: 'string'
            },
            default: ['user']
          },
          isActive: {
            type: 'boolean',
            default: true
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        },
        example: {}
      }
      // ...todoRoutesSchemasObject
    }
  },
  // security: []
  // externalDocs?: ExternalDocumentation | undefined;

  // Gotcha: Originally I was using JSDoc comments in the actual route definitions.
  // The problem with that is esbuild strips out all comments, so I switched to
  // using object syntax, then spreading them here.
  paths: {
    ...healthRoutePathsObject
    // ...authRoutesPathsObject,
    // ...userRoutesPathsObject,
    // ...todoRoutesPathsObject
  }
}
