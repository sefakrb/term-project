import { ethers } from 'ethers'

export async function deploy(params) {
   const provider = new ethers.providers.Web3Provider(window.ethereum)
   const signer = provider.getSigner()
   const factory = new ethers.ContractFactory(
      JSON.parse(params.abi),
      params.byteCode,
      signer
   )

   try {
      const contract = await factory.deploy().then(async (res) => {
         return res
      })
      return contract
   } catch (error) {
      return false
   }
}
