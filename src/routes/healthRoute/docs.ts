import { OpenAPIV3_1 } from 'openapi-types'
type PathsObject = OpenAPIV3_1.PathsObject

/* ======================

====================== */

export const healthRoutePathsObject: PathsObject = {
  '/api/health': {
    get: {
      tags: ['Health'],
      summary: 'Tests that API is running.',
      description: 'Responds if the app is up and running',

      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ///////////////////////////////////////////////////////////////////////////
                  //
                  // ❌ data: { type: 'null' },
                  // null is in the auto suggestions from SwaggerDocument, but choosing
                  // null causes a red squiggly underneath '/api/health' above.
                  //
                  // The TypeScript error you're encountering is due to the fact that the OpenAPI specification
                  // does not recognize "null" as a valid type for the type property in the schema object.
                  // The type hinting is misleading. The best solution I could come up with is doing this:
                  //
                  ///////////////////////////////////////////////////////////////////////////
                  data: {
                    type: 'object',
                    nullable: true,
                    description: 'The data property will always be null.',
                    format: 'null'
                  },

                  message: { type: 'string' },
                  success: { type: 'boolean' }
                },
                example: {
                  data: null,
                  message: "You accessed the '/api/health' route.",
                  success: true
                }
              }
            }
          }
        }
      }
    }
  }
}
