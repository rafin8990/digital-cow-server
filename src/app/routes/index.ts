import express from 'express'
import { UserRoutes } from '../modules/user/user.routes'
// import { AcademicSemesterRoutes } from '../Modules/academicSemister/academicSemister.route'
// import { UserRoutes } from '../Modules/user/user.routes'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes.router,
  },
  //   {
  //     path: '/academic-semister',
  //     route: AcademicSemesterRoutes,
  //   },
  /* {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  }, */
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
