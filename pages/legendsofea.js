import React, { useEffect, useState, useRef } from 'react'
import { inject, observer } from 'mobx-react';
import { useSession} from 'next-auth/client'
import {
    Container,
    SideBarLeftBlock,
    MiddleContainer,
    RightContainer,
    RightContainerInner,
    FullContainer
} from "../styles/globalStyles";
import styled from 'styled-components';
import {
    ProfileInfoBox,
    SignupPromo,
    LoginBoxSidebar,
    PostsList,
    NavFeed,
    Footer,
    Button,
    Icon
} from "../components";
import {
    MintingContainer,
    NavBox,
    NavButton,
    Divider,
    ButtonTitle,
    Background,
    LinearGradient,
    Section
} from '../components/MintingMain/MintingMain.elements';
import { NextSeo } from 'next-seo';
import { useStore } from '../stores/RootStore';
import { Router, useRouter } from 'next/router';
import { COLORS, FONT_SIZE, SPACING } from '../styles/Styling';
import Image from 'next/image';
import ImageGems from "../public/images/nextGemsLaunchBanner.jpg";
import SearchBar from '../components/SearchBar/SearchBar';
import ImageContentComponent from '../components/ImageContentComponent/ImageContentComponent';
import ImageLogoLocal from '../public/images/legends_logo_bright.png';
import arrowDown from "../public/icons/arrowDown.svg";
import discordIcon from '../public/socialicons/discord.svg';
import instagramIcon from '../public/socialicons/instagram.svg';
import linktreeIcon from '../public/socialicons/linktree-2.svg';
import twitterIcon from '../public/socialicons/twitter.svg';
import yuserIcon from '../public/socialicons/yuser.svg';
import TxFailedOverlay from "../components/TxOverlays/TxFailedOverlay";
import TxPendingOverlay from "../components/TxOverlays/TxPendingOverlay";
import TxSuccessOverlay from "../components/TxOverlays/TxSuccessOverlay";
import TxConfirmOverlay from "../components/TxOverlays/TxConfirmOverlay";
import TxCancelledOverlay from "../components/TxOverlays/TxCancelledOverlay";
import WrapMOVR from '../components/WrapMOVR/WrapMOVR';
import MetamaskOverlay from '../components/TxOverlays/MetamaskOverlay';
import MetaMaskOnboarding from '@metamask/onboarding';
import { ethers } from 'ethers';
import { abi as legendsPrebuyAbi } from "../public/data/legendsPrebuyAbi.json"
import { abi as wmovrABI } from "../public/data/wmovrAbi.json";
import OnboardingButton from "../components/MetamaskOnboarding/MetamaskOnboarding";
import Movr from "../public/icons/moonriver_logo3.svg";
import useOnClickOutside from "../Hooks/useOnClickOutside";

import ImageSaleLocal from '../public/images/splash_sale.png';
import yuserMarket from '../public/images/yuserMarket.png';
import arrowTriangle from "../public/icons/triangle.svg";
import FooterHorizontal from "../components/FooterHorizontal/FooterHorizontal";

