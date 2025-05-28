import React, { useState } from "react";
import {
  SubBox,
  PriceInput,
  IconWrap,
  ButtonWrapper,
  OverlayContainer,
  TxtCurrentBid,
  PriceInputIIcon,
  TextWMOVR,
  BtnClose,
  MOVRBalance,
  BalanceContainer,
  TopContainer,
  TxtBid,
  BottomContainer
} from "./WrapMOVR.elements";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-clock/dist/Clock.css";
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import Icon from "../Icon/Icon";
import Close from "../../public/icons/close.svg"
import Button from "../Button/Button";
import { COLORS, SPACING } from "../../styles/Styling.js";
import Arrow from "../../public/icons/rightArrow.svg"
const WrapMOVR = (props) => {

  const [priceError, setPriceError] = useState(false);
  const [priceValue, setPriceValue] = useState(0.000);

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
    if (parseFloat(newPriceValue).toFixed(3) > parseFloat(props.movrBalance)) {
      setPriceError(true)
      error = true;
    }
    setPriceValue(newPriceValue);
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
          <TxtBid> {"Wrap MOVR"}</TxtBid>
          <SubBox between={true}>
            <PriceInputIIcon>
              <IconWrap>
                <Icon height="auto" width="24px" name={Moonriver} />
                <TextWMOVR>MOVR</TextWMOVR>
              </IconWrap>
              <PriceInput
                type="numbers"
                value={priceValue}
                onChange={handlePriceChange}
              />
            </PriceInputIIcon>
            <div style={{ paddingLeft: SPACING.medium, paddingRight: SPACING.medium }}>
              <Icon 
                height="auto"
                width="24px" 
                name={Arrow} 
                strokeColor={({ theme }) => theme.iconColor.color}
                color={({ theme }) => theme.iconColor.color}
               />
            </div>
            <PriceInputIIcon>
              <IconWrap>
                <Icon height="auto" width="24px" name={Moonriver} />
                <TextWMOVR>WMOVR</TextWMOVR>
              </IconWrap>
              <PriceInput
                type="numbers"
                value={priceValue}
                readOnly={true}
              />
            </PriceInputIIcon>
          </SubBox>
          <TxtCurrentBid>
            {
              "Select the amount of MOVR you would like to convert to WMOVR."
            }
          </TxtCurrentBid>
        </TopContainer>
        <BottomContainer>
         {/*} <BalanceContainer style={{ marginTop: SPACING.medium }}>
            {Number.parseFloat(props.movrBalance) >= Number.parseFloat(priceValue).toFixed(3) ?
              <MOVRBalance>{"MOVR Balance: " + Number.parseFloat(props.movrBalance).toFixed(3)}</MOVRBalance>
              : <MOVRBalance style={{ color: "red" }}>{"MOVR Balance: " + Number.parseFloat(props.movrBalance).toFixed(3)}</MOVRBalance>
            }
          </BalanceContainer>*/}
          <ButtonWrapper>
            <Button
              text={"Confirm"}
              onClick={() => props.onWrap(priceValue)}
              color={COLORS.purple}
              colorText={COLORS.white}
              size={"medium"}
              disabled={priceError}
              className={"FullWidth"}
              padding={true}
            />
          </ButtonWrapper>
        </BottomContainer>
      </OverlayContainer>
    </div >
  );
};
export default WrapMOVR;
