import React from 'react';
import {
    MessageAppContainer,
    InnerBox,
    Text
} from './MessageAppComponent.elements';
import Icon from ".././Icon/Icon";
import Alert from '../../public/icons/alert.svg';
import Info from '../../public/icons/info.svg';
import Check from '../../public/icons/check.svg';
import Button from '../Button/Button';
import { COLORS } from '../../styles/Styling.js';
import { motion } from "framer-motion"

export const MessageAppComponent = (props) => {
    // three types of the message app: inform/success/error

    const icon = props.type == "inform" ? Info
        : props.type == "error" ? Alert : Check

    /*const textMessage = props.type == "inform" ? "Type here to find out more about hashtag contests."
        : props.type == "error" ? "You entered an incorect username or password." : "Your changes have been saved." */

    const buttonText = props.type == "inform" ? "Close"
        : props.type == "error" ? "Close" : "Done"

    const containerColor = props.type == "inform" ? COLORS.blue
        : props.type == "error" ? COLORS.red : COLORS.green

    const acceptMessage = () => {
        props.showAppMessage(false, "")
    }

    return (
        <>
            <motion.div
                key="messageAppTop"
                className="MessageAppTop"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 70 }}
                exit={{ opacity: 0, y: -100 }}
            >
                <MessageAppContainer containerColor={containerColor}>
                    <InnerBox>
                        <Icon name={icon} width="auto" height="30px" />
                        <Text>{props.textMessage}</Text>
                    </InnerBox>
                    <Button
                        text={buttonText}
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
