import { ethers } from 'ethers'

export async function mint(params) {
   const contract = await getContract(params.address, params.abi)

   try {
      await contract.mint(params.to, params.id, params.amount)
   } catch (error) {
      return error
   }
}

const getContract = async (address, abi) => {
   if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      return new ethers.Contract(address, abi, signer)
   }
}
