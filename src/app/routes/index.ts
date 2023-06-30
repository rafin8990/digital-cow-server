import express from 'express'
import cowRoute from '../modules/cow/cow.route'
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
]
moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
