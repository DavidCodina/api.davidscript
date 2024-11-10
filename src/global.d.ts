import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'

///////////////////////////////////////////////////////////////////////////
//
// https://bobbyhadz.com/blog/typescript-make-types-global
// Note also that typescript-eslint recommends NOT using no-undef.
// https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
//
// The declare keyword in TypeScript is used to tell the compiler that the variable, class,
// function, or module is already defined elsewhere. When we use declare namespace Express,
// we're not overwriting the existing Express types, but rather adding to them.
//
// Note: Matt Pocock is generally against using global.d.ts files for types:
// https://www.youtube.com/watch?v=zu-EgnbmcLY&t=4s
// I'm only doing this here for User because I'm extending Request.
//
///////////////////////////////////////////////////////////////////////////

declare global {
  // Usage in a controller:
  // export const getTodos = async (req: Request, res: Response<CustomResBody>) => { ... }
  type CustomResBody = {
    data: any
    message: string
    success: boolean
    errors?: Record<string, string> | null
  }

  // Using type Controller is more convenient, but it's less obvisous that we're
  // changing the type of ResBody. Usage in a controller:
  // export const getTodos: Controller = async (req, res) => { ... }
  type Controller<T = CustomResBody> = (
    req: Request,
    res: Response<T>,
    next: NextFunction
  ) => Promise<Response<CustomResBody, Record<string, any>> | undefined>

  type Roles = 'user' | 'manager' | 'admin'

  type User = {
    _id: mongoose.Types.ObjectId // Don't use a string !!!
    userName: string
    firstName: string
    lastName: string
    email: string
    password: string
    phone?: string
    roles: Roles[]
    isActive: boolean
    // Note: In Node.js Date instances are logged as ISO strings, even though they are Date objects.
    // Conversely, in the browser, they are logged as UTC strings:
    // i.e., "2024-07-23T16:31:08.933Z" vs "Tue Jul 23 2024 10:31:08 GMT-0600 (Mountain Daylight Time)"
    createdAt: Date
    updatedAt: Date
  }

  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export {}
