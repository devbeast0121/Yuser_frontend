import React, { useEffect, useState, useRef } from 'react'
import {
    BtnOnboarding,
    BtnText,
} from './MetamaskOnboarding.elements';
import MataMask from '../../public/icons/metamask.svg';
import MetaMaskOnboarding from '@metamask/onboarding';
import Icon from ".././Icon/Icon";
import { inject, observer } from 'mobx-react';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { runInAction } from 'mobx';
import { useStore } from '../../stores/RootStore';
import { useSession } from 'next-auth/client';

const ONBOARD_TEXT = 'CLICK TO INSTALL METAMASK';
const CONNECT_TEXT = 'CONNECT METAMASK';
const CONNECTED_TEXT = 'METAMASK CONNECTED';
const SWITCH_NETWORK = "SWITCH NETWORK"

export default inject('store')(observer(
    function OnboardingButton(props) {
        const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
        const [connected, setConnected] = React.useState(false);
        const [accounts, setAccounts] = React.useState([]);
        const rootstore = useStore()
        const [session, loading] = useSession();
        const [textchange, setTextchange] = useState("not_connected")
        // console.log(props.store.wallets?.[0]);

        React.useEffect(() => {
            if (MetaMaskOnboarding.isMetaMaskInstalled()) {
                if (textchange === "connected") {
                    //props.setShow(false)
                    if(window.ethereum && window.ethereum.chainId === rootstore.CHAIN_ID)
                    {
                        setButtonText(CONNECTED_TEXT);
                        setConnected(true);
                    }
                    else{
                        setButtonText(SWITCH_NETWORK)
                        setConnected(false);
                    }
                } else {
                    if(window.ethereum && !window.ethereum.selectedAddress){
                        setButtonText(CONNECT_TEXT);
                        setConnected(false);
                    }
                    else if (window.ethereum && window.ethereum.chainId !== rootstore.CHAIN_ID)
                    {
                        setButtonText(SWITCH_NETWORK);
                        setConnected(false);
                    }
                }
            }
        }, [textchange, props.switchNetwork]);


        React.useEffect(() => {
            setInterval(() => {
                if (MetaMaskOnboarding.isMetaMaskInstalled()) {
                    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                    ethersProvider.listAccounts().then(function (accounts,err) {
                        if (err != null) console.error("An error occurred: " + err);
                        else if (accounts.length === 0) {

                            setTextchange("not_connected")
                        }
                        else {

                            setTextchange("connected")
                        }
                    });
                }
            }, 3000);
        }, []);

        async function addChain(){
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{ chainName: rootstore.CHAIN_ID === "0x507" ?'Moonbase Alpha' : "Moonriver", chainId: rootstore.CHAIN_ID, rpcUrls: rootstore.CHAIN_ID === "0x507" ?['https://rpc.api.moonbase.moonbeam.network']:['https://rpc.api.moonriver.moonbeam.network'], blockExplorerUrls: rootstore.CHAIN_ID === "0x505" ? ['https://moonriver.moonscan.io/'] : ['https://moonbase.moonscan.io/'], iconUrls: [''] }],
            });
        }

        const handleClick = async () => {
            if (MetaMaskOnboarding.isMetaMaskInstalled() && (typeof window !== 'undefined')) {
                const userId = session?.user?._id ? session?.user?._id : null
                //COMMENTING THE CHECK FOR SESSION
                // if (!userId) {
                //     throw new Error("Not logged in");
                // }
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: rootstore.CHAIN_ID }],
                    });

                } catch (switchError) {
                    // This error code indicates that the chain has not been added to MetaMask.
                    if (switchError.code === 4902 || switchError.code === -32603) {
                        try {
                            await addChain();
                        } catch (addError) {
                            // handle "add" error
                        }
                    }
                    // handle other "switch" errors
                }

                await window.ethereum
                    .request({
                        method: 'eth_requestAccounts',

                    })
                    .then((newAccounts) => handleChange(newAccounts))
                //props.setShow(false)
                props.setSwitchButtonVisible && props.setSwitchButtonVisible(false)
                props.setShowOverlay && props.setShowOverlay(false)
                

            }
        };

        // const disconnectMetaMask = async () => {
        //     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        //         await window.ethereum
        //             .request({
        //                 method: 'wallet_requestPermissions', params: [
        //                     {
        //                         eth_accounts: {}
        //                     }
        //                 ]
        //             })
        //     }
        // };


        const handleChange = async (accounts) => {
            runInAction(() => {
                rootstore.metamaskConnected = true    // sets the auth user variable
            })
            setAccounts(accounts)
            try {
               // props.setShow(false)
                props.setSwitchButtonVisible && props.setSwitchButtonVisible(false)
                props.setShowOverlay && props.setShowOverlay(false)
            } catch (err) {
                console.log(err);
            }
            try {
                const userId = session?.user?._id;
                if (userId) {
                    try{
                        await rootstore.createWallet(accounts[0], userId)
                    }catch(err){
                        if(err.message === "Wallet is already attached to an account"){
                            rootstore.errMessage = "Error: This wallet is already attach to an account";
                        }
                    }

                }
            }
            catch (err) {
                console.log(err)
            }
            //window.location.reload()

        }
        //add this back to the BtnOnboarding for enabling metamask
        //onClick={handleClick}
        //disabled={session?.user?false:true} onClick={session?.user?handleClick:null}
        //disabled={session?.user ? false : true}
        return (
            <>
                <BtnOnboarding  onClick={handleClick}>
                    <Icon height="30px" width="30px" name={MataMask} />
                    <BtnText>{buttonText}</BtnText>
                </BtnOnboarding>
            </>
        );
    }
));