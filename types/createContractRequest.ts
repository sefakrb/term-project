export interface CreateContractRequest {
   userId: number
   nftName: string
   nftUri: string
   isMintable: boolean
   isBurnable: boolean
   isOwnable: boolean
}
