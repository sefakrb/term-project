import { LoginRequest } from '../../types/loginRequest'
import axiosInstance from './api'

export class UsersService {
   static async getUsers() {
      const response = await axiosInstance.get('/user/hello')
      return response.data
   }

   static async login(user: LoginRequest) {
      const logged = await axiosInstance.post('/user/login', user)
      return logged.data
   }
}
