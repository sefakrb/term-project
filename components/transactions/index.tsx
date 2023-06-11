import {
   Button,
   Chip,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   FormControl,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
   TextField,
   ThemeProvider,
} from '@mui/material'
import { createTheme } from '@mui/material/styles'
import * as React from 'react'
import Card from '@mui/material/Card'

import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import transactionCss from './transactions.module.css'
import { TransactionService } from '../../pages/api/transactions'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { ContractService } from '../../pages/api/contract'
import { GetTransactionsRequest } from '../../types/getTransactionsRequest'
import { mint } from '../../utils/mint'
import { burn } from '../../utils/burn'

interface ContractDetails {
   address: string
   nftName: string
}

export default function Transactions() {
   const { data: session, status } = useSession()
   const [selectedContractAddress, setSelectedContractAddress] = useState('')
   const [transactions, setTransactions] = useState([])
   const [contractAddresses, setContractAddresses] = useState<
      ContractDetails[]
   >([])
   const [openMint, setOpenMint] = React.useState(false)
   const [openBurn, setOpenBurn] = React.useState(false)
   const [mintOrBurnAddress, setMintOrBurnAddress] = React.useState('')
   const [mintOrBurnID, setMintOrBurnID] = React.useState(-1)
   const [mintOrBurnAmount, setMintOrBurnAmount] = React.useState(-1)

   const theme = createTheme({
      palette: {
         primary: {
            main: '#808080', // Replace with your custom color
         },
      },
   })

   if (status !== 'loading' && contractAddresses.length <= 0) {
      getContractAddress(session?.user?.id || -1)
   }

   async function getContractAddress(userId: number) {
      ContractService.getContracts(userId).then((res) => {
         let arr: ContractDetails[] = []
         if (res.data) {
            res.data.map((item: any) => {
               arr.push({
                  address: item.address,
                  nftName: item.nftName,
               })
            })
         }

         setContractAddresses(arr)
      })
   }

   async function getTransactions(address: string) {
      const getTransactionsRequest: GetTransactionsRequest = {
         contractAddress: address,
      }
      try {
         await TransactionService.getTransactions(getTransactionsRequest).then(
            async (res) => {
               if (!res) {
                  // Swal.fire('Error!', res.error, 'error')
                  return
               }
               setTransactions(res.data) //format eklenmeli
            }
         )
      } catch (error) {
         Swal.fire('Error!', 'Error has occured', 'error')
      }
   }

   const handleChangeContractAddress = (event: SelectChangeEvent) => {
      setSelectedContractAddress(event.target.value as string)
   }

   const columns: GridColDef[] = [
      {
         field: 'transactionIndex',
         headerName: 'Transaction Index',
         width: 130,
         headerAlign: 'center',
         align: 'center',
      },
      {
         field: 'hash',
         headerName: 'Hash',
         width: 200,
         headerAlign: 'center',
         align: 'center',
      },
      {
         field: 'timeStamp',
         headerName: 'Timestamp',
         width: 100,
         headerAlign: 'center',
         align: 'center',
      },
      {
         field: 'functionName',
         headerName: 'Function',
         headerAlign: 'center',
         align: 'center',
         valueGetter: (params: any) => {
            if (params.row.functionName == '') {
               return 'Deploy Function'
            } else {
               return params.row.functionName.split('(')[0]
            }
         },
         renderCell: (params: any) => {
            return (
               <Chip
                  label={params.value}
                  variant={'filled'}
                  color={'success'}
               />
            )
         },
         width: 150,
      },
      {
         field: 'blockNumber',
         headerName: 'Block Number',
         width: 110,
         headerAlign: 'center',
         align: 'center',
      },
      {
         field: 'from',
         headerName: 'From',
         width: 200,
         headerAlign: 'center',
         align: 'center',
      },
      {
         field: 'to',
         headerName: 'To',
         headerAlign: 'center',
         align: 'center',
         width: 200,
         valueGetter: (params: any) => {
            if (params.row.to == '') {
               const finded = contractAddresses.filter((item) => {
                  if (item.address === selectedContractAddress) {
                     return item.nftName
                  }
               })[0]
               return 'Create: ' + finded.nftName
            } else {
               return params.row.to
            }
         },
      },
      {
         field: 'value',
         headerName: 'Value',
         headerAlign: 'center',
         align: 'center',
         width: 60,
      },
      {
         field: 'txreceipt_status',
         headerName: 'Status',
         headerAlign: 'center',
         align: 'center',
         width: 60,
      },
      {
         field: 'gasUsed',
         headerName: 'Gas Used',
         headerAlign: 'center',
         align: 'center',
         width: 80,
      },
      {
         field: 'confirmations',
         headerName: 'Confirmations',
         headerAlign: 'center',
         align: 'center',
         width: 110,
      },
      {
         field: 'nonce',
         headerName: 'Nonce',
         headerAlign: 'center',
         align: 'center',
         width: 70,
      },
   ]

   const handleClickOpenMint = () => {
      setOpenMint(true)
   }

   const handleCloseMint = () => {
      setOpenMint(false)
      setMintOrBurnAddress('')
      setMintOrBurnID(-1)
      setMintOrBurnAmount(-1)
   }

   const handleClickOpenBurn = () => {
      setOpenBurn(true)
   }

   const handleCloseBurn = () => {
      setOpenBurn(false)
      setMintOrBurnAddress('')
      setMintOrBurnID(-1)
      setMintOrBurnAmount(-1)
   }

   const handlemintOrBurnAddressChange = (e: React.BaseSyntheticEvent) => {
      setMintOrBurnAddress(e.target.value)
   }
   const handlemintOrBurnIDChange = (e: React.BaseSyntheticEvent) => {
      setMintOrBurnID(e.target.value)
   }
   const handlemintOrBurnAmountChange = (e: React.BaseSyntheticEvent) => {
      setMintOrBurnAmount(e.target.value)
   }

   const mintNft = () => {
      TransactionService.getAbi(selectedContractAddress).then((abiRes) => {
         const mintRequest = {
            address: selectedContractAddress,
            abi: abiRes.data,
            to: mintOrBurnAddress,
            id: mintOrBurnID,
            amount: mintOrBurnAmount,
         }

         mint(mintRequest).then((mintRes: any) => {
            if (mintRes?.code === 1) {
               JSON.stringify(mintRes.error)
               Swal.fire('Error!', mintRes.error.reason, 'error')
            } else {
               Swal.fire('Success!', 'You minted successfully', 'success')
            }
            handleCloseMint()
         })
      })
   }
   const burnNft = () => {
      TransactionService.getAbi(selectedContractAddress).then((abiRes) => {
         const burnRequest = {
            address: selectedContractAddress,
            abi: abiRes.data,
            to: mintOrBurnAddress,
            id: mintOrBurnID,
            amount: mintOrBurnAmount,
         }
         burn(burnRequest).then((burnRes: any) => {
            if (burnRes.code === 1) {
               JSON.stringify(burnRes.error)
               Swal.fire('Error!', burnRes.error.reason, 'error')
            } else {
               Swal.fire('Success!', 'You burned successfully', 'success')
            }
            handleCloseBurn()
         })
      })
   }

   return (
      <ThemeProvider theme={theme}>
         <Grid className={transactionCss.outWrapper} container spacing={0}>
            <Grid
               xs={10}
               md={12}
               lg={10}
               item
               sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginBottom: '2.5rem',
               }}
            >
               <div
                  style={{
                     width: '100%',
                     display: 'flex',
                     justifyContent: 'flex-end',
                  }}
               >
                  <Button
                     href="/contract"
                     size="small"
                     variant="outlined"
                     sx={{
                        color: 'white',
                        fontWeight: '500',
                        borderColor: 'white',
                        fontSize: '0.8rem',
                     }}
                  >
                     + Create Contract
                  </Button>
               </div>
            </Grid>
            <Grid xs={10} md={12} lg={10} item>
               <Card className={transactionCss.card} variant="elevation">
                  <CardContent>
                     <div
                        style={{
                           position: 'relative',
                           height: '10vh',
                        }}
                     >
                        <Typography
                           style={{ textAlign: 'center' }}
                           sx={{
                              fontSize: '1.5rem',
                              marginBottom: '1.5rem',
                              fontWeight: '700',
                              zIndex: 3,
                              position: 'absolute',
                              width: '100%',
                           }}
                           className={transactionCss.headerTitle}
                           color="text.secondary"
                           gutterBottom
                        >
                           Contract Details
                        </Typography>
                        {selectedContractAddress !== '' && (
                           <div
                              style={{
                                 zIndex: 4,
                                 position: 'absolute',
                                 display: 'flex',
                                 justifyContent: 'flex-end',
                                 width: '100%',
                              }}
                           >
                              <Button
                                 variant="outlined"
                                 sx={{ marginRight: '1rem' }}
                                 size="small"
                                 onClick={handleClickOpenMint}
                              >
                                 Mint
                              </Button>

                              <Button
                                 onClick={handleClickOpenBurn}
                                 variant="outlined"
                                 size="small"
                              >
                                 Burn
                              </Button>
                              <Dialog
                                 sx={{ zIndex: 1000 }}
                                 open={openMint || openBurn}
                                 onClose={() => {
                                    openMint
                                       ? handleCloseMint()
                                       : handleCloseBurn()
                                 }}
                              >
                                 <DialogTitle textAlign={'center'}>
                                    {openMint ? 'MINT' : 'BURN'}
                                 </DialogTitle>
                                 <DialogContent>
                                    <DialogContentText textAlign={'center'}>
                                       Please enter mint address, id and amount
                                    </DialogContentText>
                                    <TextField
                                       autoFocus
                                       margin="dense"
                                       id="address"
                                       label="Address"
                                       type="text"
                                       fullWidth
                                       variant="standard"
                                       onChange={handlemintOrBurnAddressChange}
                                    />
                                    <TextField
                                       autoFocus
                                       margin="dense"
                                       id="name"
                                       label="ID"
                                       type="number"
                                       fullWidth
                                       variant="standard"
                                       onChange={handlemintOrBurnIDChange}
                                    />
                                    <TextField
                                       autoFocus
                                       margin="dense"
                                       id="amount"
                                       label="amount"
                                       type="number"
                                       fullWidth
                                       variant="standard"
                                       onChange={handlemintOrBurnAmountChange}
                                    />
                                 </DialogContent>
                                 <DialogActions>
                                    <Button
                                       onClick={() => {
                                          openMint
                                             ? handleCloseMint()
                                             : handleCloseBurn()
                                       }}
                                    >
                                       Cancel
                                    </Button>
                                    <Button
                                       onClick={() => {
                                          openMint ? mintNft() : burnNft()
                                       }}
                                    >
                                       {openMint ? 'MINT' : 'BURN'}
                                    </Button>
                                 </DialogActions>
                              </Dialog>
                           </div>
                        )}
                     </div>

                     <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                           Contract Address
                        </InputLabel>
                        <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           label="Contract Address"
                           onChange={handleChangeContractAddress}
                           value={selectedContractAddress}
                           margin="dense"
                        >
                           {contractAddresses.map((item, index) => (
                              <MenuItem
                                 key={item.address}
                                 value={item.address}
                                 onClick={() => {
                                    setSelectedContractAddress(item.address)
                                    getTransactions(item.address)
                                 }}
                              >
                                 {item.nftName}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>

                     <DataGrid
                        autoHeight={true}
                        getRowId={(transaction: any) => transaction.hash}
                        rows={transactions}
                        columns={columns}
                        disableRowSelectionOnClick
                        initialState={{
                           pagination: {
                              paginationModel: {
                                 pageSize: 5,
                              },
                           },
                        }}
                        classes={{
                           'row--dynamicHeight': 'styles.row',
                        }}
                        slots={{
                           noRowsOverlay: () => (
                              <div
                                 style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                 }}
                              >
                                 {selectedContractAddress === ''
                                    ? 'Please choose one contract'
                                    : 'Wait for deployment...'}
                              </div>
                           ),
                        }}
                        onRowClick={(e) => {
                           const win = window.open(
                              'https://sepolia.etherscan.io/tx/' + e.row.hash,
                              '_blank'
                           )
                           win!.focus()
                        }}
                        pageSizeOptions={[5]}
                        sx={{
                           '&:hover': {
                              cursor: 'pointer',
                           },
                        }}
                     />
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </ThemeProvider>
   )
}
