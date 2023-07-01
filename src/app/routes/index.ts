import express from 'express'
import cowRoute from '../modules/cow/cow.route'
import OrderRoute from '../modules/order/order.route'
import userRoute from '../modules/user/user.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/cows',
    route: cowRoute,
  },
  {
    path: '/post',
    route: OrderRoute,
  },
]
moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
