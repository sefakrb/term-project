import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import { Open_Sans } from '@next/font/google'

import type { AppProps } from 'next/app'
import { StyledEngineProvider } from '@mui/material'

const inter = Open_Sans({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
   return (
      <SessionProvider session={pageProps.session}>
         <StyledEngineProvider injectFirst>
            <div className={inter.className}>
               <Component {...pageProps} />
            </div>
         </StyledEngineProvider>
      </SessionProvider>
   )
}
