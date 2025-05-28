import React, { useState, useEffect } from "react";
import {
  ButtonWrapper,
  BidContainer,
  TxtCurrentBid,
  ImgPreview,
  NewSubBox,
  OverlayContainer,
  TxtBid,
  TopContainer,
  BottomContainer
} from "../AcceptBid/AcceptBid.elements";
import { TxtCurrentBidSmall, } from '../MakeOffer/MakeOffer.elements';
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { COLORS, SPACING } from "../../styles/Styling.js";
import { ethers } from 'ethers';
import Close from "../../public/icons/close.svg"
import { BtnClose } from '../LoginMain/Login.elements';
import { useStore } from '../../stores/RootStore';
import ScaleLoader from "react-spinners/ScaleLoader";


const OfferConfirmation = (props) => {

  let withoutDecimals = props.details.bid * 1000;
  let BNBidPrice = ethers.utils.parseEther(withoutDecimals.toString());
  BNBidPrice = BNBidPrice.div(1000);
  let bidPrice = ethers.utils.formatEther(BNBidPrice);
  let name = props.details.name;
  let contractId = props.details.tokenId;

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
          <TxtBid> {"Confirm offer"}</TxtBid>
          <BidContainer>
            <NewSubBox between={true}>
              <TxtCurrentBid>{"Item"}</TxtCurrentBid>
              <TxtCurrentBid>{"SubTotal"}</TxtCurrentBid>
            </NewSubBox>
            <NewSubBox between={true}>
              <NewSubBox>
                <ImgPreview
                  src={props.details.image}
                />
                <TxtCurrentBid style={{ paddingLeft: SPACING.medium }}>{`${name} #${contractId}`}</TxtCurrentBid>
              </NewSubBox>
              <div style={{ flexDirection: "column" }}>
                <NewSubBox>
                  <Icon height="auto" width="24px" name={Moonriver} />
                  <TxtCurrentBid style={{ paddingLeft: SPACING.medium }}>{bidPrice}</TxtCurrentBid>
                </NewSubBox>
                <TxtCurrentBidSmall style={{ alignSelf: "flex-end" }}>
                  {""}
                </TxtCurrentBidSmall>
              </div>
            </NewSubBox>
          </BidContainer >
        </TopContainer>
        <BottomContainer>
          <ButtonWrapper>
            <Button
              text={"Accept"}
              onClick={() => { props.onConfirm(props.details.listingId, props.details.bid) }}
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
export default OfferConfirmation;
