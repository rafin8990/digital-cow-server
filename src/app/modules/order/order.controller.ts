import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { OrderService } from './order.service'

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...order } = req.body
    const id = req.params.id
    const result = await OrderService.createOrder(order, id)
    res.status(200).json({
      success: true,
      message: 'Order Placed successfully',
      data: result,
    })
  }
)

export const OrderController = {
  createOrder,
}
