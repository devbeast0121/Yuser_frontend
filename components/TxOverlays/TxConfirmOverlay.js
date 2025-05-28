import React, { useState } from "react";
import { COLORS, SPACING, FONT_SIZE } from "../../styles/Styling.js";
import { Icon } from "../";
import { useStore } from '../../stores/RootStore';
import metamaskWide from '../../public/icons/MetamaskWide.svg';
import subscribeToReloadWarning from "./subscribeReloadWarning";
import styled from 'styled-components';




const TxConfirmOverlay = (props) => {
    let rootstore = useStore();

    React.useEffect(subscribeToReloadWarning, []); // when Tx Pending Overlay is mounted, subscribe to a warning about leaving the page

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
            <OverlayContainer>
                <TopContainer>
                    <TxtBid>{"Confirm your Transaction"}</TxtBid>
                    <Icon
                        height="65px"
                        width="220px"
                        name={metamaskWide}
                    />
                    <TxtCurrentBid>{"To continue you must first confirm your transaction in Metamask"}</TxtCurrentBid>
                </TopContainer>
            </OverlayContainer>
        </div>
    )
}
export default TxConfirmOverlay


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