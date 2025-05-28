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
import { ButtonContainer, TxtCurrentBidSmall } from '../MakeOffer/MakeOffer.elements'
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { COLORS, SPACING } from "../../styles/Styling.js";
import { ethers } from 'ethers';
import Close from "../../public/icons/close.svg"
import { BtnClose } from '../LoginMain/Login.elements';
import { useStore } from '../../stores/RootStore';
import ScaleLoader from "react-spinners/ScaleLoader";
import Checkbox from '../Form/Checkbox';


const ListingConfirmation = (props) => {

  console.log(props);
  let withoutDecimals = props.details.price * 1000;
  let BNBidPrice = ethers.utils.parseEther(withoutDecimals.toString());
  BNBidPrice = BNBidPrice.div(1000);
  let bidPrice = ethers.utils.formatEther(BNBidPrice);
  bidPrice = parseFloat(bidPrice).toFixed(3);
  const rootstore = useStore();
  let minusFees = rootstore.getNFTCostMinusFees(8, props.details.price);
  let price = props.details.price;
  let date = props.details.date;
  let token = props.details.token;
  let tokenContractAddress = props.details.tokenContractAddress;
  let name = props.details.name;
  let type = date === 0 ? "Fixed Price" : "Open Auction";
  let fullDate = new Date(date);
  const [TOSClicked, setTOSClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  function handleClick(event) {
    setTOSClicked(event.target.checked);
  }

  const onChangeChackbox = () => {
    let checked = !isChecked;
    setIsChecked(checked);
    setTOSClicked(checked);
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
                <TxtCurrentBid style={{ paddingLeft: SPACING.medium }}>{`${name} #${token}`}</TxtCurrentBid>
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
            <NewSubBox between={true}>
              <TxtCurrentBid>{"Listing Type"}</TxtCurrentBid>
              {date !== 0 && <TxtCurrentBid>{"Auction End Date"}</TxtCurrentBid>}
            </NewSubBox>
            <NewSubBox between={true}>
              <TxtCurrentBidSmall>{type}</TxtCurrentBidSmall>
              {date !== 0 && <TxtCurrentBidSmall>{fullDate.toLocaleString()}</TxtCurrentBidSmall>}
            </NewSubBox>
            <TxtCurrentBid style={{textAlign: "left", paddingBottom: SPACING.medium}}>{"Fees"}</TxtCurrentBid>
            <NewSubBox between={true}>
              <TxtCurrentBidSmall property>
                {"Service fee"}
              </TxtCurrentBidSmall>
              <TxtCurrentBidSmall property align={true}>
                {"3%"}
              </TxtCurrentBidSmall>
            </NewSubBox>
            <NewSubBox between={true}>
              <TxtCurrentBidSmall property>
                {"Creator royalty"}
              </TxtCurrentBidSmall>
              <TxtCurrentBidSmall property align={true}>
                {"5%"}
              </TxtCurrentBidSmall>
            </NewSubBox>
            <NewSubBox between={true}>
              <TxtCurrentBid>{date === 0 ? "Total Earnings" : "Minimum Earnings"}</TxtCurrentBid>
              <NewSubBox>
                <Icon height="auto" width="24px" name={Moonriver} />
                <TxtCurrentBid style={{ paddingLeft: SPACING.medium }}>{minusFees}</TxtCurrentBid>
              </NewSubBox>
            </NewSubBox>
            <ButtonContainer>
              <Checkbox
                checked={isChecked}
                handleClick={onChangeChackbox}
              />
              <TxtCurrentBid style={{ paddingRight: 3, paddingTop: 13 }}>
                {"By checking this box you agree to "}
              </TxtCurrentBid>
              <TxtCurrentBid style={{ textDecorationLine: 'underline', paddingTop: 13 }} onClick={() => typeof window !== "undefined" && window.open("https://yuser.gitbook.io/yuser-network/yuser/terms-and-conditions")}>
                {" REBL’s terms and conditions"}
              </TxtCurrentBid>
            </ButtonContainer>
          </BidContainer>
        </TopContainer>
        <BottomContainer>
          <ButtonWrapper>
            <Button
              text={"Accept"}
              onClick={() => { props.onConfirm(price, date, token, tokenContractAddress) }}
              color={COLORS.purple}
              colorText={COLORS.white}
              size={"medium"}
              disabled={!TOSClicked}
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
export default ListingConfirmation;