export default inject('store')(observer(
    function legendsOfea(props) {
        const ImageSRC ="https://yuser-assets.imgix.net/Legends_of_Ever_After.jpg?fit=clip&w=1200&fm=webp$auto=format&dpr=2";
        const ImageWorld = "https://yuser-assets.imgix.net/legends_world_image.png?fit=clip&w=1200&fm=webp$auto=format&dpr=2"
        const rootstore = useStore()
        const [message, setMessage] = useState('')
        const [bySale, setSale] = useState(true)
        const [byAbout, setAbout] = useState(false)
        const [byDiscord, setDiscord] = useState(false)
        const [currencyDropdownVisisble,setCurrencyDropdownVisible] = useState(false);
        const [numRemaining,setNumRemaining] = useState(0);
        const [numToPurchase,setNumToPurchase] = useState(1);
        const [prebuyCurrency,setPrebuyCurrency] = useState(0) //0 = MOVR    1 = Wrapped MOVR (WMOVR)
        const [movrBalance,setMovrBalance] = useState(0);
        const [wmovrBalance,setWmovrBalance] = useState(0);
        const [selectedAddress,setSelectedAddress] = useState("");
        const [showMetamaskButton,setShowMetamaskButton] = useState(true);//default to true
        const [whiteListActive,setWhitelistActive] = useState(true); // default to true
        const [saleActive,setSaleActive] = useState(false); //default to false
        const [isWhitelisted,setIsWhitelisted] = useState(false); //default to false
        const [session] = useSession();
        const [messageVisible, setMessageVisible] = useState(true)
        const router = useRouter();

        const currDropdownRef = useRef(null);
        useOnClickOutside(currDropdownRef,handleClickDropdownButton);


        const currencyOptions = ["MOVR", "WMOVR"];
        const inputBoxValue = useRef(0);
        const purchaseOptions = [1,2,3,4,5,6,7,8,9,10];
        const LegendCost = 0.5;


        useEffect(()=>{
            if(typeof window !== "undefined" && window.ethereum){
            
                handleEthereumConnected();
    
                window.ethereum.on('accountsChanged', (accounts)=>{
                    let newAddress = accounts[0];
                    setSelectedAddress(newAddress);
                })
                window.ethereum.on('chainChanged',(chainId)=>{
                    router.reload();
                })
            }
            else if(typeof window !== "undefined"){
                window.addEventListener('ethereum#initialized', handleEthereumConnected, {
                    once: true,
                });
                  setTimeout(handleEthereumConnected, 3000);
            }

        },[])
        

        async function handleEthereumConnected(){
            const {ethereum} = window;
            if(ethereum && ethereum.isMetaMask){
                let chain = await ethereum.request({ method: 'eth_chainId' });
                if(Number(chain) === Number(rootstore.CHAIN_ID)){
                    setShowMetamaskButton(false);
                }
                else{
                    setShowMetamaskButton(true);
                }
                let addresses = await ethereum.request({ method: 'eth_requestAccounts' })
                let currAddress = addresses[0];
                setSelectedAddress(currAddress);
                
                try{
                    let metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
                    let prebuyContract = new ethers.Contract(rootstore.legendsOfEAPrebuyContractAddress,legendsPrebuyAbi,metamaskProvider);
                    let isSaleActive = await prebuyContract.isSaleActive();
                    setSaleActive(isSaleActive);
                    let isWhitelistActive = await prebuyContract.isWhitelistActive();
                    setWhitelistActive(isWhitelistActive);
                    
                }catch(err){
                    console.log("Error when checking if sale and whitelist is active");
                }
                await getRemaining();
                await updateBalances();
            }
            else{
                setShowMetamaskButton(true);
            }
        }

        useEffect(async ()=>{
            await updateBalances();
            await getRemaining();
        },[selectedAddress,wmovrBalance,movrBalance]);

        useEffect(async()=>{
            if(typeof window !== "undefined" && window.ethereum){
                try{
                    let metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
                    let prebuyContract = new ethers.Contract(rootstore.legendsOfEAPrebuyContractAddress,legendsPrebuyAbi,metamaskProvider);
                    let addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    let address = addresses[0];

                    if(address){
                        let isWhitelisted = await prebuyContract.isWhitelist(address);
                        setIsWhitelisted(isWhitelisted);
                    }
                }catch(err){
                    return;
                }
            }
        },[selectedAddress,whiteListActive])


        async function updateBalances(){
            if(selectedAddress){
                let wmovrAmount = await rootstore.GetWMOVRBalance(selectedAddress);
                setWmovrBalance(wmovrAmount);
                let movrAmount = await rootstore.getMovrBalance(selectedAddress);
                setMovrBalance(movrAmount);
            }
        }
        async function getRemaining(){
            let legendsRemaining = await rootstore.getLegendsRemaining();
            setNumRemaining(legendsRemaining);
        }

        function toggleConfirmOverlay(toggle = false){
            rootstore.txConfirmOverlayVisible = toggle;
            return;
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
            rootstore.TxSuccessOverlayVisible = toggle;
            rootstore.transactionHash = null;
            return;
        }

        function toggleCancelledOverlay(toggle=false){
            rootstore.txCancelledOverlayVisible = toggle;
            if(toggle === false){
                rootstore.transactionHash = null;
            }
            return;
        }

        function toggleWrapMovrOverlay(toggle = false){
            rootstore.wrapMovrOverlayVisible = toggle;
            return;
        }

        function toggleMetamaskOverlay(toggle = false){
            rootstore.metamaskOverlayVisible = toggle
            return;
        }

        function setTxErrorMessage(message = "Your transaction failed."){
            rootstore.failedTxMessage = message;
            return;
        }
        


        async function onWrapMovr(amountToWrap){
            if(amountToWrap !== "0.000"){
                await rootstore.wrapMovr(amountToWrap);
                setWmovrBalance(0);
            }
            else{
                rootstore.errMessage = "Error: Invalid amount to wrap";
                return;
            }
        }

        function onCurrencyChange(event){
           setPrebuyCurrency(event.target.selectedIndex);
           return;
        }
        

        async function prebuyLegend(){
            if(prebuyCurrency === 0){
                //buying with MOVR
                await prebuyLegendMOVR();
            }
            else if (prebuyCurrency === 1){
                //Buying with Wrapped MOVR
                await prebuyLegendWithWMOVR();
            }
            await getRemaining();
            await updateBalances();
            return;
        }

        function handleNumToPurchaseChange(event){
            let index = event.target.selectedIndex;
            setNumToPurchase(index+1);
            return;
        }

        async function prebuyLegendMOVR(){
            
            if (typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()) {
                if (window.ethereum && window.ethereum.chainId != null && window.ethereum.chainId === rootstore.CHAIN_ID && window.ethereum.selectedAddress) {
                    if (numRemaining === 0) {
                        setTxErrorMessage("There are no more remaining");
                        toggleFailedOverlay(true);
                        return;
                    }
                    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = ethersProvider.getSigner();
                    const txContract = new ethers.Contract(rootstore.legendsOfEAPrebuyContractAddress, legendsPrebuyAbi, signer);
                    let cost = ethers.utils.parseUnits((numToPurchase * LegendCost).toString());
                    let balance = await ethersProvider.getBalance(window.ethereum.selectedAddress);
                    if(balance.lte(cost)){
                        setTxErrorMessage(`Error: MOVR balance too low. Balance: ${ethers.utils.formatEther(balance)} Cost: ${ethers.utils.formatEther(cost)}`);
                        toggleFailedOverlay(true);
                        return;
                    }
                    if(cost.lte(0)){
                        setTxErrorMessage(`Error: Number to purchase must be greater than 0`);
                        toggleFailedOverlay(true);
                        return;
                    }
                    let tx;
                    try {
                        toggleConfirmOverlay(true);
                        tx = await txContract.preBuy(numToPurchase, rootstore.wMovrAddr, { gasPrice: 10000000000, value: cost });
                        rootstore.transactionHash = tx.hash;
                        toggleConfirmOverlay(false);
                        togglePendingOverlay(true);
                    } catch (err) {
                        console.error(err);
                        toggleConfirmOverlay(false);
                        togglePendingOverlay(false);
                        if (err.code === 4001) {
                            setTxErrorMessage("You cancelled your transaction in Metamask.");
                            toggleCancelledOverlay('true');
                            return;
                        }
                        else {
                            setTxErrorMessage("There was an error when creating your transaction.");
                            toggleFailedOverlay('true');
                        }
                        return;
                    }
                    let complete = false;
                    while (!complete) {
                        try {
                            const receipt = await tx.wait();
                            togglePendingOverlay(false);
                            toggleSuccessOverlay(true);
                            complete = true;
                        } catch (err) {
                            togglePendingOverlay(false);
                            let errReceipt = err.receipt;
                            if (errReceipt.status === 0) {
                                toggleFailedOverlay(true);
                                complete = true;
                            }
                            else if (errReceipt.status === 1) {
                                if (!err.cancelled && err.reason === "repriced") {
                                    tx = err.replacement;
                                    rootstore.transactionHash = tx.hash;
                                }
                                else {
                                    toggleFailedOverlay(true);
                                    complete = true;
                                }
                            }
                        }
                    }
        
        
                }
                else if(rootstore.CHAIN_ID !== window.ethereum.chainId){
                    toggleMetamaskOverlay(true);
                    return;
                }
            }
        }

        async function prebuyLegendWithWMOVR(){
            
            if (typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()) {
                if (window.ethereum && window.ethereum.chainId != null && window.ethereum.chainId === rootstore.CHAIN_ID && window.ethereum.selectedAddress) {
                    if (numRemaining === 0) {
                        setTxErrorMessage("There are no more remaining");
                        toggleFailedOverlay(true);
                        return;
                    }
                    const walletAddress = window.ethereum.selectedAddress;
                    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = ethersProvider.getSigner();
                    const wmovrContract = new ethers.Contract(rootstore.wMovrAddr, wmovrABI, signer);
                    const txContract = new ethers.Contract(rootstore.legendsOfEAPrebuyContractAddress, legendsPrebuyAbi, signer);
                    let balance = await wmovrContract.balanceOf(walletAddress);
                    let cost = ethers.utils.parseUnits((numToPurchase * LegendCost).toString());
                    if (balance.gte(cost) && cost.gt(0)) {
                        let currentAllowance = await wmovrContract.allowance(window.ethereum.selectedAddress, rootstore.legendsOfEAPrebuyContractAddress);
                        let tx, approve;
                        let complete = false;
                        if (currentAllowance.lt(cost)) {
                            try {
                                toggleConfirmOverlay(true);
                                approve = await wmovrContract.approve(rootstore.legendsOfEAPrebuyContractAddress, cost);
                                rootstore.transactionHash = approve.hash;
                                toggleConfirmOverlay(false);
                            } catch (err) {
                                toggleConfirmOverlay(false);
                                togglePendingOverlay(false);
                                if (err.code === 4001) {
                                    setTxErrorMessage("You cancelled your transaction in Metamask.");
                                    toggleCancelledOverlay(true);
                                    return;
                                }
                                else {
                                    setTxErrorMessage("There was an error when creating your transaction.");
                                    toggleFailedOverlay(true);
                                }
                                return;
                            }

                            while (!complete) {
                                try {
                                    togglePendingOverlay(true);
                                    await approve.wait();
                                    togglePendingOverlay(false);
                                    complete = true
                                } catch (err) {
                                    togglePendingOverlay(false);
                                    let errReceipt = err.receipt;
                                    if (errReceipt.status === 0) {
                                        toggleFailedOverlay(true);
                                        complete = true;
                                    }
                                    else if (errReceipt.status === 1) {
                                        if (!err.cancelled && err.reason === "repriced") {
                                            approve = err.replacement;
                                            rootstore.transactionHash = approve.hash;
                                        }
                                        else {
                                            toggleFailedOverlay(true);
                                            complete = true;
                                        }
                                    }
                                }
                            }
                        }
                        try {
                            rootstore.transactionHash = null;
                            toggleConfirmOverlay(true);
                            tx = await txContract.preBuy(numToPurchase, rootstore.wMovrAddr, { gasPrice: 10000000000, value: 0 });
                            rootstore.transactionHash = tx.hash;
                            toggleConfirmOverlay(false);
                            togglePendingOverlay(true);
                        } catch (err) {
                            toggleConfirmOverlay(false);
                            togglePendingOverlay(false);
                            if (err.code === 4001) {
                                setTxErrorMessage("You cancelled your transaction in Metamask.");
                                toggleCancelledOverlay(true);
                                return;
                            }
                            else {
                                setTxErrorMessage("There was an error when creating your transaction.");
                                toggleFailedOverlay(true);
                            }
                            return;
                        }
                        complete = false;
                        while (!complete) {
                            try {
                                let receipt = await tx.wait();
                                complete = true;
                                togglePendingOverlay(false);
                                toggleSuccessOverlay(true);
                            } catch (err) {
                                let errReceipt = err.receipt;
                                if (errReceipt.status === 0) {
                                   togglePendingOverlay(false);
                                    toggleFailedOverlay(true);
                                    complete = true;
                                }
                                else if (errReceipt.status === 1) {
                                    if (!err.cancelled && err.reason === "repriced") {
                                        tx = err.replacement;
                                        rootstore.transactionHash = tx.hash;
                                    }
                                    else {
                                        togglePendingOverlay(false);
                                        toggleFailedOverlay(true);
                                        complete = true;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if(balance.lte(cost)){
                            setTxErrorMessage(`Error: WMOVR balance too low. Balance: ${ethers.utils.formatEther(balance)} Cost: ${ethers.utils.formatEther(cost)}`);
                        }
                        if(cost.lte(0)){
                            setTxErrorMessage(`Error: Number to purchase must be greater than 0`);
                        }
                        toggleFailedOverlay(true);
                    }
                }
                else if(window.ethereum.chainId !== rootstore.CHAIN_ID ){
                    toggleMetamaskOverlay(true);
                }
            }

        }

        const showAppMessage = (value, message) => {
            setMessage(message)  // or inform/success/error
            setMessageVisible(value)
            if (value) {
                const timer = setTimeout(() => {
                    setMessageVisible(value)
                    setMessage('')
                }, 3000)
                return () => clearTimeout(timer)
            }
        }

        async function handleSearch(event) {
            //TODO
        }

        const showErrorMessage = (value) => {
            rootstore.errMessage = null;
        }

        function handleClickDropdownButton(toggle = false){
            setCurrencyDropdownVisible(toggle);
        }

        function handleOnClickCurrOption(currencySelection){
            setPrebuyCurrency(currencySelection);
            handleClickDropdownButton(false);
        }

        function renderCurrencySelectDropdown(){
            return(
                <CurrencySelectOptionsContainer>
                    {currencyOptions.map((option,index)=>
                        <CurrencySelectOption onClick={(event)=>{event.stopPropagation();handleOnClickCurrOption(index)}}> 
                        {`Buy with ${option}`}
                        </CurrencySelectOption>
                    )}
                </CurrencySelectOptionsContainer>
            )
        }


        function renderMintBox(){
            return (
                <MintBox >
                { showMetamaskButton !== true ? 
                (
                    <>
                    { saleActive && numRemaining > 0 ?  (
                        <>
                        {(whiteListActive === false || isWhitelisted === true) ? ( 
                            <>
                                <MintTextBox>
                                    <MintTitleText>{`LEGENDS OF EA SALE`}</MintTitleText>
                                    <MintBodyText>{`When you buy Legends your funds will be deposited into a smart contract until the NFTs are minted into your wallet at a later date.`}</MintBodyText>
                                    <MintBodyText>{`You can select to buy with MOVR or WMOVR`}</MintBodyText>
                                </MintTextBox>
                                <PrebuyContainer>
                                    <BalanceBox>
                                        <BalanceDisplay>
                                            <Icon height="32px" width="24px" name={Movr} strokeWidth="3"/>
                                            { prebuyCurrency === 0 ? (
                                                <>
                                                    <BalanceText>{Number(movrBalance).toFixed(3)}</BalanceText>
                                                    <BalanceText>{"MOVR"}</BalanceText>
                                                </>
                                                ) : (
                                                    <>
                                                        <BalanceText>{Number(wmovrBalance).toFixed(3)}</BalanceText>
                                                        <BalanceText>{"WMOVR"}</BalanceText>
                                                    </>
                                                )
                                            }
                                        </BalanceDisplay>
                                        <BalanceText>{"BALANCE"}</BalanceText>
                                    </BalanceBox>
                                    <PrebuyButtonsContainer>
                                        <PrebuyButton
                                            onClick={prebuyLegend}
                                            key={"prebuy"}
                                        >
                                            <BuyWithText style={{fontWeight:"bold"}}>{`BUY WITH ${prebuyCurrency === 0 ? "MOVR" : "WMOVR"}`}</BuyWithText>
                                        </PrebuyButton>
                                        <CurrencySelectDropdownButton ref={currDropdownRef} onClick={()=>handleClickDropdownButton(!currencyDropdownVisisble)}>
                                            <div style={{justifyContent:"center"}}>
                                                <Icon
                                                    height="11px"
                                                    width="13px"
                                                    strokeWidth="4"
                                                    color={COLORS.white}
                                                    name={arrowTriangle}
                                                    transform={"rotate(-90deg)"}
                                                
                                                />
                                            </div>
                                            {currencyDropdownVisisble ? renderCurrencySelectDropdown() : null}
                                        </CurrencySelectDropdownButton>
                                        <DropDownBox>
                                            <PurchaseNumSelection onChange={handleNumToPurchaseChange}>
                                                {purchaseOptions.map((option)=>
                                                    <PurchaseNumOption>
                                                        {option}
                                                    </PurchaseNumOption>
                                                )}
                                            </PurchaseNumSelection>
                                        </DropDownBox>
                                    </PrebuyButtonsContainer>
                                    <RemainingTextBox>
                                        <RemainingText>{`MAX: 10`}</RemainingText>
                                        <RemainingText>{`ONLY ${numRemaining} LEFT!`}</RemainingText>
                                    </RemainingTextBox>
                                </PrebuyContainer>
                            </>)
                            : (saleActive === true && whiteListActive === true && isWhitelisted === false) ? (
                                <MintTextBox>
                                    <NotWhitelistedText>{`Currently the sale is only available for users on the whitelist`}</NotWhitelistedText>
                                    <NotWhitelistedText>{`Your wallet ${selectedAddress} is not on the whitelist`}</NotWhitelistedText>
                                    <NotWhitelistedText>{`You can switch to a wallet that is whitelisted or come back later when the open sale has started`}</NotWhitelistedText>
                                </MintTextBox>
                            ) : (
                                null//We should never get here
                            )
                        }
                        </>) : (saleActive === true && numRemaining <= 0) ?
                        ( 
                            <MintTextBox>
                                <NotWhitelistedText>{`Sorry, the sale has sold out.`}</NotWhitelistedText>
                            </MintTextBox>
                        ) :(saleActive === false) && (
                            <MintTextBox>
                                <NotWhitelistedText>{`The sale is not active right now, check again later.`}</NotWhitelistedText>
                            </MintTextBox>
                        ) 
                    }
                    </>
                ) : (
                        <div style = {{flex:1, marginTop:SPACING.medium, marginBottom:SPACING.medium}}>
                            <OnboardingButton key={"OnboardingButton"}/>
                        </div>
                    )
                }
                </MintBox>
            )
        }

        return (
            <>
                <NextSeo
                    title={`Legends Of Ever After`}
                    description={`First music festival NFT DAO superpass collection.`}
                    canonical="https://yuser.co"
                    openGraph={{
                        url: `https://yuser.co/legendsofea}`,
                        title: `Legends Of Ever After`,
                        description: `First music festival NFT DAO superpass collection.`,
                        site_name: 'Yuser',
                        images: [
                            {
                                url: `https://yuser-assets.imgix.net/Horizontal_Legends_of_Ever_After.png?fit=clip&w=1200&fm=webp$auto=format&dpr=2`,
                                width: 1200,
                                alt: `Legends Of Ever After`,
                            },
                        ]
                    }}

                />
                <Container>
                    <FullContainer style={{ flexDirection: 'column' }}>
                        <SearchBar
                            handleChange={handleSearch}
                            title1={session ? "Feed" : 'Login'}
                            link1={session ? "/" : '/signin'}
                            title2={'Market'}
                            link2={"/market"}
                            title3={'Wallet'}
                            link3={"/wallets"}
                        />
                        <Section style={{ alignItems:'center',flexDirection:'column',position: "relative", width: "100%",margin:0, }}>
                            <MainBackdrop>
                                <h3 style={{ fontSize: 20, textAlign: 'center' }}>WELCOME TO</h3>
                                <Image style={{ width: '100%' }} height="107" width="301" src={ImageLogoLocal} alt="Legends of Ever After" />
                                <Button
                                    text={'Join the whitelist'}
                                    onClick={() => { window.open("https://forms.gle/9e8TJQibtu7yUiXK9") }} //needs to link to https://forms.gle/9e8TJQibtu7yUiXK9
                                    isIcon={false}
                                    color={COLORS.purple}
                                    colorText={COLORS.white}
                                    className={'MarginTopMedium'}
                                />
                            </MainBackdrop>
                            <div style={{minWidth:500,justifyContent:"center"}}>
                                <Image height="1634" width="2400" src={ImageWorld} alt="Legends of Ever After" />
                            {renderMintBox()}

                            </div>
                            <DownArrowButton>
                                <Icon
                                    height="55px"
                                    width="55px"
                                    strokeWidth="4"
                                    name={arrowDown}
                                />
                            </DownArrowButton>
                        </Section>
                        <Section>
                            <ImageContentComponent
                                reverse={false}
                                mobileReverse={false}
                                standardTitleLogoSize={null}
                                textMarginLeft={true}
                                textMarginRight={true}
                                srcTitle={null}
                                imageMaxWidth={""}
                                title1={"WELCOME TO THE LEGENDS OF EVER AFTER"}
                                title1FontSize={40}
                                title2={null}
                                title2FontSize={null}
                                title3={null}
                                title3FontSize={null}
                                description1FontSize={24}
                                description1={"LOEA is a collection of 10,000 unique fantasy-EDM collectible avatars. But they’re also far more than that. They serve as your Ever After club membership. You’ll get access to exclusive events, discounts on the Ever After music festival and merch, voting rights on lineups, Yuser app rewards and so much more."}
                                mobileMargin={false}
                                src={"https://yuser-assets.imgix.net/legends_male_1.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"}
                                leftButton={"Join whitelist"}
                                leftHref={"https://forms.gle/9e8TJQibtu7yUiXK9"}
                                rightButton={null}
                                rightHref={null}
                            />
                            <ImageContentComponent
                                reverse={true}
                                mobileReverse={true}
                                standardTitleLogoSize={null}
                                textMarginLeft={true}
                                textMarginRight={true}
                                srcTitle={null}
                                imageMaxWidth={""}
                                title1={"LEGENDS OF EA DETAILS"}
                                title1FontSize={40}
                                title2={null}
                                title2FontSize={null}
                                title3={null}
                                title3FontSize={null}
                                table={true}
                                tableData={[
                                    "Price: TBA",// "Price: $150 CAD + HST or 11 MOVR",
                                    "Presale starts: TBA", //"Presale starts: August 3, 2022",
                                    "Sale opens: TBA", //"Sale opens: August 12, 2022",
                                    "NFT Airdrop: TBA", //"NFT Airdrop: September 15-30, 2022",
                                    "Community Voting: TBA",//"Community Voting: Q1 2023",
                                    "Companion Collection: 2023",
                                    "Festival integration: 2023"
                                ]}
                                listStyle={true}
                                listFontSize={22}
                                mobileMargin={false}
                                src={"https://yuser-assets.imgix.net/legends_female_1.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"}
                                leftButton={"Join whitelist"}
                                leftHref={"https://forms.gle/9e8TJQibtu7yUiXK9"}
                                rightButton={null}
                                rightHref={null}
                            />
                        </Section>
                        <Section style={{ marginTop: 0, }}>
                            <Image style={{ width: '100%' }} height="107" width="301" src={ImageLogoLocal} alt="Legends of Ever After" />
                            <h2 style={{color:'#A0D0EE', textAlign:'center',marginBottom:24,}}>ROADMAP ACTIVATIONS</h2>
                            <ImageContentComponent
                                reverse={false}
                                mobileReverse={false}
                                standardTitleLogoSize={null}
                                textMarginLeft={true}
                                textMarginRight={true}
                                mobileMargin={true}
                                imageMaxWidth={500}

                                srcTitle={null}
                                title1={"EARN YUSER GEMS & EA MERCH DISCOUNTS"}
                                title1FontSize={38}
                                title2={null}
                                title2FontSize={null}
                                title3={null}
                                title3FontSize={null}
                                table={true}
                                tableData={[
                                    "Earn and stake tokens (Yuser Gems)",
                                    "EA Merch Discounts",
                                ]}
                                listStyle={true}
                                src={"https://yuser-assets.imgix.net/25_percent_sale.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"}
                                //leftButton={null}
                                //leftHref={null}
                                rightButton={null}
                                rightHref={null}
                            />
                            <ImageContentComponent
                                reverse={true}
                                mobileReverse={true}
                                standardTitleLogoSize={null}
                                textMarginLeft={true}
                                textMarginRight={true}
                                mobileMargin={true}
                                imageMaxWidth={500}

                                srcTitle={null}
                                title1={"DAO ACTIVATED!"}
                                title1FontSize={38}
                                title2={null}
                                title2FontSize={null}
                                title3={null}
                                title3FontSize={null}
                                table={true}
                                tableData={[
                                    "Community can vote on 2023 festival lineup, themes + attractions & more!",
                                    "VIP Access to High Quality Media from the festival",
                                ]}
                                listStyle={true}
                                src={"https://yuser-assets.imgix.net/50_percent_sale.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"}
                                //leftButton={null}
                                //leftHref={null}
                                rightButton={null}
                                rightHref={null}
                            />
                            <ImageContentComponent
                                mobileReverse={false}
                                reverse={false}
                                standardTitleLogoSize={null}
                                textMarginLeft={true}
                                textMarginRight={true}
                                mobileMargin={true}
                                imageMaxWidth={500}
                                
                                srcTitle={null}
                                title1={"COMPANION COLLECTION & MORE"}
                                title1FontSize={38}
                                title3={null}
                                title3FontSize={null}
                                src={"https://yuser-assets.imgix.net/75_percent_sale.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"}
                                //leftButton={null}
                                //leftHref={null}
                                rightButton={null}
                                rightHref={null}
                                table={true}
                                tableData={[
                                    "Companion Collection for the Legends",
                                    "POAP* Multipliers added in 2023",
                                ]}
                                description1={"*POAP = Proof of attendance"}
                                description1FontSize={18}
                                legends={true}
                                listStyle={true}
                            />
                            <ImageContentComponent
                                reverse={true}
                                mobileReverse={true}
                                standardTitleLogoSize={null}
                                textMarginLeft={true}
                                textMarginRight={true}
                                mobileMargin={true}
                                imageMaxWidth={500}

                                srcTitle={null}
                                title1={"2023 FESTIVAL INTEGRATION"}
                                title1FontSize={38}
                                title2={null}
                                title2FontSize={null}
                                title3={null}
                                title3FontSize={null}
                                description1={""}
                                description2={""}
                                src={"https://yuser-assets.imgix.net/100_percent_sale.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"}
                                // leftButton={null}
                                // leftHref={null}
                                rightButton={null}
                                rightHref={null}
                                table={true}
                                tableData={[
                                    "Livestream (virtual stage access)",
                                    "VIP Areas for Legends to chill" 
                                ]}
                                listStyle={true}
                            />
                        </Section>
                        <Section>
                            <TextTitle>{"Once upon a time..."}</TextTitle>
                            <TextColumns>
                                <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                                    <TextRubic>
                                        You look up at the night sky illuminated by a singular wonder -
                                        twin Moons, reflecting each other's light like mirror images.
                                        You take a deep breath. Perhaps the air is as it's always been, but you
                                        don't think so. It tastes… peculiar.
                                    </TextRubic>
                                    <TextRubic>
                                        Everything has changed, why not air?
                                    </TextRubic>
                                </div>
                                <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                                    <TextRubic>
                                        Silence envelops the world, mist settling over the glowing woods
                                        below. This quiet unsettles you, and yet, you must admit there is a
                                        strange pleasure in anticipation.
                                    </TextRubic>
                                    <TextRubic>
                                        On the horizon, a circular structure looms over everything. Red,
                                        glowing bubble distorts the horizon. Your heart beats faster the closer
                                        you fly up to it.
                                    </TextRubic>
                                </div>
                            </TextColumns>
                            <MainContainer style={{}}>
                                <ImageBox mobile={false}>
                                    <ImageWrapper>
                                        <ItemImage
                                            leftImage={true}
                                            objectFit="cover"
                                            src={ImageWorld}
                                        />
                                    </ImageWrapper>
                                </ImageBox>
                                <ImageBox2 mobile={true}>
                                    <ImageWrapper2>
                                        <ItemImage
                                            objectFit="cover"
                                            src={"https://yuser-assets.imgix.net/legends_female_2.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"}
                                        />
                                    </ImageWrapper2>
                                </ImageBox2>
                            </MainContainer>
                            <TextColumns style={{ marginTop: 0,}}>
                                <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                                    <TextRubic>
                                        In the corner of your eye, you see others, flying beside you, and
                                        down below, eccentrics approaching on foot.
                                    </TextRubic>
                                    <TextRubic>
                                        Or, perhaps, they try to prolong that moment of anticipation even
                                        further? You wonder.
                                    </TextRubic>
                                    <TextRubic>
                                        Behind the perimeter of the structure, you can see more people in one
                                        place then you encountered for a whole year prior.
                                    </TextRubic>
                                </div>
                                <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
                                    <TextRubic>
                                        It feels as if your heart has dropped into your stomach.
                                    </TextRubic>
                                    <TextRubic>
                                        Before you hear them, before you hear any music at all, lasers shoot
                                        through the distortion and you know that this light is your destiny.
                                        Your fingers tingle.  As your body passes through the barrier, the sound
                                        hits you hard.
                                    </TextRubic>
                                    <TextRubic>
                                        Shaken, you know you've arrived home.
                                    </TextRubic>
                                </div>
                            </TextColumns>
                            <TextTitle style={{ marginLeft: 24, marginRight: 24, textAlign: "center", marginBottom:6, marginTop: 24 }}>{"Welcome to your Wonderland."}</TextTitle>
                            <TextTitle style={{  marginLeft: 24, marginRight: 24, textAlign: "center" }}>{"Welcome to Ever After."}</TextTitle>
                        </Section>
                        <Section style={{opacity:0.8,marginTop:0}}>
                            <h3 style={{fontSize:20,marginBottom:24}}>FOLLOW LEGENDS OF EA ON SOCIALS</h3>
                            <div style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <Alink href="https://www.twitter.com/legendsofea" target="_blank" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    <Icon
                                        name={twitterIcon}
                                        //strokeColor={({ theme }) => theme.iconColor.color}
                                        //strokeWidth="0px"
                                        color={({ theme }) => theme.iconColor.color}
                                        height="29px"
                                        width="auto"
                                    />
                                </Alink>
                                <Alink href="/LegendsofEA" target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 18 }}>
                                    <Icon
                                        name={yuserIcon}
                                        strokeColor={({ theme }) => theme.iconColor.color}
                                        strokeWidth="3px"
                                        //color={({ theme }) => theme.iconColor.color}
                                        height="30px"
                                        width="auto"
                                    />
                                </Alink>
                                <Alink href="https://www.instagram.com/yuser_app" target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 18 }}>
                                    <Icon
                                        name={instagramIcon}
                                        //strokeColor={({ theme }) => theme.iconColor.color}
                                        //strokeWidth="1px"
                                        color={({ theme }) => theme.iconColor.color}
                                        height="30px"
                                        width="auto"
                                    />
                                </Alink>
                                <Alink href="https://discord.gg/qCEH8nWH" target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 18 }}>
                                    <Icon
                                        name={discordIcon}
                                        //strokeColor={({ theme }) => theme.iconColor.color}
                                        //strokeWidth="1px"
                                        color={({ theme }) => theme.iconColor.color}
                                        height="34px"
                                        width="auto"
                                    />
                                </Alink>
                                <Alink href="https://www.linktr.ee/legendsofea" target="_blank" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 18 }}>
                                    <Icon
                                        name={linktreeIcon}
                                        //strokeColor={({ theme }) => theme.iconColor.color}
                                        //strokeWidth="1px"
                                        color={({ theme }) => theme.iconColor.color}
                                        height="30px"
                                        width="auto"
                                    />
                                </Alink>
                            </div>
                        </Section>
                        <FooterHorizontal/>

                        {rootstore.txPendingOverlayVisible && <TxPendingOverlay />}
                        {rootstore.txConfirmOverlayVisible && <TxConfirmOverlay />}
                        {rootstore.txCancelledOverlayVisible && <TxCancelledOverlay closeOverlay={()=>toggleCancelledOverlay(false)} />}
                        {rootstore.txFailedOverlayVisible && <TxFailedOverlay closeOverlay={()=>toggleFailedOverlay(false)} />}
                        {rootstore.txConfirmOverlayVisible && <TxConfirmOverlay />}
                        {rootstore.txSuccessOverlayVisible && <TxSuccessOverlay closeOverlay={() => rootstore.txSuccessOverlayVisible = false} buttonText={"Continue"} successButtonOnClick={() => { rootstore.txSuccessOverlayVisible = false }} />}
                        {rootstore.wrapMovrOverlayVisible && <WrapMOVR close={() => { toggleWrapMovrOverlay(false)}} onWrap={onWrapMovr} movrBalance={movrBalance} />}
                        {rootstore.metamaskOverlayVisible && <MetamaskOverlay  message = {`You must switch to the ${rootstore.CHAIN_ID === "0x507" ?"Moonbase Alpha":"Moonriver"} network.`}/>}


                    </FullContainer>
                </Container>
            </>
        )
    }
))

