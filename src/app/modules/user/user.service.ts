import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createUser = await User.create(user)
  return createUser
}

export const UserService = {
  createUser,
}
