import React, { useState, useEffect } from 'react';
import {
    NavFeedContainer,
    BtnFeed,
    BtnText,
} from './NavFeed.elements';
import Hot from '../../public/icons/hot.svg';
import Me from '../../public/icons/me.svg';
import Shop from '../../public/icons/shop.svg';
import Icon from ".././Icon/Icon";
import { useStore } from '../../stores/RootStore';
import router from 'next/router';
import { useSession } from 'next-auth/client';

export const FEED_TYPES = {
    ME: "Following",
    HOT: "Hot",
    PROFILE: "Profile",
    SINGLE: "Single",
};

const NavFeed = () => {
    const rootstore = useStore();
    const [feed, _setFeed] = useState(FEED_TYPES.HOT);
    const [session, loading] = useSession()
    const [btnMarketVisible, setMarketVisible] = useState(false)

    function setFeed(feedType) {
        if (session) {
            if (![FEED_TYPES.HOT, FEED_TYPES.ME].includes(feedType))
                throw new Error(`Improper feed type ${feedType}, if dev see NavFeed.js`);

            rootstore.setFeedType(feedType); // TELL MOBX WHAT THE FEED TYPE IS
            _setFeed(feedType);
        }


    }

    const handleFeedClick = (btnType) => {

        // setFeed(btnType);
        //router.push(`/`);

        if (btnType == FEED_TYPES.HOT) {
            router.push('/')
            setFeed(FEED_TYPES.HOT)
        }
        else if (btnType == FEED_TYPES.ME) {
            /* if (!session) {
                 runInAction(() => {
                     rootstore.showLoginModal = true;     // sets the auth user variable
                 })
             }*/
            if (!session) {
                router.push('/signin', null, { shallow: true })
                return
            } else {
                router.push('/')
                setFeed(FEED_TYPES.ME)
            }
        }
        else if (btnType == 'market') {
            router.push('/market', null, { shallow: true })
            return
        }
    }

    // show/hide the market button depending from the window size
    const hideBtnMarket = () => {

        if (typeof window === 'undefined')
            console.warn(`window is undefined this is about to cause an issue`);

        if (window.innerWidth <= 515) {
            setMarketVisible(true)
        } else {
            setMarketVisible(false)
        }
    };

    useEffect(() => {
        // console.log(`🪟 NavBar.js typeof window is ${typeof window}`);
        hideBtnMarket();
        window.addEventListener("resize", hideBtnMarket);
        return () => window.removeEventListener("resize", hideBtnMarket);
    }, []);
    
    return (
        <div style={{}}>
            <NavFeedContainer>
                <BtnFeed onClick={() => handleFeedClick(FEED_TYPES.HOT)} click={feed === FEED_TYPES.HOT}>
                    <Icon width="24px" height="auto" name={Hot} />
                    <BtnText feed={feed == FEED_TYPES.HOT} >{'Hot'}</BtnText>
                </BtnFeed>
                <BtnFeed onClick={() => handleFeedClick(FEED_TYPES.ME)} click={feed === FEED_TYPES.ME}>
                    <Icon width="26px" height="auto" name={Me} />
                    <BtnText feed={feed === FEED_TYPES.ME}>{'Following'}</BtnText>
                </BtnFeed>
                {btnMarketVisible &&
                    <BtnFeed onClick={() => handleFeedClick("market")} >
                        <Icon width="26px" height="auto" name={Shop} />
                        <BtnText >{'NFTs'}</BtnText>
                    </BtnFeed>
                }
            </NavFeedContainer>
        </div>
    )
}

export default NavFeed