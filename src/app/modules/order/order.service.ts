import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { Cow } from '../cow/cow.model'
import { User } from '../user/user.model'
import { IOrder } from './order.interface'
import { Order } from './order.model'

const getAllOrder = async (): Promise<IOrder[] | null> => {
  const result = await Order.find()
  return result
}
const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const { cow } = order
    const selectedCow = await Cow.findById(cow).populate('seller')
    if (!selectedCow) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not found')
    }
    if (selectedCow.label === 'sold out') {
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

    if ((buyer.budget as number) < selectedCow.price) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Buyer have not enough money. Please Try to add  money and then Buy the cow'
      )
    }
    if (buyer.budget) {
      buyer.budget -= selectedCow.price
      await buyer.save()
    }

    const seller = await User.findById(selectedCow.seller)
    if (!seller || seller.role !== 'seller') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Seller')
    }
    seller.income = (seller.income || 0) + selectedCow.price
    await seller.save()
    selectedCow.label = 'sold out'
    await selectedCow.save()

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  const createOrder = await (await Order.create(order)).populate('cow', 'buyer')
  if (!createOrder) {
    throw new ApiError(400, 'Failed to create Order')
  }
  return createOrder
}

export const OrderService = {
  createOrder,
  getAllOrder,
}
