import express from 'express'
import { ENUM_USER_ROLE } from '../../enums/users'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { CowController } from './cow.controller'
import { CowValidation } from './cow.validation'
const router = express.Router()

router.post(
  '/create-cow',
  validateRequest(CowValidation.createCowZodSchema),
  // auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow
)
router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getAllCows
)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCow
)
router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateCow
)
router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow)
export default router
