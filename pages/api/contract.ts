import axiosInstance from './api'

export class ContractService {
   static async createContract(createContractRequest: CreateContractRequest) {
      const response = await axiosInstance.post(
         '/contract/create',
         createContractRequest
      )
      return response.data
   }
}
