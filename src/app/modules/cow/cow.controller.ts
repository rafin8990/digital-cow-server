import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { CowFilterableFields } from './cow.constant'
import { ICow } from './cow.interface'
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

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CowFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await CowService.getAllCows(filters, paginationOptions)

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

export const CowController = {
  createCow,
  getAllCows,
}
