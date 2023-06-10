import { Grid } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Contract from '../contract'
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
         <Grid
            columns={12}
            style={{ display: 'flex', justifyContent: 'center' }}
         >
            <Transactions></Transactions>
         </Grid>
      </div>
   )
}
