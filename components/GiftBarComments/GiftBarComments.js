import React from 'react';
import {
    GiftBarContainer,
    BtnGiftBar,
    BtnText,
} from './GiftBarComments.elements';
import Icon from "../Icon/Icon";
import { inject, observer } from 'mobx-react';
import WouldPutOver from '../../functions/WouldPutOver';
import f_GetCurrentAmountGifted from '../../functions/f_GetCurrentAmountGifted';
import { gift_options } from '../../constants';
import currentAmountGiftedByMe from '../../functions/currentAmountGiftedByMe';

export default inject('store')(observer(
    function GiftBarComments(props) {

        function onPressStones(value) {
            const current = currentAmountGiftedByMe(props.store, props.itemInfo);
            if (current + value > 1000) {
                console.log(`cannot give ${value} to ${props.itemInfo.id}`);
                return
            }
            props.sendGems(value);
            props.closeGiftBar();
        }

        // /*
        //     GetCurrentAmountGifted()
        //     @impure
        //     Get the gem count before we add more gems... 
        //     William Doyle
        //     Auguest 2nd 2021
        // */
        // function GetCurrentAmountGifted(itemInfo, parentComment) {
        //     if (itemInfo.isReply) {
        //         const parentId = parentComment.replies[0].parentCommentId
        //         const pre = (itemInfo.type === 'comment') ? props.store.commentsList.find(c => c._id === parentId).gifted : props.store.localPosts.getById(itemInfo.id).gems;
        //         return pre
        //     }
        //     else {
        //         const pre = (itemInfo.type === 'comment') ? props.store.commentsList.find(c => c._id === itemInfo.id).gifted : props.store.localPosts.getById(itemInfo.id).gems;
        //         return pre;
        //     }
        // }

        const GetCurrentAmountGifted = f_GetCurrentAmountGifted(props.store);

        console.log(currentAmountGiftedByMe(props.store, props.itemInfo));

        return (
            <>
                <GiftBarContainer position={props.position} placement={props.placement}>
                    {
                        gift_options.map((option, index) => <BtnGiftBar
                            key={index}
                            position={props.position}
                            onClick={() => onPressStones(option.value)}
                            // style={{ opacity: WouldPutOver(option.value, GetCurrentAmountGifted(props.itemInfo, props.parentComment), 1000) ? 0.6 : 1 }}
                               style={{ opacity: WouldPutOver(option.value, currentAmountGiftedByMe(props.store, props.itemInfo), 1000) ? 0.6 : 1 }}
                        >
                            <Icon width="24px" height="24px" name={option.iconName} />
                            <BtnText>{option.value.toString()}</BtnText>
                        </BtnGiftBar>
                        )
                    }
                </GiftBarContainer>
            </>
        )
    }
))
