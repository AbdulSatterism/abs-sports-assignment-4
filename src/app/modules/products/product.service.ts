/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProducts } from './products.interface'
import { Products } from './products.model'

const createProductIntoDB = async (payload: TProducts) => {
  const result = await Products.create(payload)
  return result
}

const getProductsFromDB = async (query: Record<string, unknown>) => {
  const {
    search = '',
    category,
    minPrice,
    maxPrice,
    brand,
    sort,
    order = 'asc',
  } = query

  const filter = {} as any
  if (search) filter.name = { $regex: search, $options: 'i' }
  if (category) filter.category = { $regex: category, $options: 'i' }
  if (minPrice) filter.price = { ...filter.price, $gte: minPrice }
  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice }
  if (brand) filter.brand = { $regex: brand, $options: 'i' }

  const sortOrder = order === 'asc' ? 1 : -1
  const sortField = sort ? { [sort as any]: sortOrder } : { createdAt: -1 }

  let page = 1
  let skip = 0
  let limit = 6
  if (query?.limit) {
    limit = Number(query.limit)
  }

  if (query?.page) {
    page = Number(query.page)
    skip = (page - 1) * limit
  }

  const result = await Products.find(filter)
    .sort(sortField as any)
    .skip(skip)
    .limit(limit)

  return result
}

const deleteProductFromDB = async (id: string) => {
  const result = await Products.findByIdAndDelete(id)
  return result
}

const getSingleProductFromDB = async (id: string) => {
  const result = await Products.findById(id)
  return result
}

const getAllManageProductFromDB = async () => {
  const result = await Products.find()
  return result
}

const updateProductIntoDB = async (id: string, payload: TProducts) => {
  const result = await Products.findByIdAndUpdate(id, payload, { new: true })
  return result
}

export const productServices = {
  createProductIntoDB,
  getProductsFromDB,
  deleteProductFromDB,
  updateProductIntoDB,
  getSingleProductFromDB,
  getAllManageProductFromDB,
}
