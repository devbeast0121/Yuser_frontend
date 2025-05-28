import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { getSession } from "next-auth/client";
import { ErrorMessageSignIn } from "../../components/ErrorMessageSignIn/ErrorMessageSignIn";
import { useStore } from "../../stores/RootStore";
import { COLORS } from "../../styles/Styling";

import {
  FullContainer,
  ImageBox,
  ItemImage,
  StoreDiv,
  StoreImage,
  OverlayContainer,
  TitleOverlay,
  ContentBox,
  TextMain,
  SpanBold,
  ProtocolContainer,
  Title,
  WrapperNav,
  WrapperComponent,
  Box,
  FlexDirectionWrap,
  ImageBoxThree,
  ProtocolBox,
  GradientWrapper,
  RoadmapMain,
  RoadStepBox,
  TimeStep,
  StepTitle,
  MapBox,
  MapA,
  MapB,
  RoadDescriptionBox,
  Alink,
} from "../../components/ProtocolComponent/ProtocolComponent.elements";
import Close from "../../public/icons/close.svg";
import { BtnClose } from "../LoginMain/Login.elements";
import ImageContentComponent from "../../components/ImageContentComponent/ImageContentComponent";
import Icon from "../../components/Icon/Icon";
import GradientSection from "../GradientSection/GradientSection";
import FooterHorizontal from "../../components/FooterHorizontal/FooterHorizontal";

