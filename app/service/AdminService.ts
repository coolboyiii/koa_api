/*
 * @Autor: Cool
 * @Version: 2.0
 * @Date: 2021-11-05 15:11:38
 * @LastEditTime: 2021-11-09 15:23:02
 * @Description:
 * @LastEditors: Cool
 */
import Admin from '../model/Admin'
class AdminService {
  getAdmin() {
    return Admin.findOne()
  }
  getAdminList(page: number, limit: number) {
    return Admin.findAndCountAll({
      limit,
      offset: (page - 1) * limit
    })
  }
  getUserByName(name: string) {
    return Admin.findOne({
      where: {
        name
      }
    })
  }
  getUserById(id: number) {
    return Admin.findByPk(id)
  }
  addUser(admin: any) {
    return Admin.create(admin)
  }
  updateUser(admin: any, id: number) {
    return Admin.update(admin, {
      where: {
        id
      }
    })
  }
  deleteUser(id: number) {
    return Admin.destroy({
      where: {
        id
      }
    })
  }
}

export default new AdminService()
