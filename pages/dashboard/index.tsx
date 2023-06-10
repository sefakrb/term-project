import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { connect } from '../../utils/wallet'
import Transactions from '../../components/transactions'

export default function Dashboard() {
   const { status, data } = useSession()
   const router = useRouter()

   useEffect(() => {
      connect()
   }, [])

   if (status === 'unauthenticated') {
      router.push('/auth')
   }

   return (
      <div style={{ height: '100vh' }}>
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
            columns={12}
            style={{ display: 'flex', justifyContent: 'center' }}
         >
            <Transactions></Transactions>
         </Grid>
      </div>
   )
}
