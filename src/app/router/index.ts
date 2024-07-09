import { Router } from 'express'
import { productRoutes } from '../modules/products/product.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/',
    route: productRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
