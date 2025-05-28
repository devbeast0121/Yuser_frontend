import React,{ useState, useEffect }  from 'react';
import {
    MessageAppContainer,
    InnerBox,
    Text
} from './ErrorMessageSignIn.elements';
import Icon from ".././Icon/Icon";

import Alert from '../../public/icons/alert.svg';

import Button from '../Button/Button';
import { COLORS } from '../../styles/Styling.js';
import { motion } from "framer-motion"

export const SuccessMessage = (props) => {

    const acceptMessage = () => {
        if(props.showSuccessMessage){
            props.showSuccessMessage(false)
        }
        
    }

    setTimeout(()=>{
        console.log("closing overlay");
        acceptMessage();
    },5000);


    return (
        <>
            <motion.div
                key="successMessage"
                className="SuccessMessageTop"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 70 }}
                exit={{ opacity: 0, y: -100 }}
            >
                <MessageAppContainer containerColor={props.containerColor?props.containerColor:COLORS.green}>
                    <InnerBox>
                        <Icon name={Alert} width="auto" height="30px" />
                        <Text>{props.successMessage}</Text>
                    </InnerBox>
                    <Button
                        text={"Continue"}
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
