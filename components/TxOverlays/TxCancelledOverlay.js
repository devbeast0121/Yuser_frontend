import React, { useState } from "react";
import { COLORS, SPACING, FONT_SIZE } from "../../styles/Styling.js";
import {
    Icon,
    Button
} from "../";
import { useStore } from '../../stores/RootStore';
import cancelled from '../../public/icons/Cancelled.svg';
import Close from "../../public/icons/close.svg";
import { BtnClose } from '../LoginMain/Login.elements';
import styled from 'styled-components';



/*
PROPS:
closeOverlay: A function that is called to handle closing the overlay from its parent component

*/


const TxCancelledOverlay = (props) => {
    let rootstore = useStore();
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
                    <TxtBid> {"Transaction Cancelled"}</TxtBid>
                    <Icon
                        height="65px"
                        width="220px"
                        name={cancelled}
                        className="MarginBottomMedium"
                    />
                    <TxtCurrentBid>{"You cancelled your transaction in Metamask"}</TxtCurrentBid>
                </TopContainer>
                <BottomContainer>
                    <Button
                        text={'Close'}
                        onClick={() => { props.closeOverlay() }}
                        isIcon={false}
                        color={COLORS.purple}
                        colorText={COLORS.white}
                        size={"medium"}
                        width={"200"}
                        className={""}
                    />
                </BottomContainer>
            </OverlayContainer>
        </div >

    )
}
export default TxCancelledOverlay

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