export default inject("store")(
  observer(function ProtocolComponent(props) {
    const rootstore = useStore();
    const [openVideoOverlay, setOpenVideoOverlay] = useState(false);
    const [mobileSize, setMobileSize] = useState(false);
    const [nftGraphImage, setNftGraphImage] = useState(false);
    const [monitizeImage, setMonitizeImage] = useState(false);
    const [decentralizeImage, setDecentralizeImage] = useState(false);
    const [typeVideo, setTypeVideo] = useState("");

    const showErrorMessage = (value) => {
      rootstore.errMessage = null;
    };

    async function handleSearch(event) {
      //TODO
    }

    const Video = () => {
      //const srcLong = "https://youtu.be/WEZgvyrG5Uc"; long
      //const srcShort = "https://youtu.be/utOK7sV18Cw"; short
      return (
        <>
          {typeVideo == "longVideo" ? (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/WEZgvyrG5Uc"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          ) : (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/utOK7sV18Cw"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )}
        </>
      );
    };

    React.useEffect(() => {
      catchWindowNarrowSize();
      window.addEventListener("resize", catchWindowNarrowSize);
      return () => window.removeEventListener("resize", catchWindowNarrowSize);
    }, []);

    const catchWindowNarrowSize = () => {
      if (window.innerWidth < 850) {
        setNftGraphImage(
          "https://yuser-assets.imgix.net/protocol/base-profile-nft-graph-mobile.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"
        );
        setMonitizeImage(
          "https://yuser-assets.imgix.net/protocol/monetization-graph-mobile.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"
        );
        setDecentralizeImage(
          "https://yuser-assets.imgix.net/protocol/total-graph-mobile-1.png?fit=clip&w=400&fm=webp$auto=format&dpr=2"
        );
      } else {
        setNftGraphImage(
          "https://yuser-assets.imgix.net/protocol/base-profile-nft-graph.png?fit=clip&w=600&fm=webp$auto=format&dpr=2"
        );
        setMonitizeImage(
          "https://yuser-assets.imgix.net/protocol/monetization-graph.png?fit=clip&w=1000&fm=webp$auto=format&dpr=2"
        );
        setDecentralizeImage(
          "https://yuser-assets.imgix.net/protocol/social-graph.png?fit=clip&w=1000&fm=webp$auto=format&dpr=2"
        );
      }

      if (window.innerWidth < 700) {
        setMobileSize(true);
      } else {
        setMobileSize(false);
      }
    };

    function openVideo(value, type) {
      setOpenVideoOverlay(value);
      setTypeVideo(type);
    }

    return (
      <>
        <FullContainer openVideoOverlay={openVideoOverlay} className="Flex">
          {/* Error message */}
          {rootstore.errMessage && (
            <ErrorMessageSignIn
              errorMessage={rootstore.errMessage}
              showErrorMessage={showErrorMessage}
            />
          )}

          <Box mobileSize={mobileSize} className="Flex">
            <GradientSection
              bagroundColor={"#371750"}
              opacity={1}
              angle={135}
              colorStart={"#8C30DB"}
              colorStartLength={""}
              colorSecond={"#9E31C9"}
              colorSecondLength={"15%"}
              colorMiddle={"#81268B"}
              colorMiddleLength={"40%"}
              colorStop={"#F23577"}
              zIndex={99}
            />
            <GradientWrapper>
              <GradientSection
                bagroundColor={"#371750"}
                opacity={1}
                angle={205}
                colorStart={"#A22B54"}
                colorStartLength={"0%"}
                colorSecond={"#f2357700"}
                colorSecondLength={"30%"}
                colorStop={"#f2357700"}
                zIndex={111} //not less than 110 <GradientWrapper: z-index=110
              />
            </GradientWrapper>
            <WrapperComponent>
              <ImageContentComponent
                direction={"row"}
                textMarginLeft={false}
                textMarginRight={false}
                subTitle={"WEB3 SOCIAL NETWORKING PROTOCOL"}
                subTitleColor={COLORS.yellow}
                subTitleFontSize={20}
                title1={"THE SOCIAL PROTOCOL"}
                title1FontSize={45}
                title2={"BUILT FOR YOU"}
                title2FontSize={71}
                title3={""}
                title3FontSize={0}
                description1={
                  "Owning your social profile – data sovereignty – is the fundation of future societies. Your content. Your profile. Your followers. Yuser."
                }
                descriptionFontSize={30}
                descriptionColor={COLORS.white}
                reverse={true}
                mobileReverse={true}
                doubleImage={true}
                imageMaxWidth={600}
                src={
                  "https://yuser-assets.imgix.net/protocol/gloss-front-content-promo.png?fit=clip&w=600&fm=webp$auto=format&dpr=2"
                }
                leftButton={"WATCH THE VIDEO"}
                leftHref={"/404?type=notice"}
                leftButtonColor={"#F23577"}
                openVideoOverlay={openVideoOverlay}
                openVideo={() => {
                  openVideo(true, "shortVideo");
                }}
              />
            </WrapperComponent>
          </Box>
          <Box mobileSize={mobileSize} className="Flex">
            <GradientSection
              bagroundColor={"#371750"}
              opacity={1}
              angle={90}
              colorStart={"#55182D"}
              colorStartLength={"0%"}
              colorMiddle={"#862748"}
              colorStop={"#5C1952"}
              zIndex={99}
            />
            <GradientWrapper>
              <GradientSection
                bagroundColor={"#371750"}
                opacity={1}
                angle={190}
                colorStart={"#3B1136"}
                colorStartLength={"0%"}
                colorMiddle={"#57194e00"}
                colorStop={"#1a081770"}
                zIndex={111} //not less than 110 <GradientWrapper: z-index=110
              />
            </GradientWrapper>
            <WrapperComponent>
              <FlexDirectionWrap className="Flex">
                <ProtocolBox className="Flex">
                  <ItemImage objectFit="cover" src={nftGraphImage} />
                </ProtocolBox>
                <ProtocolContainer className="Flex">
                  <ContentBox style={{ flexDirection: "column" }}>
                    <TextMain>
                      {"Web2 social networks are built to be monetizable by "}
                      <SpanBold>{"tech giants "}</SpanBold>
                      {"not by you."}
                    </TextMain>
                    <TextMain>
                      {"The "}
                      <SpanBold>{"Yuser Protocol "}</SpanBold>
                      {
                        "shifts this paradigm by creating a defi protocol layer that allows you to"
                      }{" "}
                      <SpanBold>
                        {"own your profile, content, and data."}
                      </SpanBold>
                    </TextMain>
                  </ContentBox>
                </ProtocolContainer>
              </FlexDirectionWrap>
            </WrapperComponent>
          </Box>
          <Box mobileSize={mobileSize} className="Flex">
            <GradientSection
              bagroundColor={"#371750"}
              opacity={1}
              angle={90}
              colorStart={"#411222"}
              colorStartLength={"0%"}
              colorMiddle={"#722152"}
              colorStop={"#4D1645"}
              zIndex={99}
            />
            <GradientWrapper>
              <GradientSection
                bagroundColor={"#371750"}
                opacity={1}
                angle={190}
                colorStart={"#3B1136"}
                colorStartLength={"0%"}
                colorMiddle={"#57194e00"}
                colorStop={"#1a081747"}
                zIndex={111} //not less than 110 <GradientWrapper: z-index=110
              />
            </GradientWrapper>
            <WrapperComponent>
              <ImageContentComponent
                direction={"column"}
                subTitle={"WITH YUSER THE JOURNEY STARTS WITH YOU"}
                subTitleColor={COLORS.yellow}
                subTitleFontSize={24}
                textMarginLeft={true}
                textMarginRight={false}
                title1={"DECENTRALIZE YOURSELF"}
                title1FontSize={55}
                title2={""}
                title2FontSize={0}
                title3={""}
                title3FontSize={0}
                description1={""}
                description2={""}
                descriptionColor={COLORS.white}
                reverse={true}
                mobileReverse={false}
                imageMaxWidth={1000}
                src={decentralizeImage}
                bottomButton={"WATCH THE VIDEO"}
                bottomHref={"/404?type=notice"}
                bottomButtonColor={"#F23577"}
                openVideoOverlay={openVideoOverlay}
                openVideo={() => {
                  openVideo(true, "shortVideo");
                }}
              />
            </WrapperComponent>
          </Box>
          <Box mobileSize={mobileSize} className="Flex">
            <GradientSection
              bagroundColor={"#371750"}
              opacity={1}
              angle={90}
              colorStart={"#57172D"}
              colorStartLength={"0"}
              colorMiddle={"#571A3C"}
              colorStop={"#2E1246"}
              zIndex={99}
            />
            <WrapperComponent>
              <ImageContentComponent
                direction={"column"}
                subTitle={"THE SOCIAL PROTOCOL THAT LETS YOU"}
                subTitleColor={COLORS.yellow}
                subTitleFontSize={20}
                textMarginLeft={true}
                textMarginRight={false}
                title1={"MONETIZE YOUR SOCIAL"}
                title1FontSize={60}
                title2={""}
                title2FontSize={0}
                title3={""}
                title3FontSize={0}
                description1={
                  "Now that you own your profile, content and data, you can easily take it across applications to buy and sell on your own terms. Decentralize yourself."
                }
                descriptionColor={COLORS.white}
                reverse={true}
                mobileReverse={false}
                imageMaxWidth={1000}
                src={monitizeImage}
                //bottomButton={"LEARN MORE"}
                //bottomHref={"/404?type=notice"}
                //  bottomButtonColor={'#F23577'}
              />
            </WrapperComponent>
          </Box>
          <Box mobileSize={mobileSize} className="Flex">
            <GradientSection
              bagroundColor={"#371750"}
              opacity={1}
              angle={90}
              colorStart={"#133857"}
              colorStartLength={""}
              colorStop={"#641B35"}
              zIndex={99}
            />
            <WrapperComponent>
              <ImageContentComponent
                direction={"row"}
                subTitle={"WEB3 SOCIAL NETWORKING PROTOCOL"}
                subTitleColor={COLORS.yellow}
                subTitleFontSize={20}
                textMarginLeft={true}
                textMarginRight={false}
                title1={"THE SOCIAL PROTOCOL"}
                title1FontSize={46}
                title2={"FOR DEVELOPERS"}
                title2FontSize={60}
                title3={""}
                title3FontSize={0}
                description1={
                  "Onboard users and their followers easily with rewards. No metamask or minting fees. Monetize transactions in your app."
                }
                descriptionColor={COLORS.white}
                reverse={true}
                mobileReverse={true}
                imageMaxWidth={1000}
                src={
                  "https://yuser-assets.imgix.net/protocol/social-graph-3.png?fit=clip&w=600&fm=webp$auto=format&dpr=2"
                }
                // leftButton={"LEARN MORE"}
                // leftHref={"/404?type=notice"}
                // leftButtonColor={'#F23577'}
              />
            </WrapperComponent>
          </Box>
          {/*} <Box className="Flex">
                        <GradientSection
                            bagroundColor={"#371750"}
                            opacity={1}
                            angle={90}
                            colorStart={"#411222"}
                            colorStartLength={""}
                            colorStop={"#4D1645"}
                            zIndex={120}
                        //gradientStart1={"65,18,34"} deg1={100} opaqueStart1={1} gradientEnd1={"77,22,69"} opaqueEnd1={1} diff1={"100%"}
                        // gradientStart2={"255,255,255"} deg2={0} opaqueStart2={0} gradientEnd2={"255,255,255"} opaqueEnd2={0} diff2={"0%"}
                        // gradientStart3={"255,255,255"} deg3={0} opaqueStart3={0} gradientEnd3={"255,255,255"} opaqueEnd3={0} diff3={"0%"}
                        // gradientStart4={"255,255,255"} deg4={0} opaqueStart4={0} gradientEnd4={"255,255,255"} opaqueEnd4={0} diff4={"0%"}
                        //gradientStart5={"255, 255, 255"} deg5={0} opaqueStart5={0} gradientEnd5={pink} opaqueEnd5={0} diff5={"0%"}
                        />
                        <WrapperComponent style={{ flexDirection: "column", flex: 1, justifyContent: "center" }}>
                            <ImageContentComponent
                                direction={"column"}
                                logoHeight={20}
                                logoWidth={300}
                                srcTitle={"https://yuser-assets.imgix.net/protocol/protocolLogoToken.png?fit=clip&w=150&fm=webp$auto=format&dpr=2"}
                                textMarginLeft={true}
                                textMarginRight={false}
                                title1={incentivizeTitle1}
                                title1FontSize={60}
                                title2={incentivizeTitle2}
                                title2FontSize={60}
                                title3={incentivizeTitle3}
                                title3FontSize={60}
                                description1={incentivizeText1}
                                description2={incentivizeText2}
                                reverse={true}
                                mobileReverse={false}
                                imageMaxWidth={1000}
                                src={nftGraphImage}
                                leftButton={"LEARN MORE"}
                                leftHref={"/market"}
                                leftButtonColor={COLORS.red}
                            />
                        </WrapperComponent>
                    </Box> */}
          {/*<Box className="Flex">
                        <GradientSection
                            bagroundColor={"#371750"}
                            opacity={1}
                            angle={90}
                            colorStart={"#461526"}
                            colorStartLength={"40%"}
                            colorStop={"#2E1246"}
                            zIndex={99}
                        //gradientStart1={"70,21,38"} deg1={80} opaqueStart1={1} gradientEnd1={"46,18,70"} opaqueEnd1={1} diff1={"100%"}
                        // gradientStart2={"255,255,255"} deg2={0} opaqueStart2={0} gradientEnd2={"255,255,255"} opaqueEnd2={0} diff2={"0%"}
                        // gradientStart3={"255,255,255"} deg3={0} opaqueStart3={0} gradientEnd3={"255,255,255"} opaqueEnd3={0} diff3={"0%"}
                        //gradientStart4={"255,255,255"} deg4={0} opaqueStart4={0} gradientEnd4={"255,255,255"} opaqueEnd4={0} diff4={"0%"}
                        //gradientStart5={"255, 255, 255"} deg5={0} opaqueStart5={0} gradientEnd5={pink} opaqueEnd5={0} diff5={"0%"}
                        />
                        <WrapperComponent style={{ flexDirection: "column", alignItems: "center", }}>
                            <Title>{"ROADMAP"}</Title>
                            {!mobileSize ?
                                <RoadmapMain>
                                    <RoadStepBox >
                                        <TimeStep >{"NOV 2022"}</TimeStep>
                                        <MapBox >
                                            <MapA />
                                            <MapB />
                                        </MapBox>
                                        <RoadDescriptionBox>
                                            <StepTitle >{"Gemstaking launch"}</StepTitle>
                                            <p>{"Launch of Gemstaking in the yuser app. First chance to start earning Diamonds pre-tge"}</p>
                                        </RoadDescriptionBox>
                                    </RoadStepBox>
                                    <RoadStepBox >
                                        <TimeStep >{"NOV 2022"}</TimeStep>
                                        <MapBox >
                                            <MapA />
                                            <MapB />
                                        </MapBox>
                                        <RoadDescriptionBox >
                                            <StepTitle >{"Diamond token sale"}</StepTitle>
                                            <p>{"Compatible with Ethereum,Polkadot and other EVM chains."}</p>
                                        </RoadDescriptionBox>
                                    </RoadStepBox>
                                    <RoadStepBox >
                                        <TimeStep >{"NOV 2022"}</TimeStep>
                                        <MapBox >
                                            <MapA />
                                            <MapB />
                                        </MapBox>
                                        <RoadDescriptionBox >
                                            <StepTitle >{"Diamond token sale"}</StepTitle>
                                            <p>{"Compatible with Ethereum,Polkadot and other EVM chains."}</p>
                                        </RoadDescriptionBox>
                                    </RoadStepBox>
                                </RoadmapMain>
                                :
                                <RoadmapMain>
                                    <RoadStepBox >
                                        <MapBox >
                                            <MapA />
                                            <MapB />
                                        </MapBox>
                                        <RoadDescriptionBox>
                                            <TimeStep >{"NOV 2022"}</TimeStep>
                                            <StepTitle >{"Gemstaking launch"}</StepTitle>
                                            <p>{"Launch of Gemstaking in the yuser app. First chance to start earning Diamonds pre-tge"}</p>
                                        </RoadDescriptionBox>
                                    </RoadStepBox>
                                    <RoadStepBox >
                                        <MapBox >
                                            <MapA />
                                            <MapB />
                                        </MapBox>
                                        <RoadDescriptionBox >
                                            <TimeStep >{"NOV 2022"}</TimeStep>
                                            <StepTitle >{"Diamond token sale"}</StepTitle>
                                            <p>{"Compatible with Ethereum,Polkadot and other EVM chains."}</p>
                                        </RoadDescriptionBox>
                                    </RoadStepBox>
                                    <RoadStepBox >
                                        <MapBox >
                                            <MapA />
                                            <MapB />
                                        </MapBox>
                                        <RoadDescriptionBox >
                                            <TimeStep >{"NOV 2022"}</TimeStep>
                                            <StepTitle >{"Diamond token sale"}</StepTitle>
                                            <p>{"Compatible with Ethereum,Polkadot and other EVM chains."}</p>
                                        </RoadDescriptionBox>
                                    </RoadStepBox>
                                </RoadmapMain>
                            }
                        </WrapperComponent>
                    </Box> */}
          <Box mobileSize={mobileSize} className="Flex">
            <GradientSection
              bagroundColor={"#371750"}
              opacity={1}
              angle={90}
              colorStart={"#461526"}
              colorStartLength={"40%"}
              colorStop={"#2E1246"}
              zIndex={99}
            />
            <WrapperComponent
              style={{ flexDirection: "column", alignItems: "center" }}
            >
              <ProtocolBox className="Flex">
                <ItemImage
                  objectFit="cover"
                  src={
                    "https://yuser-assets.imgix.net/protocol/background-graph.png?fit=clip&w=500&fm=webp$auto=format&dpr=2"
                  }
                />
              </ProtocolBox>
              <GradientWrapper
                style={{
                  textAlign: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Title style={{ marginTop: 0, marginBottom: 0 }}>
                  {"ROADMAP"}
                </Title>
                <Title style={{ marginTop: 0, marginBottom: 0 }}>
                  {"COMING SOON"}
                </Title>
                <TextMain style={{ fontSize: 30 }}>
                  {"Check back for more info on our roadmap."}
                </TextMain>
              </GradientWrapper>
            </WrapperComponent>
          </Box>
          {/* for how it works button video button*/}
          {openVideoOverlay && (
            <>
              <div
                className="flex"
                style={{
                  position: "fixed",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  background: COLORS.black50,
                  zIndex: 999999,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <OverlayContainer>
                  <div
                    className="flex"
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      height: 50,
                      width: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "black",
                      borderRadius: 5,
                    }}
                  >
                    <BtnClose
                      onClick={() => {
                        setOpenVideoOverlay(false);
                      }}
                    >
                      <Icon
                        strokeWidth="3"
                        height="auto"
                        width="24px"
                        name={Close}
                        strokeColor="white"
                      />
                    </BtnClose>
                  </div>
                  <div
                    className="flex"
                    style={{ width: "98vw", height: "98vh" }}
                  >
                    <Video typeVideo={typeVideo} />
                  </div>
                </OverlayContainer>
              </div>
            </>
          )}
          <FooterHorizontal protocol={true} />
        </FullContainer>
      </>
    );
  })
);

export async function getServerSidePrGradientWrapper(context) {
  const session = await getSession(context);
  const wallets = ["Just to test the hydrate function"];

  return {
    prGradientWrapper: {
      session: session,
      initialState: {
        wallets: wallets,
      },
    },
  };
}
