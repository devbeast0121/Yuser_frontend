import React, { useState } from "react";
import {
  PriceInput,
  IconWrap,
  ButtonWrapper,
  TxtCurrentBid,
  ButtonContainer,
  BidContainer,
  PriceInputIIcon,
  TextWMOVR,
  OverlayContainer,
  TopContainer,
  TxtBid,
  BottomContainer
} from "./MakeOffer.elements";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-clock/dist/Clock.css";
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { COLORS, SPACING } from "../../styles/Styling.js";
import Close from "../../public/icons/close.svg"
import { BtnClose } from '../LoginMain/Login.elements';
import { ErrorMessageSignIn } from '../ErrorMessageSignIn/ErrorMessageSignIn';
import { useStore } from "../../stores/RootStore";
import Checkbox from '../Form/Checkbox';


const MakeOffer = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [priceValue, setPriceValue] = useState(0);
  const [priceError, setPriceError] = useState(true);
  const [TOSClicked, setTOSClicked] = useState(false);
  const rootstore = useStore();

  function handlePriceChange(event) {
    setPriceError(false);
    let newPriceValue = event.target.value;
    let decimals = newPriceValue.split(".")[1];
    let numDecimals = decimals ? decimals.length : 0;
    let error = false;
    if (parseFloat(newPriceValue).toFixed(numDecimals).toString() !== newPriceValue.toString()) {
      setPriceError(true);
      error = true;
    }
    if (parseFloat(newPriceValue).toFixed(3).toString() === "0.000") {
      setPriceError(true);
      error = true;
    }
    if (decimals && decimals.length > 3) {
      setPriceError(true);
      error = true;

    }
    if (!error && parseFloat(newPriceValue) < parseFloat(props.listingDetails.salePrice)) {
      setPriceError(true);
      error = true;

    }
    if (!error && parseFloat(newPriceValue) === parseFloat(props.listingDetails.highestBid)) {
      setPriceError(true)
      error = true;

    }
    setPriceValue(newPriceValue);
  }

  function buttonDisabled() {
    if (priceError) {
      return true;
    }
    if (!TOSClicked) {
      return true;
    }
    if (parseFloat(priceValue).toFixed(3) === "0.000") {
      return true;
    }
    if (Number.parseFloat(props.balance) < Number.parseFloat(priceValue)) {
      return true;
    }
    return false;
  }

  const onChangeChackbox = () => {
    let checked = !isChecked;
    setIsChecked(checked);
    setTOSClicked(checked);
  }

  function showErrorMessage() {
    rootstore.errMessage = null;
  }

  const wrapMOVR = () => {
    if (isChecked) {
      props.wrapMovr(Number.parseFloat(priceValue).toFixed(3));
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
      }}
    >
      <OverlayContainer>
        {rootstore.errMessage && <ErrorMessageSignIn errorMessage={rootstore.errMessage} showErrorMessage={showErrorMessage} />}
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
          <TxtBid> {"Make an Offer"}</TxtBid>
          <PriceInputIIcon>
            <IconWrap>
              <Icon height="auto" width="24px" name={Moonriver} />
              <TextWMOVR>WMOVR</TextWMOVR>
            </IconWrap>
            <PriceInput
              type="numbers"
              value={priceValue}
              onChange={handlePriceChange}
              priceError={priceError}
            />
          </PriceInputIIcon>
          <TxtCurrentBid titleTxt={true}>
            {
              "Make an offer in WMOVR. If you need to you can convert your MOVR using the Wrap MOVR button below"
            }
          </TxtCurrentBid>
          <BidContainer>
            <ButtonContainer>
              <Checkbox
                checked={isChecked}
                handleClick={onChangeChackbox}
              />

              <TxtCurrentBid style={{ paddingRight: 3, paddingTop: 13 }}>
                {"By checking this box you agree to "}
              </TxtCurrentBid>
              <TxtCurrentBid style={{ textDecorationLine: 'underline', paddingTop: 13 }} onClick={() => typeof window !== "undefined" && window.open("https://yuser.gitbook.io/yuser-network/yuser/terms-and-conditions")}>
                {" Yuser’s terms and conditions"}
              </TxtCurrentBid>
            </ButtonContainer>
          </BidContainer>
        </TopContainer>
        <BottomContainer>
          {/*} <ButtonContainer style={{ marginTop: SPACING.medium }}>
            {
              (Number.parseFloat(props.balance) >= Number.parseFloat(props.listingDetails.salePrice) && Number.parseFloat(props.balance) >= Number.parseFloat(priceValue).toFixed(3)) ?
                <TxtCurrentBid>{"WMOVR Balance: " + Number.parseFloat(props.balance).toFixed(3)} </TxtCurrentBid> :
                <TxtCurrentBid style={{ color: "red" }}>{"WMOVR Balance: " + Number.parseFloat(props.balance).toFixed(3)}</TxtCurrentBid>
            }
          </ButtonContainer> */}
          <ButtonWrapper>
            <Button
              text={"Wrap Movr"}
              onClick={wrapMOVR}
              color={COLORS.purple}
              colorText={COLORS.white}
              size={"medium"}
              className={"FullWidth"}
              padding={true}
            />
            <div style={{ width: 20, height: 10 }}></div>
            <Button
              text={"Make a Bid"}
              onClick={() => props.makeOffer(props.listingDetails.listingId, Number.parseFloat(priceValue).toFixed(3))}
              color={COLORS.purple}
              colorText={COLORS.white}
              //width={"50%"}
              className={"FullWidth"}
              size={"medium"}
              disabled={buttonDisabled()}
            />
          </ButtonWrapper>
        </BottomContainer>
      </OverlayContainer>
    </div>
  );
};
export default MakeOffer;