const Alink = styled.a`
    text-decoration: none;
    opacity:0.9;
    
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

const MintBox = styled.div`
    position:absolute;
    flex-direction:row;
    padding-left:${SPACING.extraLarge}px;
    padding-right:${SPACING.extraLarge}px;
    padding-bottom:${SPACING.medium}px;
    padding-top:${SPACING.medium}px;
    justify-content:space-between;
    align-items:center;
    align-self:flex-end;
    background:linear-gradient(transparent,15%,black);
    width:100%;
    @media screen and (max-width: 700px){
        flex-direction:column;
        justify-content:center;
        padding-right:${SPACING.small}px;
        padding-left:${SPACING.small}px;
        width:101%;
    }
`

const PrebuyContainer = styled.div`
    flex-direction:column;
    flex:1;
    margin-left:${SPACING.medium}px;
`

const BalanceBox = styled.div`
    background-color:rgb(50, 50, 50,0.5);
    width:100%;
    flex:1;
    height:100%;
    margin-bottom:${SPACING.small}px;
    padding:${SPACING.medium}px;
    justify-content:space-between;
    align-items:center;
    border-radius:5px;
`

const BalanceText = styled.text`
    font-size:18px;
    margin-left:${SPACING.small}px;
    margin-right:${SPACING.small}px;
    align-self:center;
    color:white;
