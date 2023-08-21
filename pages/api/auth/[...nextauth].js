import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import UserAPI from '../../../lib/UserAPI'

export const authOptions = {
    secret: 'bG9jYWxob3N0X3Rlc3Q=',
    session: {
        strategy: 'jwt'
    },
    providers: [
        /*GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),*/
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email_address: { label: "Email address", type: "text", placeholder: "jsmith@hydrax.dev" },
                password: { label: "Password", type: "password", placeholder: "Your secret password" }
            },
            async authorize(credentials, req) {
                const res = await UserAPI.login(credentials)
                return res.user
            }
        })
    ],
    pages: {
        error: '/auth/error'
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            // Persist the OAuth access_token to the token right after signin
            //const userObj = user.user
            if (account) {
                token.accessToken = account.access_token
                token.user = {}
                token.user.id = user.id
                token.user.name = user.name
                token.user.email_address = user.email_address
                token.user.created_at = user.created_at
                token.user.updated_at = user.updated_at
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            let newSession = token
            newSession.expires = session.expires
            return newSession
        }
    },
}

export default NextAuth(authOptions)