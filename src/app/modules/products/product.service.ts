import { TProducts } from './products.interface'
import { Products } from './products.model'

const createProductIntoDB = async (payload: TProducts) => {
  const result = await Products.create(payload)
  return result
}

//:TODO> find and search and filter
const getProductsFromDB = async (query: Record<string, unknown>) => {
  const { sortBy, sortOrder } = query
  const searchableField = ['name', 'category', 'brand']

  let search = ''
  if (query?.search) {
    search = query.search as string
  }
  const sort: any = {}
  if (sortBy === 'price') sort.price = sortOrder === 'desc' ? 1 : -1
  if (sortBy === 'rating') sort.rating = sortOrder === 'desc' ? 1 : -1

  const result = await Products.find({
    $or: searchableField.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  }).sort(sort)

  return result
}

const deleteProductFromDB = async (id: string) => {
  const result = await Products.findByIdAndDelete(id)
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
}