`
const BalanceDisplay = styled.div`
    flex-direction:row;
`

const PrebuyButtonsContainer = styled.div`
    flex:1;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-top:${SPACING.medium}px;
    margin-bottom:${SPACING.small}px;
`
const PrebuyButton = styled.button`
    background-color: ${COLORS.purple};
    border-style:none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    padding: 12px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    height:50px;
    flex: 1;
`
const BuyWithText = styled.text`
    color:white;
`
const CurrencySelectDropdownButton = styled.button`
    height:50px;
    width:50px;
    cursor: pointer;
    background-color: ${COLORS.purple};
    box-shadow:none;
    border-top-right-radius:5px;
    border-bottom-right-radius:5px;
    border:none;
    border-left:1px solid;
    border-color:#B22F9E;
    position:relative;
`
const CurrencySelectOptionsContainer = styled.div`
    flex:1;
    position:absolute;
    top:55px;
    right:0px;
    background-color:${COLORS.white};
    flex-direction:column;
    border-radius:5px;
    width:max-content;
    border-radius:5px;
    overflow:hidden;
    border: 1px solid grey;
`
const CurrencySelectOption = styled.button`
    border:none;
    padding:${SPACING.small}px;
    color:${COLORS.black};
    text-align:start;
    &:hover {
        background-color:${COLORS.blue};
        color:white;
    }
