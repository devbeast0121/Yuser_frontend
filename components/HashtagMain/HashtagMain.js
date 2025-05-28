import React, { useState } from 'react';
import {
    HashtagPostsContainer,
    HashtagMainContainer,
    ItemBox,
    InfoBox,
    ContentSection,
    BottomBox,
    TxtBold,
    TxtSmall,
    TxtGemAmount,
    SubInfoBox,
    HashtagListSearchBox,
    BtnListSearch,
    ListType,
    //top box
    TopContainer,
    ChallengeBox,
    RulesLinkContainer,
    TimerBox,
    Background,
    BackgroundBody,
    ChallengeText,
    IconWrapper,
    HashtagTask,
    Timer,
    HashtagTimer
} from './HashtagMain.elements';
import Avatar from '../Avatar/Avatar';
import Icon from "../Icon/Icon";
import { inject, observer } from 'mobx-react';
import { ImageUrl, DetermineSource } from '../../stores/tools.js';
import { posts } from '../../public/data/HomeData.js';
import Gem from '../../public/icons/gem.svg';
import Info from '../../public/icons/info-transparent.svg';
import { Divider } from '../NavFeed/NavFeed.elements';
import Image from 'next/image';
import imageSrc from '../../public/images/signup/signup_bg.jpg';
import Ethereum from '../../public/icons/ethereum.svg';

export default inject('store')(observer(
    function HashtagMain(props) {

        //----lists search
        const [leaders, setLeaders] = useState(true)
        const [entries, setEntries] = useState(false)

        const handleListTypeClick = (btnType) => {
            if (btnType == 'leaders') {
                setLeaders(true)
                setEntries(false)
            } else if (btnType == 'entries') {
                setLeaders(false)
                setEntries(true)
            }
        }

        return (
            <>
                <HashtagMainContainer>
                    <TopContainer>
                        <ChallengeBox>
                            <Background>
                                <Image layout="fill" objectFit="cover" src={imageSrc} alt="background image" />
                            </Background>
                            <BackgroundBody>
                                <TxtBold>{'#tothemoon'}</TxtBold>
                                <ChallengeText>{'Explore the concept of space in your next work and share it with the hashtag #tothemoon to participate'}</ChallengeText>
                                <RulesLinkContainer>
                                    <Icon height="auto" width="18px" name={Info} />
                                    <TxtSmall small={true}>{'Rules & more'}</TxtSmall>
                                </RulesLinkContainer>
                            </BackgroundBody>
                        </ChallengeBox>
                        <TimerBox>
                            <Background>
                                <Image layout="fill" objectFit="cover" src={imageSrc} alt="background image" />
                            </Background>
                            <BackgroundBody>
                                <IconWrapper>
                                    <Icon width="auto" height="100px" name={Ethereum} className="MarginBottomMedium" />
                                </IconWrapper>
                                <HashtagTask>{'Win $200 USD in ETH!'}</HashtagTask>
                                <Timer>{'23:48hr left'}</Timer>
                                <HashtagTimer>{'until contest launches'}</HashtagTimer>
                            </BackgroundBody>
                        </TimerBox>
                    </TopContainer>
                    <HashtagListSearchBox>
                        <BtnListSearch onClick={() => handleListTypeClick('leaders')} click={leaders}>
                            <ListType type={leaders}>{'Leaders'}</ListType>
                        </BtnListSearch>
                        <Divider />
                        <BtnListSearch onClick={() => handleListTypeClick('entries')} click={entries}>
                            <ListType type={entries}>{'Entries'}</ListType>
                        </BtnListSearch>
                    </HashtagListSearchBox>

                    {posts ?
                        <HashtagPostsContainer>
                            {posts.map((product) => (
                                <ItemBox key={product.id} product={product} >
                                    <InfoBox>
                                        <Avatar src={product.authorAvatar} size={'medium'} alt={'Avatar'} frame={false} edit={false} userName={product.authorName} />
                                        <SubInfoBox >
                                            <TxtSmall>{'Created by'}</TxtSmall>
                                            <TxtBold>{product.authorName}</TxtBold>
                                        </SubInfoBox>
                                    </InfoBox>
                                    <ContentSection src={DetermineSource(product?.content, 'image/jpeg', 's')} alt='Content image/video/audio' />
                                    <BottomBox>
                                        <Icon height="auto" width="18px" name={Gem} />
                                        <TxtGemAmount>{'430k'}</TxtGemAmount>
                                    </BottomBox>
                                </ItemBox>
                            ))}
                        </HashtagPostsContainer>
                        : null}
                </HashtagMainContainer>
            </>
        )
    }
))
