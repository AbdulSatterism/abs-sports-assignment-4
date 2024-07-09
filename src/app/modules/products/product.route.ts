import { Router } from 'express'
import { productControllers } from './product.controller'
import validateRequest from '../../middlewares/validateRequest'
import { productValidations } from './product.validation'

const router = Router()

router.post(
  '/products',
  validateRequest(productValidations.createProductValidation),
  productControllers.createProduct,
)

router.patch(
  '/product/:id',
  validateRequest(productValidations.updateProductValidation),
  productControllers.updateProduct,
)

router.get('/products', productControllers.getProducts)

router.get('/product/:id', productControllers.singleProduct)

router.delete('/product/:id', productControllers.deleteProducts)

export const productRoutes = router
