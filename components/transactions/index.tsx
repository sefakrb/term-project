import {
   Button,
   Chip,
   FormControl,
   Grid,
   InputLabel,
   Link,
   MenuItem,
   Select,
   SelectChangeEvent,
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
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { GetTransactionsRequest } from '../../types/getTransactionsRequest'

interface ContractDetails {
   address: string
   nftName: string
}

export default function Transactions() {
   const { data: session, status } = useSession()

   const [selectedContractAddress, setSelectedContractAddress] = useState('')
   const [fetch, setFetch] = useState(false)

   const [contractAddresses, setContractAddresses] = useState<
      ContractDetails[]
   >([])

   const handleChange = (event: SelectChangeEvent) => {
      setSelectedContractAddress(event.target.value as string)
   }

   const [transactions, setTransactions] = useState([])

   const [loading, setLoading] = useState(false)

   if (status !== 'loading' && contractAddresses.length <= 0) {
      getContractAddress(session?.user?.id || -1)
   }

   async function getContractAddress(userId: number) {
      ContractService.getContracts(userId).then((res) => {
         let arr: ContractDetails[] = []
         if (res.data) {
            setFetch(true)

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

      setLoading(true)

      try {
         await TransactionService.getTransactions(getTransactionsRequest).then(
            async (res) => {
               if (!res) {
                  // Swal.fire('Error!', res.error, 'error')
                  setLoading(false)
                  return
               }
               setTransactions(res.data) //format eklenmeli
            }
         )
      } catch (error) {
         Swal.fire('Error!', 'Error has occured', 'error')
         setLoading(false)
      }
   }

   const theme = createTheme({
      palette: {
         primary: {
            main: '#808080', // Replace with your custom color
         },
      },
   })

   const columns: GridColDef[] = [
      {
         field: 'transactionIndex',
         headerName: 'Transaction Index',
         width: 130,
      },
      {
         field: 'hash',
         headerName: 'Hash',
         width: 200,
      },
      {
         field: 'timeStamp',
         headerName: 'Timestamp',
         width: 100,
      },
      {
         field: 'functionName',
         headerName: 'Function',
         valueGetter: (params: any) => {
            if (params.row.functionName == '') {
               return 'Deploy Function'
            }
         },
         width: 140,
      },
      {
         field: 'blockNumber',
         headerName: 'Block Number',

         width: 110,
      },
      {
         field: 'from',
         headerName: 'From',
         width: 200,
      },
      {
         field: 'to',
         headerName: 'To',
         width: 200,
         valueGetter: (params: any) => {
            if (params.row.to == '') {
               const finded = contractAddresses.filter((item) => {
                  if (item.address === selectedContractAddress) {
                     return item.nftName
                  }
               })[0]
               return 'Create: ' + finded.nftName
            }
         },
         renderCell: (params: any) => {
            const isRejected = params.value === 'Rejected'
            return (
               <Chip
                  label={params.value}
                  variant={'filled'}
                  color={'success'}
               />
            )
         },
      },
      {
         field: 'value',
         headerName: 'Value',
         width: 60,
      },
      {
         field: 'txreceipt_status',
         headerName: 'Status',
         width: 60,
      },
      {
         field: 'gasUsed',
         headerName: 'Gas Used',
         width: 80,
      },
      {
         field: 'confirmations',
         headerName: 'Confirmations',
         width: 110,
      },
      {
         field: 'nonce',
         headerName: 'Nonce',
         width: 70,
      },
   ]

   const router = useRouter()

   return (
      <ThemeProvider theme={theme}>
         <Grid className={transactionCss.outWrapper} container spacing={0}>
            <Grid
               item
               xs={12}
               md={12}
               lg={12}
               sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  height: '7vh',
                  paddingTop: '1rem',
                  paddingRight: '1rem',
               }}
            >
               <Button
                  variant="contained"
                  sx={{
                     backgroundColor: 'white',
                     color: 'gray',
                     fontWeight: '500',
                     textTransform: 'none',
                  }}
                  onClick={() => signOut()}
               >
                  Logout
               </Button>
            </Grid>
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
                     <Typography
                        style={{ textAlign: 'center' }}
                        sx={{
                           fontSize: '1.5rem',
                           marginBottom: '1.5rem',
                           fontWeight: '700',
                        }}
                        color="text.secondary"
                        gutterBottom
                     >
                        Contract Details
                     </Typography>

                     <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                           Contract Address
                        </InputLabel>
                        <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           label="Contract Address"
                           onChange={handleChange}
                           value={selectedContractAddress}
                           margin="dense"
                        >
                           {contractAddresses.map((item, index) => (
                              <MenuItem
                                 key={index}
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
