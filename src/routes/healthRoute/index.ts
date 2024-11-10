import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  return res.status(200).json({
    data: null,
    message: `You accessed the '/api/health' route.`,
    success: true
  })
})

export default router