`

const DropDownBox = styled.div`
    height:50px;
    width:50px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : COLORS.blackDarkMedium};
    border-radius: ${props => props.borderRadius ? props.borderRadius+"px" : "10px"};
    box-shadow: ${props => props.boxShadow ? props.boxShadow : "0 1px 12px rgb(0 0 0 / 20%)"};
    margin-left:${props => props.marginLeft ? props.marginLeft : SPACING.medium+'px'};
    border-top-right-radius:${props => props.borderTopRightRadius ? props.borderTopRightRadius+"px" : "10px"};
    border-bottom-right-radius:${props => props.borderBottomRightRadius ? props.borderBottomRightRadius+"px" : "10px"};
    border-left:${props => props.borderLeft ? props.borderLeft : ""};
`

const PurchaseNumSelection = styled.select`
    background-color: transparent;
    text-align: center;
    font-family: "LatoBlack";
    flex:1;
    height:100%;
    width:100%;
    border:none;
    border-radius:5px;
    cursor:pointer;
    color:white;
`
const PurchaseNumOption = styled.option`
    height: 50px;
    width: 50px;
    background-color: ${COLORS.blackDarkMedium};
    border-radius: 10px;
    border-width: 2px;
    border-color: #2f3d57;
    border-style: solid;
    text-align: center;
    font-family: "LatoBlack";
