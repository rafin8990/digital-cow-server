import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { Cow } from '../cow/cow.model'
import { User } from '../user/user.model'
import { IOrder } from './order.interface'
import { Order } from './order.model'

const getAllOrder = async (): Promise<IOrder[] | null> => {
  const result = await Order.find()
    .populate({
      path: 'seller',
      model: 'User',
    })
    .populate({
      path: 'buyer',
      model: 'User',
    })
  return result
}
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id)
  return result
}
const createOrder = async (
  order: IOrder,
  id: string
): Promise<IOrder | null> => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const cow = await Cow.findById(id).populate('seller')
    if (!cow) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not found')
    }
    if (cow.label === 'sold out') {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Cow is already Sold out . Try to buy another one'
      )
    }

    const buyerId = order.buyer
    const buyer = await User.findById(buyerId)

    if (!buyer || buyer.role !== 'buyer') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Buyer')
    }

    if (buyer.budget < cow.price) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Buyer have not enough money. Please Try to add  money and then Buy the cow'
      )
    }

    buyer.budget -= cow.price
    await buyer.save()

    const seller = await User.findById(cow.seller)
    if (!seller || seller.role !== 'seller') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Seller')
    }
    seller.income = (seller.income || 0) + cow.price
    await seller.save()
    cow.label = 'sold out'
    await cow.save()

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  const createOrder = await (
    await Order.create(order)
  ).populate('buyer', 'seller')
  if (!createOrder) {
    throw new ApiError(400, 'Failed to create Order')
  }
  return createOrder
}

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
}
