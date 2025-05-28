import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import { getSession, useSession } from 'next-auth/client';
import { MessageAppComponent } from '../components/MessageAppComponent/MessageAppComponent';
import {
  Container,
  FullContainer
} from "../styles/globalStyles";
import { useStore } from '../stores/RootStore';
import { ErrorMessageSignIn } from '../components/ErrorMessageSignIn/ErrorMessageSignIn';
import { COLORS } from '../styles/Styling';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';

import imageSrc from '../public/images/nextgem_bg.jpg';
import Image from 'next/image';
import {
  MintingContainer,
  NavBox,
  MainContainer,
  NavButton,
  Divider,
  ButtonTitle,
  Background,
  LinearGradient,
  Section
} from '../components/MintingMain/MintingMain.elements';
import Link from 'next/link'
import SearchBar from '../components/SearchBar/SearchBar';
import NextGemsList from '../components/NextGemsList/NextGemsList';
import ImageContentComponent from '../components/ImageContentComponent/ImageContentComponent';
import yuserNextGems from '../public/images/yuserNextGems.png';
import FooterHorizontal from "../components/FooterHorizontal/FooterHorizontal";


export default inject('store')(observer(
  function Minting(props) {
    const rootstore = useStore()
    const [messageVisible, setMessageVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const [bySale, setSale] = useState(true)
    const [byAbout, setAbout] = useState(false)
    const [byDiscord, setDiscord] = useState(false)
    const [session] = useSession();

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

    const showErrorMessage = (value) => {
      rootstore.errMessage = null;
    }

    const handleNavhClick = (btnType) => {
      if (btnType == 'sale') {
        setSale(true)
        setAbout(false)
        setDiscord(false)
      } else if (btnType == 'about') {
        setSale(false)
        setAbout(true)
        setDiscord(false)
        window.open('https://yuser.gitbook.io/yuser-network/yuser-avatars-nextgems/nextgems-faq', '_blank').focus();
      } else if (btnType == 'discord') {
        setSale(false)
        setAbout(false)
        setDiscord(true)
        window.open('https://discord.gg/3PFue8pbCx', '_blank').focus();
      }
    }


    async function handleSearch(event) {
      //TODO
    }


    return (
      <>
        <NextSeo
          title={`NextGems by Yuser`}
          description={`NextGems are a generative NFT avatar project on the Moonriver blockchain. They are cybernetically augmented humanoid fantasy creatures who inhabit the neo-city of Blood Moon.`}
          canonical="https://yuser.co"
          openGraph={{
            url: `https://yuser.co/nextgems}`,
            title: `NextGems by Yuser`,
            description: `NextGems are a generative NFT avatar project on the Moonriver blockchain. They are cybernetically augmented humanoid fantasy creatures who inhabit the neo-city of Blood Moon.`,
            site_name: 'Yuser',
            images: [
              {
                url: `https://yuser-assets.imgix.net/nextGemsLaunchBanner.jpg`,
                width: 1200,
                alt: `NextGems are a generative NFT avatar project on the Moonriver blockchain. They are cybernetically augmented humanoid fantasy creatures who inhabit the neo-city of Blood Moon.`,
              },
            ]
          }}

        />
        <Container>
          <FullContainer>
            {/* Error message */}
            {rootstore.errMessage && <ErrorMessageSignIn errorMessage={rootstore.errMessage} showErrorMessage={showErrorMessage} />}

            <MintingContainer>
              <SearchBar
                handleChange={handleSearch}
                title1={session ? "Feed" : 'Login'}
                link1={session ? "/" : '/signin'}
                title2={'Market'}
                link2={"/market"}
                title3={'Wallet'}
                link3={"/wallets"}
              />
              <MainContainer>
                <Background>
                  <Image
                    layout="fixed" height="665" src={imageSrc} alt="background image" />
                  <LinearGradient />
                </Background>

                <Section style={{ marginTop: 0, }}>
                  <ImageContentComponent
                    mobileReverse={true}
                    standardTitleLogoSize={true}
                    srcTitle={yuserNextGems}
                    imageMaxWidth={550}
                    textMarginLeft={false}
                    textMarginRight={true}
                    title1={"THE NEXT LEVEL"}
                    title1FontSize={48.5}
                    title2={"AVATAR NFT"}
                    title2FontSize={66}
                    title3={"COLLECTION"}
                    title3FontSize={64}
                    description2={""}
                    reverse={false}
                    mobileMargin={false}
                    src={"https://yuser-assets.imgix.net/NextGemsIntroGraphic.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"}
                    leftButton={"Collect NextGems"}
                    leftHref={"/market"}
                    rightButton={null}
                    rightHref={null}
                  />
                </Section>

                <div style={{ marginBottom: 60, zIndex: '999' }}>
                  <NextGemsList />
                </div>

                <Section>
                  <ImageContentComponent
                    mobileReverse={true}
                    standardTitleLogoSize={null}
                    textMarginLeft={true}
                    textMarginRight={true}
                    srcTitle={null}
                    imageMaxWidth={""}
                    title1={"GET NEXTGEMS"}
                    title1FontSize={49.5}
                    title2={"FEATURES"}
                    title2FontSize={74}
                    title3={null}
                    title3FontSize={null}
                    description1={""}
                    description2={""}
                    reverse={true}
                    mobileMargin={false}
                    src={"https://yuser-assets.imgix.net/nextgems_yuser.png?fit=clip&w=300&fm=webp$auto=format&dpr=2"}
                    leftButton={"Learn more"}
                    leftHref={"https://yuser.gitbook.io/yuser-network/yuser-avatars-nextgems/nextgems-faq"}
                    rightButton={null}
                    rightHref={null}
                    table={true}
                    tableData={[
                      "Yuser Power Boost: increase the reach of your content",
                      "Yuser Verification: get a purple circle around your avatar",
                      "Hodling Rewards get Gems to buy products or strake",
                    ]}
                  />
                </Section>

                <Section>
                  <ImageContentComponent
                    mobileReverse={true}
                    standardTitleLogoSize={null}
                    textMarginLeft={true}
                    textMarginRight={true}
                    srcTitle={null}
                    imageMaxWidth={""}
                    title1={"ACCESS YUSER'S"}
                    title1FontSize={50}
                    title2={"VIP EVENTS"}
                    title2FontSize={74}
                    title3={null}
                    title3FontSize={null}
                    mobileMargin={false}
                    description1={"NEW FEATURE! NextGems will grant owners access to Yuser's own events. Meet NFT artists and collectors & experience live art performances + VIP perks."}
                    description2={""}
                    reverse={false}
                    src={"https://yuser-assets.imgix.net/nextgems_multiple.png?fit=clip&w=300&fm=webp$auto=format&dpr=2"}
                    leftButton={"Learn more"}
                    leftHref={"https://yuser.gitbook.io/yuser-network/yuser-avatars-nextgems/nextgems-faq"}
                    rightButton={null}
                    rightHref={null}
                  />
                </Section>

                <Section>
                  <ImageContentComponent
                    mobileReverse={true}
                    standardTitleLogoSize={null}
                    textMarginLeft={true}
                    textMarginRight={true}
                    srcTitle={null}
                    imageMaxWidth={""}
                    title1={"BUY & SELL"}
                    title1FontSize={73}
                    title2={"NEXTGEMS NOW"}
                    title2FontSize={52}
                    title3={null}
                    title3FontSize={null}
                    description1={"Buy, collect and sell NextGems on Yuser Marketplace now!"}
                    description2={""}
                    reverse={true}
                    mobileMargin={false}
                    src={"https://yuser-assets.imgix.net/nextgems_buy.png?fit=clip&w=300&fm=webp$auto=format&dpr=2"}
                    leftButton={"Buy & Sell"}
                    leftHref={"/market"}
                    rightButton={null}
                    rightHref={null}
                  />
                </Section>

                <Section>
                  <ImageContentComponent
                    mobileReverse={true}
                    standardTitleLogoSize={true}
                    textMarginLeft={true}
                    textMarginRight={true}
                    srcTitle={yuserNextGems}
                    imageMaxWidth={550}
                    title1={"GROW YUSER"}
                    title1FontSize={63}
                    title2={"COMMUNITY"}
                    title2FontSize={67}
                    title3={null}
                    title3FontSize={null}
                    mobileMargin={false}
                    description1={"NextGems are a part of Yuser and they have been designed to provide utility to the Yuser community."}
                    description2={" By promoting Yuser you are promoting NextGems and vice versa."}
                    reverse={false}
                    src={"https://yuser-assets.imgix.net/nextgems_party.png?fit=clip&w=300&fm=webp$auto=format&dpr=2"}
                    leftButton={"Join Discord"}
                    leftHref={"https://discord.gg/uRRxnfAjhY"}
                    rightButton={"Join Twitter"}
                    rightHref={"https://twitter.com/yuser"}
                  />
                </Section>

              </MainContainer>
              <FooterHorizontal/>
            </MintingContainer>

          </FullContainer>
          {/*} this position may be wrong, insert it in a middle container or by context Natalia
                {messageVisible &&
                    <MessageAppComponent
                        showAppMessage={showAppMessage}
                        type={messageType}
                        textMessage={message}
                    />
                } */}
        </Container>
      </>
    )
  }
))

/*export async function getServerSideProps(context) {
  const session = await getSession(context)
  const wallets = ["Just to test the hydrate function"]

  return {
    props: {
      session: session,
      initialState: {
        wallets: wallets
      },
    }
  }

} */

const Alink = styled.a`
    text-decoration: none;
    opacity:0.7;

    :link {
        color:  ${({ theme }) => theme.textPrimary.color}
    }
    :visited {
        color: ${({ theme }) => theme.textPrimary.color}
    }
    :hover {
        opacity: 0.4;
        color: ${({ theme }) => theme.textPrimary.color}
    }
    :active {
        opacity: 0.4;
        color: ${({ theme }) => theme.textPrimary.color}
    }
`;