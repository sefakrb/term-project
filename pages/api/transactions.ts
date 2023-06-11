import axios from 'axios'
import { GetTransactionsRequest } from '../../types/getTransactionsRequest'
import axiosInstance from './api'

export class TransactionService {
   static async getTransactions(
      getTransactionsRequest: GetTransactionsRequest
   ) {
      const response = await axios.post(
         'https://term-project-bc-production-9efe.up.railway.app/transaction/details',
         getTransactionsRequest
      )
      return response
   }

   static async getAbi(contractAddress: string) {
      const response = await axiosInstance.get('/contract/abi', {
         params: {
            contractAddress: contractAddress,
         },
      })
      return response.data
   }
}
