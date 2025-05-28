import React, { useState } from 'react'
import { inject, observer } from 'mobx-react';
import { useSession, getSession } from 'next-auth/client';
import { ErrorMessageSignIn } from '../../components/ErrorMessageSignIn/ErrorMessageSignIn';
import {
    Container,
    FullContainer
} from "../../styles/globalStyles";
import { useStore } from '../../stores/RootStore';
import { COLORS, SPACING } from '../../styles/Styling';
import Image from 'next/image';
import {
    MintingContainer,
    NavBox,
    MainContainer2,
    NavButton,
    Divider,
    ButtonTitle,
    LinearGradient2,
    LinearGradient3,
    Section
} from '../../components/MintingMain/MintingMain.elements';
import {
    Alink,
    CardsContainer,
    ItemCard,
    BoxTop,
    BoxBottom,
    Title,
    BulletItem,
    Bullet,
    ButtonMore,
    BtnText,
} from '../../components/LandingComponent/LandingComponent.elements';
import SearchBar from '../../components/SearchBar/SearchBar';
import NextGemsList from '../../components/NextGemsList/NextGemsList';
import ImageContentComponent from '../../components/ImageContentComponent/ImageContentComponent';
import Icon from "../../components/Icon/Icon";
import GemPink from '../../public/icons/gem-pink.svg';
import GemTeal from '../../public/icons/gem-teal.svg';
import Stones from '../../public/icons/stones.svg';
import yuserNextGems from '../../public/images/yuserNextGems.png';
import yuserApp from '../../public/images/yuserApp.png';
import yuserMarket from '../../public/images/yuserMarket.png';
import yuserGems from '../../public/images/yuserGems.png';
import HomepagePostGrid from '../HomepagePostGrid/HomepagePostGrid';
import FooterHorizontal from "../../components/FooterHorizontal/FooterHorizontal";

