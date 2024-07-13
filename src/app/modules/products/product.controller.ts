import { productServices } from './product.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'

const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProductIntoDB(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'product created successfully',
    data: result,
  })
})

const getProducts = catchAsync(async (req, res) => {
  const result = await productServices.getProductsFromDB(req.query)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'all products get successfully',
    data: result,
  })
})

const singleProduct = catchAsync(async (req, res) => {
  const result = await productServices.getSingleProductFromDB(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'single product get successfully',
    data: result,
  })
})

const manageAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllManageProductFromDB()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: ' get all manage product successfully',
    data: result,
  })
})

const deleteProducts = catchAsync(async (req, res) => {
  const result = await productServices.deleteProductFromDB(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'product deleted successfully',
    data: result,
  })
})

const updateProduct = catchAsync(async (req, res) => {
  const result = await productServices.updateProductIntoDB(
    req.params.id,
    req.body,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'product updated successfully',
    data: result,
  })
})

export const productControllers = {
  createProduct,
  getProducts,
  deleteProducts,
  updateProduct,
  singleProduct,
  manageAllProducts
}
