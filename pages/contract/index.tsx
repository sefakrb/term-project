import {
   AppBar,
   FormControl,
   Grid,
   Radio,
   RadioGroup,
   ThemeProvider,
   Toolbar,
} from '@mui/material'
import { createTheme } from '@mui/material/styles'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useState } from 'react'
import { getSession, signOut, useSession } from 'next-auth/react'
import { ContractService } from '../api/contract'
import Swal from 'sweetalert2'
import contractCss from './contract.module.css'
import { deploy } from '../../utils/deploy'
import CircularProgress from '@mui/material/CircularProgress'
import { AddAddressRequest } from '../../types/addAddressRequest'
import { CreateContractRequest } from '../../types/createContractRequest'
import { Router, useRouter } from 'next/router'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

declare module 'next-auth' {
   interface Session {
      user: {
         id: number
      }
   }
}

export default function Contract() {
   const { data: session, status } = useSession()

   const [name, setName] = useState('')
   const [uri, setUri] = useState('')
   const [loading, setLoading] = useState(false)

   const [isMintable, setMintable] = useState(true)
   const [isBurnable, setBurnable] = useState(true)
   const [access, setAccess] = React.useState('Ownable')

   const router = useRouter()

   const handleAccessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAccess((event.target as HTMLInputElement).value)
   }

   const handleChangeMintable = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setMintable(event.target.checked)
   }

   const handleChangeBurnable = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setBurnable(event.target.checked)
   }

   async function createContract() {
      const createContractRequest: CreateContractRequest = {
         userId: session?.user.id || -1,
         nftName: name,
         nftUri: uri,
         isMintable: isMintable,
         isBurnable: isBurnable,
         isOwnable: access == 'Ownable' ? true : false,
      }

      setLoading(true)

      try {
         await ContractService.createContract(createContractRequest).then(
            async (res) => {
               await deploy({
                  abi: res.data.abi,
                  byteCode: res.data.byteCode,
               }).then((response: any) => {
                  if (!response) {
                     Swal.fire('Error!', res.error, 'error')
                     setLoading(false)
                     return
                  }
                  const addAddressRequest: AddAddressRequest = {
                     contractId: res.data.id,
                     contractAddress: response.address,
                  }
                  ContractService.addAddress(addAddressRequest).then(
                     (addAddressResponse) => {
                        setLoading(false)
                        if (!addAddressResponse.code) {
                           Swal.fire(
                              'Success!',
                              'Contract is created successfully',
                              'success'
                           ).then(() => {
                              setName('')
                              setUri('')
                              setMintable(false)
                              setBurnable(false)
                              setAccess('Ownable')
                              router.push('/dashboard')
                           })
                        } else {
                           Swal.fire('Error!', res.error, 'error')
                        }
                     }
                  )
               })
            }
         )
      } catch (error) {
         Swal.fire('Error!', 'Error has occured', 'error')
         setLoading(false)
      }
   }

   function handleName(event: React.ChangeEvent<HTMLInputElement>) {
      const newValue = event.target.value
      const isValidInput = /^[A-Za-z].*/.test(newValue)

      if (isValidInput || newValue == '') {
         setName(newValue)
      }
   }

   function handleURI(event: React.ChangeEvent<HTMLInputElement>) {
      const newValue = event.target.value
      const isValidInput = /^[A-Za-z].*/.test(newValue)

      if (isValidInput || newValue == '') {
         setUri(newValue)
      }
   }

   const theme = createTheme({
      palette: {
         primary: {
            main: '#808080', // Replace with your custom color
         },
      },
   })

   if (status === 'loading') {
      return (
         <div
            style={{
               position: 'absolute',
               zIndex: 2,
               height: '100vh',
               width: '100vw',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <CircularProgress
               sx={{
                  color: 'black',
               }}
               size={80}
            />
         </div>
      )
   }

   if (status === 'unauthenticated') {
      router.push('/')
   }

   return (
      <>
         <ThemeProvider theme={theme}>
            <AppBar position="sticky" sx={{ backgroundColor: '#1b1b1b' }}>
               <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                     Term Project
                  </Typography>
                  <Button
                     sx={{
                        textTransform: 'none',
                        color: 'white',
                        fontSize: '1rem',
                     }}
                     onClick={() => signOut()}
                  >
                     Logout
                  </Button>
               </Toolbar>
            </AppBar>
            <Grid
               className={contractCss.outWrapper}
               container
               spacing={0}
               sx={{
                  position: 'absolute',
                  zIndex: loading ? -1 : 1,
                  opacity: loading ? 0.6 : 1,
               }}
            >
               {/* Detail Card Wrapper */}
               <Grid xs={10} md={8} lg={5} item>
                  {/* Detail Card */}
                  <div className={contractCss.title}>
                     <Button
                        variant="outlined"
                        sx={{ color: 'white', borderColor: 'white' }}
                        href={'/dashboard'}
                        startIcon={<ArrowBackIosIcon />}
                     >
                        Dashboard
                     </Button>
                  </div>
                  <Typography
                     className={contractCss.title}
                     textAlign={'center'}
                  >
                     Create Contract
                  </Typography>

                  <Card
                     className={contractCss.card}
                     variant="elevation"
                     sx={{ minWidth: 275 }}
                  >
                     <CardContent>
                        {/* Contract Details */}
                        <Typography
                           style={{ textAlign: 'center' }}
                           sx={{ fontSize: '1rem' }}
                           color="text.secondary"
                           gutterBottom
                        >
                           Contract Details
                        </Typography>
                        {/* Name and URI */}
                        <Grid
                           columns={12}
                           style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                              margin: '2rem',
                           }}
                        >
                           {/* Name Text Field */}
                           <Grid
                              style={{
                                 display: 'flex',
                                 justifyContent: 'center',
                              }}
                              item
                              xs={4}
                           >
                              <TextField
                                 size="small"
                                 required
                                 id="outlined-required"
                                 value={name}
                                 onChange={handleName}
                                 label="Name"
                              />
                           </Grid>
                           {/* URI Text Field */}
                           <Grid
                              style={{
                                 display: 'flex',
                                 justifyContent: 'center',
                              }}
                              item
                              xs={4}
                           >
                              <TextField
                                 size="small"
                                 required
                                 id="outlined-required"
                                 value={uri}
                                 onChange={handleURI}
                                 label="URI"
                              />
                           </Grid>
                        </Grid>
                        {/* Features wrapper */}
                        <Grid
                           container
                           columns={12}
                           style={{
                              display: 'flex',
                              justifyContent: 'center',
                           }}
                        >
                           {/* title */}
                           <Grid item xs={8}>
                              <Typography
                                 style={{
                                    textAlign: 'center',
                                 }}
                                 sx={{ fontSize: '1rem' }}
                                 color="text.secondary"
                                 gutterBottom
                              >
                                 Features
                              </Typography>
                           </Grid>
                           <Grid item xs={8}>
                              <FormGroup>
                                 <FormControlLabel
                                    control={
                                       <Checkbox
                                          size="small"
                                          checked={isMintable}
                                          onChange={handleChangeMintable}
                                          inputProps={{
                                             'aria-label': 'controlled',
                                          }}
                                       />
                                    }
                                    label="Mintable"
                                 />
                                 <FormControlLabel
                                    control={
                                       <Checkbox
                                          size="small"
                                          checked={isBurnable}
                                          onChange={handleChangeBurnable}
                                          inputProps={{
                                             'aria-label': 'controlled',
                                          }}
                                       />
                                    }
                                    label="Burnable"
                                 />
                              </FormGroup>
                           </Grid>
                        </Grid>
                        {/* Access Control wrapper */}
                        <Grid
                           container
                           columns={12}
                           style={{
                              display: 'flex',
                              justifyContent: 'center',
                           }}
                        >
                           {/* title */}
                           <Grid item xs={8}>
                              <Typography
                                 style={{
                                    textAlign: 'center',
                                 }}
                                 sx={{ fontSize: '1rem' }}
                                 color="text.secondary"
                                 gutterBottom
                              >
                                 Access Control
                              </Typography>
                           </Grid>
                           {/* checked={isOwnable}
                        onChange={handleChangeOwnable} */}
                           <Grid item xs={8}>
                              <FormControl>
                                 <RadioGroup
                                    value={access}
                                    onChange={handleAccessChange}
                                 >
                                    <FormControlLabel
                                       value="Ownable"
                                       control={<Radio />}
                                       label="Ownable"
                                    />

                                    <FormControlLabel
                                       value="Roles"
                                       control={<Radio />}
                                       label="Roles"
                                    />
                                 </RadioGroup>
                              </FormControl>
                           </Grid>
                        </Grid>
                     </CardContent>
                     <CardActions
                        style={{
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        <Button
                           onClick={createContract}
                           variant="contained"
                           className={contractCss.button}
                        >
                           Create Contract
                        </Button>
                     </CardActions>
                  </Card>
               </Grid>
            </Grid>
            {loading && (
               <div
                  style={{
                     position: 'absolute',
                     zIndex: 2,
                     height: '100vh',
                     width: '100vw',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <CircularProgress
                     sx={{
                        color: 'black',
                     }}
                     size={80}
                  />
               </div>
            )}
         </ThemeProvider>
      </>
   )
}
