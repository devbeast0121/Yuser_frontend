import React, { useState, useEffect, useRef } from 'react'
import { inject, observer } from 'mobx-react';
import {
    Footer,
    SignupPromo,
    LoginBoxSidebar,
    PromoBox
} from "../components";
import { MessageAppComponent } from '../components/MessageAppComponent/MessageAppComponent';
import {
    Container,
    FullContainer,
    MiddleFullContainer,
    RightContainer,
    RightContainerInner,
    SideBarLeftBlock
} from "../styles/globalStyles";
import { MarketMain } from '../components'
import { getSession, useSession } from 'next-auth/client';
import Image from "../public/images/nextGemsLaunchBanner.jpg";
import { NextSeo } from 'next-seo';

export default inject('store')(observer(
    function Market(props) {
        const [messageVisible, setMessageVisible] = useState(false)
        const [message, setMessage] = useState('')
        const [messageType, setMessageType] = useState('')
        const [session, loading] = useSession();
        const [columnVisible, setColumnVisible] = useState(true);
        const marketMainRef = useRef(null);

        //showing the app message (inform/success/error)   Working example: settings.js,  Natalia
        const showAppMessage = (isVisible, type, message) => {
            if (isVisible) {
                setMessageVisible(isVisible)
                setMessageType(type)
                setMessage(message)
                const timer = setTimeout(() => {
                    setMessageVisible(false)
                    setMessageType('')
                    setMessage('')
                }, 3000)
                return () => clearTimeout(timer)
            } else {
                setMessageVisible(isVisible)
                setMessageType('')
                setMessage('')
            }
        }

        // showing third column depending from the window size
        const hideThirdColumn = () => {

            if (typeof window === 'undefined')
                console.warn(`window is undefined this is about to cause an issue`);

            if (window.innerWidth <= 1190) {
                setColumnVisible(false)
            } else {
                setColumnVisible(true)
            }
        };

        useEffect(() => {
            // console.log(`🪟 NavBar.js typeof window is ${typeof window}`);
            hideThirdColumn();
            window.addEventListener("resize", hideThirdColumn);
            return () => window.removeEventListener("resize", hideThirdColumn);
        }, []);

        return (
            <>
                <NextSeo
                    title={`REBL NFT Marketplace`}
                    description={`The REBL NFT Market is where you can list and buy NFTs on the REBL Network. REBL is a new social platform built for you - the creator. Get noticed and monetize on REBL. Buy with your likes and sell your content as NFTs - all on the Moonriver blockchain.`}
                    canonical="https://yuser.co"
                    openGraph={{
                        url: `https://yuser.co/market}`,
                        title: `REBL NFT Marketplace`,
                        description: `The REBL NFT Marketplace is where you can list and buy NFTs on the REBL Network. REBL is a new social platform built for you - the creator. Get noticed and monetize on REBL. Buy with your likes and sell your content as NFTs - all on the Moonriver blockchain.`,
                        site_name: 'REBL',
                        images: [
                            {
                                url: `https://yuser-assets.imgix.net/Rebl/illustration_details_4k.png?fit=clip&w=1000&auto=format&dpr=1&q=75`,
                                width: 1200,
                                alt: `The REBL NFT Marketplace is where you can list and buy NFTs on the REBL Network. REBL is a new social platform built for you - the creator. Get noticed and monetize on REBL. Buy with your likes and sell your content as NFTs - all on the Moonriver blockchain.`,
                            },
                        ]
                    }}
                />
                <Container onClick={() => marketMainRef.current.closeDropdown()} >
                    <MiddleFullContainer>
                        <MarketMain ref={marketMainRef} />
                    </MiddleFullContainer>
                    {columnVisible &&
                        <RightContainer>
                            <RightContainerInner>
                                <SignupPromo
                                    src={Image}
                                />
                                {!session ?
                                    <LoginBoxSidebar
                                        title={'Login to REBL'}
                                        textOne={'Login access features in the REBL Web app.'}
                                        textTwo={"Don't have an account? Check out our discord for invites"}
                                    />
                                    :
                                    null
                                }
                                <SideBarLeftBlock>
                                    <Footer />
                                </SideBarLeftBlock>
                            </RightContainerInner>
                        </RightContainer>
                    }
                    {/*} this position may be wrong, insert it in a middle container or by context Natalia
                    {messageVisible &&
                        <MessageAppComponent
                            showAppMessage={showAppMessage}
                            type={messageType}
                            textMessage={message}
                        />
                    } */}
                    {/* {messageSingleVisible &&
                        <Message
                            setSingleMessageVisible={setSingleMessageVisible}
                        />
                    } */}
                </Container>
            </>
        )
    }
))




/*export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        redirect: {
            destination: "/404?type=notice",
            permanent: false,
        },
    };


}*/