`

// const CurrencySelection = styled.select`
//     background-color: transparent;
//     text-align: center;
//     font-family: "LatoBlack";
//     flex:1;
//     height:100%;
//     width:100%;
//     border:none;
//     border-radius:5px;
//     cursor:pointer;
// `
// const CurrencySelectOption = styled.option`
//     height: 50px;
//     width: 100px;
//     background-color: ${COLORS.blackDarkMedium};
//     border-radius: 10px;
//     border-width: 2px;
//     border-color: #2f3d57;
//     border-style: solid;
//     text-align: center;
//     font-family: "LatoBlack";
//     position:absolute;
//     bottom:-50px;
// `

const RemainingTextBox = styled.div`
    flex:1;
    flex-direction:row;
    justify-content:space-between;
    margin-top:${SPACING.small}px;
`
const RemainingText = styled.text`
    justify-content:center;
    margin-top:${SPACING.small}px;
    margin-bottom:${SPACING.small}px;
    font-weight:bold;
    font-size:20px;
`

const MintTextBox = styled.div`
    justify-content:center;
    flex:1;
    flex-direction:column;
    margin-right:${SPACING.medium}px;
    color:white;
    @media screen and (max-width: 700px){
        margin-right:0px;
        text-align:center;
    }
`
const MintTitleText = styled.text`
    font-size:24px;
    font-weight:bold;
`
const MintBodyText = styled.text`
    font-size:18px;
    margin-bottom:18px;
`
const NotWhitelistedText = styled.text`
    text-align:center;
    margin:${SPACING.small}px;
`





