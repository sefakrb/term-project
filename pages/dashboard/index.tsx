import { Grid } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Contract from '../../components/contract'

export default function Dashboard() {
   const { status, data } = useSession()
   const router = useRouter()

   if (status === 'unauthenticated') {
      router.push('/auth')
   }

   return (
      <div style={{ height: '100vh' }}>
         <Grid
            columns={12}
            style={{ display: 'flex', justifyContent: 'center' }}
         >
            <Contract></Contract>
         </Grid>
      </div>
   )
}
