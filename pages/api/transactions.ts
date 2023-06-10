import axios from 'axios'
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
}
