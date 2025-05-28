import React, { useState } from "react";
import {
  OverlayContainer,
  ButtonWrapper,
  BidContainer,
  TxtCurrentBid,
  TxtBid,
  TopContainer,
  BottomContainer,
  ImgPreview,
  NewFormatSubBox,
  NewSubBox,
} from "./AcceptBid.elements";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-clock/dist/Clock.css";
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { COLORS, SPACING } from "../../styles/Styling.js";
import { ethers } from 'ethers';
import Close from "../../public/icons/close.svg"
import { BtnClose } from '../LoginMain/Login.elements';
import { useStore } from '../../stores/RootStore';



const AcceptBid = (props) => {
  const rootstore = useStore();
  // let price = props.listingDetails.settlePrice;
  // let bigNumPrice = ethers.utils.parseEther(price.toString());
  // let creatorFee = bigNumPrice.mul(5).div(100);
  // let serviceFee = bigNumPrice.mul(3).div(100);
  // let minusFees = bigNumPrice.sub(serviceFee);
  // minusFees = minusFees.sub(creatorFee);
  // minusFees = ethers.utils.formatEther(minusFees);
  // console.log(minusFees);
  let tokenName = props?.token?.metadata?.name || ""
  let subtotal = 0;
  let minusFees = 0;
  if (Number(props.listingDetails.highestBid).toString() !== "0") {
    subtotal = Number.parseFloat(props.listingDetails.salePrice).toFixed(3);
    minusFees = rootstore.getNFTCostMinusFees(8, props.listingDetails.salePrice);
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: "COLORS.black50",
        zIndex: 999999,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OverlayContainer>
        <div style={{ position: 'absolute', top: 30, right: 40, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black20, borderRadius: 5 }}>
          <BtnClose onClick={() => { props.close() }}>
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
          <TxtBid> {subtotal !== 0 ? "Accept Bid" : "Cancel Auction"}</TxtBid>

          <BidContainer >
            <NewSubBox between={true}>
              <TxtCurrentBid titleTxt={true}>{"Item"}</TxtCurrentBid>
              <TxtCurrentBid titleTxt={true}>{"SubTotal"}</TxtCurrentBid>
            </NewSubBox>
            <NewSubBox between={true}>
              <NewSubBox>
                <ImgPreview
                  src={props.image}
                />
                <TxtCurrentBid titleTxt={true} style={{ paddingLeft: SPACING.medium }}>{`${tokenName} #${props.tokenId}`}</TxtCurrentBid>
              </NewSubBox>
              <div style={{ flexDirection: "column" }}>
                <NewSubBox>
                  <Icon height="auto" width="24px" name={Moonriver} />
                  <TxtCurrentBid titleTxt={true} style={{ paddingLeft: SPACING.medium }}>{subtotal}</TxtCurrentBid>
                </NewSubBox>
                <TxtCurrentBid style={{ alignSelf: "flex-end" }}>
                  {""}
                </TxtCurrentBid>
              </div>
            </NewSubBox>
            <NewFormatSubBox>
              <NewSubBox between={true}>
                <TxtCurrentBid >
                  {"Service fee"}
                </TxtCurrentBid>
                <TxtCurrentBid >
                  {"3%"}
                </TxtCurrentBid>
              </NewSubBox>
              <NewSubBox between={true}>
                <TxtCurrentBid >
                  {"Creator royalty"}
                </TxtCurrentBid>
                <TxtCurrentBid >
                  {"5%"}
                </TxtCurrentBid>
              </NewSubBox>
            </NewFormatSubBox>
            <NewSubBox between={true}>
              <TxtCurrentBid titleTxt={true}>{"Total Earnings"}</TxtCurrentBid>
              <NewSubBox>
                <Icon height="auto" width="24px" name={Moonriver} />
                <TxtCurrentBid titleTxt={true} style={{ paddingLeft: SPACING.medium }}>{minusFees}</TxtCurrentBid>
              </NewSubBox>
            </NewSubBox>
          </BidContainer>
        </TopContainer>
        <BottomContainer>
          <ButtonWrapper>
            <Button
              text={"Accept"}
              onClick={() => { props.onSettle(props.listingDetails.listingId) }}
              color={COLORS.purple}
              colorText={COLORS.white}
              size={"medium"}
              className={"FullWidth"}
              padding={true}
            />
          </ButtonWrapper>
          {/* <PriceBox/> */}
        </BottomContainer>
      </OverlayContainer>
    </div>
  );
};
export default AcceptBid;
