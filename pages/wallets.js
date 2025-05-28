import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react';
import { useSession} from 'next-auth/client'
import {
  WalletsMain,
  SignupPromo,
  NavFeed,
  Footer
} from "../components";
import {
  Container,
  SideBarLeft,
  SideBarLeftInner,
  SideBarRight,
  SideBarRightWallet,
  SideBarLeftBlock,
  MiddleContainer,
  RightContainer,
  RightContainerInner
} from "../styles/globalStyles";
import Image from "../public/images/nextGemsLaunchBanner.jpg";
import { useStore } from '../stores/RootStore';
import { WhiteListBadge3 } from '../components/WhiteListBadge/WhiteListBadge3';
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

export default inject('store')(observer(
  function Wallets(props) {
    const [showWhiteList1, setShowWhiteList1]= useState(false)
    const [showWhiteList2, setShowWhiteList2]= useState(false)
    const [showWhiteList3, setShowWhiteList3]= useState(false)
    //const [alert, setAlert]= useState(false)
    const [roundNumber, setRoundNumber]= useState(0)
    //const [chain, setChain] = useState(null)
    const [hasWallet,setHasWallet] = useState(false);
    const [walletAddRound1, setWalletAddRound1] = useState(null)
    const [walletAddRound2, setWalletAddRound2] = useState(null)
    const [preboughtNGs,setPreboughtNGs] = useState(0);
    const [walletAddr, setWalletAddr] = useState("")
    const [session, loading] = useSession();
    const rootstore = useStore();
    const [columnVisible, setColumnVisible] = useState(true)
    const router = useRouter();
    // console.log(props.store.wallets)
    

    //console.log(props.session)

    useEffect(() => {

      async function doEffect() {
        if(session){
          const whiteList = await rootstore.isWhitelisted()
          //const whiteList = 2
          if(whiteList===1){
            let walletAddressesDisplay = await rootstore.getWhitelistedWallets(session?.user?._id)
            setWalletAddRound1(walletAddressesDisplay)
            setRoundNumber(1)
           setShowWhiteList1(true)
           setShowWhiteList2(true)
          }
          else if(whiteList===2){
            let wallets = await rootstore.getUserWallets(props?.session?.user?._id);
            setWalletAddRound2(wallets)
            if(wallets.length>0)
            {
              setHasWallet(true);
            }
            setRoundNumber(2)
            setShowWhiteList1(true)
          }
        }
      }
     
      doEffect();
  }, []);
// The useEffect to get the number of prebought unminted nextgems
  React.useEffect(() => {
    async function doEffect() {

      if (window.ethereum && window.ethereum.selectedAddress) {
        setWalletAddr(window.ethereum.selectedAddress)
        //Adding the code to view the unminted NGs
       let prebought = await rootstore.getUnmintedNfts(window.ethereum.selectedAddress)
        setPreboughtNGs(prebought);
        if(prebought>0 && window.ethereum.selectedAddress !=""){
          setShowWhiteList3(true)
        }
       
     }
    }
    doEffect();
  }, []);

  React.useEffect(()=>{
    if(typeof window !== 'undefined' && window.ethereum){
      window.ethereum.on('chainChanged', async (chainId) => {
        router.reload();
      });
    }
  },[])


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

      <Container>
        <MiddleContainer style={{ maxWidth: 680 }}>
          {/*{showWhiteList1 &&
            <WhiteListBadge1
              type={message}
              showWhiteList1={showWhiteList1}
              setShowWhiteList1={setShowWhiteList1}
              roundNumber={roundNumber}
              setAlert={setAlert}
              hasWallet={hasWallet}
              walletAddRound1={walletAddRound1}
              walletAddRound2={walletAddRound2}

            />
          } */}
          {/* {showWhiteList2 &&
            <WhiteListBadge2
              type={message}
              showWhiteList2={showWhiteList2}
              setShowWhiteList2={setShowWhiteList2}
              setAlert={setAlert}
            />
          } */}
          {showWhiteList3 &&
            <WhiteListBadge3
              type={message}
              showWhiteList3={showWhiteList3}
              setShowWhiteList3={setShowWhiteList3}
              preboughtNGs={preboughtNGs}
              walletID={walletAddr}
            />
          }
          <WalletsMain />
        </MiddleContainer>
        {columnVisible &&
          <RightContainer>
            <RightContainerInner>
              <SignupPromo
                src={Image}
              />
              <SideBarLeftBlock>
                <Footer />
              </SideBarLeftBlock>
            </RightContainerInner>
          </RightContainer>
        }
      </Container>
    )
  }
))

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
      props: {
          session: session,
      },
  };
}

//Commenting to allow public no session minting
// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   const wallets = ["Just to test the hydrate function"]

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/signin',
//         permanent: false,
//       },
//     }
//   }
//   return {
//     props: {
//       session: session,
//       initialState: {
//         wallets: wallets
//       },
//     }
//   }

// }