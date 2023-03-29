import { Grid } from '@mui/material'
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
import { useSession } from 'next-auth/react'
import { ContractService } from '../../pages/api/contract'
import Swal from 'sweetalert2'

export default function Contract() {
   const { status, data } = useSession()

   const [name, setName] = useState('')
   const [uri, setUri] = useState('')

   const [isMintable, setMintable] = useState(true)
   const [isBurnable, setBurnable] = useState(true)
   const [isOwnable, setOwnable] = useState(true)

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

   const handleChangeOwnable = (event: React.ChangeEvent<HTMLInputElement>) => {
      setOwnable(event.target.checked)
   }

   async function createContract() {
      console.log('create Contract')

      const createContractRequest: CreateContractRequest = {
         userId: data?.user?.id,
         nftName: name,
         nftUri: uri,
         isMintable: isMintable,
         isBurnable: isBurnable,
         isOwnable: isOwnable,
      }
      console.log(createContractRequest)

      const newContract = await ContractService.createContract(
         createContractRequest
      ).then((res) => {
         console.log(res)
         if (!res.code) {
            Swal.fire('Success!', 'Contract is created successfully', 'success')
            setName('')
            setUri('')
            setMintable(false)
            setBurnable(false)
            setOwnable(false)
         } else {
            Swal.fire('Error!', res.error, 'error')
         }
      })

      //backendde create contract endpointine istek atılacak
   }

   return (
      <div
         style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
         }}
      >
         {/* ERC721 OR ERC1155 */}
         <Grid
            columns={12}
            container
            style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
            spacing={0}
         >
            {/* Detail Card Wrapper */}
            <Grid xs={8} item>
               {/* Detail Card */}
               <Card variant="outlined" sx={{ minWidth: 275 }}>
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
                           justifyContent: 'center',
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
                              onChange={(e) => setName(e.target.value)}
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
                              onChange={(e) => setUri(e.target.value)}
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
                        <Grid item xs={8}>
                           <FormGroup>
                              <FormControlLabel
                                 control={
                                    <Checkbox
                                       checked={isOwnable}
                                       onChange={handleChangeOwnable}
                                       inputProps={{
                                          'aria-label': 'controlled',
                                       }}
                                    />
                                 }
                                 label="Ownable"
                              />
                           </FormGroup>
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
                        variant="outlined"
                        size="small"
                     >
                        Create Contract
                     </Button>
                  </CardActions>
               </Card>
            </Grid>
         </Grid>
      </div>
   )
}
