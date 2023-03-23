import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import loginCss from './login.module.css'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

export default function Login() {
   const router = useRouter()

   const [userName, setUserName] = useState('')
   const [password, setPassword] = useState('')

   async function login() {
      const res = await signIn('credentials', {
         userName: userName,
         password: password,
         redirect: false,
      })
      console.log('resss: ', res)
      if (res?.status === 200) {
         router.push('/')
      } else {
         alert('invalid credentials')
      }
   }

   return (
      <div style={{ height: '100vh' }} className={loginCss.mainLayout}>
         <Grid className={loginCss.mainLayout} container spacing={0}>
            <Grid className={loginCss.gridPart} item xs={5}>
               <TextField
                  required
                  id="outlined-required"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  label="username"
                  className={loginCss.login}
               ></TextField>
            </Grid>
            <Grid className={loginCss.gridPart} item xs={5}>
               <TextField
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="outlined-required"
                  label="password"
                  type="password"
                  className={loginCss.login}
               ></TextField>
            </Grid>
         </Grid>

         <Grid className={loginCss.buttonStyle}>
            <Grid className={loginCss.gridPart} item xs={4}>
               <Button onClick={login} variant="outlined">
                  Login
               </Button>
            </Grid>
         </Grid>
      </div>
   )
}
