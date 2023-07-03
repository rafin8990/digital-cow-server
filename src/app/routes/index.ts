import express from 'express'
import adminRoute from '../modules/admin/admin.route'
import loginRoute from '../modules/auth/auth.route'
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
    path: '/orders',
    route: OrderRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/admins',
    route: loginRoute,
  },
]
moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
