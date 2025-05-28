import React, { useState } from "react";
import fail from "../../public/icons/transaction_failed.svg"
import Close from "../../public/icons/close.svg"
import { COLORS, SPACING, FONT_SIZE } from "../../styles/Styling.js";
import { BtnClose } from '../LoginMain/Login.elements';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion, AnimatePresence } from "framer-motion";
import {
    Icon,
    Button
} from "../";
import { useStore } from '../../stores/RootStore';
import styled from 'styled-components';

/*
PROPS:
closeOverlay: A function that is called to handle closing the overlay from its parent component

*/

const TxFailedOverlay = (props) => {
    let rootstore = useStore();
    let failedTxMessage = rootstore.failedTxMessage;
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
                <div style={{ position: 'absolute', top: 30, right: 40, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black20, borderRadius: 5 }}>
                    <BtnClose onClick={() => { props.closeOverlay() }}>
                        <Icon
                            strokeWidth="3"
                            height="auto"
                            width="24px"
                            name={Close}
                            strokeColor={({ theme }) => theme.iconColor.color}
                        />
                    </BtnClose>
                </div>
                <TopContainer>
                    <TxtBid> {"Transaction Failed"}</TxtBid>
                    <Icon
                        height="auto"
                        width="220px"
                        name={fail}
                        className="MarginBottomMedium"
                    />
                    <p style={{ fontSize: 18, textAlign: "center", paddingBottom: SPACING.large }}>{failedTxMessage}</p>
                    {true ?
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
                                    <div style={{ maxWidth: 200, overflow: 'hidden', fontSize: 14, padding: 12 }}>{"2135456406543"}</div>
                                    <CopyBox >{"Copy"}</CopyBox>
                                </motion.div>
                            </CopyToClipboard>
                        </HashContainer>
                        : null
                    }
                </TopContainer>
                <BottomContainer>
                    <Button
                        text={'TRY AGAIN'}
                        onClick={() => { props.closeOverlay() }}
                        isIcon={false}
                        color={COLORS.purple}
                        colorText={COLORS.white}
                        size={"medium"}
                        width={200}
                        className={""}
                    />
                </BottomContainer>

            </OverlayContainer>
        </div>
    )
}
export default TxFailedOverlay

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
