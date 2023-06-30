import ApiError from '../../../errors/ApiError'
import { ICow } from './cow.interface'
import { Cow } from './cow.model'

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const createCow = await Cow.create(cow)
  if (!createCow) {
    throw new ApiError(400, 'Failed to create Cow')
  }
  return createCow
}

export const CowService = {
  createCow,
}
