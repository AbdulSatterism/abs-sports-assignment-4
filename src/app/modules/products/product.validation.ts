import { z } from 'zod'

const createProductValidation = z.object({
  body: z.object({
    name: z.string(),
    category: z.string(),
    quantity: z.number(),
    rating: z.number(),
    price: z.number(),
    brand: z.string(),
    description: z.string(),
    image: z.string(),
    inStock: z.boolean(),
  }),
})

const updateProductValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    quantity: z.number().optional(),
    rating: z.number().optional(),
    price: z.number().optional(),
    brand: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    inStock: z.boolean().optional(),
  }),
})

export const productValidations = {
  createProductValidation,
  updateProductValidation,
}
