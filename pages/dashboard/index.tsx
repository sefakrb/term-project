import { Grid } from '@mui/material'
import Contract from '../../components/contract'

export default function Dashboard() {
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
