import React, { useState, useEffect } from 'react'
import imageSrc from '../../public/images/nextgem_bg.jpg';
import { inject, observer } from 'mobx-react';
import Image from 'next/image';
import Web3 from 'web3';
import { ethers } from 'ethers';
import {
    MintingContainer,
    NavBox,
    MainContainer,
    NavButton,
    Divider,
    ButtonTitle,
    Background,
    LinearGradient,
    ContentBox,
    ContentInfo,
    ContentUI,
    MintList,
    TextLarge,
    Description,
    HorizontalBox,
    DropDownAmount,
    ButtonMint,
    ButtonWrap,
    Select,
    Option,
    ItemContainer,
    FirstMintItem,
    ButtonOuter,
    CurrencyDropDown,
    CurrencySelect,
    TextMintButton
} from './MintingMain.elements';
import { useSession } from 'next-auth/client';
import { useStore } from '../../stores/RootStore';
import Countdown from 'react-countdown';
import MetaMaskOnboarding from '@metamask/onboarding';
import { abi } from '../../public/data/nextGemABI.json'; // update nextgem abi 
import { abi as txABI } from '../../public/data/txContractABI.json'
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';
import Numeral from 'react-numeral';
import Icon from ".././Icon/Icon";
import arrow from '../../public/icons/direction-right.svg';
import Movr from "../../public/icons/moonriver_logo3.svg";
import arrowDown from "../../public/icons/arrowDown.svg";
import Button from '../Button/Button';
import Gem from "../../public/icons/gem.svg";
import { useRouter } from "next/router";
import ScaleLoader from "react-spinners/ScaleLoader";
import nextgems from "../../public/images/nextgems_gif.gif";
import nextgems_multiple from "../../public/images/nextgems_multiple.png";
import nextgems_buy from "../../public/images/nextgems_buy.png";
import nextgems_party from "../../public/images/nextgems_party.png";
import nextgems_yuser from "../../public/images/nextgems_yuser.png";
import OnboardingButton from "../MetamaskOnboarding/MetamaskOnboarding"
import Link from 'next/link'

