import { z } from 'zod'

const productValidationSchema = z.object({
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

export const productValidations = { productValidationSchema }
