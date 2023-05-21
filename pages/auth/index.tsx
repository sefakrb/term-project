import {
   Card,
   CardActions,
   CardContent,
   CardHeader,
   CardMedia,
   Grid,
   ThemeProvider,
   Typography,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import loginCss from './login.module.css'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import Swal from 'sweetalert2'
import { createTheme } from '@mui/material/styles'

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
         const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
         })

         Toast.fire({
            icon: 'success',
            title: 'Logged in successfully',
         })
         router.push('/')
      } else {
         Swal.fire('Error!', 'Invalid Credentials!', 'error')
      }
   }

   const theme = createTheme({
      palette: {
         primary: {
            main: '#808080', // Replace with your custom color
         },
      },
   })

   return (
      <Grid container className={loginCss.mainLayout}>
         <Grid
            sx={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
            className={loginCss.image}
            item
            xs={12}
            md={6}
            lg={6}
         >
            <CardMedia
               sx={{ height: '100vh', width: '100%' }}
               image="/images/login.jpg"
               title="green iguana"
            />
         </Grid>
         <Grid
            sx={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
            item
            xs={12}
            md={6}
            lg={6}
         >
            <Card className={loginCss.card} variant="elevation" elevation={2}>
               <CardContent>
                  <Typography textAlign={'center'} className={loginCss.title}>
                     Login
                  </Typography>
                  <Grid
                     className={loginCss.textFieldWrapper}
                     container
                     spacing={0}
                  >
                     <Grid
                        className={loginCss.gridWrapper}
                        item
                        xs={10}
                        md={5}
                        lg={5}
                     >
                        <ThemeProvider theme={theme}>
                           <TextField
                              color="primary"
                              required
                              id="outlined-required"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              label="username"
                              className={loginCss.textField}
                              variant="standard"
                           ></TextField>
                        </ThemeProvider>
                     </Grid>
                     <Grid
                        className={loginCss.gridWrapper}
                        item
                        xs={10}
                        md={5}
                        lg={5}
                     >
                        <ThemeProvider theme={theme}>
                           <TextField
                              color="primary"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              id="outlined-required"
                              label="password"
                              type="password"
                              className={loginCss.textField}
                              variant="standard"
                           ></TextField>
                        </ThemeProvider>
                     </Grid>
                     <Grid className={loginCss.gridWrapper} item xs={12}>
                        <Button
                           onClick={login}
                           className={loginCss.button}
                           variant="contained"
                        >
                           Login
                        </Button>
                     </Grid>
                  </Grid>
               </CardContent>
            </Card>
         </Grid>
      </Grid>
   )
}
