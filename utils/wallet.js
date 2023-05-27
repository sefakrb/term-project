import { ethers } from 'ethers'

export function connect() {
   if (window.ethereum) {
      window.ethereum
         .request({ method: 'eth_requestAccounts' })
         .then(async (res) => {
            getSigner()
         })
   } else {
      alert('install metamask extension!!')
   }
}

async function getSigner() {
   const provider = new ethers.providers.Web3Provider(window.ethereum)
   await provider.send('eth_requestAccounts', [])
   const signer = provider.getSigner()
   return signer
}

export async function deploy(abi, bytecode) {
   factory = new ContractFactory(abi, bytecode, getSigner())
   contract = await factory.deploy('ricmoo.eth', 42)

   return contract
}
