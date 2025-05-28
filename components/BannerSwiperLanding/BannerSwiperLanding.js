import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ImageContentComponent from "../../components/ImageContentComponent/ImageContentComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/autoplay";

import styles from '../../components/BannerSwiperLanding/BannerSwiperLanding.module.css';


const BannerSwiperLanding = () => {

    return (
        <BannerContainer >
            <Swiper
                slidesPerView={1}
                loop="true"
                centeredSlides={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Autoplay, Pagination]}
                className={styles.swiper}
            // onSlideChange={(swiper) => getWalletTitle(swiper)}
            >
                <SwiperSlide >
                    <ImageContentComponent
                        reverse={false}
                        mobileReverse={false}
                        standardTitleLogoSize={null}
                        textMarginLeft={24}
                        textMarginRight={24}
                        logoHeight={null}
                        logoWidth={null}
                        srcTitle={null}
                        imageMaxWidth={""}
                        title1={"Leverage AI Tools"}
                        title1FontSize={45}
                        title2={null}
                        title2FontSize={null}
                        title3={null}
                        title3FontSize={null}
                        textMaxWidth={600}
                        descriptionFontSize={24}
                        description1={
                            "Unlock the power of Ai art with REBLApp's cutting-edge tools for unparalled creativity"
                        }
                        mobileMargin={false}
                        src={
                            "https://yuser-assets.imgix.net/Rebl/Describe%20what%20you%20want%20to%20create.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                        }
                        rightButton={"Join the Whitelist"}
                        rightHref={"/signin"}
                        rightButtonColor={'#DC3BC3'}
                        leftButton={null}
                        leftHref={null}
                    />
                </SwiperSlide>
                <SwiperSlide >
                    <ImageContentComponent
                        reverse={false}
                        mobileReverse={false}
                        standardTitleLogoSize={null}
                        textMarginLeft={24}
                        textMarginRight={24}
                        logoHeight={null}
                        logoWidth={null}
                        srcTitle={null}
                        imageMaxWidth={""}
                        title1={"Monetize your AI art"}
                        title1FontSize={45}
                        title2={null}
                        title2FontSize={null}
                        title3={null}
                        title3FontSize={null}
                        textMaxWidth={600}
                        descriptionFontSize={24}
                        description1={
                            "Monetize your creativity and unlock new revenue streams with REBLApp's innovative monetization features"
                        }
                        mobileMargin={false}
                        src={
                            "https://yuser-assets.imgix.net/Rebl/REBL%20District%20Landing.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                        }
                        rightButton={"Join the Whitelist"}
                        rightHref={"/signin"}
                        rightButtonColor={'#DC3BC3'}
                        leftButton={null}
                        leftHref={null}
                    />
                </SwiperSlide>
                <SwiperSlide >
                    <ImageContentComponent
                        reverse={false}
                        mobileReverse={false}
                        standardTitleLogoSize={null}
                        textMarginLeft={24}
                        textMarginRight={24}
                        logoHeight={null}
                        logoWidth={null}
                        srcTitle={null}
                        imageMaxWidth={""}
                        title1={"Join Art Districts"}
                        title1FontSize={45}
                        title2={null}
                        title2FontSize={null}
                        title3={null}
                        title3FontSize={null}
                        textMaxWidth={600}
                        descriptionFontSize={24}
                        description1={
                            "Immerse yourself in vibrant communities around unique art styles with the REBLAp's new Districts feature"
                        }
                        mobileMargin={false}
                        src={
                            "https://yuser-assets.imgix.net/Rebl/JoseLopez%20Just%20a%20giant%20walking.png?fit=clip&w=350&auto=format&dpr=2&q=75"
                        }
                        rightButton={"Join the Whitelist"}
                        rightHref={"/signin"}
                        rightButtonColor={'#DC3BC3'}
                        leftButton={null}
                        leftHref={null}
                    />
                </SwiperSlide>
            </Swiper>
        </BannerContainer >
    )
};
export default BannerSwiperLanding


const BannerContainer = styled.div`
    width: 100%;
    display: flex;
    lex-wrap: wrap;
    overflow: hidden;
    align-self: center;
`;
