import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { CowService } from './cow.service'

const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...cow } = req.body
    const result = await CowService.createCow(cow)
    res.status(200).json({
      success: true,
      message: 'user create successfully',
      data: result,
    })
  }
)

export const CowController = {
  createCow,
}
