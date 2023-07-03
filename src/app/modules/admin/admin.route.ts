import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AdminController } from './admin.controller'
import { adminValidation } from './admin.validation'
const router = express.Router()

router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminZodSchema),
  AdminController.createAdmin
)

export default router
