import axios from 'axios'
import { GetTransactionsRequest } from '../../types/getTransactionsRequest'

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
