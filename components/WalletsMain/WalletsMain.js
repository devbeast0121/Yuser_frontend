import React, { useState } from 'react'
import {
  WalletsContainer,
  MainContainer,
  TitleContainer,
  TitleMedium,
  TitleLarge,
  ColumnBox,
  RowBox,
  TxtSmall,
  Squere,
  Container,
  TxtLarge,
  TabWrapper,
  Text
} from './WalletsMain.elements';
import Question from '../../public/icons/question.svg';
import Star from '../../public/icons/star.svg';
import Stone from "../../public/icons/stone50.svg";
import Diamond from "../../public/icons/diamond.svg";
import Wallet from '.././Wallet/Wallet';
import TabComponentThree from '../TabComponentThree/TabComponentThree';
import StakingList from '.././StakingList/StakingList';
import WalletList from '.././WalletList/WalletList';
import REBLnftsList from '.././REBLnftsList/REBLnftsList';
import Icon from ".././Icon/Icon";
import { useStore } from '../../stores/RootStore';
import { useSession } from 'next-auth/client'
import MetaMaskOnboarding from '@metamask/onboarding';
import { ethers } from 'ethers';
import { COLORS } from '../../styles/Styling.js';

/* ---swiperjs---*/
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css'
import "swiper/css/navigation";
/* ---end swiperjs---*/


import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';


