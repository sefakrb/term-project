import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function Register() {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const [submitted, setSubmitted] = useState(false)
   const [error, setError] = useState(false)

   const handleName = (e: any) => {
      setName(e.target.value)
      setSubmitted(false)
   }

   const handleEmail = (e: any) => {
      setEmail(e.target.value)
      setSubmitted(false)
   }

   const handlePassword = (e: any) => {
      setPassword(e.target.value)
      setSubmitted(false)
   }

   const handleSubmit = (e: any) => {
      e.preventDefault()
      if (name === '' || email === '' || password === '') {
         setError(true)
      } else {
         setSubmitted(true)
         setError(false)
      }
   }

   const successMessage = () => {
      return (
         <div
            className="success"
            style={{
               display: submitted ? '' : 'none',
            }}
         >
            <h1>User {name} successfully registered!!</h1>
         </div>
      )
   }

   const errorMessage = () => {
      return (
         <div
            className="error"
            style={{
               display: error ? '' : 'none',
            }}
         >
            <h1>Please enter all the fields</h1>
         </div>
      )
   }

   return (
      <div className="form" style={{ height: '100vh' }}>
         <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
         >
            <Grid item>
               <h1>Register Page</h1>
            </Grid>
            <Grid item>
               <TextField
                  required
                  onChange={handleName}
                  label="User Name"
                  type="text"
               />
            </Grid>
            <Grid item>
               <TextField
                  required
                  onChange={handleEmail}
                  label="Password"
                  type="password"
               />
            </Grid>
            <Grid item>
               <TextField
                  required
                  onChange={handlePassword}
                  label="E-Mail"
                  type="mail"
               />
            </Grid>
            <Grid item>
               <Button onClick={handleSubmit} type="submit" variant="outlined">
                  Submit
               </Button>
            </Grid>
            <div className="messages">
               {errorMessage()}
               {successMessage()}
            </div>
            <Link href="/login">
               <Typography variant="body2" color="gray">
                  Already have an account?
               </Typography>
            </Link>
         </Grid>
      </div>
   )
}
