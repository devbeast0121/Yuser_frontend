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
} from "./PostReportOverlay.elements";

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
import { inject, observer } from "mobx-react";


export default inject("store")(
    observer(function PostReportOverlay(props) {
  const rootstore = useStore();
  // let price = props.listingDetails.settlePrice;
  // let bigNumPrice = ethers.utils.parseEther(price.toString());
  // let creatorFee = bigNumPrice.mul(5).div(100);
  // let serviceFee = bigNumPrice.mul(3).div(100);
  // let minusFees = bigNumPrice.sub(serviceFee);
  // minusFees = minusFees.sub(creatorFee);
  // minusFees = ethers.utils.formatEther(minusFees);
  // console.log(minusFees);

  const closeModal=()=>{
    props.setReportOption(null);
    props.setShowReportOverlay(false)
  }
  async function reportPost(){
    if(props.reportOption==="Offensive" || props.reportOption==="Copyright Abuse"){
      //console.log("inside loop 1",props.reportOption,props.post._id)
      await rootstore.reportPost(props.post._id,props.reportOption);
      closeModal();
    }
    else{
      //console.log("inside loop 2",props.reportOption,props.post._id)
      await rootstore.reportPost(props.post._id,'Cheating')
      closeModal();
    }
    props.showAppMessage(true, "inform", "Your report has been sent.")
  }
  
  //shadow10
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
          <BtnClose onClick={ closeModal }>
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
           Are you sure you would like to report this post as {props.reportOption} ?
           <BidContainer>
            You should only report a post if you believe it violates our Terms & Conditions
           </BidContainer>
         
        </TopContainer>
        <BottomContainer>
            
          <ButtonWrapper>
            <Button
              text={"Report Anyway"}
              onClick={reportPost}
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
}
    ))