const MainBackdrop = styled.div`
    z-index:9;
    flex-direction: column;
     justify-content: center; 
     border-bottom-right-radius: 10px; 
     padding: 24px;
      background-color: #0c1017;
    @media screen and (min-width: 700px){
        position: absolute;
        left: 0;
        top: 0;
    }
`;

const DownArrowButton = styled.div`
    align-items:center;
    flex-direction:column;
    margin-top:15px;
    opacity:0.8;
`;

const TextColumns = styled.div`
    display: grid;
    grid-template-columns:  repeat(2, 1fr);
    column-gap: 40px;
    margin-left: ${SPACING.extraLarge}px;
    margin-right: ${SPACING.extraLarge}px;
    @media screen and (max-width: 750px){
        grid-template-columns:  repeat(1, 1fr);
    }
`;

const TextRubic = styled.p`
    font-family: "Rubic";
    font-size: ${FONT_SIZE.large}px;
    line-height: calc(${FONT_SIZE.large}px + 6px);
    margin-bottom: ${SPACING.extraLarge}px;
    &:first-letter {
        font-size: calc(${FONT_SIZE.medium}px + 14px);
        font-weight: bold;
    }
    &:last-child {
        margin-bottom: 0;
    }
    @media screen and (max-width: 750px){
        &:first-letter {
            font-size: calc(${FONT_SIZE.medium}px + 4px);
            font-weight: bold;
        }
        &:last-child {
            margin-bottom: ${SPACING.medium}px;
        }
        font-size:${FONT_SIZE.medium}px;
        margin-bottom: ${SPACING.medium}px;
    }
`;

