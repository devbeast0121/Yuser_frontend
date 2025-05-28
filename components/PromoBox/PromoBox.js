import React from 'react';
import {
    PromoBoxContainer,
    TxtLarge,
    TxtSmall,
    InviteBox,
    Invite,
} from './PromoBox.elements';
import Icon from ".././Icon/Icon";
import Button from '../Button/Button';
import { COLORS } from '../../styles/Styling';
import Gem from '../../public/icons/gem.svg';
import { inject, observer } from 'mobx-react';

export default inject('store')(observer(
    function PromoBox(props) {

        const promoTitle = 'You have 5 invites!'
        const promoText = 'You can invite 5 people to the app and spread the Yuser love.'
        const promoBtnText = 'Invite contacts'

        return (
            <>
                <PromoBoxContainer>
                    <InviteBox >
                        <Icon strokeWidth="2" height="auto" width="60px" name={Gem} />
                        <Invite>
                            <TxtLarge>{promoTitle}</TxtLarge>
                            <TxtSmall>{promoText}</TxtSmall>
                        </Invite>
                    </InviteBox>
                    <Button
                        text={promoBtnText}
                        //onClick={renderProps.onClick}
                        isIcon={false}
                        color={COLORS.purple}
                        colorText={COLORS.white}
                        className={'MarginBottomMedium'}
                    />
                </PromoBoxContainer>
            </>
        )
    }
))
