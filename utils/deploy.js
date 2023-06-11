import { ethers } from 'ethers'
import { connect } from 'connect'

export async function deploy(params) {
   const signer = connect()
   const factory = new ethers.ContractFactory(
      JSON.parse(params.abi),
      params.byteCode,
      signer
   )

   try {
      await factory.deploy().then(async (res) => {
         return res
      })
   } catch (error) {
      return false
   }
}
