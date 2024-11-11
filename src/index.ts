import path from 'path'
import dotenv from 'dotenv'
import express /*, { Request, Response , NextFunction } */ from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
//import mongoose from 'mongoose'
import serverless from 'serverless-http'
import 'source-map-support/register'

import { errorHandler, notFound } from 'middleware/errorMiddleware'
import healthRoute from './routes/healthRoute'
import appUseSwagger from 'utils/swagger'

dotenv.config()
const app = express()

/* ======================
        cors()
====================== */

// const allowOrigins: string[] = [
//   // 'http://localhost:3000'
//   // '...'
// ]

// const corsOptions = {
//   origin: (origin: any, callback: any) => {
//     // This should allow all origins during development.
//     // This way, we can test Postman calls.
//     // An alternative syntax would be: if (!origin) { callback(null, true) }
//     if (process.env.NODE_ENV === 'development') {
//       // The first arg is the error object.
//       // The second arg is the allowed boolean.
//       callback(null, true)
//       // This else if is saying if the origin URL is in the
//       // list of allowedOrigins, then allow it (i.e. callback(null, true))
//       // Note: that will also end up disallowing Postman
//     } else if (allowOrigins.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true, // This sets the Access-Control-Allow-Credentials header
//   // methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
//   // The default may be 204, but some devices have issues with that
//   // (Smart TVs, older browsers, etc), so you might want to set it to 200 instead.
//   optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions)) // You should be able to just do app.use(cors()) when a public API

app.use(cors())

/* ======================
    Global Middleware
====================== */

app.use(morgan('dev'))

app.use(express.json({ limit: '50mb' })) // ???
app.use(express.urlencoded({ extended: true })) // For handling FormData
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public'))) // For serving static files (CSS, etc.)

appUseSwagger(app)

/* ======================
        Routes
====================== */

app.get('/', (req, res) => {
  return res.status(200).json({
    data: {
      secret: process.env.SECRET || '???',
      NODE_ENV: process.env.NODE_ENV || '???'
    },
    message: `You accessed the '/' route (CICD Test 4).`,
    success: true
  })
})

app.get('/api', (req, res) => {
  return res.status(200).json({
    data: null,
    message: `You accessed the '/api' route.`,
    success: true
  })
})

app.use('/api/health', healthRoute)

app.use(notFound)
app.use(errorHandler)

/* ======================

====================== */

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 5000
  app.listen(port, () => console.log(`Server listening on port ${port}!`))
}

export const handler = serverless(app, { provider: 'aws' })
