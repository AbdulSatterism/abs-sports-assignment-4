/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProducts } from './products.interface'
import { Products } from './products.model'

const createProductIntoDB = async (payload: TProducts) => {
  const result = await Products.create(payload)
  return result
}

//:TODO> find and search and filter
const getProductsFromDB = async (query: Record<string, unknown>) => {
  // const { sortBy, sortOrder ,page,pageSize} = query;
  const queryObj = { ...query }

  const searchableField = ['name', 'category', 'brand']

  const excludeFields = ['search', 'sortBy', 'sortOrder', 'page', 'limit']
  excludeFields.forEach((el) => delete queryObj[el])

  let search = ''
  if (query?.search) {
    search = query.search as string
  }
  const sort: any = {}
  if (query?.sortBy === 'price')
    sort.price = query?.sortOrder === 'desc' ? 1 : -1
  if (query?.sortBy === 'rating')
    sort.rating = query?.sortOrder === 'desc' ? 1 : -1

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

  const result = await Products.find({
    $or: searchableField.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  })
    .sort(sort)
    .sort({ createdAt: -1 })
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
