import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SPACING } from '../../styles/Styling.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import styles from './BannerSwiper.module.css';
import Banner from '../../public/icons/yuserBeta.svg';


const BannerSwiper = (props) => {

    const banners = [
        { image: Banner }, { image: Banner }, { image: Banner }, { image: Banner },
    ]

    return (
        <BannerContainer>
            <Swiper
                spaceBetween={24}
                loop={true}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className={styles.swiper}
                pagination={{
                    dynamicBullets: true,
                }}
            >
                {/**----- by slide ------- */}
                {/*}  <SwiperSlide className={styles.slide}>
                    <Image
                        src={Banner} alt="banner"
                    //onClick={goByLink}
                    />
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <Image
                        src={Banner} alt="banner"
                    //onClick={goByLink}
                    />
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <Image
                        src={Banner} alt="banner"
                    //onClick={goByLink}
                    />
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                    <Image
                        src={Banner} alt="banner"
                    //onClick={goByLink}
                    />
                </SwiperSlide> */}

                {/**----- using map ------- */}
                {banners.map((banner, index) => (
                    <SwiperSlide className={styles.slide} key={index}>
                        <Image
                            src={banner.image} alt="banner"
                        //onClick={goByLink}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </BannerContainer>
    )
};
export default BannerSwiper


const BannerContainer = styled.div`
    display: flex;
    flex: 1;
    height: 180px;
    margin-left: ${SPACING.large}px;
    margin-right: ${SPACING.large}px;
    margin-top: ${SPACING.large}px;
    border-radius: 10px;
    overflow: hidden;
`;

const Image = styled.img`
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;  
`;