import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { UsersService } from '../users'

const authOptions = {
   session: {
      strategy: 'jwt',
      maxAge: 24 * 60 * 60, // 1 day
   },
   secret: process.env.NEXTAUTH_URL,
   providers: [
      CredentialsProvider({
         type: 'credentials',
         credentials: {
            identifier: {
               label: 'userName',
               type: 'text',
               placeholder: 'userName',
            },
            password: {
               label: 'password',
               type: 'password',
               placeholder: 'password',
            },
         },
         async authorize(credentials) {
            const { userName, password } = credentials
            return await UsersService.login({
               userName,
               password,
            }).then((user) => {
               if (!user.id) {
                  throw new Error('invalid credentialts')
               }
               return user
            })
            // return { id: loggedUser.id, user: loggedUser }
         },
      }),
   ],
   pages: {
      signIn: '/auth/index',
   },
   callbacks: {
      jwt: ({ token, user }) => {
         if (user) {
            token.user = user
         }
         return token
      },
      session: ({ session, token }) => {
         session.user = token.user
         return session
      },
   },
}

export default NextAuth(authOptions)
