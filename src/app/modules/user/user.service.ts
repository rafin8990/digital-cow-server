import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createUser = await User.create(user)
  if (!createUser) {
    throw new Error('Failed to create User')
  }
  return createUser
}

export default {
  createUser,
}