export default inject('store')(observer(
    function MintingMain(props) {
        const rootstore = useStore();
        const router = useRouter();
        const [session, loading] = useSession();
        const [accounts, setAccounts] = useState([]);
        const [allowedWallets, setAllowedWallets] = useState([]);
        const [wmovrBalance, setWmovrBalance] = useState(null);
        const [movrBalance, setMovrBalance] = useState(null);
        const [nextGemCount, setNextGemCount] = useState([]);
        const [wmovrAmount, setwmovrAmount] = useState(0.5);
        const [queryRemaining, setQueryRemaining] = useState(0);
        const [mintItems, setMintItems] = useState(avatars)
        const [numRemaining, setNumRemaining] = useState(0);
        const [whitelistRound, setWhitelistRound] = useState(0);
        const [wmovrNumToPurchase, setwmovrNumToPurchase] = useState(1);
        const wmovrABI = [{ "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "address", "name": "guy", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "dst", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "address", "name": "dst", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdrawal", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "guy", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "deposit", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "dst", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "src", "internalType": "address" }, { "type": "address", "name": "dst", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "receive", "stateMutability": "payable" }];
        const nextGemABI = abi;
        const txContractABI = txABI
        const [metamaskButtonVisible, setMetamaskButtonVisible] = useState(false);
        const [switchButtonVisible, setSwitchButtonVisible] = useState(false);
        const [activateMinting, setActivateMinting] = useState(false);
        const [whitelistActive, setWhitelistActive] = useState(0);
        const [showOverlay, setShowOverlay] = useState(false)
        const nextGemAddr = "0x962732af501B0EB54903a0809e212fA4e356a811";//update when contract is on mainnet

        //TEST CONTRACT ADDRESSES
        const nextGemTestAddr = "0xd6c73165BE220A3279B995f1057da6B08975B4F2";
        const wDevAddr = "0x90a642047e790188B7e748d5E1BDB9A021c6406D";
        const txContractTestAddr = "0xc171ec78A254e871A6c6B711630595cD8Bfe8362";

        const mintChoices = [1, 2, 3, 4, 5];
        const [currency, setCurrency] = useState("MOVR");
        const [bySale, setSale] = useState(true)
        const [byAbout, setAbout] = useState(false)
        const [byDiscord, setDiscord] = useState(false)
        const [alert, setAlert] = useState(false)
        const [whitelistedWallets, setWhitelistedWallets] = useState([]);
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
            } else if (btnType == 'discore') {
                setSale(false)
                setAbout(false)
                setDiscord(true)
                window.open('https://discord.gg/3PFue8pbCx', '_blank').focus();
            }
        }

        if (typeof window !== "undefined" && window.ethereum && MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setAccounts(accounts[0]);
            })
        }
        useEffect(() => {
            const interval = setInterval(() => {
                setQueryRemaining(oldNum => oldNum + 1);
            }, 10000);
            //return () => clearInterval(interval);
        }, []);

        useEffect(async () => {
            let remaining = await rootstore.getNextGemsRemaining()
            setNumRemaining(remaining);
            if (remaining === 0) {
                props.setNoneRemainingOverlayVisible(true);
            }
        }, [queryRemaining]);

        useEffect(async () => {
            let active = await rootstore.getActiveWhitelist()
            setWhitelistActive(active);
        }, [queryRemaining]);

        useEffect(async () => {
            if (session && session?.user?._id && typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()) {
                let wallets = await rootstore.getWhitelistedWallets(session.user._id);
                if (wallets.length > 0 && wallets[0] !== window.ethereum.selectedAddress) {
                    props.getWhitelistOverlayWallets(wallets);
                    setWhitelistedWallets(wallets);
                }
            }
        }, [session]);

        useEffect(async () => {
            if (session && session?.user?._id) {
                setWhitelistRound(await rootstore.isWhitelisted());
            }
        }, [session]);

        React.useEffect(() => {

            async function doEffect() {
                if(MetaMaskOnboarding.isMetaMaskInstalled() && typeof window!== "undefined" && window.ethereum){
                    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                    ethersProvider.listAccounts().then(async function (accounts, err) {
                        if (err != null) console.error("An error occurred: " + err);
                        else if (accounts.length === 0) {
                            setShowOverlay(true)
                        }
                        else {
                            const balance = await ethersProvider.getBalance(accounts[0])
                            const wei_balance = await ethers.utils.formatEther(balance);
                            setAccounts(accounts[0])

                            setMovrBalance(wei_balance)
                            rootstore.GetWMOVRBalance(window.ethereum.selectedAddress)
                                .then(res => { setWmovrBalance(res) })

                        }
                    });
                }
                // if (session) {
                //     const walletsFromServer = await rootstore.getUserWallets(session?.user?._id);
                //     if (walletsFromServer) {
                //         setAllowedWallets(walletsFromServer);
                //         for (const wallet in allowedWallets) {
                //             if (allowedWallets[wallet] === accounts[0]) {
                //                 setActivateMinting(true);
                //             }
                //             else {
                //                 setActivateMinting(false);
                //             }
                //         }
                //     }
                // }
            }
            doEffect();

        }, [movrBalance, accounts, session]);

        useEffect(() => {
            if (typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()) {
                if (window.ethereum.chainId === rootstore.CHAIN_ID && window.ethereum.selectedAddress) {
                    props.showWhitelistOverlay(false);
                    setSwitchButtonVisible(false)

                    rootstore.GetWMOVRBalance(window.ethereum.selectedAddress)
                        .then(res => { setWmovrBalance(res) })
                    if (whitelistedWallets.length > 0 && window.ethereum.selectedAddress && whitelistedWallets[0] !== window.ethereum.selectedAddress) { props.showWhitelistOverlay(true); }
                }
                else {
                    setSwitchButtonVisible(true)
                }
            }
        }, [accounts]);

        React.useEffect(() => {
            if ( MetaMaskOnboarding.isMetaMaskInstalled()) {
                const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                ethersProvider.listAccounts().then(function (accounts, err) {
                    if (err != null) console.error("An error occurred: " + err);
                    else if (accounts.length === 0) props.showConnectOverlay(true);
                    else if (window.ethereum.chainId !== rootstore.CHAIN_ID) props.showNetworkOverlay(true);
                    //else if (session && session?.user?._id && whitelistedWallets.length > 0 && window.ethereum.selectedAddress && whitelistedWallets[0] !== window.ethereum.selectedAddress) { props.showWhitelistOverlay(true); }
                    else setMetamaskButtonVisible(false);
                });
            }
        }, [metamaskButtonVisible, whitelistedWallets.length]);

        async function preBuyMOVR() {
            // if (numRemaining === 0) {
            //     await props.setNoneRemainingOverlayVisible(true);
            //     return;
            // }
            // if (typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()) {
            //     if (window.ethereum && window.ethereum.chainId != null && window.ethereum.chainId === rootstore.CHAIN_ID && window.ethereum.selectedAddress) {
            //         const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
            //         const signer = ethersProvider.getSigner();
            //         const txContract = new ethers.Contract(rootstore.txContractTestAddr, txContractABI, signer);
            //         let cost = ethers.utils.parseUnits((wmovrNumToPurchase * 0.5).toString());
            //         //const gasPrice = ethers.utils.parseUnits('1.1', 9);
            //         let tx;
            //         try {
            //             await props.showConfirmModal(true);
            //             tx = await txContract.preBuy(wmovrNumToPurchase, rootstore.wDevAddr, { gasPrice: 10000000000, value: cost });
            //             rootstore.transactionHash = tx.hash;
            //             await props.showConfirmModal(false);
            //             await props.setPendingModalVisible(true);
            //         } catch (err) {
            //             await props.showConfirmModal(false);
            //             await props.setPendingModalVisible(false);
            //             if (err.code === 4001) {
            //                 props.setTxErrorMessage("You cancelled your transaction in Metamask.");
            //                 props.setCancelledOverlayVisible('true');
            //                 return;
            //             }
            //             else {
            //                 props.setTxErrorMessage("There was an error when creating your transaction.");
            //                 props.setModalVisible('true');
            //             }
            //             return;
            //         }
            //         let complete = false;
            //         while (!complete) {
            //             try {
            //                 const receipt = await tx.wait();
            //                 await props.setPendingModalVisible(false);
            //                 await props.setSuccessModalVisible(true);
            //                 complete = true;
            //             } catch (err) {
            //                 await props.setPendingModalVisible(false);
            //                 let errReceipt = err.receipt;
            //                 if (errReceipt.status === 0) {
            //                     await props.setModalVisible(true);
            //                     complete = true;
            //                 }
            //                 else if (errReceipt.status === 1) {
            //                     if (!err.cancelled && err.reason === "repriced") {
            //                         tx = err.replacement;
            //                         rootstore.transactionHash = tx.hash;
            //                     }
            //                     else {
            //                         await props.setModalVisible(true);
            //                         complete = true;
            //                     }
            //                 }
            //             }
            //         }


            //     }
            // }
        }

        async function preBuyWMOVR() {
            // if (numRemaining === 0) {
            //     await props.setNoneRemainingOverlayVisible(true);
            //     return;
            // }
            // if (typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()) {
            //     if (window.ethereum && window.ethereum.chainId != null && window.ethereum.chainId === rootstore.CHAIN_ID && window.ethereum.selectedAddress) {
            //         const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
            //         const signer = ethersProvider.getSigner();
            //         const wdevContract = new ethers.Contract(rootstore.wDevAddr, wmovrABI, signer);
            //         const txContract = new ethers.Contract(rootstore.txContractTestAddr, txContractABI, signer);
            //         let balance = await wdevContract.balanceOf(window.ethereum.selectedAddress);
            //         let cost = ethers.utils.parseUnits((wmovrNumToPurchase * 0.5).toString());
            //         if (balance.gte(cost)) {
            //             let currentAllowance = await wdevContract.allowance(window.ethereum.selectedAddress, rootstore.txContractTestAddr);
            //             let tx, approve;
            //             let complete = false;
            //             if (currentAllowance.lt(cost)) {
            //                 try {
            //                     props.showAcceptModal(true);
            //                     approve = await wdevContract.approve(rootstore.txContractTestAddr, cost);
            //                     rootstore.transactionHash = approve.hash;
            //                     props.showAcceptModal(false);
            //                 } catch (err) {
            //                     await props.showAcceptModal(false);
            //                     await props.setPendingModalVisible(false);
            //                     if (err.code === 4001) {
            //                         props.setTxErrorMessage("You cancelled your transaction in Metamask.");
            //                         props.setCancelledOverlayVisible('true');
            //                         return;
            //                     }
            //                     else {
            //                         props.setTxErrorMessage("There was an error when creating your transaction.");
            //                         props.setModalVisible('true');
            //                     }
            //                     return;
            //                 }

            //                 while (!complete) {
            //                     try {
            //                         props.setPendingModalVisible(true);
            //                         await approve.wait();
            //                         props.setPendingModalVisible(false);
            //                         complete = true
            //                     } catch (err) {
            //                         await props.setPendingModalVisible(false);
            //                         let errReceipt = err.receipt;
            //                         if (errReceipt.status === 0) {
            //                             await props.setModalVisible(true);
            //                             complete = true;
            //                         }
            //                         else if (errReceipt.status === 1) {
            //                             if (!err.cancelled && err.reason === "repriced") {
            //                                 approve = err.replacement;
            //                                 rootstore.transactionHash = approve.hash;
            //                             }
            //                             else {
            //                                 await props.setModalVisible(true);
            //                                 complete = true;
            //                             }
            //                         }
            //                     }
            //                 }
            //             }

            //             try {
            //                 rootstore.transactionHash = null;
            //                 props.showConfirmModal(true);
            //                 tx = await txContract.preBuy(wmovrNumToPurchase, rootstore.wDevAddr, { gasPrice: 10000000000, value: 0 });
            //                 rootstore.transactionHash = tx.hash;
            //                 props.showConfirmModal(false);
            //                 props.setPendingModalVisible(true);
            //             } catch (err) {
            //                 await props.showConfirmModal(false);
            //                 await props.setPendingModalVisible(false);
            //                 if (err.code === 4001) {
            //                     props.setTxErrorMessage("You cancelled your transaction in Metamask.");
            //                     props.setCancelledOverlayVisible('true');
            //                     return;
            //                 }
            //                 else {
            //                     props.setTxErrorMessage("There was an error when creating your transaction.");
            //                     props.setModalVisible('true');
            //                 }
            //                 return;
            //             }
            //             complete = false;
            //             while (!complete) {
            //                 try {
            //                     let receipt = await tx.wait();
            //                     complete = true;
            //                     props.setPendingModalVisible(false);
            //                     props.setSuccessModalVisible(true);
            //                 } catch (err) {
            //                     let errReceipt = err.receipt;
            //                     if (errReceipt.status === 0) {
            //                         await props.setPendingModalVisible(false);
            //                         await props.setModalVisible(true);
            //                         complete = true;
            //                     }
            //                     else if (errReceipt.status === 1) {
            //                         if (!err.cancelled && err.reason === "repriced") {
            //                             tx = err.replacement;
            //                             rootstore.transactionHash = tx.hash;
            //                         }
            //                         else {
            //                             await props.setPendingModalVisible(false);
            //                             await props.setModalVisible(true);
            //                             complete = true;
            //                         }
            //                     }
            //                 }
            //             }

            //         }
            //         else {
            //             rootstore.errMessage = `Error: WMOVR balance too low. Balance:${ethers.utils.formatEther(balance)} Cost:${ethers.utils.formatEther(cost)}`;
            //         }
            //     }
            // }
        }

        function handleChange(event) {
            let selected = Number(event.target.value);
            if (event.target.value && mintChoices.includes(selected)) {
                setwmovrNumToPurchase(event.target.value);
            }
            else {
                rootstore.errMessage = "Error invalid amount of NextGems to purchase. Number to purchase has been set to 1";
                setwmovrNumToPurchase(1);
                window.location.reload();
            }
        }

        async function HandleCurrencySwitch(event) {
            let choice = event.target.value;
            if (choice && (choice === "MOVR" || choice === "WMOVR")) {
                setCurrency(choice);
            }
            else {
                rootstore.errMessage("Error: invalid currency selected, setting selected currency to MOVR");
                setCurrency("MOVR");
            }
        }

        const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
            if (completed && MetaMaskOnboarding.isMetaMaskInstalled() && ((whitelistRound === 1 && whitelistActive >= 1) || (whitelistRound === 2 && whitelistActive >= 2) || (whitelistRound === 0 && whitelistActive === 3))) {
                if (numRemaining > 0) {
                    return (
                        <div style={{ flexDirection: 'column', flex: 1, marginTop: 24 }}>
                            <div style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'rgb(33 42 60)', borderRadius: 5, marginBottom: 16, height: 60, padding: 12, flex: 1, }}>
                                <Icon
                                    height="35px"
                                    width="35px"
                                    name={Movr}
                                />
                                <Numeral
                                    className="walletBalance"
                                    value={
                                        currency === "MOVR" ?
                                            (movrBalance > 0.000000 ?
                                                movrBalance
                                                :
                                                '0'
                                            ) : (
                                                wmovrBalance > 0.000000 ?
                                                    wmovrBalance : '0'
                                            )
                                    }
                                    format={"0,0.000000"}
                                />
                                <div style={{ marginLeft: 6 }}>{currency}</div>
                                <div style={{ marginLeft: 'auto' }}>Balance</div>
                            </div>
                            <div style={{ flexDirection: 'row', marginBottom:12,}}>
                                <ButtonMint onClick={currency === "MOVR" ? (preBuyMOVR) : preBuyWMOVR} >
                                    <TextMintButton button={true}>
                                        {'BUY NEXTGEMS'}
                                    </TextMintButton>
                                </ButtonMint>
                                <DropDownAmount>
                                    <Select onChange={handleChange}>
                                        {mintChoices.map((element, index) =>
                                            <Option key={index}>{element}</Option>)}
                                    </Select>
                                </DropDownAmount>
                            </div>

                            <HorizontalBox style={{marginBottom:0,}}>
                                <TextLarge style={{ fontSize: 16, }}>{'0.5 MOVR'}</TextLarge>
                                <TextLarge style={{ fontSize: 16,}}>{'MAX: 5 per tx'}</TextLarge>
                                <TextLarge style={{ fontSize: 16 }}>{numRemaining > 0 ? `${numRemaining} REMAINING` : "SOLD OUT"}</TextLarge>
                            </HorizontalBox>
                        </div>
                    );
                }
                else {
                    return null;
                }
            }
            else if (numRemaining === 0) {
                return null;
            }
            else if(!MetaMaskOnboarding.isMetaMaskInstalled())
            {
                return (<div style={{
                    flexDirection: 'column', marginTop: 24, backgroundColor: '#00000070',
                    borderRadius: 15, padding: 12,
                }}>
                    <div style={{ opacity: 0.9, fontSize: 25.5, fontWeight: 'bold' }}>{`You must have Metamask installed in order to participate in the sale.`}</div>
                </div>)
            }
            else {
                return (<>
                    <div style={{
                        flexDirection: 'column', marginTop: 24, backgroundColor: '#00000070',
                        borderRadius: 15, padding: 12,
                    }}>
                        <div style={{ fontSize: 40, fontWeight: 'bold' }}>{`${days}:${hours}:${minutes}:${seconds}`}hrs</div>
                        <div style={{ opacity: 0.9, fontSize: 40, fontWeight: 'bold' }}>{`UNTIL THE`}</div>
                        <div style={{ opacity: 0.9, fontSize: 25.5, fontWeight: 'bold' }}>{`NEXTGEMS SALE`}</div>
                    </div>
                </>);
            }
        }

        //The function to switch network
        async function networkSwitch() {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: rootstore.CHAIN_ID }],
              });
            } catch (switchError) {
              if (switchError.code === 4902) {
                try {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{ chainName: rootstore.CHAIN_ID === "0x507" ?'Moonbase Alpha' : "Moonriver", chainId: rootstore.CHAIN_ID, rpcUrls: rootstore.CHAIN_ID === "0x507" ?['https://rpc.testnet.moonbeam.network']:['https://rpc.moonriver.moonbeam.network'], blockExplorerUrls: rootstore.CHAIN_ID === "0x505" ? ['https://blockscout.moonriver.moonbeam.network/'] : ['https://moonbase-blockscout.testnet.moonbeam.network/'], iconUrls: [''] }],
                  });
                } catch (addError) {
                }
              }
              else {
                console.log(switchError.message);
              }
      
            }
          }

        let time = 1636466400000

        return (
            <>
                <MintingContainer>
                    <NavBox>
                        <NavButton onClick={() => handleNavhClick('sale')} click={bySale}>
                            <ButtonTitle active={bySale}>{'SALE'}</ButtonTitle>
                        </NavButton>
                        <Divider />
                        <NavButton click={byAbout}>
                            <Link href="#features">
                                <ButtonTitle active={byAbout}>{'FEATURES'}</ButtonTitle>
                            </Link>
                        </NavButton>
                        <Divider />
                        <NavButton click={byAbout}>
                            <Link href="#rarity">
                                <ButtonTitle active={byAbout}>{'RARITY'}</ButtonTitle>
                            </Link>
                        </NavButton>
                        <Divider />
                        <NavButton click={byAbout}>
                            <Link href="#market">
                                <ButtonTitle active={byAbout}>{'MARKET'}</ButtonTitle>
                            </Link>
                        </NavButton>
                        <Divider />
                        <NavButton onClick={() => handleNavhClick('about')} click={byAbout}>
                            <ButtonTitle active={byAbout}>{'DOCS'}</ButtonTitle>
                        </NavButton>
                        <Divider />
                        <NavButton onClick={() => handleNavhClick('discore')} click={byDiscord}>
                            <ButtonTitle active={byDiscord}>{'DISCORD'}</ButtonTitle>
                        </NavButton>
                    </NavBox>
                    <MainContainer >
                        <Background>
                            <Image objectFit="cover" src={imageSrc} alt="background image" />
                            <LinearGradient />
                        </Background>

                        <div class="flexContainerRow" style={{padding:34,justifyContent:'space-between',alignItems:'center',position:'relative',zIndex:'999',width:'100%',paddingBottom:24,}}>
                            <div class="flexSectionTop2" style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',flex:1,}}>
                                <div style={{fontFamily:'LatoBlack',lineHeight:1,fontSize:40,marginBottom:24,}}>
                                    {'BUY NEXTGEMS NOW!'}
                                </div>
                                <div style={{fontSize:20,}}>
                                    {'NextGems are the first 10k generative avatar collection from Yuser. The NextGems sale is now live and the burn starts on November 24th!'}
                                    <br/><br/>
                                    {'Make sure to buy now before all leftover NextGems will be given to the blockchain gods – AKA burned!'}
                                </div>
                            </div>
                            <div class="flexSectionBottom1" style={{overflow:'hidden',maxWidth:320,maxHeight:320,width:'100%',borderRadius:'50%'}}>
                                <Image
                                    objectFit="cover" 
                                    src={nextgems}
                                />
                            </div>
                        </div>

                        {whitelistActive == 0 && Date.now() > time ?
                            <ContentBox>
                                <div style={{ flexDirection: 'column', backgroundColor: 'rgba(33, 42, 60, 0.37)', width: '100%', borderRadius: 15, margin: 24, padding: 24, alignItems: 'center', justifyContent: 'center' }}>
                                    <TextLarge>Loading NextGems UI</TextLarge>
                                    <div style={{ height: 10, }}></div>
                                    <ScaleLoader color={COLORS.white} loading={true} size={350} />
                                </div>
                            </ContentBox>
                        :
                            <>
                                 <ContentBox style={{paddingTop:12,paddingBottom:12,}}>
                                    <ContentUI>
                                        <HorizontalBox style={{ marginBottom: 24 }}>
                                            <Countdown date={time} renderer={countdownRenderer}></Countdown>
                                        </HorizontalBox>
                                    </ContentUI>
                                    <ContentInfo style={{ marginTop: 24 }}>
                                        {numRemaining !== 0 ? (
                                            ((whitelistRound === 1 && whitelistActive >= 1) || (whitelistRound === 2 && whitelistActive >= 2) || whitelistActive === 3) ?
                                                <Description>
                                                    When you buy NextGems your funds will be deposited into a smart contract until the NFTs are minted into your wallet at a later date.
                                                    <br /><br />
                                                    You can select to buy with MOVR.
                                                </Description>
                                                : (whitelistActive === 1) ?
                                                    <Description>
                                                        The NextGems sale is currently active for Whitelist round 1 participants. If you are whitelisted for round 1 please be sure to switch to the correct wallet and refresh this page.
                                                        <br /><br />
                                                        You can select to buy with MOVR.
                                                    </Description>
                                                    : (whitelistActive === 2) ?
                                                        <Description>
                                                            The NextGems sale is currently active for Whitelist round 1 and 2 participants. If you are whitelisted for round 1 or 2 please be sure to switch to the correct wallet and refresh this page.
                                                            <br /><br />
                                                            You can select to buy with MOVR.
                                                        </Description>
                                                        :
                                                        <Description>
                                                            The NextGems sale will resume November 9th.
                                                            <br /><br />
                                                            You will be able to buy with MOVR.
                                                        </Description>
                                        ) :
                                            <Description>
                                                All NextGems have been sold! Thank you to everyone that participated. If you'd still like to purchase NextGems you'll be able to do so when the Yuser NFT Marketplace Launches. Tune into our Twitter or Discord for details.
                                            </Description>
                                        }
                                    </ContentInfo>
                                    {MetaMaskOnboarding.isMetaMaskInstalled() && showOverlay ? 
                                        <div style={{backdropFilter: 'blur(5px)',borderRadius:15,backgroundColor:'rgb(25 32 48 / 65%)',flexDirection:'column',justifyContent:'center',alignItems:'center',zIndex:99,position:'absolute',left:0,right:0,top:0,bottom:0,}}>
                                            <div style={{
                                                borderRadius: 15,
                                                backgroundColor: ({ theme }) => theme.colorMedium.color,
                                                flexDirection: 'column',
                                                padding: 24,
                                                border: '1px solid #3c4a68',
                                                boxShadow: '0 1px 16px rgb(0 0 0 / 40%)'
                                            }}>
                                            <div style={{maxWidth:340,width:'100%',marginBottom:8,}}>
                                                <OnboardingButton setShowOverlay={setShowOverlay}/>
                                            </div>
                                            <div style={{textShadow: '0 0 12px #00000094',textAlign:'center',fontSize:16,maxWidth:340,}}>To buy NextGems you must connect your Metamask wallet.</div>
                                            </div>
                                        </div>        
                                    : MetaMaskOnboarding.isMetaMaskInstalled() &&switchButtonVisible ?
                                        <div style={{backdropFilter: 'blur(5px)',borderRadius:15,backgroundColor:'rgb(25 32 48 / 65%)',flexDirection:'column',justifyContent:'center',alignItems:'center',zIndex:99,position:'absolute',left:0,right:0,top:0,bottom:0,}}>
                                            <div style={{
                                                borderRadius: 15,
                                                backgroundColor: ({ theme }) => theme.colorMedium.color,
                                                flexDirection: 'column',
                                                padding: 24,
                                                border: '1px solid #3c4a68',
                                                boxShadow: '0 1px 16px rgb(0 0 0 / 40%)'
                                            }}>
                                                <div style={{maxWidth:340,width:'100%',marginBottom:8,}}>
                                                    <OnboardingButton setShowOverlay={setShowOverlay} setSwitchButtonVisible={setSwitchButtonVisible}/>
                                                </div>
                                                <div style={{textShadow: '0 0 12px #00000094',textAlign:'center',fontSize:16,maxWidth:340,}}>To buy NextGems you must connect to the Moonriver Network.</div>
                                            </div>
                                        </div>       
                                    : !MetaMaskOnboarding.isMetaMaskInstalled() ?
                                    <div style={{backdropFilter: 'blur(5px)',borderRadius:15,backgroundColor:'rgb(25 32 48 / 65%)',flexDirection:'column',justifyContent:'center',alignItems:'center',zIndex:99,position:'absolute',left:0,right:0,top:0,bottom:0,}}>
                                            <div style={{
                                                borderRadius: 15,
                                                backgroundColor: ({ theme }) => theme.colorMedium.color,
                                                flexDirection: 'column',
                                                padding: 24,
                                                border: '1px solid #3c4a68',
                                                boxShadow: '0 1px 16px rgb(0 0 0 / 40%)'
                                            }}>
                                            <div style={{maxWidth:340,width:'100%',marginBottom:8,}}>
                                                <OnboardingButton setShowOverlay={setShowOverlay} setSwitchButtonVisible={setSwitchButtonVisible}/>
                                            </div>
                                            <div style={{textShadow: '0 0 12px #00000094',textAlign:'center',fontSize:16,maxWidth:340,}}>To buy NextGems you must have Metamask installed</div>
                                            </div>
                                        </div>
                                    : null}
                                </ContentBox>
                            </>
                        }
                        <div style={{opacity:0.6,justifyContent:'center',alignItems:'center',position:'relative',zIndex:'999',flexDirection:'row',width:'100%',paddingTop:30,paddingBottom:30,}}>
                            <a href="#features">
                                <Icon
                                    height="35px"
                                    width="35px"
                                    strokeWidth="4"
                                    name={arrowDown}
                                />
                            </a>
                        </div>
                        <div class="flexContainerRow" id="features" style={{padding:24,justifyContent:'space-between',alignItems:'center',position:'relative',zIndex:'999',width:'100%',paddingTop:60,paddingBottom:60,}}>
                            <div class="flexSectionTop" style={{maxWidth:330,}}>
                                <ItemContainer objectFit="cover" 
                                    src={"https://yuser-assets.imgix.net/nextgems_yuser.png?fit=clip&w=300&fm=webp$auto=format&dpr=2"}
                                />
                            </div>
                            <div class="flexSectionBottom" style={{flexDirection:'column',justifyContent:'center',alignItems:'flex-start',flex:1,}}>
                                <div style={{fontFamily:'LatoBlack',lineHeight:1,fontSize:40,marginBottom:24,}}>
                                    {'GET NEXTGEMS FEATURES'}
                                </div>
                                <div>
                                    <ul style={{paddingLeft: 22}}>
                                        <li style={{fontSize:20,display:'list-item',marginBottom:8,}}><b>Yuser Power Boost</b>: increase the reach of your content</li>
                                        <li style={{fontSize:20,display:'list-item',marginBottom:8,}}><b>Yuser Verification</b>: get a golden circle around your avatar</li>
                                        <li style={{fontSize:20,display:'list-item',marginBottom:8,}}><b>Yuser Hodling Rewards</b>: get Gems to buy products or stake</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="flexContainerRow" id="rarity" style={{padding:24,justifyContent:'space-between',alignItems:'center',position:'relative',zIndex:'999',width:'100%',paddingTop:60,paddingBottom:60,}}>
                            <div class="flexSectionTop2"  style={{flexDirection:'column',justifyContent:'center',alignItems:'flex-start',flex:1,}}>
                                <div style={{fontFamily:'LatoBlack',lineHeight:1,fontSize:40,marginBottom:24,}}>
                                    {'MINT MULTIPLE NEXTGEMS NOW'}
                                </div>
                                <div style={{fontSize:22,}}>
                                    {'Increase your chance of getting rare attributes by purchasing multiple NextGems. The rarer your NextGems, the more valuable and powerful it is.'}
                                </div>
                            </div>
                            <div class="flexSectionBottom1" style={{maxWidth:330,}}>
                                <ItemContainer objectFit="cover" 
                                    src={"https://yuser-assets.imgix.net/nextgems_multiple.png?fit=clip&w=300&fm=webp$auto=format&dpr=2"}
                                />
                            </div>
                        </div>
                        <div class="flexContainerRow" id="market" style={{padding:24,justifyContent:'space-between',alignItems:'center',position:'relative',zIndex:'999',width:'100%',paddingTop:60,paddingBottom:60,}}>
                            <div class="flexSectionTop" style={{maxWidth:330,}}>
                                <ItemContainer objectFit="cover" 
                                    src={"https://yuser-assets.imgix.net/nextgems_buy.png?fit=clip&w=300&fm=webp$auto=format&dpr=2"}
                                />
                            </div>
                            <div class="flexSectionBottom" style={{flexDirection:'column',justifyContent:'center',alignItems:'flex-start',flex:1,}}>
                                <div style={{fontFamily:'LatoBlack',lineHeight:1,fontSize:40,marginBottom:24,}}>
                                    {'BUY & SELL NEXTGEMS'}
                                </div>
                                <p style={{fontSize:22,}}>
                                    {'Sell, buy and trade NextGems on the Yuser Marketplace when it launches (coming soon).'}
                                    <br/><br/>
                                    Join our <a style={{fontSize:22,}} target="_blank" href="https://discord.gg/3PFue8pbCx">Discord</a> for live updates.
                                </p>
                            </div>
                        </div>
                        <div class="flexContainerRow" id="community" style={{padding:24,justifyContent:'space-between',alignItems:'center',position:'relative',zIndex:'999',width:'100%',paddingTop:60,paddingBottom:60,}}>
                            <div class="flexSectionTop2" style={{flexDirection:'column',justifyContent:'center',alignItems:'flex-start',flex:1,}}>
                                <div style={{fontFamily:'LatoBlack',lineHeight:1,fontSize:40,marginBottom:24,}}>
                                    {'GROW NEXTGEMS COMMUNITY'}
                                </div>
                                <p style={{fontSize:21,}}>
                                    Join our <a style={{fontSize:21,}} target="_blank" href="https://discord.gg/3PFue8pbCx">Discord</a>, Telegram and follow us on <a style={{fontSize:21,}} target="_blank" href="https://twitter.com/yuser">Twitter</a>.
                                    <br/><br/>
                                    {'Already purchased NextGems? Share yours in the NextGems reveal party on Twitter!'}
                                </p>
                            </div>
                            <div class="flexSectionBottom1" style={{maxWidth:330,}}>
                                <ItemContainer objectFit="cover" 
                                    src={"https://yuser-assets.imgix.net/nextgems_party.png?fit=clip&w=300&fm=webp$auto=format&dpr=2"}
                                />
                            </div>
                        </div>
                    </MainContainer>
                </MintingContainer>
            </>
        )
    }
))