const TextTitle = styled.h1`
    font-size: ${FONT_SIZE.reallyLarge}px;
    text-align: center;
    font-family: "Rubic";
    font-style: italic;
    margin-bottom:${SPACING.extraLarge}px;
    @media screen and (max-width: 750px){
        font-size: calc(${FONT_SIZE.reallyLarge}px - 10px);
        margin-bottom:${SPACING.large}px;
    }
`;

const MainContainer = styled.div` 
    display: flex;
    flex-direction:row;
    position: relative;
    z-index: 1.5;
    justify-content: center;
    align-items: center;
    margin:44px 24px;
    @media screen and (max-width: 750px){
        grid-template-columns: 1fr;
    }
`;

const ImageBox = styled.div` 
    display: flex;
    max-height: 450px;
    max-width: 660px;
    flex:2;
    margin-right:24px;
    @media screen and (max-width: 750px){
       display: ${props => props.mobile ? "flex" : "none"};
       max-width: 450px;
    }
`;

const ImageBox2 = styled.div` 
    display: flex;
    max-height: 450px;
    max-width:340px;
    flex:1.03;
`;

const ImageWrapper = styled.div`
    display: flex;
    border-radius: 15px;
    overflow: hidden; 
`;
const ImageWrapper2 = styled.div` 
`;

const ItemImage = styled.img`
    max-height: 100%;
    max-width: 100%;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 750px){
        //margin-top: ${props => props.reverse && props.mobileMargin ? 0 : SPACING.medium}px;
       // margin-bottom: ${props => props.mobileMargin ? SPACING.medium : 0}px;
    }
`;