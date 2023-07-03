import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AdminService } from './admin.service'

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...admin } = req.body
    const result = await AdminService.createAdmin(admin)
    res.status(200).json({
      success: true,
      message: 'Admin create successfully',
      data: result,
    })
  }
)

export const AdminController = {
  createAdmin,
}
