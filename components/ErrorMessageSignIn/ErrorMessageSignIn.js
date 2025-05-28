import React from 'react';
import {
    MessageAppContainer,
    InnerBox,
    Text
} from './ErrorMessageSignIn.elements';
import Icon from ".././Icon/Icon";

import Alert from '../../public/icons/alert.svg';

import Button from '../Button/Button';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"

export const ErrorMessageSignIn = (props) => {
    // three types of the message app: inform/success/error

    const acceptMessage = () => {
        if(props.showErrorMessage){
            props.showErrorMessage(false)
        }
        
    }

    return (
        <>
            <motion.div
                key="errorMessage"
                className="ErrorMessageTop"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 70 }}
                exit={{ opacity: 0, y: -100 }}
            >
                <MessageAppContainer containerColor={props.containerColor?props.containerColor:COLORS.red}>
                    <InnerBox>
                        <Icon name={Alert} width="auto" height="30px" />
                        <Text>{props.errorMessage}</Text>
                    </InnerBox>
                    <Button
                        text={"Retry"}
                        onClick={acceptMessage}
                        isIcon={false}
                        color={'transparent'}
                        colorText={({ theme }) => theme.textPrimary.color}
                        className={'MarginRightLarge'} />
                </MessageAppContainer>
            </motion.div>
        </>
    )
}
