import { z } from 'zod'
import { CowBreed, CowCategory, CowLocation, Cowlabel } from './cow.constant'

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'age is required',
    }),
    location: z.enum([...CowLocation] as [string, ...string[]], {
      required_error: 'Location is required',
    }),
    breed: z.enum([...CowBreed] as [string, ...string[]], {
      required_error: 'Breed is required',
    }),
    weight: z.number({
      required_error: 'weight is required',
    }),
    label: z.enum([...Cowlabel] as [string, ...string[]], {
      required_error: 'label is required',
    }),
    category: z.enum([...CowCategory] as [string, ...string[]], {
      required_error: 'Category is required',
    }),
    seller: z.string({
      required_error: 'Seller Id is required',
    }),
  }),
})

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'age is required',
    }),
    location: z.enum([...CowLocation] as [string, ...string[]], {
      required_error: 'Location is required',
    }),
    breed: z.enum([...CowBreed] as [string, ...string[]], {
      required_error: 'Breed is required',
    }),
    weight: z.number({
      required_error: 'weight is required',
    }),
    label: z.enum([...Cowlabel] as [string, ...string[]], {
      required_error: 'label is required',
    }),
    category: z.enum([...CowCategory] as [string, ...string[]], {
      required_error: 'Category is required',
    }),
    seller: z
      .string({
        required_error: 'Seller Id is required',
      })
      .optional(),
  }),
})

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
}
