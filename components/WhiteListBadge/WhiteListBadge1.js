import React, { useState } from 'react';
import {
    MessageAppContainer,
    InnerBox,
    Text,
    BtnClose
} from './WhiteListBadge.elements';
import Icon from ".././Icon/Icon";
import Close from "../../public/icons/close.svg";
import Alert from '../../public/icons/alert.svg';
import Badge from '../../public/icons/whiteList_badge.svg';
import Check from '../../public/icons/check.svg';
import Button from '../Button/Button';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"

export const WhiteListBadge1 = (props) => {
    // three types of the message app: inform/success/error
    const [round1Wallets, setRound1Wallets]= useState("")
    const [round2Wallets, setRound2Wallets] = useState("")
    const acceptMessage = () => {
        if(props.showWhiteList1){
            props.setShowWhiteList1(false)
            props.setAlert(false)
        }
        
    }
    React.useEffect(() => {
        async function doEffect(){
            if(props.roundNumber === 1 && props.walletAddRound1.length>0){
                //console.log(props.walletAddRound1,"round 1 wallets")
                setRound1Wallets(truncate(props.walletAddRound1))
            }
            else if(props.roundNumber === 2 && props.walletAddRound2.length>0){
                //console.log(props.walletAddRound2[0])
                setRound2Wallets(truncate(props.walletAddRound2), "round 2 wallets")
            }
        }
        doEffect()
    }, []);
    function truncate(
        fullStr,
        separator = "...",
        frontChars = 6,
        backChars = 5
    ) {
        let retArray=[]
        for(var i=0; i<fullStr.length;i++){
           let newString=fullStr[i].substr(0, frontChars) +
            separator +
            fullStr[i].substr(fullStr[i].length - backChars)
            retArray.push(newString)
        }
        // if (fullStr.length <= strLen) return fullStr;
        return retArray
    }
//walletAddRound1={walletAddRound1}
//walletAddRound2={walletAddRound2}
//Make the wallet with multiple wallets now it shows only the first one from the list
    return (
        <>
            {(props.roundNumber === 1 || (props.roundNumber === 2 && props.hasWallet))?
            <MessageAppContainer containerColor={props.containerColor?props.containerColor:COLORS.red}>
                <InnerBox>
                    <Icon name={Check} width="auto" height="30px" />
                    <Text>{"You are confirmed to participate in round "}{props.roundNumber}{" of the whitelist. "}{"The following wallets are whitelisted: "} 
                    <span style={{fontWeight:"bold"}}>
    {
      round1Wallets.length ? round1Wallets.join(' , ') :  round2Wallets.length ? round2Wallets.join(',') : "-"
    }
</span>
                     </Text>
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
            :
            <MessageAppContainer containerColor={props.containerColor?props.containerColor:COLORS.red}>
                <InnerBox>
                    <Icon name={Badge} width="auto" height="30px" />
                    <Text>{"You have been whitelisted for round "}{props.roundNumber} {"of the NextGems minting. "}{(props.roundNumber === 2 && !props.hasWallet) && "Please confirm you would like to participate by connecting Metamask to Yuser with your Moonriver wallet"}</Text>
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
            }
        </>
    )
}
