import { Router } from 'express'
import controllers, { getTeachers, teacherLogin } from './teacher.controller'

const router = Router()

router
    .route('/login')
    .post(teacherLogin)
router
    .route('/')
    .get(getTeachers)
    .put(controllers.createOne)

router
    .route('/:id')
    .get(controllers.getOne)
    .post(controllers.updateOne)
    .delete(controllers.removeOne)

export default router