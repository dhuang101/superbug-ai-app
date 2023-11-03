import NextAuth from "next-auth"
import OktaProvider from "next-auth/providers/okta"
import Auth0Provider from "next-auth/providers/auth0"

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		OktaProvider({
			clientId: process.env.OKTA_CLIENT_ID,
			clientSecret: process.env.OKTA_CLIENT_SECRET,
			issuer: process.env.OKTA_ISSUER,
		}),
		Auth0Provider({
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			issuer: process.env.AUTH0_ISSUER,
		}),
	],
}

export default NextAuth(authOptions)
