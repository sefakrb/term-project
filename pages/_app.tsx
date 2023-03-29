import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import 'sweetalert2/dist/sweetalert2.min.css';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
   return (
      <SessionProvider session={pageProps.session}>
         <Component {...pageProps} />
      </SessionProvider>
   )
}
