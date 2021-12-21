/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-04 17:43:25
 * @LastEditTime: 2021-11-09 15:44:16
 * @Description:
 * @LastEditors: Cool
 */
import koaRouter from 'koa-router'
import indexController from '../controller/indexController'
import LoginController from '../controller/LoginController'
import AuthMiddleware from '../middleware/AuthMiddleware'

const router = new koaRouter({ prefix: '/admin' })

router.post('/login', LoginController.index)
//router.use(AuthMiddleware)
router.get('/', indexController.index)
router.get('/list', indexController.adminList)
router.post('/upload', indexController.upload)
router.put('/userAdd', indexController.userAdd)
router.post('/updateUser', indexController.updateUser)
router.delete('/deleteUser', indexController.deleteUser)
router.get('/getUser', indexController.getUser)

export default router
