import React, { useState } from 'react';
import {
    NavFeedMobileContainer,
    BtnFeed,
    BtnText,
    Divider
} from './NavFeedMobile.elements';

const NavFeedMobile = (btnHot, btnMe) => {
    const [clickHot, setClickHot] = useState(false)
    const [clickMe, setClickMe] = useState(true)

   
    const handleFeedClick = (btnType) => {
        if (btnType == 'hot') {
            setClickHot(true)
            setClickMe(false)
        } else if (btnType == 'me') {
            setClickHot(false)
            setClickMe(true)
        }
    }

    return (
        <>
            <NavFeedMobileContainer>
                <BtnFeed onClick={() => handleFeedClick('hot')} click={clickHot}>
                    <BtnText btnHot={btnHot} feed={clickHot}>{'Hot'}</BtnText>
                </BtnFeed>
                <Divider />
                <BtnFeed onClick={() => handleFeedClick('me')} click={clickMe}>
                    <BtnText btnMe={btnMe} feed={clickMe}>{'Me'}</BtnText>
                </BtnFeed>
            </NavFeedMobileContainer>
        </>
    )
}

export default NavFeedMobile
