import React, { useState } from 'react'
import Icon from "../Icon/Icon";
import Minting from "../../public/icons/minting.svg";
import { COLORS, SPACING } from '../../styles/Styling.js';
import styled from 'styled-components';

const NFTLabel = (props) => {  // see  PostMedia 

    const statusBid = props.position == "bid" ? props.status == "outbid" ? "OUTBID" : "NEW BID" : null
    const statusAuction = props.position == "auction" ? props.status == "won" ? "Auction won" : props.status == "end" ? "Auction ended" : "63 days left" : null
    const backgroundColor = props.status == "won" ? COLORS.green : props.status == "end" ? COLORS.blackDarkMedium : COLORS.red


    function renderLabelState(position) {
        switch (position) {
            case "minting":
                return (
                    <StatusContainer style={{ backgroundColor: COLORS.orange }}>
                        <p style={{ paddingRight: SPACING.small, color: COLORS.white }}>{"MINTING"}</p>
                        <Icon width="auto" height="20px" name={Minting} />
                    </StatusContainer >
                );
            case "auction":
                return (
                    <StatusContainer style={{ backgroundColor: backgroundColor }} >
                        <p style={{color: COLORS.white}}>{statusAuction}</p>
                    </StatusContainer >
                );
            case "bid":
                return (
                    <BidContainer >
                        <p style={{ color: COLORS.white, fontFamily: "LatoBlack" }}>{statusBid}</p>
                    </BidContainer >
                );
            default:
                return null;
        }
    }


    return (
        <>
            {renderLabelState(props.position)}
        </>
    )
}

export default NFTLabel

const StatusContainer = styled.div`
    position: absolute;
	top: 0px; 
    left: 0px;
	height: 36px;
	display: flex;
    border-radius: 0px 0px 10px 0px;
	flex-direction: row;
	align-items: center;
	padding-right: ${SPACING.medium}px;
	padding-left: ${SPACING.medium}px;
`;

const BidContainer = styled.div`
    position: absolute;
	bottom: 0px; 
    right: 0px;
	height: 36px;
	display: flex;
	background-color: ${COLORS.yellow};
    border-radius: 10px 0px 0px 0px;
	flex-direction: row;
	align-items: center;
	padding-right: ${SPACING.medium}px;
	padding-left: ${SPACING.medium}px;
`;