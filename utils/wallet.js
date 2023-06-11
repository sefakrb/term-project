import { ethers } from 'ethers'

export async function connect() {
   if (window.ethereum) {
      window.ethereum
         .request({ method: 'eth_requestAccounts' })
         .then(async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            return provider.getSigner()
         })
   } else {
      alert('install metamask extension!!')
   }
}
