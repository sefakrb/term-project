import Dashboard from './dashboard'
import { useSession } from 'next-auth/react'
import Login from './auth'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { signOut } from 'next-auth/react'

export default function Home() {
   const { status, data } = useSession()

   return (
      <>
         {status === 'unauthenticated' && <Login></Login>}
         {status === 'authenticated' && <Dashboard></Dashboard>}
      </>
   )
}
