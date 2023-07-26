import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
   const { status } = useSession()
   const router = useRouter()

   useEffect(() => {
      if (status === 'authenticated') {
         router.push('/dashboard')
      } else {
         router.push('/auth')
      }
   }, [status])

   return <></>
}