export default inject('store')(observer(
    function LandingComponent(props) {
        const rootstore = useStore()
        const [bySale, setSale] = useState(true)
        const [byAbout, setAbout] = useState(false)
        const [byDiscord, setDiscord] = useState(false)
        const [session, loading] = useSession();

        const showErrorMessage = (value) => {
            rootstore.errMessage = null;
        }

        const handleNavhClick = (btnType) => {
            if (btnType == 'sale') {
                setSale(true)
                setAbout(false)
                setDiscord(false)
            } else if (btnType == 'about') {
                setSale(false)
                setAbout(true)
                setDiscord(false)
                window.open('https://yuser.gitbook.io/yuser-network/yuser-avatars-nextgems/nextgems-faq', '_blank').focus();
            } else if (btnType == 'discore') {
                setSale(false)
                setAbout(false)
                setDiscord(true)
                window.open('https://discord.gg/3PFue8pbCx', '_blank').focus();
            }
        }

        async function handleSearch(event) {
            //TODO
        }


        return (
            <>
                <Container>
                    <FullContainer>
                        {/* Error message */}
                        {rootstore.errMessage && <ErrorMessageSignIn errorMessage={rootstore.errMessage} showErrorMessage={showErrorMessage} />}
                        <MintingContainer>
                            <SearchBar
                                menu={true}
                                title1={session ? "Feed" : 'Login'}
                                link1={session ? "/" : "/signin"}
                                title2={'Market'}
                                link2={"/market"}
                                title3={'Wallet'}
                                link3={"/wallets"}
                                handleChange={handleSearch}
                                page={"home"}
                            />
                            <MainContainer2>
                                <LinearGradient2 />
                                <LinearGradient3 />
                                <Section style={{ marginTop: 0, }}>
                                    <ImageContentComponent
                                        standardTitleLogoSize={false}
                                        srcTitle={null}
                                        textMarginLeft={false}
                                        textMarginRight={true}
                                        imageMaxWidth={600}
                                        title1={"CREATOR"}
                                        title1FontSize={86}
                                        title2={"PORTAL"}
                                        title2FontSize={101}
                                        title3={"NFTS & MORE"}
                                        title3FontSize={60}
                                        description1={"Discover a social metaverse of art, music and technology"}
                                        reverse={true}
                                        mobileReverse={false}
                                        src={"https://yuser-assets.imgix.net/introImages.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"}
                                        leftButton={"Discover NFTs"}
                                        leftHref={"/market"}
                                        rightButton={session ? "" : "Login"}
                                        rightHref={session ? "" : "/signin"}
                                    />
                                </Section>

                                <Section >
                                    <HomepagePostGrid/>
                                </Section>

                                <Section>
                                    <ImageContentComponent
                                        standardTitleLogoSize={false}
                                        srcTitle={yuserApp}
                                        textMarginLeft={true}
                                        textMarginRight={true}
                                        title1={"DISCOVER"}
                                        title1FontSize={70}
                                        title2={"CREATE &"}
                                        title2FontSize={73}
                                        title3={"MONITIZE"}
                                        title3FontSize={73}
                                        description1={"Share content, hodl Gems, mint NFTs."}
                                        description2={""}
                                        reverse={true}
                                        mobileReverse={true}
                                        src={"https://yuser-assets.imgix.net/appScreen1.png?fit=clip&w=300&fm=webp$auto=format&dpr=2"}
                                    />
                                </Section>

                                <Section>
                                    <Image layout="fixed" objectFit="contain" width="233" height="40" src={yuserGems} alt="Yuser Gems" />
                                    <CardsContainer>
                                        <ItemCard  >
                                            <BoxTop>
                                                <Icon
                                                    width="auto"
                                                    height="150px"
                                                    name={Stones}
                                                />
                                            </BoxTop>
                                            <BoxBottom>
                                                <Title>{"ROCKS"}</Title>
                                                <BulletItem>
                                                    <Bullet />{"Earn Rocks for using the app"}
                                                </BulletItem>
                                                <BulletItem>
                                                    <Bullet />{"Use Rocks to gift others"}
                                                </BulletItem>
                                            </BoxBottom>
                                        </ItemCard>
                                        <ItemCard >
                                            <BoxTop >
                                                <Icon
                                                    width="auto"
                                                    height="150px"
                                                    name={GemPink}
                                                />
                                            </BoxTop>
                                            <BoxBottom>
                                                <Title>{"GEMSTONES"}</Title>
                                                <BulletItem>
                                                    <Bullet />{"Rocks turn to Gems"}
                                                </BulletItem>
                                                <BulletItem>
                                                    <Bullet />{"Earn Gems istead of likes"}
                                                </BulletItem>
                                                <BulletItem>
                                                    <Bullet />{"Use Gems to buy"}
                                                </BulletItem>
                                            </BoxBottom>
                                        </ItemCard>
                                        <ItemCard  >
                                            <BoxTop >
                                                <Icon
                                                    width="auto"
                                                    height="150px"
                                                    name={GemTeal}
                                                />
                                            </BoxTop>
                                            <BoxBottom>
                                                <Title>{"DIAMONDS"}</Title>
                                                <BulletItem>
                                                    <Bullet />{"Stake Gems to get"}
                                                </BulletItem>
                                                <BulletItem>
                                                    <Bullet />{"Diamonds are XC-20"}
                                                </BulletItem>
                                                <BulletItem>
                                                    <Bullet />{"Coming soon..."}
                                                </BulletItem>
                                            </BoxBottom>
                                        </ItemCard>
                                    </CardsContainer>
                                    <ButtonMore
                                        onClick={() => handleNavhClick('https://yuser.gitbook.io/yuser-network/protocol-token-economics/untitled')}
                                    >
                                        <BtnText>{'Learn more'}</BtnText>
                                    </ButtonMore>
                                </Section>
                                <Section>
                                    <ImageContentComponent
                                        standardTitleLogoSize={true}
                                        textMarginLeft={true}
                                        textMarginRight={true}
                                        srcTitle={yuserNextGems}
                                        imageMaxWidth={550}
                                        title1={"FIRST NATIVE"}
                                        title1FontSize={61}
                                        title2={"SOCIAL PFP"}
                                        title2FontSize={70}
                                        title3={"COLLECTION"}
                                        title3FontSize={65}
                                        description1={"Hodler rewards, PFP verification, boost your reach, event access + more."}
                                        description2={""}
                                        reverse={false}
                                        mobileReverse={true}
                                        src={"https://yuser-assets.imgix.net/nextGemsSplash.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"}
                                        leftButton={"Learn more"}
                                        leftHref={"/nextgems"}
                                    />
                                </Section>
                            </MainContainer2>
                            <FooterHorizontal />
                        </MintingContainer>
                    </FullContainer>
                </Container>

            </>
        )
    }
))

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const wallets = ["Just to test the hydrate function"]

    return {
        props: {
            session: session,
            initialState: {
                wallets: wallets
            },
        }
    }

}

