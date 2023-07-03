import httpStatus from 'http-status'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'

const createAdmin = async (admin: IUser): Promise<IUser | null> => {
  if (!admin.password) {
    admin.password = config.default_user_password as string
  }
  if (admin.role !== 'admin') {
    throw new ApiError(httpStatus.NOT_FOUND, 'role admin is required')
  }

  const createAdmin = await User.create(admin)
  if (!createAdmin) {
    throw new ApiError(400, 'Failed to create Admin')
  }
  return createAdmin
}

export const AdminService = {
  createAdmin,
}
