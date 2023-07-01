import { Model, Schema, model } from 'mongoose'
import { IOrder } from './order.interface'

type cowModel = Model<IOrder, Record<string, unknown>>

const orderSchema = new Schema<IOrder>({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export const Order = model<IOrder, cowModel>('Order', orderSchema)
