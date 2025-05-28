import React, { useState } from "react";
import {
  OverlayContainer,
  FormatSubBox,
  TopContainer,
  SubBox,
  PriceInputBox,
  PriceInput,
  DateTimeBox,
  IconWrap,
  BottomContainer,
  ButtonWrapper,
  BidContainer,
  TxtCurrentBid,
  TxtBid,
  PriceInputIIcon,
} from "./ListForSale.elements";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-clock/dist/Clock.css";
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { COLORS, SPACING } from "../../styles/Styling.js";
import Close from "../../public/icons/close.svg"
import { BtnClose } from '../LoginMain/Login.elements';
import { useStore } from '../../stores/RootStore';


const ListForSale = (props) => {
  const [dateValue, setDateValue] = useState(0);
  const [priceValue, setPriceValue] = useState(null);
  const [auctionType, setAuctionType] = useState("fixed");
  const [priceError, setPriceError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const currentDate = new Date();
  let minDate = new Date();
  let maxDate = new Date();
  maxDate.setDate(currentDate.getDate()+28);
  const rootstore = useStore();

  function handleDateChange(event) {
    if (event instanceof Date && typeof event.getMonth === "function") {
      setDateValue(event);
      setDateError(false);
    }
    else {
    }
  }

  function handlePriceChange(event){
      setPriceError(false);
      let newVal = event.target.value;
      let decimals = newVal.split(".")[1];
      let numDecimals = decimals ? decimals.length:0;
      if(parseFloat(newVal).toFixed(numDecimals).toString()!== newVal.toString())
      {
        //console.log("invalid value",parseFloat(newVal).toString(),newVal.toString());
        setPriceError(true);
      }
      if(decimals && decimals.length>3)
      {
        setPriceError(true);
      }
      setPriceValue(newVal);
  }

  function handleAuctionType(type) {
    setAuctionType(type);
    if (type === "bid" && dateValue === 0) {
      setDateError(true);
    }
    if (type === "fixed") {
      setDateError(false);
      setDateValue(0);
    }
  }

  function buttonDisabled() {
    if (priceError) {
      return true;
    }
    if (dateError) {
      return true;
    }
    if (!priceValue) {
      return true;
    }
    if (parseFloat(priceValue).toFixed(3) === "0.000") {
      return true;
    }
    if (dateValue === 0 && auctionType === "bid") {
      return true;
    }
    if (dateValue !== 0 && auctionType === "fixed") {
      return true;
    }
    if (auctionType === "bid" && dateValue !== 0 && (dateValue > maxDate)) {
      return true;
    }

    return false;
  }

  function onList() {
    let dateInMs = dateValue === 0 ? 0 : dateValue.getTime();
    props.onList(Number.parseFloat(priceValue).toFixed(3), dateInMs);
    props.close();
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
          <TxtBid> {"List item for sale"}</TxtBid>
          <BidContainer>
            <SubBox between={true}>
              <PriceInputBox
                style={{ marginRight: SPACING.small }}
                onClick={() => handleAuctionType("fixed")}
                selected={auctionType === "fixed"}>
                <TxtCurrentBid titleTxt={true}>{"Fixed Price"}</TxtCurrentBid>
                <TxtCurrentBid>{"Set a fixed price"}</TxtCurrentBid>
              </PriceInputBox>
              <PriceInputBox
                style={{ marginLeft: SPACING.small }}
                onClick={() => handleAuctionType("bid")}
                selected={auctionType === "bid"}>
                <TxtCurrentBid titleTxt={true}>{"Highest Bid"}</TxtCurrentBid>
                <TxtCurrentBid>{"Set a bid price"}</TxtCurrentBid>
              </PriceInputBox>
            </SubBox>
            <SubBox between={true}>
              <FormatSubBox>
                <TxtCurrentBid style={{marginBottom: SPACING.medium, marginTop: SPACING.medium}} titleTxt={true} >{"Bid Price"}</TxtCurrentBid>
                <TxtCurrentBid>
                  {auctionType === "fixed" ? "Fixed price for the item" : "Bid price for the item"}
                </TxtCurrentBid>
              </FormatSubBox>
              <PriceInputIIcon>
                <IconWrap>
                  <Icon height="auto" width="24px" name={Moonriver} />
                </IconWrap>
                <PriceInput
                  type="numbers"
                  value={priceValue}
                  onChange={handlePriceChange}
                  priceError={priceError}
                  placeholder={"0.000"}
                />
              </PriceInputIIcon>
            </SubBox>
            {auctionType === "bid" && <SubBox between={true} style={{marginTop: SPACING.medium}}>
              <FormatSubBox style={{ paddingRight: SPACING.extraLarge }}>
                <TxtCurrentBid titleTxt={true} style={{marginBottom: SPACING.medium}}>{"End date"}</TxtCurrentBid>
                <TxtCurrentBid >
                  {"The end date of the auction."}
                </TxtCurrentBid>
              </FormatSubBox>

              <DateTimeBox>
                <DateTimePicker
                  // overwrite .css styles: globalStyles.js search by "date-time-picker" or .react-calendar
                  onChange={handleDateChange}
                  value={dateValue}
                  clearIcon={null}
                  disableClock={true}
                  format={"y-M-d h:mm:ss a"}
                  showLeadingZeros={false}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </DateTimeBox>
            </SubBox>}
            <TxtCurrentBid style={{marginBottom: SPACING.medium, marginTop: SPACING.medium}} titleTxt={true}>{"Fees"}</TxtCurrentBid>

            <SubBox between={true}>
              <TxtCurrentBid >
                {"Service fee"}
              </TxtCurrentBid>
              <TxtCurrentBid >
                {"3%"}
              </TxtCurrentBid>
            </SubBox>
            <SubBox between={true}>
              <TxtCurrentBid >
                {"Creator royalty"}
              </TxtCurrentBid>
              <TxtCurrentBid>
                {"5%"}
              </TxtCurrentBid>
            </SubBox>

          </BidContainer>
        </TopContainer>
        <BottomContainer>
          <ButtonWrapper>
            <Button
              text={"Publish"}
              onClick={onList}
              color={COLORS.purple}
              colorText={COLORS.white}
              size={"medium"}
              className={"FullWidth"}
              padding={true}
              disabled={buttonDisabled()}
            />
          </ButtonWrapper>
          {/* <PriceBox/> */}
        </BottomContainer>
      </OverlayContainer>
    </div>
  );
};
export default ListForSale;
