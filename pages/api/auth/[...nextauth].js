import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import client from '../client'


export default NextAuth({
    providers: [
        Providers.Apple({
            //
            clientId: process.env.APPLE_CLIENT_ID,
            clientSecret: {
                teamId: process.env.APPLE_TEAM_ID,
                keyId: process.env.APPLE_KEY_ID,
                privateKey: process.env.APPLE_PRIVATE_KEY
            },
        }),
        Providers.Facebook({
            //clientId: process.env.FACEBOOK_ID,
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }

        ),
        Providers.Google({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Google',

            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET_MOD,

        }),
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "password" },
            },


            async authorize(credentials, req) {

                const request = {
                    strategy: "local",
                    uname: credentials.username,
                    pword: credentials.password,
                    extraProps: { apiVersion: "6" }
                }

                const fullDetails = await client.authenticate(request);

                // If no error and we have user data, return it
                if (fullDetails) {
                    return fullDetails
                }
                else {
                    // Return null if user data could not be retrieved
                    return null
                }
            }
        }),



    ],

    // cookies: {
    //     sessionToken: {
    //         name: `feathers-jwt`,
    //         options: {
    //             httpOnly: false,
    //             sameSite: 'lax',
    //             path: '/',
    //             secure: true
    //         }
    //     }
    // },


    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    // secret: process.env.SECRET,

    // session: {
    //     // Use JSON Web Tokens for session instead of database sessions.
    //     // This option can be used with or without a database for users/accounts.
    //     // Note: `jwt` is automatically set to `true` if no database is specified.
    //     jwt: true,

    //     // Seconds - How long until an idle session expires and is no longer valid.
    //     // maxAge: 30 * 24 * 60 * 60, // 30 days

    //     // Seconds - Throttle how frequently to write to database to extend a session.
    //     // Use it to limit write operations. Set to 0 to always update the database.
    //     // Note: This option is ignored if using JSON Web Tokens
    //     // updateAge: 24 * 60 * 60, // 24 hours
    // },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        // signIn: '/signin',

        error: '/signin'
        // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        //error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // async signIn(user, account, profile) { return true },
        // async redirect(url, baseUrl) { return baseUrl },
        async signIn(user, account, profile) {
            // vout(() =>
            //     console.log(user, "user details olf")
            // );
            if (account.provider === 'google') {

                const temp = await client.authenticate({
                    strategy: "google",
                    generatedToken: account.idToken,
                    type: "web-app"
                }, null)

                const { accessToken } = temp
                // user.user = temp.user
                user.provider = "google"
                // user.accessToken = accessToken

                // console.log(temp.user, "user  temp")
                if (accessToken) {
                    return true
                }
                else return false

            }
            else if (account.provider === "credentials") {

                if (user.accessToken) {
                    return true
                }
                else return false
            }
            else if (account.provider === 'facebook') {
                const temp = await client.authenticate({
                    strategy: "facebook",
                    generatedToken: account.accessToken,
                    type: "web-app"
                }, null)
                const { accessToken } = temp
                user.provider = "facebook"



                if (accessToken) {
                    return true
                }
                else return false

            }
            else if (account.provider === "apple") {
                const temp = await client.authenticate({
                    strategy: "apple",
                    generatedToken: account.idToken,
                })
                const { accessToken } = temp
                user.provider = "apple"
                if (accessToken) {
                    return true
                }

            }
        },
        async jwt(token, user, account, profile, isNewUser) {
            // console.log(user,"usr details insdie the callback")
            // console.log(`\tSTUB 1: ${Object.keys(token)}`);
            if (user) {
                if (user.provider) {
                    //------Google--------
                    if (user.provider === "google") {
                        const temp = await client.authenticate({
                            strategy: "google",
                            generatedToken: account.idToken,
                            type: "web-app"
                        }, null)
                        const { accessToken } = temp
                        token.user = temp.user
                        token.accessToken = accessToken

                    }
                    //-------Facebook--------
                    else if (user.provider === "facebook") {
                        const temp = await client.authenticate({
                            strategy: "facebook",
                            generatedToken: account.accessToken,
                            type: "web-app"
                        }, null)
                        const { accessToken } = temp
                        token.user = temp.user
                        token.accessToken = accessToken

                    }
                    //--------Apple--------------
                    else if (user.provider === "apple") {
                        const temp = await client.authenticate({
                            strategy: "apple",
                            generatedToken: account.idToken,
                        })
                        const { accessToken } = temp
                        token.user = temp.user
                        token.accessToken = accessToken

                    }
                }
                else token = { user }.user

                //    console.log(token,"this is the token returned from jwt(outside provider callback)") 

                //token = user?.provider ? user : { user }.user;
            }

            return token

        },


        async session(session, token) {
            // console.log(token,"this is the token returned from session") 
            session.accessToken = token.accessToken
            session.user = token.user
            return session
        }

    },

    events: {},


    theme: 'dark',


    debug: false,
    session: {
        jwt: true
    }
})
