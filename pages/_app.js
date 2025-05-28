import GlobalStyle from "../styles/globalStyles";
import { NavMenuVertical, NavMenuMobile } from '../components';
import NavMenuHorizontal from "../components/NavMenuHorizontal/NavMenuHorizontal";
import { Provider as MobxProvider } from 'mobx-react'
import { Provider as NextAuthProvider, getSession } from 'next-auth/client';
import { useStore } from '../stores/RootStore'
import '../styles/globals.css'
import React, { useState, createContext, useEffect } from "react";
import Head from 'next/head'
import { NextSeo } from 'next-seo';
import { MetaMaskProvider } from "metamask-react";
import MetaMaskOnboarding from '@metamask/onboarding';
import { ethers } from "ethers";
import {
    MainAppContainer,
    MainAppContainerFull,
    lightTheme, darkTheme,
} from "../styles/globalStyles";
import Script from "next/script";
import { ThemeProvider } from 'styled-components';
import { COLORS } from "../styles/Styling";
import { useRouter } from 'next/router'
import client from "./api/client";
import App from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'

export const ThemeContext = createContext();

//function MyApp({ Component, pageProps }) {
function MyApp(props) {
    const router = useRouter();
    const store = useStore(props.pageProps.initialState)
    const [walletConnected, setWalletConnected] = useState(false)
    const [mobileNav, setMobileNav] = useState(false)
    const [verticalNavMenuvisible, setVerticalNavMenuvisible] = useState(true)
    const [horizontalNavMenuVisible, setHorizontalNavMenuVisible] = useState(false)
    const providerTheme = props.theme === 'light' ? lightTheme : darkTheme
    const [theme, setTheme] = useState(providerTheme);
    const value = { theme, setTheme }
    const [backgroundColorApp, setBackgroundColorApp] = useState("")
    const [fullWidthPage, setFullWidthPage] = useState(false)
    const [initialized, setInitialized] = useState(false)


    // Force page refreshes on network changes
    // The "any" network will allow spontaneous network changes
    if (typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        provider.on("network", (newNetwork, oldNetwork) => {
            // When a Provider makes its initial connection, it emits a "network"
            // event with a null oldNetwork along with the newNetwork. So, if the
            // oldNetwork exists, it represents a changing network
            if (oldNetwork) {
                window.location.reload();
            }
        });
    }

    React.useEffect(() => {

        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
            ethersProvider.listAccounts().then(function (accounts, err) {
                if (err != null) console.error("An error occurred: " + err);
                else if (accounts.length === 0) setWalletConnected(false);
                else setWalletConnected(true);
            });

        }

    }, [walletConnected]);


    //replace verical/mobile navigation 
    const replaceNavigation = () => {
        if (typeof window === 'undefined')
            console.warn(`window is undefined this is about to cause an issue`);

        if (window.innerWidth <= 700) {
            setMobileNav(true)
        } else {
            setMobileNav(false)
        }
    };

    React.useEffect(() => {
        replaceNavigation();
        window.addEventListener("resize", replaceNavigation);
        return () => window.removeEventListener("resize", replaceNavigation);
    }, [router, router?.pathname]);

    // check page to set the navigation: horizontal or vertical
    React.useEffect(() => {
        if (window.location.pathname == "/signin") {
            setVerticalNavMenuvisible(false);
            setHorizontalNavMenuVisible(false)
            setMobileNav(false)
        } else if (window.location.pathname == "/home" || window.location.pathname == "/protocol") {
            setVerticalNavMenuvisible(false);
            setHorizontalNavMenuVisible(true)
        } else if (window.location.pathname == "/" && !props.pageProps.session) {
            setVerticalNavMenuvisible(false);
            setHorizontalNavMenuVisible(true)
        } else if (window.location.pathname == "/" && props.pageProps.session) {
            setVerticalNavMenuvisible(true);
            setHorizontalNavMenuVisible(false)
        } else if (window.location.pathname == "/landing" && props.pageProps.session) {
            setVerticalNavMenuvisible(false);
            setHorizontalNavMenuVisible(true)
        } else {
            setVerticalNavMenuvisible(true);
            setHorizontalNavMenuVisible(false)
        }
    }, [router, router?.pathname]);

    // check page to set a dark background
    React.useEffect(() => {
        setInitialized(true)
        if (window.location.pathname == "/signin") {
            setBackgroundColorApp(COLORS.black)
            setFullWidthPage(false)
        } else if (window.location.pathname == "/protocol") {
            setBackgroundColorApp("transparent")
            setFullWidthPage(true)
        } else {
            setBackgroundColorApp(providerTheme.container.color)
            setFullWidthPage(false)
        }
    }, [router, router?.pathname]);


    function renderApp() {
        return (
            <>
                <Script
                    strategy="lazyOnload"
                    src={`https://www.googletagmanager.com/gtag/js?id=G-Y0NL5FS4C2`} />
                <Script
                    strategy="lazyOnload">
                    {

                        `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-Y0NL5FS4C2');`

                    }
                </Script>
                <Head>
                    <title>REBL</title>
                    <link rel="icon" href="/icon.png" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <link rel="manifest" href="/manifest.json" />
                <NextSeo
                    title={`REBL Network`}
                    description={`REBL is a content hub for AI & creative communities to craft, explore and monetize. Join the movement.`}
                    canonical="https://yuser.co"
                    openGraph={{
                        url: `https://yuser.co/}`,
                        title: `REBL Network`,
                        description: `REBL is a content hub for AI & creative communities to craft, explore and monetize. Join the movement.`,
                        site_name: "REBL Network",
                        images: [
                            {
                                url: `https://yuser-assets.imgix.net/Rebl/illustration_details_4k.png?fit=clip&w=1000&auto=format&dpr=1&q=75`,
                                width: 1200,
                                alt: `REBL District`,
                            },
                        ],
                    }}
                    twitter={{
                        handle: '@reblapp',
                        site: 'https://yuser.co',
                        cardType: 'summary_large_image',
                    }}
                />
                <MainAppContainer
                    fullWidthPage={fullWidthPage}
                    horizontalNavMenuVisible={horizontalNavMenuVisible}
                >
                    <MetaMaskProvider>
                        <NextAuthProvider
                            // Provider options are not required but can be useful in situations where
                            // you have a short session maxAge time. Shown here with default values.
                            options={{
                                // Client Max Age controls how often the useSession in the client should
                                // contact the server to sync the session state. Value in seconds.
                                // e.g.
                                // * 0  - Disabled (always use cache value)
                                // * 60 - Sync session state with server if it's older than 60 seconds
                                clientMaxAge: 0,
                                // Keep Alive tells windows / tabs that are signed in to keep sending
                                // a keep alive request (which extends the current session expiry) to
                                // prevent sessions in open windows from expiring. Value in seconds.
                                //
                                // Note: If a session has expired when keep alive is triggered, all open
                                // windows / tabs will be updated to reflect the user is signed out.
                                keepAlive: 0
                            }}
                            session={props.pageProps.session}
                        >
                            <MobxProvider store={store}>
                                <ThemeProvider theme={providerTheme}>
                                    <ThemeContext.Provider value={value}>
                                        <GlobalStyle />
                                        {mobileNav ?
                                            <NavMenuMobile walletConnected={walletConnected} />
                                            :
                                            <>
                                                {verticalNavMenuvisible ?
                                                    <NavMenuVertical walletConnected={walletConnected} />
                                                    :
                                                    <>
                                                        {horizontalNavMenuVisible &&
                                                            <NavMenuHorizontal />
                                                        }
                                                    </>
                                                }
                                            </>
                                        }
                                        <AnimatePresence style={{zIndex:99}} mode="wait" initial={true}>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.9 }}
                                                style={{flexDirection:'column',display:'flex',width:'100%'}}
                                            >
                                                <props.Component {...props.pageProps} />
                                            </motion.div>
                                        </AnimatePresence>
                                    </ThemeContext.Provider>
                                </ThemeProvider>
                            </MobxProvider>
                        </NextAuthProvider>
                    </MetaMaskProvider>
                </MainAppContainer>
            </>

        )
    }

    return (
        <>
            {initialized ?
                <>
                    {renderApp()}
                </>
                :
                <div style={{ height: "100vh", width: "100vw", backgroundColor: "white" }} />
            }
        </>
    );
}

MyApp.getInitialProps = async (context) => {
    const pageProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`
    const session = await getSession(context)
    if (!session) {
        return pageProps;
    }
    else {
        const theme = await client.service("user-theme").get(null, { query: { userId: session.user._id } });
        return {
            ...pageProps,
            session: session,
            theme: theme,
        }
    }
}

export default MyApp;