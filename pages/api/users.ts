import axiosInstance from './api'

interface User {
   userName: string
   password: string
}

export class UsersService {
   static async getUsers() {
      const response = await axiosInstance.get('/user/hello')
      return response.data
   }

   static async login(user: User) {
      const logged = await axiosInstance.post('/user/login', user)
      return logged.data
   }
}
