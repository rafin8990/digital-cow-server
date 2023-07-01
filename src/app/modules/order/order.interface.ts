import { Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type IOrder = {
  seller: Types.ObjectId | IUser
  buyer: Types.ObjectId | IUser
}
