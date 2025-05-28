import React, { useState } from "react";
import { COLORS, SPACING, FONT_SIZE } from "../../styles/Styling.js";
import {
  Icon,
  Button
} from "../";
import { useStore } from '../../stores/RootStore';
import { BtnOnboarding, BtnText } from '../MetamaskOnboarding/MetamaskOnboarding.elements';
import moonriverWide from "../../public/icons/moonriverWide.svg";
import moonriver from "../../public/icons/moonriver_logo3.svg"
import styled from 'styled-components';



/*
PROPS:

*/
async function networkSwitch(rootstore) {
  rootstore.moonriverOverlayVisible = false;
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
          params: [{ chainName: rootstore.CHAIN_ID === "0x507" ? 'Moonbase Alpha' : "Moonriver", chainId: rootstore.CHAIN_ID, rpcUrls: rootstore.CHAIN_ID === "0x507" ? ['https://rpc.testnet.moonbeam.network'] : ['https://rpc.moonriver.moonbeam.network'], blockExplorerUrls: rootstore.CHAIN_ID === "0x505" ? ['https://blockscout.moonriver.moonbeam.network/'] : ['https://moonbase-blockscout.testnet.moonbeam.network/'], iconUrls: [''] }],
        });
      } catch (addError) {
      }
    }
    else {
      console.log(switchError.message);
    }

  }
}

const MetamaskOverlay = (props)=>{
    let rootstore = useStore();
    const message = props.message ? props.message : `You must switch to the ${rootstore.CHAIN_ID === "0x507" ?"Moonbase Alpha":"Moonriver"} network in Metamask to participate in the NextGems sale`
    return (
        <div
        style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: 'COLORS.black50',
        zIndex: 999999,
        justifyContent: 'center',
        alignItems: 'center',
        }}>
            <div style={{
            flexDirection: 'column',
            width: "100%",
            maxWidth: 500,
            backgroundColor: COLORS.blackDarkMedium,
            paddingTop: 24,
            paddingBottom: 24,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 12,
            marginRight: 12,
            }}>
                <div style={{
                paddingLeft: 24,
                paddingRight: 24,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
                <div style={{ marginTop: 12, marginBottom: 10, fontFamily: 'LatoBlack', fontSize: 26, textAlign: "center" }}>Switch to {rootstore.CHAIN_ID === "0x507"?"Moonbase Alpha":"Moonriver"}</div>
                <Icon
                  height="65px"
                  width="220px"
                  name={moonriverWide}
                />
                <p style={{ marginBottom: 24, fontSize: 18, textAlign: "center" }}>{message}</p>
              </div>
              <div>
                  <BtnOnboarding onClick={()=>networkSwitch(rootstore)}>
                    <Icon height="60px"
                      width="60px"
                      name={moonriver}
                      className="MarginBottomMedium" />
                    <BtnText>SWITCH TO {rootstore.CHAIN_ID === "0x507"? "MOONBASE ALPHA":"MOONRIVER"}</BtnText>
                  </BtnOnboarding>

                </div>
            </div>
        </div>
        
    )
}
export default MetamaskOverlay

const OverlayContainer = styled.div`
    flex-direction: column;
    width: 670px;
    background: ${({ theme }) => theme.colorGrey.color};
    padding-top: ${SPACING.large}px;
    padding-bottom: ${SPACING.large}px;
    border-radius: 15px;
    position:relative;  

    @media screen and (max-width: 700px){
        width: 400px;
    }

    @media screen and (max-width: 480px){
       margin-left: 0px;
       margin-right: 0px;
    
    }
`;

const TxtBid = styled.p`
    font-size: ${FONT_SIZE.extraLarge}px;
    padding-left: ${SPACING.large}px;
    padding-top: ${SPACING.small}px;
    margin-bottom: ${SPACING.large}px;
    font-family: 'LatoBlack';
    text-align: center;
`;

const TopContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 480px){
      //  padding-left: ${SPACING.medium}px;
       // padding-right: ${SPACING.medium}px; 
    }     
`;

const BottomContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    border-top: 1px solid${({ theme }) => theme.borderColor.color};
    padding-left: ${SPACING.extraLarge}px;
    padding-right: ${SPACING.extraLarge}px;
    padding-top: ${SPACING.large}px;

    @media screen and (max-width: 480px){
      //  padding-left: ${SPACING.medium}px;
      //  padding-right: ${SPACING.medium}px; 
    }      
`;

const TxtCurrentBid = styled.p`
    padding-left: ${SPACING.extraLarge}px;
    padding-right: ${SPACING.extraLarge}px; 
    margin-bottom: ${SPACING.large}px;
    margin-top: ${SPACING.large}px;
    text-align: center;
`;
