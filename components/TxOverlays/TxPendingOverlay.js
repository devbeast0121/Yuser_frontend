import React, { useState } from "react";
import success from "../../public/icons/success.svg"
import Close from "../../public/icons/close.svg"
import { COLORS, SPACING, FONT_SIZE } from "../../styles/Styling.js";
import { BtnClose } from '../LoginMain/Login.elements';
import {
  Icon,
  Button
} from "../";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useStore } from '../../stores/RootStore';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion, AnimatePresence } from "framer-motion";
import subscribeToReloadWarning from "./subscribeReloadWarning";
import styled from 'styled-components';
import Transaction from "../../public/icons/transaction_violet.svg"
// /*
//   subscribeToReloadWarning
//   William Doyle
//   March 2nd 2022
//   To be called in a useEffect hook like this:
//     React.useEffect(subscribeToReloadWarning, [])

//   The effect of this function is to subscribe to a warning about leaving the page when the component calling this function from useEffect is mounted.
//   It returns a function that unsubscribes from the warning.
// */
// function subscribeToReloadWarning() {
//   if (typeof window === "undefined") return;

//   console.log(`👂 Begin listening for 'beforeunload' event`);

//   const warnUserWhenTheyTryToLeave = e => {
//     e.preventDefault();
//     e.returnValue = "";
//   }

//   window.addEventListener("beforeunload", warnUserWhenTheyTryToLeave);

//   return () => {
//     console.log(`🛑👂 Stop listening for 'beforeunload' event`);
//     window.removeEventListener("beforeunload", warnUserWhenTheyTryToLeave);
//   }
// }

const TxPendingOverlay = (props) => {
  let rootstore = useStore();

  React.useEffect(subscribeToReloadWarning, []); // when Tx Pending Overlay is mounted, subscribe to a warning about leaving the page

  return (
    <div
    className="wallet-modal-button-container"
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
       {/*} <div style={{ position: 'absolute', top: 30, right: 40, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black20, borderRadius: 5 }}>
          <BtnClose onClick={() => { props.closeOverlay() }}>
            <Icon
              strokeWidth="3"
              height="auto"
              width="24px"
              name={Close}
              strokeColor={({ theme }) => theme.iconColor.color}
            />
          </BtnClose>
        </div> */}
        <TopContainer>
          <TxtBid> {"Transaction Pending"}</TxtBid>
          <div style={{ position: "relative" }}>
            <Icon
              height="65px"
              width="220px"
              name={Transaction}
            />
            <div style={{ position: "absolute", zIndex: 99, top: -5, left: 90, }}>
              <ScaleLoader color={COLORS.purple} loading={true} height={70} />
            </div>
          </div>
          <TxtCurrentBid>Your transaction is now pending. <b style={{ fontSize: 18, fontFamily: "LatoBlack", }}>Please don’t close this window tab</b>. If this transaction takes longer than 10 minutes jump into our discord and ask for help. {rootstore.transactionHash && "You may be asked for the following hashcode"}</TxtCurrentBid>
          {rootstore.transactionHash ?
            <HashContainer>
              <div style={{ padding: SPACING.medium }}>{"hash:"}</div>
              <CopyToClipboard
                text={rootstore.transactionHash}
              >
                <motion.div
                  style={{ borderRadius: 5, overflow: 'hidden', borderStyle: 'solid', borderColor: COLORS.greyMedium, borderWidth: 1, }}
                  key="flexOne"
                  className="flexOne"
                  whileTap={{ scale: 0.96, }}
                >
                  <div style={{ maxWidth: 200, overflow: 'hidden', fontSize: 14, padding: 12 }}>{rootstore.transactionHash}</div>
                  <CopyBox >{"Copy"}</CopyBox>
                </motion.div>
              </CopyToClipboard>
            </HashContainer>
            : null
          }
        </TopContainer>
        <BottomContainer>
          <Button
            text={'PLEASE WAIT'}
            isIcon={false}
            color={COLORS.purple}
            colorText={COLORS.white}
            size={"medium"}
            width={"200"}
            className={""}
            disabled={true}
          />
        </BottomContainer>
      </OverlayContainer>
    </div>

  )
}
export default TxPendingOverlay



const OverlayContainer = styled.div`
    flex-direction: column;
    width: 530px;
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

const HashContainer = styled.div`
    margin-bottom: ${SPACING.large}px;
`;

const CopyBox = styled.div`
   border-left-style: solid;
   border-left-color: ${COLORS.greyMedium}; 
   border-left-width: 1px; 
   font-size: 14px; 
   padding: ${SPACING.medium}px;
   background-color: ${props => props.theme.colorMediumDark.color};
`;