const WalletsMain = (props) => {
  const rootstore = useStore();
  const [session, loading] = useSession();
  const [accounts, setAccounts] = useState([]);
  const [movrBalance, setMovrBalance] = useState(0)
  const [address, setAddress] = useState("")
  const [actualAddress, setActualAddress] = useState("")
  const [wallets, setWallets] = useState([])
  const [walletTitle, setWalletTitle] = useState("Rocks Wallet")
  const [stakeActive, setStakeActive] = useState(false)
  const [nftREBLActive, setREBLNftActive] = useState(true)
  const [nftNextActive, setNextNftActive] = useState(false)
  const [percentRock, setPercentRock] = useState(41) //dummy data for testing
  const [percentDiamond, setPercentDiamond] = useState(89) //dummy data for testing

  {/*} const walletsTotal = [
        { title: "Moonriver Wallet", type: 'metaMask', balance: movrBalance, address: address },
        { title: "Rocks Wallet", type: 'rocks', balance: 11111 },
        { title: "Stones Wallet", type: 'stones', balance: 2222 },
    ]

    const [userWallets, setUserWallets] = useState([]);

    useEffect(() => {
        setUserWallets(walletsTotal);
    }, []);
*/}

  React.useEffect(() => {

    async function doEffect() {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

      ethersProvider.listAccounts().then(async function (accounts, err) {
        if (err != null) console.error("An error occurred: " + err);
        else if (accounts.length === 0) {
          //nothing
        }
        else {
          const truncateText = truncate(accounts[0])
          setActualAddress(accounts[0])
          setAddress(truncateText)
          const balance = await ethersProvider.getBalance(accounts[0])
          const wei_balance = ethers.utils.formatEther(balance);
          setMovrBalance(wei_balance)
        }

      });
      const walletsFromServer = await rootstore.getUserWallets(session?.user?._id);
      if (walletsFromServer) {
        setWallets(walletsFromServer);
      }
    }
    if (typeof window !== "undefined" && MetaMaskOnboarding.isMetaMaskInstalled()) {
      doEffect();
    }

  }, [accounts, movrBalance]);

  React.useEffect(async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        const newAddress = accounts[0]
        let metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
        setActualAddress(newAddress);
        let unParsedBalance = await metamaskProvider.getBalance(newAddress);
        let parsedBalance = ethers.utils.formatEther(unParsedBalance);
        setMovrBalance(parsedBalance);
      })
    }
  }, [])


  function truncate(
    fullStr,
    separator = "...",
    frontChars = 6,
    backChars = 5
  ) {
    return (
      fullStr.substr(0, frontChars) +
      separator +
      fullStr.substr(fullStr.length - backChars)
    );
  }


  const getWalletTitle = (swiper) => {
    if (swiper.realIndex == 0) {
      setWalletTitle("Rocks Wallet")
    } else if (swiper.realIndex == 1) {
      setWalletTitle("Stones Wallet")
    } else if (swiper.realIndex == 2) {
      setWalletTitle("Moonriver Wallet")
    }
  }

  const handleREBL = async () => {
    setREBLNftActive(true)
    setNextNftActive(false)
    setStakeActive(false)

    //TODO load REBL NFTs
  }

  const handleNext = async () => {
    setREBLNftActive(false)
    setNextNftActive(true)
    setStakeActive(false)

    //TODO load Next NFTs
  }

  const handleStaking = async () => {
    setREBLNftActive(false)
    setNextNftActive(false)
    setStakeActive(true)

    // for staking
  }

  return (
    <MainContainer>
      <div >
        <TitleLarge>Wallets</TitleLarge>
        {/* <Tooltip
          overlayInnerStyle={{ maxWidth: 300 }}
          placement="right"
          trigger={['hover']}
          overlay={<span>coming soon 1. At this point, it is possible to see the animation</span>}>
          <div> ** Important!!! do not remove this div. The child node must be a built-in component like div or span *
            <Icon
              color={({ theme }) => theme.greyButton.color}
              height="24px"
              width="24px"
              name={Question}
            />
          </div>
        </Tooltip> */}
      </div>
      <TitleContainer>
        <div className="swiper-button-prev"></div>
        <TitleMedium>{walletTitle}</TitleMedium>
        <div className="swiper-button-next"></div>
      </TitleContainer>
      <WalletsContainer>
        <Swiper
          spaceBetween={12}
          slidesPerView={'auto'}
          loop="true"
          modules={[Navigation]}
          slideToClickedSlide={true}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
          }}
          onSlideChange={(swiper) => getWalletTitle(swiper)}
        >
          <SwiperSlide >
            <Wallet walletType={'rocks'} walletBalance={session?.user?.stones ?? 0} isLoggedIn={props.isLoggedIn} />
          </SwiperSlide>
          <SwiperSlide >
            <Wallet walletType={'stones'} walletBalance={session?.user?.gems ?? 0} isLoggedIn={props.isLoggedIn} />
          </SwiperSlide>
          <SwiperSlide >
            {typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum.chainId === rootstore.CHAIN_ID && actualAddress ?
              <Wallet walletType={'metaMask'} walletBalance={movrBalance} walletAddress={address} />
              :
              <Wallet walletType={'dummy'} walletBalance={"0.0000"} walletAddress={""} />
            }
          </SwiperSlide>

          {/*
                        {userWallets.map((wallet, index) => (
                            <SwiperSlide key={index}>
                                <Wallet
                                    walletType={wallet.type} walletBalance={wallet.balance} walletAddress={wallet.address} isLoggedIn={props.isLoggedIn}
                                />
                            </SwiperSlide>
                        ))}  */}

        </Swiper>
      </WalletsContainer>
      {/*
      <div>
        <TitleLarge>Rock Rewards</TitleLarge>
        <Tooltip
          overlayInnerStyle={{ maxWidth: 300 }}
          placement="right"
          trigger={['hover']}
          overlay={<span>coming soon 2. At this point</span>}>
          <div> ** Important!!! do not remove this div. The child node must be a built-in component like div or span *
            <Icon
              color={({ theme }) => theme.greyButton.color}
              height="24px"
              width="24px"
              name={Question}
            />
          </div>
        </Tooltip>
      </div>
      <div className='MarginBottomExtraLarge'>
        <ColumnBox>
          <TxtSmall>24 HOUR MULTIPLIER</TxtSmall>
          <Container>
            <Squere color={percentRock < 21 ? true : false} />
            <Squere color={percentRock < 41 ? true : false} />
            <Squere color={percentRock < 61 ? true : false} />
            <Squere color={percentRock < 81 ? true : false} />
            <Squere color={percentRock <= 100 ? true : false} />
          </Container>
        </ColumnBox>
        <RowBox >
          <Icon width="auto" height="30px" name={Stone} />
          <TxtLarge>1111</TxtLarge>
        </RowBox>
      </div>
      <div >
        <TitleLarge>Diamond Rewards</TitleLarge>
        <Tooltip
          overlayInnerStyle={{ maxWidth: 300 }}
          placement="right"
          trigger={['hover']}
          overlay={<span>coming soon 3. At this point, it is possible to see the animation, but the box is still occupying space below. To solve this, we will use positions absolute and relative to the divs</span>}>
          <div> ** Important!!! do not remove this div. The child node must be a built-in component like div or span *
            <Icon
              color={({ theme }) => theme.greyButton.color}
              height="24px"
              width="24px"
              name={Question}
            />
          </div>
        </Tooltip>
      </div>
      <div className='MarginBottomExtraLarge'>
        <ColumnBox>
          <TxtSmall>VIBE</TxtSmall>
          <Container>
            <Icon
              color={percentDiamond < 21 ? ({ theme }) => theme.inactiveColor.color : COLORS.yellow}
              height="30px"
              width="30px"
              name={Star}
              className={"MarginRightSmall"}
            />
            <Icon
              color={percentDiamond < 41 ? ({ theme }) => theme.inactiveColor.color : COLORS.yellow}
              height="30px"
              width="30px"
              name={Star}
              className={"MarginRightSmall"}
            />
            <Icon
              color={percentDiamond < 61 ? ({ theme }) => theme.inactiveColor.color : COLORS.yellow}
              height="30px"
              width="30px"
              name={Star}
              className={"MarginRightSmall"}
            />
            <Icon
              color={percentDiamond < 81 ? ({ theme }) => theme.inactiveColor.color : COLORS.yellow}
              height="30px"
              width="30px"
              name={Star}
              className={"MarginRightSmall"}
            />
            <Icon
              color={percentDiamond <= 100 ? ({ theme }) => theme.inactiveColor.color : COLORS.yellow}
              height="30px"
              width="30px"
              name={Star}
              className={"MarginRightSmall"}
            />
          </Container>
        </ColumnBox>
        <RowBox className='MarginBottomMedium'>
          <Icon width="auto" height="30px" name={Diamond} />
          <TxtLarge>2222</TxtLarge>
        </RowBox>
      </div>
      */}
      <TabWrapper>
        <TabComponentThree
          leftText={"REBL NFTs"}
          middleText={"NextGems NFTs"}
          rightText={"Staking Pools"}
          setLeftSide={handleREBL}
          setMiddleSide={handleNext}
          setRightSide={handleStaking}
          leftSide={nftREBLActive}
          middleSide={nftNextActive}
          rightSide={stakeActive}
          margin={false}
        />
      </TabWrapper>
      {nftREBLActive &&
        <>
          <REBLnftsList walletAddress={actualAddress} />
        </>
      }
      {nftNextActive &&
        <WalletList walletAddress={actualAddress} />
      }
      {stakeActive &&
        <Text style={{ textAlign: "center" }}>Coming soon...</Text>
      }
    </MainContainer>
  )
}

export default WalletsMain