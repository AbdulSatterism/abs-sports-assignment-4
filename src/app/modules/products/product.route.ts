import { Router } from 'express'
import { productControllers } from './product.controller'

const router = Router()

router.post('/products', productControllers.createProduct)

export const productRoutes = router
