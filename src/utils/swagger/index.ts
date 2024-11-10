///////////////////////////////////////////////////////////////////////////
//
// https://swagger.io/
// https://swagger.io/docs/
// https://editor.swagger.io/
//
// Data Types: https://swagger.io/docs/specification/v3_0/data-models/data-types/
// Parameters: https://swagger.io/docs/specification/v3_0/describing-parameters/
//
//  ts-swagger-docs,
//
/////////////////////////
//
// ✅ https://learn.openapis.org/
//
// ✅ https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.1.md
//
// ✅ https://blog.logrocket.com/documenting-express-js-api-swagger/
//
// ✅ https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do
//
// ✅ https://github.com/Surnet/swagger-jsdoc/blob/master/README.md
//
// ✅ TomDoesTech: https://www.youtube.com/watch?v=5aryMKiBEKY
//    https://github.com/TomDoesTech/REST-API-Tutorial-Updated
//
// ✅ Syed Zano: https://www.youtube.com/watch?v=EnMQm365t_s
//    He uses yaml package.
//    At 59:00 he demonstrates a file upload.
//    consumes:
//      - multipart/form-data
//
// ✅ Maksim Ivanov: https://www.youtube.com/watch?v=S8kmHtQeflo
//
// ✅ Daily Web Coding: https://www.youtube.com/watch?v=sTLJ1mHpsOI
//
// ✅ Catalin Pit: https://www.youtube.com/watch?v=D51Zuinx64s
//
///////////////////////////////////////////////////////////////////////////

import { Express, Request, Response } from 'express'
///////////////////////////////////////////////////////////////////////////
//
// Originally, I was using swagger-jsdoc, but the JSDoc comments get
// stripped from the bundle in the final production build, even when not minified.
// The major benefit of JSDoc comments is that they automatically get picked up
// without having to import anything. The downside is that they're ugly and bloat
// the actual files. Additionally, it's much easier to make a syntax error
// (e.g., indendation) in JSDoc vs in JSON or typescript. Additionally, using
// object syntax allows us to implement type safety:
//
//   import { OpenAPIV3_1 } from 'openapi-types'
//   type PathsObject = OpenAPIV3_1.PathsObject
//
///////////////////////////////////////////////////////////////////////////
// import swaggerJsdoc from 'swagger-jsdoc'

import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './swaggerDocument'

/* ======================

====================== */

const appUseSwagger = (app: Express) => {
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCssUrl: '/styles/swagger.css',
      ///////////////////////////////////////////////////////////////////////////
      //
      // The explorer allows you to open a different OpenAPI JSON files, it's NOT a search.
      // For example, in my own Swagger UI at /api/docs, I can open:
      //
      //   https://petstore.swagger.io/v2/swagger.json
      //   https://validator.swagger.io/validator/openapi.json
      //
      // Conversely, we can go to: https://validator.swagger.io/
      // Then enter: https://api.davidscript.com/api/docs.json
      // Assuming, the CORS policy is open (i.e., app.use(cors())), then
      // the explorer should display that JSON document.
      //
      ///////////////////////////////////////////////////////////////////////////
      explorer: true
    })
  )

  app.get('/api/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerDocument)
  })
}

export default appUseSwagger
