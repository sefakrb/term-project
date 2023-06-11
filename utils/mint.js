import { ethers } from 'ethers'
import { connect } from 'connect'

export async function mint(params) {
   const signer = connect()
   const contract = new ethers.Contract(params.address, params.abi, signer)

   try {
      await contract
         .mint(params.to, params.id, params.amount)
         .then(async (res) => {
            return res
         })
   } catch (error) {
      return error
   }
}
