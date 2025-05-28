/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import { useSession } from "next-auth/client";
import {
  Container,
  FullContainer,
} from "../../styles/globalStyles";
import styled from "styled-components";
import {
  Button,
  Icon,
} from "../../components";
import {
  OverlayContainer,
  Box,
  WrapperComponent,
} from "../../components/ProtocolComponent/ProtocolComponent.elements";
import playButton from "../../public/icons/btn-play.svg"
import GradientSection from "../GradientSection/GradientSection";
import { NextSeo } from "next-seo";
import RootStore, { useStore } from "../../stores/RootStore";
import { COLORS, FONT_SIZE, SPACING } from "../../styles/Styling";
import Image from "next/image";
import ImageContentComponent from "../../components/ImageContentComponent/ImageContentComponent";
import BlockContentComponent from "../../components/ImageContentComponent/BlockContentComponent";
import arrowDown from "../../public/icons/arrowDown.svg";
import discordIcon from "../../public/socialicons/discord.svg";
import mediumIcon from "../../public/socialicons/medium.svg";
import instagramIcon from "../../public/socialicons/instagram.svg";
import twitterIcon from "../../public/socialicons/twitter.svg";
import TxFailedOverlay from "../../components/TxOverlays/TxFailedOverlay";
import TxPendingOverlay from "../../components/TxOverlays/TxPendingOverlay";
import TxSuccessOverlay from "../../components/TxOverlays/TxSuccessOverlay";
import TxConfirmOverlay from "../../components/TxOverlays/TxConfirmOverlay";
import TxCancelledOverlay from "../../components/TxOverlays/TxCancelledOverlay";
import WrapMOVR from "../../components/WrapMOVR/WrapMOVR";
import MetamaskOverlay from "../../components/TxOverlays/MetamaskOverlay";
import MetaMaskOnboarding from "@metamask/onboarding";
import { ethers } from "ethers";
// import client from '../pages/api/client';
import client from '../../pages/api/client';

import { motion, AnimatePresence } from "framer-motion";
import Shapes from "../../public/SVG_assets/Group.png";
import FooterHorizontal from "../../components/FooterHorizontal/FooterHorizontal";


import { ConnectButton } from "@rainbow-me/rainbowkit";


