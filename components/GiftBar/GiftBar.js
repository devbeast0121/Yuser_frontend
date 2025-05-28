import React from 'react';
import {
    GiftBarContainer,
    BtnGiftBar,
    BtnText,
} from './GiftBar.elements';
import Icon from ".././Icon/Icon";
import { inject, observer } from 'mobx-react';
import WouldPutOver from '../../functions/WouldPutOver';
import f_GetCurrentAmountGifted from '../../functions/f_GetCurrentAmountGifted';
import { gift_options } from '../../constants';
import currentAmountGiftedByMe from '../../functions/currentAmountGiftedByMe';

export default inject('store')(observer(
    function GiftBar(props) {

        const GetCurrentAmountGifted = f_GetCurrentAmountGifted(props.store);
        /*
         *      onPressStones()
         */
        function onPressStones(value) {
            if (WouldPutOver(value, GetCurrentAmountGifted(props.itemInfo)))
                return;

            async function sendGems(count, pid, recipientID, auth_user_id) {
                if (auth_user_id === recipientID)
                    return; //  U S E R S    M A Y    N O T    G I F T    S E L F 
                await props.store.giftStonesAndUpdateLocal(recipientID, pid, count);
            }
            sendGems(value, props.itemInfo.id, props.itemInfo.owner_id, props.itemInfo.auth_user_id);
            props.callback();
        }


        // const currentAmountGiftedByMe = (store, itemInfo) => {
        //     // const {store, itemInfo} = props;
            
        //     if (itemInfo.type === 'comment') {
        //         if (store.localGiftingState.has(itemInfo.id))
        //             return store.localGiftingState.getAmountGifted(itemInfo.id);
        //         return store.commentsMaster.getComment(itemInfo.id)?.gifted
        //     }

        //     if (store.local_gifting_state_has(itemInfo.id))  // if has gifted this session...
        //         return store.local_gifting_state_get(itemInfo.id);

        //     return store.localPosts.getById(itemInfo.id).gifted;
        // }

        // console.log(`currentAmountGiftedByMe() --> `, currentAmountGiftedByMe());

        return (
                <GiftBarContainer position={props.position} placement={props.placement} modal={props.modal}>
                    {
                        gift_options.map((option, index) => <BtnGiftBar
                            position={props.position}
                            onClick={() => onPressStones(option.value)}
                            // style={{ opacity: WouldPutOver(option.value, GetCurrentAmountGifted(props.itemInfo), 1000) ? 0.6 : 1 }}
                            style={{ opacity: WouldPutOver(option.value, currentAmountGiftedByMe(props.store, props.itemInfo), 1000) ? 0.6 : 1 }}
                            key={index.toString()}
                        >
                            <Icon width="40px" height="37px" name={option.iconName} />
                            <BtnText>{option.value.toString()}</BtnText>
                        </BtnGiftBar>
                        )
                    }
                </GiftBarContainer>
        )
    }
))
