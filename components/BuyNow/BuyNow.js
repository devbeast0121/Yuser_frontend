import React, { useState } from "react";
import {
  OverlayContainer,
  ButtonWrapper,
  BidContainer,
  TxtCurrentBid,
  TxtBid,
  ImgPreview,
  NewFormatSubBox,
  NewSubBox,
  ButtonContainer,
  TopContainer,
  BottomContainer
} from "./BuyNow.elements";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-clock/dist/Clock.css";
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { COLORS, SPACING } from "../../styles/Styling.js";
import Close from "../../public/icons/close.svg"
import { BtnClose } from '../LoginMain/Login.elements';
import { useStore } from "../../stores/RootStore";
import { ErrorMessageSignIn } from '../ErrorMessageSignIn/ErrorMessageSignIn';
import Checkbox from '../Form/Checkbox';


/*
PROPS:

*/
const BuyNow = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [wmovrBalance, setWmovrBalance] = useState(0);
  const rootstore = useStore();

  //console.log(Number.parseFloat(props.listingDetails.salePrice).toFixed(3));

  const onChangeChackbox = () => {
    setIsChecked(!isChecked);
  }

  function showErrorMessage() {
    rootstore.errMessage = null;
    return;
  }

  const onWrapMovr = () => {
    if (isChecked) {
      props.wrapMovr(Number.parseFloat(props.listingDetails.salePrice).toFixed(3))
      props.close()
    }
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
        minWidth: 400
      }}
    >
      {rootstore.errMessage && <ErrorMessageSignIn errorMessage={rootstore.errMessage} showErrorMessage={showErrorMessage} />}
      <OverlayContainer
      >
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
          <TxtBid> {"Buy Now"}</TxtBid>
          <BidContainer>
            <NewSubBox between={true}>
              <TxtCurrentBid titleTxt={true}>{"Item"}</TxtCurrentBid>
              <TxtCurrentBid titleTxt={true}>{"SubTotal"}</TxtCurrentBid>
            </NewSubBox>
            <NewSubBox between={true}>
              <NewSubBox>
                <ImgPreview
                  src={props.image}
                />
                <TxtCurrentBid titleTxt={true} style={{ paddingLeft: SPACING.medium }}>{`${props?.token?.metadata?.name || "Yuser Nextgems"} #${props.tokenId}`}</TxtCurrentBid>
              </NewSubBox>
              <div style={{ flexDirection: "column" }}>
                <NewSubBox>
                  <Icon height="auto" width="24px" name={Moonriver} />
                  <TxtCurrentBid style={{ paddingLeft: SPACING.medium }}>{props.listingDetails.salePrice}</TxtCurrentBid>
                </NewSubBox>
                <TxtCurrentBid style={{ alignSelf: "flex-end" }}>
                  {""}
                </TxtCurrentBid>
              </div>
            </NewSubBox>
            <NewFormatSubBox>
              <NewSubBox between={true}>
                <TxtCurrentBid titleTxt={true} style={{ marginBottom: SPACING.medium, marginTop: SPACING.small }}>{"Fees"}</TxtCurrentBid>
              </NewSubBox>
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
              <TxtCurrentBid titleTxt={true}>{"Total"}</TxtCurrentBid>
              <NewSubBox>
                <Icon height="auto" width="24px" name={Moonriver} />
                <TxtCurrentBid style={{ paddingLeft: SPACING.medium }}>{props.listingDetails.salePrice}</TxtCurrentBid>
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
          {/*<ButtonContainer style={{ marginTop: SPACING.medium }}>
            {
              Number.parseFloat(props.balance) >= Number.parseFloat(props.listingDetails.salePrice) ?
                <TxtCurrentBid>{"WMOVR Balance: " + Number.parseFloat(props.balance).toFixed(3)} </TxtCurrentBid> :
                <TxtCurrentBid style={{ color: "red" }}>{"WMOVR Balance: " + Number.parseFloat(props.balance).toFixed(3)}</TxtCurrentBid>
            }
          </ButtonContainer>*/}
          <ButtonWrapper>
            <Button
              text={"Wrap Movr"}
              onClick={onWrapMovr}
              color={COLORS.purple}
              colorText={COLORS.white}
              size={"medium"}
              className={"FullWidth"}
              padding={true}
            />
            <div style={{ width: 20, height: 10 }}></div>
            <Button
              text={"Confirm"}
              onClick={() => props.buyNow(props.listingDetails.listingId, props.listingDetails.salePrice)}
              color={COLORS.purple}
              colorText={COLORS.white}
              size={"medium"}
              className={"FullWidth"}
              padding={true}
              disabled={!isChecked || Number.parseFloat(props.balance) < Number.parseFloat(props.listingDetails.salePrice)}
            />
          </ButtonWrapper>
        </BottomContainer>
      </OverlayContainer >
    </div >
  );
};
export default BuyNow;
