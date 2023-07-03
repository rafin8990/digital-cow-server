import { Model } from 'mongoose'

export type IUser = {
  phoneNumber: string
  role: 'seller' | 'buyer' | 'admin'
  password: string
  name: {
    firstName: string
    lastName: string
  }
  address: string
  budget?: number
  income?: number
  needsPasswordChange: boolean
}
export type IUserMethods = {
  isUserExist(phoneNumber: string): Promise<Partial<IUser> | null>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
