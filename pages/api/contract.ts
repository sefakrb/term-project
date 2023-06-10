import { AddAddressRequest } from '../../types/addAddressRequest'
import { CreateContractRequest } from '../../types/createContractRequest'
import axiosInstance from './api'

export class ContractService {
   static async createContract(createContractRequest: CreateContractRequest) {
      const response = await axiosInstance.post(
         '/contract/create',
         createContractRequest
      )
      return response.data
   }

   static async addAddress(addAddressRequest: AddAddressRequest) {
      const response = await axiosInstance.post(
         '/contract/add-address',
         addAddressRequest
      )
      return response.data
   }

   static async getContracts(userId: number) {
      const response = await axiosInstance.get('/contract/deployed-contracts', {
         params: {
            userId: userId,
         },
      })
      return response.data
   }
}
