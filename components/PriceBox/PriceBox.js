import React, { useState } from 'react'
import {
    PriceBoxContainer,
    TxtMain,
    FormatSubBox,
    WelcomeText,
    SubBox,
    PriceInputBox,
    PriceInput,
    DateTimeBox,
    IconWrap,
    LargeTitle,
    ButtonWrapper
} from './PriceBox.elements';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';
import Moonriver from "../../public/icons/moonriver_logo3.svg";
import Icon from "../Icon/Icon";
import Button from '../Button/Button';
import { COLORS } from '../../styles/Styling.js';

const PriceBox = (props) => {

    const [price, setPrice] = useState('1.00');
    const [valueDateTime, onChangeDateTime] = useState(new Date());
    const [byFixedPrice, setByFixedPrice] = useState(true)
    const [byBidPrice, setByBidPrice] = useState(false)

    const handleonChangeDateTime = value => {
        onChangeDateTime(value)
    }

    const handlePriceClick = (btnType) => {
        if (btnType == 'fixed') {
            setByFixedPrice(true)
            setByBidPrice(false)
        } else if (btnType == 'bid') {
            setByFixedPrice(false)
            setByBidPrice(true)
        }
    }

    return (
        <PriceBoxContainer>
            <LargeTitle resize={true}>{'Make an offer'}</LargeTitle>
            <SubBox>
                <FormatSubBox>
                    <WelcomeText>{'Offer'}</WelcomeText>
                    <TxtMain margin={true} >{'Make an offer in MOVR'}</TxtMain>
                </FormatSubBox>
                <PriceInputBox>
                    <IconWrap>
                        <Icon
                            height="auto"
                            width="24px"
                            name={Moonriver}
                        />
                    </IconWrap>
                    <PriceInput
                        type='numbers'
                        value={price}
                        // onChange={(event) =>
                        //     onPriceChange(event.target.value)
                        // }
                    />
                </PriceInputBox>
            </SubBox>
            {/*}   <SubBox>
                <FormatSubBox>
                    <WelcomeText>{'End date'}</WelcomeText>
                    <TxtMain margin={true} >{'The end date of the auction.'}</TxtMain>
                </FormatSubBox>
                <DateTimeBox>
                    <DateTimePicker
                        // overwrite .css styles: globalStyles.js search by "date-time-picker" or .react-calendar
                        onChange={() => handleonChangeDateTime(valueDateTime)}
                        value={valueDateTime}
                        clearIcon={null}
                        disableClock={true}
                    />
                </DateTimeBox>
            </SubBox> */}
            <WelcomeText>{'Fees'}</WelcomeText>
            <FormatSubBox>
                <SubBox between={true}>
                    <TxtMain property>{'Service fee'}</TxtMain>
                    <TxtMain property align={true}>{'3%'}</TxtMain>
                </SubBox>
                <SubBox between={true}>
                    <TxtMain property>{'Creator royalty'}</TxtMain>
                    <TxtMain property align={true}>{'5%'}</TxtMain>
                </SubBox>
            </FormatSubBox>
            {!props.uploadingPage &&
                <ButtonWrapper>
                    <Button
                        text={"Submit"}
                        //onClick={submitPrice}
                        color={COLORS.purple}
                        colorText={COLORS.white}
                        //width={"50%"}
                        className={"FullWidth"}
                        padding={true}
                    />
                </ButtonWrapper>
            }
        </PriceBoxContainer>
    )
}

export default PriceBox
