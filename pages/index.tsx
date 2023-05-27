import Dashboard from './dashboard'
import { useSession } from 'next-auth/react'
import Login from './auth'

export default function Home() {
   const { status, data } = useSession()

   return (
      <>
         {status === 'unauthenticated' && <Login></Login>}
         {status === 'authenticated' && <Dashboard></Dashboard>}
      </>
   )
}
