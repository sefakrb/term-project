import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { UsersService } from '../users'

const authOptions = {
   session: {
      strategy: 'jwt',
      maxAge: 24 * 60 * 60, // 1 day
   },
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
         async authorize(credentials, req) {
            const { userName, password } = credentials
            const loggedUser = await UsersService.login({
               userName,
               password,
            }).then((user) => {
               if (!user.id) {
                  throw new Error('invalid credentialts')
               }
               return { id: user.id, user: user }
            })
            return { id: loggedUser.id, user: loggedUser }
         },
      }),
   ],
   pages: {
      signIn: '/auth/index',
   },
   callbacks: {
      jwt: ({ token, user }) => {
         if (user) {
            token.id = user.id
         }
         return token
      },
      session: ({ session, token }) => {
         if (token) {
            session.user = { ...session.user, id: token.id }
         }
         return session
      },
   },
}

export default NextAuth(authOptions)