import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { mainnet,polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { BoldText } from "../HomepagePostGrid/HomepagePostGrid.elements";
import abi from "../../config/abi/REBL.json";
import Countdown from 'react-countdown';

const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: "w34o65jlIQMNoRR8chCUTL6FgDiVX16p" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Yuser-Rebl",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default inject("store")(
  observer(function legendsOfea(props) {


    const rootstore = useStore();

    const account = useAccount({
      onConnect({ address, connector, isReconnected }) {
        console.log("Connected", { address, connector, isReconnected });
        rootstore.connectedWallet = address;
      },
    });
    // useEffect(() => {
    //   console.log("in rebl page", rootstore.connectedWallet);
    //   // setInterval(saleLeftTime, 1000);
    // }, [rootstore.connectedWallet]);

    const ImageWorld =
      "https://yuser-assets.imgix.net/Rebl/illustration_details_4k.png?fit=clip&w=800&auto=format&dpr=2&q=70&";
      const ImageWorldPlaceholder =
      "https://yuser-assets.imgix.net/Rebl/illustration_details_4k.png?fit=clip&w=100&auto=format&q=15";
      const ImageLogoLocal =
      "https://yuser-assets.imgix.net/Rebl/rebel_district_logo.png?fit=clip&w=250&auto=format&dpr=2&q=75";
       
    const [mobileSize, setMobileSize] = useState(false);
    const [openVideoOverlay, setOpenVideoOverlay] = useState(false);
    const [decentralizeImage, setDecentralizeImage] = useState(false);
    const [typeVideo, setTypeVideo] = useState("");
    const [numToPurchase,setNumToPurchase] = useState(1);

    const purchaseOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    function handleNumToPurchaseChange(event){
      let index = event.target.selectedIndex;
      setNumToPurchase(index+1);
      return;
    }

    useEffect(() => {
      setInterval(saleLeftTime, 1000);
    }, []);

    const saleLeftTime = () => {
      const d = new Date();
      let days = Math.floor(new Date(saleBegin - d).getTime() / 86400000);
      let hours = Math.floor(
        (new Date(saleBegin - d).getTime() % 86400000) / 3600000
      );
      let mins = Math.floor(
        (new Date(saleBegin - d).getTime() % 3600000) / 60000
      );
      let seconds = Math.floor(
        (new Date(saleBegin - d).getTime() % 60000) / 1000
      );
      const string = days
        ? days + " days " + hours + " hours"
        : hours
          ? hours + " hours " + mins + " mins"
          : mins + " mins " + seconds + " seconds";
      setLeftTimeStr(string);
    };

    const [leftTimeStr, setLeftTimeStr] = useState("");

    const [saleBegin, setSaleBegin] = useState(new Date("2023-7-27 16:00"));

    const contractAddress = '0x72D2d4D0D85342844C47146389dDeDbBb3270C7e';


    let REBLContract;
  
    if (typeof window.ethereum !== 'undefined') {
      // Create the ethers provider using the Ethereum provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    
      // Check if the user has connected their wallet to the dApp
      if (provider.getSigner()) {
        // Assuming you have the correct values for contractAddress and abi
        REBLContract = new ethers.Contract(
          contractAddress,
          abi,
          provider.getSigner()
        );
    
        // Now you can use the REBLContract for interacting with the smart contract
      } else {
        console.error("User has not connected their wallet to the dApp.");
      }
    } else {
      console.error("Ethereum provider (window.ethereum) not found.");
    }    

    const handleBuy = async () => {
      const price = await REBLContract.REBL_PRICE();
      const value = ethers.BigNumber.from(numToPurchase).mul(price);

      try {
        const transaction = await REBLContract.mintREBL(numToPurchase, { value });
        console.log(transaction);
    
        // Show pending modal
        togglePendingOverlay(true);

    
        // Wait for the transaction to be confirmed
        await transaction.wait();
    
        // Close the pending modal
        togglePendingOverlay(false);
    
        // Show success modal
    
        toggleSuccessOverlay(true);
      } catch (error) {
        setTxErrorMessage(error.message);
        toggleFailedOverlay(true);
      }

    }

    function togglePendingOverlay(toggle=false){
      rootstore.txPendingOverlayVisible = toggle;
      return;
    }

    function toggleFailedOverlay(toggle=false){
        rootstore.txFailedOverlayVisible = toggle;
        if(toggle === false){
            rootstore.transactionHash = null;
            rootstore.failedTxMessage = "Your transaction failed.";
        }
        return;
    }

    function toggleSuccessOverlay(toggle=false){
        rootstore.txSuccessOverlayVisible = toggle;
        // rootstore.transactionHash = null;
        return;
    }

    function setTxErrorMessage(message = "Your transaction failed."){
      rootstore.failedTxMessage = message;
      return;
    }

    React.useEffect(() => {
      catchWindowNarrowSize();
      window.addEventListener("resize", catchWindowNarrowSize);
      return () => window.removeEventListener("resize", catchWindowNarrowSize);
    }, []);

    const catchWindowNarrowSize = () => {
      if (window.innerWidth < 850) {
        setDecentralizeImage(
          "https://yuser-assets.imgix.net/Group-jl29n1385.png?fit=clip&w=300&auto=format&dpr=2&q=75"
        );
      } else {
        setDecentralizeImage(
          "https://yuser-assets.imgix.net/Group-2342ljk11371.png?fit=clip&w=800&auto=format&dpr=2&q=75"
        );
      }

      if (window.innerWidth < 700) {
        setMobileSize(true);
      } else {
        setMobileSize(false);
      }
    };

    const Video = () => {
      //const srcLong = "https://youtu.be/WEZgvyrG5Uc"; long
      //const srcShort = "https://youtu.be/utOK7sV18Cw"; short
      return (
        <>
          {typeVideo == "longVideo" ? (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/MUglzdMbQyA?autoplay=1&vq=hd1080"
              title="YouTube video player"
              frameborder="0"
              allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          ) : (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/MUglzdMbQyA?autoplay=1&vq=hd1080"
              title="YouTube video player"
              frameborder="0"
              allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )}
        </>
      );
    };

    function openVideo(value, type) {
      setOpenVideoOverlay(value);
      setTypeVideo(type);
    }

    
    const countdownRenderer = ({hours, minutes, seconds}) => {
        return (
          <div  style={{
            height: '40px',
            width: '100%',
            background: COLORS.black50,
            borderRadius: '5px',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '22px',
          }}
          >
              <span style={{
                fontFamily: "LatoBlack",
                color: COLORS.purple
              }}>
                {hours}:{minutes}:{seconds}
              </span>
              <p 
                style={{
                fontFamily: "LatoBlack",
                marginLeft: SPACING.small
              }}>
                {"until public mint is live"}</p>
          </div>
        )
    }


    return (
      <>
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
        />

        {wagmiClient ? (
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <Container style={{overflow:'hidden'}}>
                <FullContainer style={{ flexDirection: "column" }}>
                  <Box className="Flex MobileTwist">
                    <div
                      className="flex"
                      style={{ filter:'blur(20px)',position:'absolute',left:0,right:0,top:0,bottom:0,width:'100%', justifyContent: "center", maxHeight:'100vh' }}
                    >
                      <Image
                        height="1634"
                        width="2400"
                        src={ImageWorldPlaceholder}
                        alt="REBL District"
                        objectFit="cover"
                        layout="fill"
                      />
                    </div>
                    <AnimatePresence 
                      className="flex"
                      style={{ zIndex:99,width:'100%', justifyContent: "center", maxHeight:'100vh' }}
                      mode="wait" initial={true}
                    >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1 }}
                        >
                          <Image
                            height="1634"
                            width="2400"
                            src={ImageWorld}
                            alt="REBL District"
                            objectFit="cover"
                            layout="fill"
                            priority={true}
                          />
                        </motion.div>
                    </AnimatePresence>
                    <StarCharacters>
                        <motion.div
                          whileHover={{ scale: 1.05, }}
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        >
                          <CharacterOne>
                            <ItemImage
                              objectFit="cover"
                              src={'https://yuser-assets.imgix.net/MALE_001-2340ohkm.png?fit=clip&w=400&auto=format&dpr=2&q=75'}
                              alt="REBL District"
                            />
                          </CharacterOne>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05, }}
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        >
                          <CharacterTwo>
                            <ItemImage
                              objectFit="cover"
                              src={'https://yuser-assets.imgix.net/W_001-7614lkjklf.png?fit=clip&w=400&auto=format&dpr=2&q=75'}
                              alt="REBL District"
                            />
                          </CharacterTwo>
                        </motion.div>
                    </StarCharacters>
                    <LogoBackdrop>
                      <div>
                        <PlayButton 
                          onClick={() => {
                            setOpenVideoOverlay(true);
                          }}
                          as={motion.button}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          whileHover={{ scale: 1.05, }}
                          whileTap={{ scale: 0.95, }}
                        >
                            <Icon
                              height="85px"
                              width="85px"
                              strokeWidth="4"
                              name={playButton}
                              color={"#000"}
                            />
                        </PlayButton>
                      </div>
                      <LogoInner style={{maxWidth:350}}>
                        <h3 style={{ textAlign:'center', fontFamily: "'BrunoAce', 'sans-serif'",fontSize: 20, marginBottom:10,}}>
                          WELCOME TO
                        </h3>
                        <Image
                          height="107"
                          width="301"
                          src={ImageLogoLocal}
                          alt="REBL District"
                        />
                        <div style={{textAlign:'center', marginBottom:12,fontSize:18,}}>
                         {"REBL District is a collection of 8,888 unique REBLs fighting to empower creators in the year 2049."}
                        </div>
                        {saleBegin - new Date() > 0 ? (
                        <Countdown
                            date={saleBegin}
                            renderer={countdownRenderer}
                            zeroPadTime={2} 
                          />
                        ) : 
                        <>
                        <div style={{alignSelf:'center', textAlign:'center', marginBottom:12,fontSize:18,}}>
                         {"The REBL District mint is live!"}
                        </div>
                          {account.address ? (
                            <div className="buy-nft-button-box">
                              <Button
                                text="MINT REBL NFT"
                                onClick={handleBuy}
                                isIcon={false}
                                color={COLORS.purple}
                                colorText={COLORS.white}
                              />
                              <DropDownBox>
                                <PurchaseNumSelection onChange={handleNumToPurchaseChange}>
                                  {purchaseOptions.map((option) => (
                                    <PurchaseNumOption key={option}>{option}</PurchaseNumOption>
                                  ))}
                                </PurchaseNumSelection>
                              </DropDownBox>
                            </div>
                          ) : (
                            <ConnectButton.Custom>
                              {({
                                account,
                                chain,
                                openAccountModal,
                                openChainModal,
                                openConnectModal,
                                authenticationStatus,
                                mounted,
                              }) => {
                                // Note: If your app doesn't use authentication, you
                                // can remove all 'authenticationStatus' checks
                                const ready = mounted && authenticationStatus !== 'loading';
                                const connected =
                                  ready &&
                                  account &&
                                  chain &&
                                  (!authenticationStatus ||
                                    authenticationStatus === 'authenticated');

                                return (
                                  <div
                                    {...(!ready && {
                                      'aria-hidden': true,
                                      style: {
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                      },
                                    })}
                                  >
                                    {(() => {
                                      if (!connected) {
                                        return (
                                          <button
                                            onClick={openConnectModal}
                                            type="button"
                                            style={{
                                              width: '100%',
                                              height: '40px',
                                              background: '#dc3bc3',
                                              borderRadius: '5px',
                                              color: 'white',
                                              cursor: 'pointer',
                                            }}
                                          >
                                            Connect Wallet
                                          </button>
                                        );
                                      }
                                    })()}
                                  </div>
                                );
                              }}
                            </ConnectButton.Custom>
                          )}
                          <div style={{marginTop:12,justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{fontSize: 18, fontWeight: '800' }}>Price: 0.05 ETH</div>
                            <div style={{fontSize: 18, fontWeight: '800' }}>Limit: 20 per tx</div>
                          </div>
                        </>
                       }
                      </LogoInner>
                    </LogoBackdrop>
                    <DownArrowButton>
                      <Icon
                        height="55px"
                        width="55px"
                        strokeWidth="4"
                        name={arrowDown}
                      />
                    </DownArrowButton>
                  </Box>
                  <div style={{position:'relative',justifyContent:'center',overflow:'hidden',height:250,display:'flex',width:'100%',alignItems:'center',flexDirection:'column'}}>
                <GradientSection
                  bagroundColor={"#1A0C39"}
                  opacity={1}
                  angle={105}
                  colorStart={"#220425"}
                  colorStartLength={"0%"}
                  colorStop={"#110824"}
                  zIndex={11} //not less than 110 <GradientWrapper: z-index=110
                />
                <GradientSection
                  bagroundColor={"#371750"}
                  opacity={0.5}
                  angle={30}
                  colorStart={"#2d100d"}
                  colorStartLength={"0%"}
                  colorStop={"#23104c"}
                  zIndex={111} //not less than 110 <GradientWrapper: z-index=110
                />
                <h1 style={{color:'#FEFC40',marginBottom:24,zIndex:111,fontFamily: "'BrunoAce', 'sans-serif'", }}>Our Partners</h1>
                <PartnerScroll>
                  <ItemLogo>          
                    <ItemImage 
                      objectFit="cover"
                      layout="fill"
                      src={'https://yuser-assets.imgix.net/skale_jkl234.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
                    />
                  </ItemLogo>  
                  <ItemLogo>           
                    <ItemImage 
                      objectFit="cover"
                      layout="fill"
                      src={'https://yuser-assets.imgix.net/moonbeam-foundation-white-1000-padding-1.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
                    />
                  </ItemLogo>  
                  <ItemLogo>            
                    <ItemImage 
                      objectFit="cover"
                      layout="fill"
                      src={'https://yuser-assets.imgix.net/logo-polkadot_23jlkf.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
                    />
                  </ItemLogo> 
                  <ItemLogo>      
                    <ItemImage 
                      objectFit="cover"
                      layout="fill"
                      src={'https://yuser-assets.imgix.net/Group_jkl2311374.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
                    />
                  </ItemLogo> 
                  <ItemLogo>
                    <ItemImage 
                      objectFit="cover"
                      layout="fill"
                      src={'https://yuser-assets.imgix.net/LogosigntextWhite_%4034jkl21.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
                    />
                  </ItemLogo> 
                  <ItemLogo>         
                    <ItemImage 
                      objectFit="cover"
                      layout="fill"
                      src={'https://yuser-assets.imgix.net/vampr_logo_jkl234jkl.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
                    />
                  </ItemLogo>   
                  <ItemLogo>          
                    <ItemImage 
                      objectFit="cover"
                      layout="fill"
                      src={'https://yuser-assets.imgix.net/Group_23ljk428723.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
                    />
                  </ItemLogo>  
                </PartnerScroll>
              </div>
              <Box className="Flex">
                <GradientSection
                  bagroundColor={"1A0C39"}
                  opacity={1}
                  angle={105}
                  colorStart={"#1A0C39"}
                  colorStartLength={"0%"}
                  colorStop={"#430749"}
                  zIndex={111} //not less than 110 <GradientWrapper: z-index=110
                />
                <GradientSection
                  bagroundColor={"#371750"}
                  opacity={1}
                  angle={200}
                  colorStart={"#5c221d00"}
                  colorStartLength={"0%"}
                  colorStop={"#581F1B"}
                  zIndex={111} //not less than 110 <GradientWrapper: z-index=110
                />
                  <div 
                    style={{
                      maxWidth: '100%',
                      position: 'absolute',
                      left: '5%',
                      right: '0',
                      top: '5%',
                      maxHeight: '100vh',
                      zIndex: '111',
                      height: '90%',
                      width: '90%',
                      filter: 'blur(50px)',
                    }}
                  >
                    <motion.div
                      margin="0px -20px 0px 100px"
                      initial={{ opacity: 0, y: -100, scale: 2 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, }}
                      style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                    <Image 
                      layout="fill"
                      objectFit="cover"
                      src={Shapes}
                    />
                  </motion.div>
                  </div>
                  <WrapperComponent>
                    <motion.div
                      initial={{ opacity: 0, y: 200 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, }}
                      style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                    <BlockContentComponent
                      StickerBox1={null}
                      StickerSubtitle1={"Access to"}
                      StickerTitle1={"AI Tools"}
                      stickerSrc1={"https://yuser-assets.imgix.net/Layer17jk232l.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                      StickerBox2={null}
                      StickerSubtitle2={"Access to"}
                      StickerTitle2={"AI Companions"}
                      stickerSrc2={"https://yuser-assets.imgix.net/Group-11364.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                      StickerBox3={null}
                      StickerSubtitle3={"Mint price"}
                      StickerTitle3={"0.05 ETH"}
                      stickerSrc3={"https://yuser-assets.imgix.net/Group11354.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                      StickerBox4={null}
                      StickerSubtitle4={"Traits"}
                      StickerTitle4={"1,000+"}
                      stickerSrc4={"https://yuser-assets.imgix.net/Layer-3jkljkldfs20.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                      StickerBox5={null}
                      StickerSubtitle5={"Access to"}
                      StickerTitle5={"App & Districts"}
                      stickerSrc5={"https://yuser-assets.imgix.net/Layer1693i29j.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                      StickerBox6={null}
                      StickerSubtitle6={"Claim"}
                      StickerTitle6={"20 per tx"}
                      stickerSrc6={"https://yuser-assets.imgix.net/Layer1i2jfk.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                      reverse={false}
                      mobileReverse={false}
                      standardTitleLogoSize={null}
                      textMarginLeft={24}
                      textMarginRight={24}
                      imageMaxWidth={""}
                      title1={"Join the Movement"}
                      title1FontSize={50}
                      title2={null}
                      title2FontSize={null}
                      title3={null}
                      title3FontSize={null}
                      textMaxWidth={600}
                      descriptionFontSize={24}
                      description1={
                        "REBL District is an NFT collection of cybernetically altered REBLs fighting for creator empowerment in the year 2049. While you wait to mint a REBL or for your REBL NFT to reveal, jump our Discord to get an invite code to join the App. Start crafting, exporing and monetizing content."
                      }
                      mobileMargin={false}
                      src={
                        "https://yuser-assets.imgix.net/Rebl/W_NFT_006_hexagon.png?fit=clip&w=300&auto=format&dpr=2&q=75"
                      }
                      rightButton={"Join our Discord"}
                      rightHref={"https://discord.gg/CHU2d4eFT7"}
                      rightButtonColor={'#DC3BC3'}
                      leftButton={null}
                      leftHref={null}
                    />
                    </motion.div>
                  </WrapperComponent>
              </Box>
              <Box className="Flex">
                <GradientSection
                  bagroundColor={"1A0C39"}
                  opacity={1}
                  angle={165}
                  colorStart={"#1A0C39"}
                  colorStartLength={"0%"}
                  colorStop={"#2a052e"}
                  zIndex={111} //not less than 110 <GradientWrapper: z-index=110
                />
                <GradientSection
                  bagroundColor={"#371750"}
                  opacity={0.8}
                  angle={365}
                  colorStart={"#2d100d"}
                  colorStartLength={"0%"}
                  colorStop={"#23104c"}
                  zIndex={111} //not less than 110 <GradientWrapper: z-index=110
                />
                  <div 
                    style={{
                      maxWidth: '100%',
                      position: 'absolute',
                      left: '5%',
                      right: '0',
                      top: '5%',
                      maxHeight: '100vh',
                      zIndex: '111',
                      height: '90%',
                      width: '90%',
                      filter: 'blur(65px)',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    <motion.div
                      margin="0px -20px 0px 100px"
                      initial={{ opacity: 0, y: -100, scale: 2 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, }}
                      style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                    <Image 
                      layout="fill"
                      objectFit="cover"
                      src={Shapes}
                    />
                  </motion.div>
                  </div>
                  <WrapperComponent>
                    <motion.div
                      initial={{ opacity: 0, y: 200 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, }}
                      style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                    <ImageContentComponent
                      reverse={true}
                      mobileReverse={false}
                      standardTitleLogoSize={null}
                      textMarginLeft={24}
                      textMarginRight={24}
                      logoHeight={75.62}
                      logoWidth={400}
                      srcTitle={"https://yuser-assets.imgix.net/rebl_logo_horizontal_234jhkj2.png?fit=clip&w=250&auto=format&dpr=2&q=75"}
                      imageMaxWidth={""}
                      title1={null}
                      title1FontSize={50}
                      title2={null}
                      title2FontSize={null}
                      title3={null}
                      title3FontSize={null}
                      textMaxWidth={600}
                      descriptionFontSize={24}
                      description1={
                        "Step into REBL, a movement where your imagination is your only limitation. It's a hub where you craft, explore, and monetize your content. Generate AI-driven content and earn token rewards instead of likes."
                      }
                      mobileMargin={false}
                      src={
                        "https://yuser-assets.imgix.net/app_screen_demo_ui2hbm23.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                      }
                      rightButton={"Join the app"}
                      rightHref={"/signin"}
                      rightButtonColor={'#DC3BC3'}
                      leftButton={null}
                      leftHref={null}
                    />
                    </motion.div>
                  </WrapperComponent>
              </Box>
              <Box className="Flex">
                <GradientSection
                  bagroundColor={"1A0C39"}
                  opacity={1}
                  angle={105}
                  colorStart={"#1A0C39"}
                  colorStartLength={"0%"}
                  colorStop={"#430749"}
                  zIndex={111} //not less than 110 <GradientWrapper: z-index=110
                />
                <GradientSection
                  bagroundColor={"#371750"}
                  opacity={0.2}
                  angle={200}
                  colorStart={"#5c221d00"}
                  colorStartLength={"0%"}
                  colorStop={"#581F1B"}
                  zIndex={111} //not less than 110 <GradientWrapper: z-index=110
                />
                  <div 
                    style={{
                      maxWidth: '100%',
                      position: 'absolute',
                      left: '5%',
                      right: '0',
                      top: '5%',
                      maxHeight: '100vh',
                      zIndex: '111',
                      height: '90%',
                      width: '90%',
                      filter: 'blur(50px)',
                    }}
                  >
                    <motion.div
                      margin="0px -20px 0px 100px"
                      initial={{ opacity: 0, y: -100, scale: 2 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, }}
                      style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                      <Image 
                        layout="fill"
                        objectFit="cover"
                        src={Shapes}
                      />
                    </motion.div>
                  </div>
                  <WrapperComponent>
                    <motion.div
                      initial={{ opacity: 0, y: 200 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, }}
                      style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                    <ImageContentComponent
                      direction={"column"}
                      subTitleFontSize={24}
                      textMarginLeft={true}
                      textMarginRight={false}
                      srcTitle={null}
                      title1={"A world of access"}
                      title1FontSize={55}
                      title2={""}
                      title2FontSize={0}
                      title3={""}
                      title3FontSize={0}
                      description1={"Imagine a world where creativity and decentralization reign, a world where everyone has access to cutting-edge AI tools and the rights to their intellectual property. In this world, creativity and expression are not punished by demonetization. This is REBL District."}
                      description2={""}
                      descriptionColor={COLORS.white}
                      descriptionFontSize={24}
                      reverse={true}
                      mobileReverse={false}
                      imageMaxWidth={1000}
                      src={decentralizeImage}
                      bottomButton={"Join our Discord"}
                      bottomHref={"https://discord.gg/CHU2d4eFT7"}
                      bottomButtonColor={"#F23577"}
                    />
                    </motion.div>
                  </WrapperComponent>
              </Box>
              <Box className="Flex" style={{flexDirection:'column'}}>
                <GradientSection
                  bagroundColor={"000"}
                  opacity={0.8}
                  angle={145}
                  colorStart={"#1A0C39"}
                  colorStartLength={"0%"}
                  colorStop={"#430749"}
                  zIndex={111} //not less than 110 <GradientWrapper: z-index=110
                />
                <GradientSection
                  bagroundColor={"#371750"}
                  opacity={1}
                  angle={180}
                  colorStart={"#350839db"}
                  colorStartLength={"0%"}
                  colorStop={"#000000a3"}
                  zIndex={111} //not less than 110 <GradientWrapper: z-index=110
                />
                  <div 
                    style={{
                      maxWidth: '100%',
                      position: 'absolute',
                      left: '5%',
                      right: '0',
                      top: '5%',
                      maxHeight: '100%',
                      zIndex: '111',
                      height: '90%',
                      width: '90%',
                      filter: 'blur(110px)',
                    }}
                  >
                    <motion.div
                      margin="0px -20px 0px 100px"
                      initial={{ opacity: 0, y: -100, scale: 1.3 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, }}
                      style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                    <Image 
                      layout="fill"
                      objectFit="cover"
                      src={Shapes}
                    />
                  </motion.div>
                  </div>
                  <WrapperComponent style={{flexDirection:'column'}}>
                    <SectionTitle>
                      {"ROADMAP"}
                    </SectionTitle>
                    <motion.div
                      initial={{ opacity: 0, x: 200 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, }}
                      style={{marginTop:48,marginBottom:48,width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                      <ImageContentComponent
                        reverse={false}
                        mobileReverse={false}
                        standardTitleLogoSize={null}
                        textMarginLeft={24}
                        textMarginRight={24}
                        srcTitle={null}
                        imageMaxWidth={"250px"}
                        subTitle={"SOCIAL DAPP & NFT SALE"}
                        subTitleColor={"#fefc3f"}
                        subTitleFontSize={20}
                        title1={"Phase 1"}
                        title1FontSize={50}
                        title2={null}
                        title2FontSize={null}
                        title3={null}
                        title3FontSize={null}
                        textMaxWidth={600}
                        descriptionFontSize={22}
                        description1={
                          "The REBL dApp is where the magic happens! It’s our HQ for innovation, where we come together to create, connect and plan our next moves!"
                        }
                        table={true}
                        listFontSize={22}
                        listStyle={'disc'}
                        tableData={[
                          "🔥 Join the dApp and community right now ",
                          "💯 Buy & mint entirely hand-drawn REBL District NFTs",
                        ]}
                        mobileMargin={false}
                        src={
                          "https://yuser-assets.imgix.net/Group-12346374ff2.png?fit=clip&w=400&fm=avif&auto=format&dpr=2"
                        }
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -200 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, }}
                      style={{marginTop:48,marginBottom:48,width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                      <ImageContentComponent
                        reverse={true}
                        mobileReverse={false}
                        standardTitleLogoSize={null}
                        textMarginLeft={24}
                        textMarginRight={24}
                        srcTitle={null}
                        imageMaxWidth={"350px"}
                        subTitle={"AI CONTENT & NFT FEATURES"}
                        subTitleColor={"#fefc3f"}
                        subTitleFontSize={20}
                        title1={"Phase 2"}
                        title1FontSize={50}
                        title2={null}
                        title2FontSize={null}
                        title3={null}
                        title3FontSize={null}
                        textMaxWidth={600}
                        descriptionFontSize={22}
                        description1={
                          "We don't play by their rules. We use AI companions – called NPCs – to flip the script, to unleash our raw creativity, and stick it to the suits. Let your very own, custom-styled NPC companion create stunning generative art just for you!"
                        }
                        table={true}
                        listFontSize={22}
                        listStyle={'disc'}
                        tableData={[
                          "🦾 Gain lifetime access to AI generative NFT tools",
                          "🤑 Mint your A.I. content quickly & easily into NFTs",
                          "👾 Buy & sell NFTs in the REBL Marketplace"
                        ]}
                        mobileMargin={false}
                        src={
                          "https://yuser-assets.imgix.net/Group-2hkj2334.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                        }
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 200 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, }}
                      style={{marginTop:48,marginBottom:48,width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                      <ImageContentComponent
                        reverse={false}
                        mobileReverse={false}
                        standardTitleLogoSize={null}
                        textMarginLeft={24}
                        textMarginRight={24}
                        srcTitle={null}
                        imageMaxWidth={"325px"}
                        subTitle={"SOUL-BOUND PROFILE"}
                        subTitleColor={"#fefc3f"}
                        subTitleFontSize={20}
                        title1={"Phase 3"}
                        title1FontSize={50}
                        title2={null}
                        title2FontSize={null}
                        title3={null}
                        title3FontSize={null}
                        textMaxWidth={600}
                        descriptionFontSize={22}
                        description1={
                          "Your profile is way more than just a boring old list of data in some corpo database. It's a part of you, and that's what makes it special. Our SoulBound NFT token will make your profile one-of-a-kind and totally unique, just like you!"
                        }
                        table={true}
                        listFontSize={22}
                        listStyle={'disc'}
                        tableData={[
                          '🚀 Possess your very own Soul-Bound NFT profile',
                          '🤝 Gain Access to multiple district communities & apps',
                          '🤖 Own your unique hand drawn NPC companion'
                        ]}
                        mobileMargin={false}
                        src={
                          "https://yuser-assets.imgix.net/Group-2jkl45w2.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                        }
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -200 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, }}
                      style={{marginTop:48,marginBottom:48,width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
                    >
                      <ImageContentComponent
                        reverse={true}
                        mobileReverse={false}
                        standardTitleLogoSize={null}
                        textMarginLeft={24}
                        textMarginRight={24}
                        srcTitle={null}
                        imageMaxWidth={"325px"}
                        subTitle={"MONETIZE YOUR CONTENT"}
                        subTitleColor={"#fefc3f"}
                        subTitleFontSize={20}
                        title1={"Phase 4"}
                        title1FontSize={50}
                        title2={null}
                        title2FontSize={null}
                        title3={null}
                        title3FontSize={null}
                        textMaxWidth={600}
                        descriptionFontSize={22}
                        description1={
                          "The REBL dApp is where your likes are worth more than just social validation. With our Diamond tokens dropping soon, you can finally monetize your unique style and identity as a rebellious content creator, stacking serious crypto in your wallet and giving the middle finger to the mainstream. Let's show 'em how it's done."
                        }
                        table={true}
                        listFontSize={22}
                        listStyle={'disc'}
                        tableData={[
                          '💎 Earn Diamond + Gem rewards',
                          '✏️ Vote in the REBL Protocol DAO'
                        ]}
                        mobileMargin={false}
                        src={
                          "https://yuser-assets.imgix.net/Group-32d2efg.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                        }
                      />
                    </motion.div>
                  </WrapperComponent>
              </Box>
                  <Section style={{ overflow:'hidden', position:'relative' }}>
                    <GradientSection
                      bagroundColor={"#000"}
                      opacity={1}
                      zIndex={111} //not less than 110 <GradientWrapper: z-index=110
                    />
                    <WrapperComponent style={{flexDirection:'column',alignItems: 'center',paddingTop: 48,paddingBottom: 48}}>
                    <h3 style={{ fontSize: 20, marginBottom: 24 }}>
                      FOLLOW REBL ON SOCIALS
                    </h3>
                    <div
                      className="Flex"
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Alink
                        href="https://www.twitter.com/reblapp"
                        target="_blank"
                        style={{ alignItems: "center", justifyContent: "center" }}
                        className="Flex"
                      >
                        <Icon
                          name={twitterIcon}
                          //strokeColor={({ theme }) => theme.iconColor.color}
                          //strokeWidth="0px"
                          color={({ theme }) => theme.iconColor.color}
                          height="29px"
                          width="auto"
                        />
                      </Alink>
                      <Alink
                        href="https://discord.gg/CHU2d4eFT7"
                        target="_blank"
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: 18,
                        }}
                        className="Flex"
                      >
                        <Icon
                          name={discordIcon}
                          //strokeColor={({ theme }) => theme.iconColor.color}
                          //strokeWidth="1px"
                          color={({ theme }) => theme.iconColor.color}
                          height="34px"
                          width="auto"
                        />
                      </Alink>
                      <Alink
                        href="https://www.instagram.com/reblapp"
                        target="_blank"
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: 18,
                        }}
                        className="Flex"
                      >
                        <Icon
                          name={instagramIcon}
                          //strokeColor={({ theme }) => theme.iconColor.color}
                          //strokeWidth="1px"
                          color={({ theme }) => theme.iconColor.color}
                          height="30px"
                          width="auto"
                        />
                      </Alink>
                      <Alink
                        href="https://medium.com/rebl"
                        target="_blank"
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: 18,
                        }}
                        className="Flex"
                      >
                        <Icon
                          name={mediumIcon}
                          //strokeColor={({ theme }) => theme.iconColor.color}
                          //strokeWidth="1px"
                          color={({ theme }) => theme.iconColor.color}
                          height="34px"
                          width="auto"
                        />
                      </Alink>
                    </div>
                    </WrapperComponent>
                  </Section>
                  <FooterHorizontal />
                  {openVideoOverlay && (                   
                    <div
                      className="flex"
                      style={{
                        position: "fixed",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 9999999,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        setOpenVideoOverlay(false);
                      }}
                    >
                      <AnimatePresence style={{zIndex:99}} mode="wait" initial={true}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1 }}
                          style={{flexDirection:'column',display:'flex',width:'100%'}}
                        >
                          <OverlayContainer>
                            <div
                              className="flex"
                              style={{ width: "85vw", height: "85vh" }}
                            >
                              <Video typeVideo={typeVideo} />
                            </div>
                          </OverlayContainer>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                )}
                {rootstore.txPendingOverlayVisible && <TxPendingOverlay />}
                {rootstore.txFailedOverlayVisible && <TxFailedOverlay closeOverlay={()=>toggleFailedOverlay(false)} />} 
                {rootstore.txSuccessOverlayVisible && <TxSuccessOverlay closeOverlay={() => rootstore.txSuccessOverlayVisible = false} buttonText={"Continue"} successButtonOnClick={() => { rootstore.txSuccessOverlayVisible = false }} />}
                </FullContainer>
              </Container>
            </RainbowKitProvider>
          </WagmiConfig>
        ) : (
          <Container style={{overflow:'hidden'}}>
          <FullContainer style={{ flexDirection: "column" }}>
            <Box className="Flex MobileTwist">
              <div
                className="flex"
                style={{ filter:'blur(20px)',position:'absolute',left:0,right:0,top:0,bottom:0,width:'100%', justifyContent: "center", maxHeight:'100vh' }}
              >
                <Image
                  height="1634"
                  width="2400"
                  src={ImageWorldPlaceholder}
                  alt="REBL District"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <AnimatePresence 
                className="flex"
                style={{ zIndex:99,width:'100%', justifyContent: "center", maxHeight:'100vh' }}
                mode="wait" initial={true}
              >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Image
                      height="1634"
                      width="2400"
                      src={ImageWorld}
                      alt="REBL District"
                      objectFit="cover"
                      layout="fill"
                      priority={true}
                    />
                  </motion.div>
              </AnimatePresence>
              <StarCharacters>
                  <motion.div
                    whileHover={{ scale: 1.05, }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  >
                    <CharacterOne>
                      <ItemImage
                        objectFit="cover"
                        src={'https://yuser-assets.imgix.net/MALE_001-2340ohkm.png?fit=clip&w=400&auto=format&dpr=2&q=75'}
                        alt="REBL District"
                      />
                    </CharacterOne>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  >
                    <CharacterTwo>
                      <ItemImage
                        objectFit="cover"
                        src={'https://yuser-assets.imgix.net/W_001-7614lkjklf.png?fit=clip&w=400&auto=format&dpr=2&q=75'}
                        alt="REBL District"
                      />
                    </CharacterTwo>
                  </motion.div>
              </StarCharacters>
              <LogoBackdrop>
                <div>
                  <PlayButton 
                    onClick={() => {
                      setOpenVideoOverlay(true);
                    }}
                    as={motion.button}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    whileHover={{ scale: 1.05, }}
                    whileTap={{ scale: 0.95, }}
                  >
                      <Icon
                        height="85px"
                        width="85px"
                        strokeWidth="4"
                        name={playButton}
                        color={"#000"}
                      />
                  </PlayButton>
                </div>
                <LogoInner style={{maxWidth:350}}>
                  <h3 style={{ textAlign:'center', fontFamily: "'BrunoAce', 'sans-serif'",fontSize: 20, marginBottom:10,}}>
                    WELCOME TO
                  </h3>
                  <Image
                    height="107"
                    width="301"
                    src={ImageLogoLocal}
                    alt="REBL District"
                  />
                         <div style={{textAlign:'center', marginBottom:12,fontSize:18,}}>
                          {"REBL District is a collection of 8,888 unique REBLs fighting to empower creators in the year 2049. You need a Web3 supportive browser to mint a REBL NFT."}
                        </div>
                        <div style={{marginBottom:12,justifyContent:'space-between',alignItems:'center'}}>
                          <div style={{fontSize: 18, fontWeight: '800' }}>Price: 0.05 ETH</div>
                          <div style={{fontSize: 18, fontWeight: '800' }}>Limit: 20 per tx</div>
                        </div>
                        <Button
                          width={'100%'}
                          text={"Join our Discord"}
                          onClick={() => {
                            window.open("https://discord.gg/CHU2d4eFT7");
                          }} //needs to link to https://form.typeform.com/to/mKGRLp5v
                          isIcon={false}
                          color={COLORS.purple}
                          colorText={COLORS.white}
                        />
                </LogoInner>
              </LogoBackdrop>
              <DownArrowButton>
                <Icon
                  height="55px"
                  width="55px"
                  strokeWidth="4"
                  name={arrowDown}
                />
              </DownArrowButton>
            </Box>
            <div style={{position:'relative',justifyContent:'center',overflow:'hidden',height:250,display:'flex',width:'100%',alignItems:'center',flexDirection:'column'}}>
          <GradientSection
            bagroundColor={"#1A0C39"}
            opacity={1}
            angle={105}
            colorStart={"#220425"}
            colorStartLength={"0%"}
            colorStop={"#110824"}
            zIndex={11} //not less than 110 <GradientWrapper: z-index=110
          />
          <GradientSection
            bagroundColor={"#371750"}
            opacity={0.5}
            angle={30}
            colorStart={"#2d100d"}
            colorStartLength={"0%"}
            colorStop={"#23104c"}
            zIndex={111} //not less than 110 <GradientWrapper: z-index=110
          />
          <h1 style={{color:'#FEFC40',marginBottom:24,zIndex:111,fontFamily: "'BrunoAce', 'sans-serif'", }}>Our Partners</h1>
          <PartnerScroll>
            <ItemLogo>          
              <ItemImage 
                objectFit="cover"
                layout="fill"
                src={'https://yuser-assets.imgix.net/skale_jkl234.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
              />
            </ItemLogo>  
            <ItemLogo>           
              <ItemImage 
                objectFit="cover"
                layout="fill"
                src={'https://yuser-assets.imgix.net/moonbeam-foundation-white-1000-padding-1.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
              />
            </ItemLogo>  
            <ItemLogo>            
              <ItemImage 
                objectFit="cover"
                layout="fill"
                src={'https://yuser-assets.imgix.net/logo-polkadot_23jlkf.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
              />
            </ItemLogo> 
            <ItemLogo>      
              <ItemImage 
                objectFit="cover"
                layout="fill"
                src={'https://yuser-assets.imgix.net/Group_jkl2311374.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
              />
            </ItemLogo> 
            <ItemLogo>
              <ItemImage 
                objectFit="cover"
                layout="fill"
                src={'https://yuser-assets.imgix.net/LogosigntextWhite_%4034jkl21.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
              />
            </ItemLogo> 
            <ItemLogo>         
              <ItemImage 
                objectFit="cover"
                layout="fill"
                src={'https://yuser-assets.imgix.net/vampr_logo_jkl234jkl.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
              />
            </ItemLogo>   
            <ItemLogo>          
              <ItemImage 
                objectFit="cover"
                layout="fill"
                src={'https://yuser-assets.imgix.net/Group_23ljk428723.png?fit=clip&w=150&auto=format&dpr=2&q=75'}
              />
            </ItemLogo>  
          </PartnerScroll>
        </div>
        <Box className="Flex">
          <GradientSection
            bagroundColor={"1A0C39"}
            opacity={1}
            angle={105}
            colorStart={"#1A0C39"}
            colorStartLength={"0%"}
            colorStop={"#430749"}
            zIndex={111} //not less than 110 <GradientWrapper: z-index=110
          />
          <GradientSection
            bagroundColor={"#371750"}
            opacity={1}
            angle={200}
            colorStart={"#5c221d00"}
            colorStartLength={"0%"}
            colorStop={"#581F1B"}
            zIndex={111} //not less than 110 <GradientWrapper: z-index=110
          />
            <div 
              style={{
                maxWidth: '100%',
                position: 'absolute',
                left: '5%',
                right: '0',
                top: '5%',
                maxHeight: '100vh',
                zIndex: '111',
                height: '90%',
                width: '90%',
                filter: 'blur(50px)',
              }}
            >
              <motion.div
                margin="0px -20px 0px 100px"
                initial={{ opacity: 0, y: -100, scale: 2 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, }}
                style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
              <Image 
                layout="fill"
                objectFit="cover"
                src={Shapes}
              />
            </motion.div>
            </div>
            <WrapperComponent>
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, }}
                style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
              <BlockContentComponent
                StickerBox1={null}
                StickerSubtitle1={"Access to"}
                StickerTitle1={"AI Tools"}
                stickerSrc1={"https://yuser-assets.imgix.net/Layer17jk232l.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                StickerBox2={null}
                StickerSubtitle2={"Access to"}
                StickerTitle2={"AI Companions"}
                stickerSrc2={"https://yuser-assets.imgix.net/Group-11364.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                StickerBox3={null}
                StickerSubtitle3={"Mint price"}
                StickerTitle3={"Coming soon"}
                stickerSrc3={"https://yuser-assets.imgix.net/Group11354.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                StickerBox4={null}
                StickerSubtitle4={"Traits"}
                StickerTitle4={"Coming soon"}
                stickerSrc4={"https://yuser-assets.imgix.net/Layer-3jkljkldfs20.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                StickerBox5={null}
                StickerSubtitle5={"Access to"}
                StickerTitle5={"App & Districts"}
                stickerSrc5={"https://yuser-assets.imgix.net/Layer1693i29j.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                StickerBox6={null}
                StickerSubtitle6={"Claim"}
                StickerTitle6={"20 per wallet"}
                stickerSrc6={"https://yuser-assets.imgix.net/Layer1i2jfk.png?fit=clip&w=100&auto=format&dpr=2&q=75"}
                reverse={false}
                mobileReverse={false}
                standardTitleLogoSize={null}
                textMarginLeft={24}
                textMarginRight={24}
                imageMaxWidth={""}
                title1={"Join the Movement"}
                title1FontSize={50}
                title2={null}
                title2FontSize={null}
                title3={null}
                title3FontSize={null}
                textMaxWidth={600}
                descriptionFontSize={24}
                description1={
                  "REBL District is an NFT collection of cybernetically altered REBLs fighting for creator empowerment in the year 2049. While you wait to mint a REBL or for your REBL NFT to reveal, jump our Discord to get an invite code to join the App. Start crafting, exporing and monetizing content."
                }
                mobileMargin={false}
                src={
                  "https://yuser-assets.imgix.net/Rebl/W_NFT_006_hexagon.png?fit=clip&w=300&auto=format&dpr=2&q=75"
                }
                rightButton={"Join our Discord"}
                rightHref={"https://discord.gg/CHU2d4eFT7"}
                rightButtonColor={'#DC3BC3'}
                leftButton={null}
                leftHref={null}
              />
              </motion.div>
            </WrapperComponent>
        </Box>
        <Box className="Flex">
          <GradientSection
            bagroundColor={"1A0C39"}
            opacity={1}
            angle={165}
            colorStart={"#1A0C39"}
            colorStartLength={"0%"}
            colorStop={"#2a052e"}
            zIndex={111} //not less than 110 <GradientWrapper: z-index=110
          />
          <GradientSection
            bagroundColor={"#371750"}
            opacity={0.8}
            angle={365}
            colorStart={"#2d100d"}
            colorStartLength={"0%"}
            colorStop={"#23104c"}
            zIndex={111} //not less than 110 <GradientWrapper: z-index=110
          />
            <div 
              style={{
                maxWidth: '100%',
                position: 'absolute',
                left: '5%',
                right: '0',
                top: '5%',
                maxHeight: '100vh',
                zIndex: '111',
                height: '90%',
                width: '90%',
                filter: 'blur(65px)',
                transform: 'rotate(180deg)',
              }}
            >
              <motion.div
                margin="0px -20px 0px 100px"
                initial={{ opacity: 0, y: -100, scale: 2 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, }}
                style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
              <Image 
                layout="fill"
                objectFit="cover"
                src={Shapes}
              />
            </motion.div>
            </div>
            <WrapperComponent>
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, }}
                style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
              <ImageContentComponent
                reverse={true}
                mobileReverse={false}
                standardTitleLogoSize={null}
                textMarginLeft={24}
                textMarginRight={24}
                logoHeight={75.62}
                logoWidth={400}
                srcTitle={"https://yuser-assets.imgix.net/rebl_logo_horizontal_234jhkj2.png?fit=clip&w=250&auto=format&dpr=2&q=75"}
                imageMaxWidth={""}
                title1={null}
                title1FontSize={50}
                title2={null}
                title2FontSize={null}
                title3={null}
                title3FontSize={null}
                textMaxWidth={600}
                descriptionFontSize={24}
                description1={
                  "Step into REBL, a movement where your imagination is your only limitation. It's a hub where you craft, explore, and monetize your content. Generate AI-driven content and earn token rewards instead of likes."
                }
                mobileMargin={false}
                src={
                  "https://yuser-assets.imgix.net/app_screen_demo_ui2hbm23.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                }
                rightButton={"Join the app"}
                rightHref={"/signin"}
                rightButtonColor={'#DC3BC3'}
                leftButton={null}
                leftHref={null}
              />
              </motion.div>
            </WrapperComponent>
        </Box>
        <Box className="Flex">
          <GradientSection
            bagroundColor={"1A0C39"}
            opacity={1}
            angle={105}
            colorStart={"#1A0C39"}
            colorStartLength={"0%"}
            colorStop={"#430749"}
            zIndex={111} //not less than 110 <GradientWrapper: z-index=110
          />
          <GradientSection
            bagroundColor={"#371750"}
            opacity={0.2}
            angle={200}
            colorStart={"#5c221d00"}
            colorStartLength={"0%"}
            colorStop={"#581F1B"}
            zIndex={111} //not less than 110 <GradientWrapper: z-index=110
          />
            <div 
              style={{
                maxWidth: '100%',
                position: 'absolute',
                left: '5%',
                right: '0',
                top: '5%',
                maxHeight: '100vh',
                zIndex: '111',
                height: '90%',
                width: '90%',
                filter: 'blur(50px)',
              }}
            >
              <motion.div
                margin="0px -20px 0px 100px"
                initial={{ opacity: 0, y: -100, scale: 2 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, }}
                style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
                <Image 
                  layout="fill"
                  objectFit="cover"
                  src={Shapes}
                />
              </motion.div>
            </div>
            <WrapperComponent>
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, }}
                style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
              <ImageContentComponent
                direction={"column"}
                subTitleFontSize={24}
                textMarginLeft={true}
                textMarginRight={false}
                srcTitle={null}
                title1={"A world of access"}
                title1FontSize={55}
                title2={""}
                title2FontSize={0}
                title3={""}
                title3FontSize={0}
                description1={"Imagine a world where creativity and decentralization reign, a world where everyone has access to cutting-edge AI tools and the rights to their intellectual property. In this world, creativity and expression are not punished by demonetization. This is REBL District."}
                description2={""}
                descriptionColor={COLORS.white}
                descriptionFontSize={24}
                reverse={true}
                mobileReverse={false}
                imageMaxWidth={1000}
                src={decentralizeImage}
                bottomButton={"Join our Discord"}
                bottomHref={"https://discord.gg/CHU2d4eFT7"}
                bottomButtonColor={"#F23577"}
              />
              </motion.div>
            </WrapperComponent>
        </Box>
        <Box className="Flex" style={{flexDirection:'column'}}>
          <GradientSection
            bagroundColor={"000"}
            opacity={0.8}
            angle={145}
            colorStart={"#1A0C39"}
            colorStartLength={"0%"}
            colorStop={"#430749"}
            zIndex={111} //not less than 110 <GradientWrapper: z-index=110
          />
          <GradientSection
            bagroundColor={"#371750"}
            opacity={1}
            angle={180}
            colorStart={"#350839db"}
            colorStartLength={"0%"}
            colorStop={"#000000a3"}
            zIndex={111} //not less than 110 <GradientWrapper: z-index=110
          />
            <div 
              style={{
                maxWidth: '100%',
                position: 'absolute',
                left: '5%',
                right: '0',
                top: '5%',
                maxHeight: '100%',
                zIndex: '111',
                height: '90%',
                width: '90%',
                filter: 'blur(110px)',
              }}
            >
              <motion.div
                margin="0px -20px 0px 100px"
                initial={{ opacity: 0, y: -100, scale: 1.3 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, }}
                style={{width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
              <Image 
                layout="fill"
                objectFit="cover"
                src={Shapes}
              />
            </motion.div>
            </div>
            <WrapperComponent style={{flexDirection:'column'}}>
              <SectionTitle>
                {"ROADMAP"}
              </SectionTitle>
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, }}
                style={{marginTop:48,marginBottom:48,width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
                <ImageContentComponent
                  reverse={false}
                  mobileReverse={false}
                  standardTitleLogoSize={null}
                  textMarginLeft={24}
                  textMarginRight={24}
                  srcTitle={null}
                  imageMaxWidth={"250px"}
                  subTitle={"SOCIAL DAPP & NFT SALE"}
                  subTitleColor={"#fefc3f"}
                  subTitleFontSize={20}
                  title1={"Phase 1"}
                  title1FontSize={50}
                  title2={null}
                  title2FontSize={null}
                  title3={null}
                  title3FontSize={null}
                  textMaxWidth={600}
                  descriptionFontSize={22}
                  description1={
                    "The REBL dApp is where the magic happens! It’s our HQ for innovation, where we come together to create, connect and plan our next moves!"
                  }
                  table={true}
                  listFontSize={22}
                  listStyle={'disc'}
                  tableData={[
                    "🔥 Join the dApp and community right now ",
                    "💯 Buy & mint entirely hand-drawn REBL District NFTs",
                  ]}
                  mobileMargin={false}
                  src={
                    "https://yuser-assets.imgix.net/Group-12346374ff2.png?fit=clip&w=400&fm=avif&auto=format&dpr=2"
                  }
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, }}
                style={{marginTop:48,marginBottom:48,width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
                <ImageContentComponent
                  reverse={true}
                  mobileReverse={false}
                  standardTitleLogoSize={null}
                  textMarginLeft={24}
                  textMarginRight={24}
                  srcTitle={null}
                  imageMaxWidth={"350px"}
                  subTitle={"AI CONTENT & NFT FEATURES"}
                  subTitleColor={"#fefc3f"}
                  subTitleFontSize={20}
                  title1={"Phase 2"}
                  title1FontSize={50}
                  title2={null}
                  title2FontSize={null}
                  title3={null}
                  title3FontSize={null}
                  textMaxWidth={600}
                  descriptionFontSize={22}
                  description1={
                    "We don't play by their rules. We use AI companions – called NPCs – to flip the script, to unleash our raw creativity, and stick it to the suits. Let your very own, custom-styled NPC companion create stunning generative art just for you!"
                  }
                  table={true}
                  listFontSize={22}
                  listStyle={'disc'}
                  tableData={[
                    "🦾 Gain lifetime access to AI generative NFT tools",
                    "🤑 Mint your A.I. content quickly & easily into NFTs",
                    "👾 Buy & sell NFTs in the REBL Marketplace"
                  ]}
                  mobileMargin={false}
                  src={
                    "https://yuser-assets.imgix.net/Group-2hkj2334.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                  }
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, }}
                style={{marginTop:48,marginBottom:48,width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
                <ImageContentComponent
                  reverse={false}
                  mobileReverse={false}
                  standardTitleLogoSize={null}
                  textMarginLeft={24}
                  textMarginRight={24}
                  srcTitle={null}
                  imageMaxWidth={"325px"}
                  subTitle={"SOUL-BOUND PROFILE"}
                  subTitleColor={"#fefc3f"}
                  subTitleFontSize={20}
                  title1={"Phase 3"}
                  title1FontSize={50}
                  title2={null}
                  title2FontSize={null}
                  title3={null}
                  title3FontSize={null}
                  textMaxWidth={600}
                  descriptionFontSize={22}
                  description1={
                    "Your profile is way more than just a boring old list of data in some corpo database. It's a part of you, and that's what makes it special. Our SoulBound NFT token will make your profile one-of-a-kind and totally unique, just like you!"
                  }
                  table={true}
                  listFontSize={22}
                  listStyle={'disc'}
                  tableData={[
                    '🚀 Possess your very own Soul-Bound NFT profile',
                    '🤝 Gain Access to multiple district communities & apps',
                    '🤖 Own your unique hand drawn NPC companion'
                  ]}
                  mobileMargin={false}
                  src={
                    "https://yuser-assets.imgix.net/Group-2jkl45w2.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                  }
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, }}
                style={{marginTop:48,marginBottom:48,width:'100%',flexDirection:'column', justifyContent:'center',alignItems:'center'}}
              >
                <ImageContentComponent
                  reverse={true}
                  mobileReverse={false}
                  standardTitleLogoSize={null}
                  textMarginLeft={24}
                  textMarginRight={24}
                  srcTitle={null}
                  imageMaxWidth={"325px"}
                  subTitle={"MONETIZE YOUR CONTENT"}
                  subTitleColor={"#fefc3f"}
                  subTitleFontSize={20}
                  title1={"Phase 4"}
                  title1FontSize={50}
                  title2={null}
                  title2FontSize={null}
                  title3={null}
                  title3FontSize={null}
                  textMaxWidth={600}
                  descriptionFontSize={22}
                  description1={
                    "The REBL dApp is where your likes are worth more than just social validation. With our Diamond tokens dropping soon, you can finally monetize your unique style and identity as a rebellious content creator, stacking serious crypto in your wallet and giving the middle finger to the mainstream. Let's show 'em how it's done."
                  }
                  table={true}
                  listFontSize={22}
                  listStyle={'disc'}
                  tableData={[
                    '💎 Earn Diamond + Gem rewards',
                    '✏️ Vote in the REBL Protocol DAO'
                  ]}
                  mobileMargin={false}
                  src={
                    "https://yuser-assets.imgix.net/Group-32d2efg.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                  }
                />
              </motion.div>
            </WrapperComponent>
        </Box>
            <Section style={{ overflow:'hidden', position:'relative' }}>
              <GradientSection
                bagroundColor={"#000"}
                opacity={1}
                zIndex={111} //not less than 110 <GradientWrapper: z-index=110
              />
              <WrapperComponent style={{flexDirection:'column',alignItems: 'center',paddingTop: 48,paddingBottom: 48}}>
              <h3 style={{ fontSize: 20, marginBottom: 24 }}>
                FOLLOW REBL ON SOCIALS
              </h3>
              <div
                className="Flex"
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Alink
                  href="https://www.twitter.com/reblapp"
                  target="_blank"
                  style={{ alignItems: "center", justifyContent: "center" }}
                  className="Flex"
                >
                  <Icon
                    name={twitterIcon}
                    //strokeColor={({ theme }) => theme.iconColor.color}
                    //strokeWidth="0px"
                    color={({ theme }) => theme.iconColor.color}
                    height="29px"
                    width="auto"
                  />
                </Alink>
                <Alink
                  href="https://discord.gg/CHU2d4eFT7"
                  target="_blank"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 18,
                  }}
                  className="Flex"
                >
                  <Icon
                    name={discordIcon}
                    //strokeColor={({ theme }) => theme.iconColor.color}
                    //strokeWidth="1px"
                    color={({ theme }) => theme.iconColor.color}
                    height="34px"
                    width="auto"
                  />
                </Alink>
                <Alink
                  href="https://www.instagram.com/reblapp"
                  target="_blank"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 18,
                  }}
                  className="Flex"
                >
                  <Icon
                    name={instagramIcon}
                    //strokeColor={({ theme }) => theme.iconColor.color}
                    //strokeWidth="1px"
                    color={({ theme }) => theme.iconColor.color}
                    height="30px"
                    width="auto"
                  />
                </Alink>
                <Alink
                  href="https://medium.com/rebl"
                  target="_blank"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 18,
                  }}
                  className="Flex"
                >
                  <Icon
                    name={mediumIcon}
                    //strokeColor={({ theme }) => theme.iconColor.color}
                    //strokeWidth="1px"
                    color={({ theme }) => theme.iconColor.color}
                    height="34px"
                    width="auto"
                  />
                </Alink>
              </div>
              </WrapperComponent>
            </Section>
            <FooterHorizontal />
            {openVideoOverlay && (                   
              <div
                className="flex"
                style={{
                  position: "fixed",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  zIndex: 9999999,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  setOpenVideoOverlay(false);
                }}
              >
                <AnimatePresence style={{zIndex:99}} mode="wait" initial={true}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{flexDirection:'column',display:'flex',width:'100%'}}
                  >
                    <OverlayContainer>
                      <div
                        className="flex"
                        style={{ width: "85vw", height: "85vh" }}
                      >
                        <Video typeVideo={typeVideo} />
                      </div>
                    </OverlayContainer>
                  </motion.div>
                </AnimatePresence>
              </div>
          )}
          {rootstore.txPendingOverlayVisible && <TxPendingOverlay />}
          {rootstore.txFailedOverlayVisible && <TxFailedOverlay closeOverlay={()=>toggleFailedOverlay(false)} />} 
          {rootstore.txSuccessOverlayVisible && <TxSuccessOverlay closeOverlay={() => rootstore.txSuccessOverlayVisible = false} buttonText={"Continue"} successButtonOnClick={() => { rootstore.txSuccessOverlayVisible = false }} />}
          </FullContainer>
        </Container>
        )}

      </>
    );
  })
);

const Alink = styled.a`
  text-decoration: none;
  opacity: 0.9;

  :link {
    color: ${({ theme }) => theme.textPrimary.color};
  }
  :visited {
    color: ${({ theme }) => theme.textPrimary.color};
  }
  :hover {
    opacity: 0.4;
    color: ${({ theme }) => theme.textPrimary.color};
  }
  :active {
    opacity: 0.4;
    color: ${({ theme }) => theme.textPrimary.color};
  }
`;

const StarCharacters = styled.div`
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  z-index:9;
  flex-direction:row;
  justify-content:space-between;
  align-items:flex-end;
  max-width:1400px;
  margin-left:auto;
  margin-right:auto;
`
const CharacterOne = styled.div`
  max-width:600px;
  margin-left:-100px;
  @media screen and (max-width: 950px) {
    margin-left:-140px;
  }
  @media screen and (max-width: 550px) {
    margin-right:-40px;
  }
`
const CharacterTwo = styled.div`
  max-width:600px;
  margin-right:-100px;
  @media screen and (max-width: 950px) {
    margin-right:-140px;
  }
  @media screen and (max-width: 550px) {
    margin-left:-40px;
  }
`

const DropDownBox = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : COLORS.blackDarkMedium};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius + "px" : "10px"};
  box-shadow: ${(props) =>
    props.boxShadow ? props.boxShadow : "0 1px 12px rgb(0 0 0 / 20%)"};
  margin-left: ${(props) =>
    props.marginLeft ? props.marginLeft : SPACING.medium + "px"};
  border-top-right-radius: ${(props) =>
    props.borderTopRightRadius ? props.borderTopRightRadius + "px" : "10px"};
  border-bottom-right-radius: ${(props) =>
    props.borderBottomRightRadius
      ? props.borderBottomRightRadius + "px"
      : "10px"};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
`;

const PurchaseNumSelection = styled.select`
  background-color: transparent;
  text-align: center;
  font-family: "LatoBlack";
  flex: 1;
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
`;
const PurchaseNumOption = styled.option`
  height: 50px;
  width: 50px;
  background-color: ${COLORS.blackDarkMedium};
  border-radius: 10px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.borderColor.color};
  border-style: solid;
  text-align: center;
  font-family: "LatoBlack";
`;


const LogoBackdrop = styled.div`
  display: flex;
  z-index: 9;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  position: absolute;
  top: 80px;
  bottom:unset;

  @media screen and (min-width: 1200px) {
    bottom:150px;
    top:unset;
  }
`;

const LogoInner = styled.div`
  display: flex;
  z-index: 9;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  padding: 24px;
  background-color: #000000b0;
  max-width:450px;
  @media screen and (max-width: 700px) {
    max-width:300px;
  }
`;

const DownArrowButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
  opacity: 0.8;
  position: absolute;
  left:0;
  right:0;
  bottom:24px;
`;

const SectionTitle = styled.h2`
  font-size:50px;
  margin-top:48px;
  font-weight:400;
  font-family:'LatoLight',sans-serif;
`
const ItemImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 750px) {
    //margin-top: ${(props) =>
      props.reverse && props.mobileMargin ? 0 : SPACING.medium}px;
    // margin-bottom: ${(props) => (props.mobileMargin ? SPACING.medium : 0)}px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const PlayButton = styled(motion.button)`
  border:0;
  margin-bottom:24px;
  opacity:0.8;
  background:'#fff';
  border-radius:50%;
`;
const PartnerScroll = styled.div`
  padding-left:44px;
  overflow:scroll;
  z-index:111;
  display:flex;
  width:100%;
  flex-direction:row;
  align-items:center;
  justify-content:flex-start;
  -ms-overflow-style: none;
  scrollbar-width: none; 
`;

const ItemLogo = styled.div`
  min-width:170px;
  margin-right:44px;

  @media screen and (max-width: 750px) {
    margin-right:24px;
  }
`;