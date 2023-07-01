import express from 'express'
import { OrderController } from './order.controller'
const router = express.Router()

router.post('/:id', OrderController.createOrder)
router.get('/', OrderController.getAllOrder)

export default router
