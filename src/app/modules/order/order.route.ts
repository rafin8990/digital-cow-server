import express from 'express'
import { ENUM_USER_ROLE } from '../../enums/users'
import auth from '../../middlewares/auth'
import { OrderController } from './order.controller'
const router = express.Router()

router.post('/:id', auth(ENUM_USER_ROLE.BUYER), OrderController.createOrder)
router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  OrderController.getAllOrder
)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  OrderController.getAllOrder
)

export default router
