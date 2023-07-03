import { z } from 'zod'

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    address: z.string({
      required_error: 'address is required',
    }),
  }),
})

export const adminValidation = {
  createAdminZodSchema,
}
