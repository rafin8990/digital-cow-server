import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthController } from './auth.controller'
import { LoginValidation } from './auth.validation'
const router = express.Router()

router.post(
  '/login',
  validateRequest(LoginValidation.loginZodSchema),
  AuthController.LoginUser
)

export default router
