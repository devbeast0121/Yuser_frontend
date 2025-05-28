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
import Gem from '../../public/icons/gem.svg';
import Check from '../../public/icons/checkMark.svg'
import Button from '../Button/Button';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"

export const WhiteListBadge3 = (props) => {
    // three types of the message app: inform/success/error
    const [walletAddr, setWalletAddr] = useState("")
    const acceptMessage = () => {
        if(props.showWhiteList3){
            props.setShowWhiteList3(false)
        }
        
    }
    React.useEffect(() => {

        const truncateText = truncate(props.walletID)
        setWalletAddr(truncateText)

    }, []);
    function truncate(
        fullStr,
        separator = "...",
        frontChars = 6,
        backChars = 5
    ) {
        // if (fullStr.length <= strLen) return fullStr;

        return (
            fullStr.substr(0, frontChars) +
            separator +
            fullStr.substr(fullStr.length - backChars)
        );
    }

    

    return (
        <>
            <MessageAppContainer containerColor={props.containerColor?props.containerColor:COLORS.red}>
                <InnerBox>
                    <Icon name={Check} width="auto" height="30px" />
                    <Text>{"You have purchased  "}{props.preboughtNGs} {" NextGems that will be minted into your wallet "}<span style={{fontWeight:"bold"}}>{walletAddr}</span>{" at a later date."}</Text>
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

// import React from 'react';
// import {
//     MessageAppContainer,
//     InnerBox,
//     Text,
//     BtnClose
// } from './WhiteListBadge.elements';
// import Icon from ".././Icon/Icon";
// import Close from "../../public/icons/close.svg";
// import Alert from '../../public/icons/alert.svg';
// import Badge from '../../public/icons/whiteList_badge.svg';
// import Check from '../../public/icons/check.svg';
// import Button from '../Button/Button';
// import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';
// import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"

// export const WhiteListBadge1 = (props) => {
//     // three types of the message app: inform/success/error

//     const acceptMessage = () => {
//         if(props.showWhiteList1){
//             props.setShowWhiteList1(false)
//             props.setAlert(false)
//         }
        
//     }

//     return (
//         <>
//             <MessageAppContainer containerColor={props.containerColor?props.containerColor:COLORS.red}>
//                 <InnerBox>
//                     <Icon name={Badge} width="auto" height="30px" />
//                     <Text>{"You have been whitelisted for round "}{props.roundNumber} {"of the NextGems minting. "}{(props.roundNumber === 2 && !props.hasWallet) && "Please confirm you would like to participate by connecting Metamask to Yuser with your Moonriver wallet"}</Text>
//                 </InnerBox>
//                 <BtnClose onClick={acceptMessage} className={'MarginRightMedium'}>
//                     <Icon
//                     strokeColor={({ theme }) => theme.iconColor.color}
//                     strokeWidth="3"
//                     height="auto"
//                     width="24px"
//                     name={Close}
//                     />
//                 </BtnClose>
//             </MessageAppContainer>
//             {(props.roundNumber === 1 || (props.roundNumber === 2 && props.hasWallet))&&
//             <MessageAppContainer containerColor={props.containerColor?props.containerColor:COLORS.red}>
//                 <InnerBox>
//                     <Icon name={Check} width="auto" height="30px" />
//                     <Text>{"You are confirmed to participate in round "}{props.roundNumber}{" of the whitelist"}</Text>
//                 </InnerBox>
//                 <BtnClose onClick={acceptMessage} className={'MarginRightMedium'}>
//                     <Icon
//                     strokeColor={({ theme }) => theme.iconColor.color}
//                     strokeWidth="3"
//                     height="auto"
//                     width="24px"
//                     name={Close}
//                     />
//                 </BtnClose>
//             </MessageAppContainer>}
//         </>
//     )
// }
