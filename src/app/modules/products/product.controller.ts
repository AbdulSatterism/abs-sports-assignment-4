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

export const productControllers = {
  createProduct,
}