const avatars = [
    { src: "https://yuser-assets.imgix.net/nextgems_buy.png?bg=black?fit=clip&w=200&fm=webp$auto=format&dpr=2" },
    { src: "https://yuser-assets.imgix.net/nextgems_multiple.png?bg=black?fit=clip&w=200&fm=webp$auto=format&dpr=2" },
    { src: "https://yuser-assets.imgix.net/nextgems_party.png?bg=black?fit=clip&w=200&fm=webp$auto=format&dpr=2" },
    { src: "https://yuser-assets.imgix.net/nextgems_yuser.png?bg=black?fit=clip&w=200&fm=webp$auto=format&dpr=2" },
    { src: "https://yuser-assets.imgix.net/nextgemhelmet.jpg?fit=clip&w=200&fm=webp$auto=format&dpr=2" },
    { src: "https://yuser-assets.imgix.net/nextgemgreen.png?fit=clip&w=200&fm=webp$auto=format&dpr=2" },
    { src: "https://yuser-assets.imgix.net/NextGem1.png?fit=clip&w=200&fm=webp$auto=format&dpr=2" },
    { src: "https://yuser-assets.imgix.net/NextGem2.png?fit=clip&w=200&fm=webp$auto=format&dpr=2" },
    { src: "https://yuser-assets.imgix.net/NextGem3.png?fit=clip&w=200&fm=webp$auto=format&dpr=2" },
    { src: "https://yuser-assets.imgix.net/NextGem4.png?fit=clip&w=200&fm=webp$auto=format&dpr=2" },

]