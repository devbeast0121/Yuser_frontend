import React from 'react'
import {
    SplashScreenContainer,
    LeftBox,
    RightBox,
    Background,
    BackgroundBody,
    TxtTitle,
    TxtMain,
    TxtSmall,
    LoginContainer,
    TxtLogin,
    BoxBottons,
    ForButton,
    Opaque
} from './SplashScreen.elements';
import Image from 'next/image';
import imageSrc from '../../public/images/yuser_promo_banner.jpg';
import playStore from '../../public/icons/playStore.svg';
import appStore from '../../public/icons/appStore.svg';
import LoginBox from '../LoginBox/LoginBox.js';
import Icon from ".././Icon/Icon";
import Gem from '../../public/icons/gem.svg';
import Logo from '../../public/icons/logo.svg';

export const SplashScreen = () => {
    return (
        <>
            <SplashScreenContainer className="splashScreen">
                <LeftBox>
                    <Background>
                        <Image layout="fill" objectFit="cover" src={imageSrc} alt="background image" />
                        <Opaque />
                    </Background>
                    <BackgroundBody>
                        <TxtTitle>{'Shape the future of social media'}</TxtTitle>
                        <TxtMain>{'Explore art & music, get inspired, create & sell NFTs easier than ever before.'}</TxtMain>
                        <TxtSmall>{'Art bySalvoln3D, owned by EdSketching.'}</TxtSmall>
                    </BackgroundBody>
                </LeftBox>
                <RightBox>
                    <Icon height="auto" width="150px" name={Gem} className="MarginBottomMedium" />
                    <Icon height="auto" width="150px" name={Logo} className="MarginBottomLarge" />
                    <LoginContainer>
                        <TxtLogin>{'Login to REBL'}</TxtLogin>
                        <LoginBox splash={true} />
                        <TxtLogin>{'Or signup on mobile'}</TxtLogin>
                        <BoxBottons>
                            <ForButton>
                                <Icon height="50px" width="auto" name={appStore} className="MarginBottomLarge" />
                            </ForButton>
                            <ForButton>
                                <Icon height="50px" width="auto" name={playStore} className="MarginBottomLarge" />
                            </ForButton>
                        </BoxBottons>
                    </LoginContainer>
                </RightBox>
            </SplashScreenContainer>
        </>
    )
}
