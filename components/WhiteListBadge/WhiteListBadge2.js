import React from 'react';
import {
    MessageAppContainer,
    InnerBox,
    Text,
    BtnClose
} from './WhiteListBadge.elements';
import Icon from ".././Icon/Icon";
import Close from "../../public/icons/close.svg";
import Alert from '../../public/icons/alert.svg';
import Gem from '../../public/icons/gem.svg';
import Button from '../Button/Button';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"

export const WhiteListBadge2 = (props) => {
    // three types of the message app: inform/success/error

    const acceptMessage = () => {
        if(props.showWhiteList2){
            props.setShowWhiteList2(false)
            props.setAlert(false)
        }
        
    }

    return (
        <>
            <MessageAppContainer containerColor={props.containerColor?props.containerColor:COLORS.red}>
                <InnerBox>
                    <Icon name={Gem} width="auto" height="30px" />
                    <Text>{"You earned 200,000 Gem Stones for your participation in the NextGems minting"}</Text>
                </InnerBox>
                <BtnClose onClick={acceptMessage} className={'MarginRightMedium'}>
                    <Icon
                    strokeColor={({ theme }) => theme.iconColor.color}
                    strokeWidth="3"
                    height="auto"
                    width="24px"
                    name={Close}
                    />
                </BtnClose>
            </MessageAppContainer>
        </>
    )
}