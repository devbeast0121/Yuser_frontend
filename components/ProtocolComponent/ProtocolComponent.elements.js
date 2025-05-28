import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const FullContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  z-index: ${(props) => (props.openVideoOverlay ? 99 : 1)};
  margin-top: -70px;
`;

export const TextMain = styled.p`
  font-size: 100%;
  margin-bottom: ${SPACING.large}px;
  color: ${COLORS.white};

  @media screen and (max-width: 1300px) {
    font-size: 90%;
  }

  @media screen and (max-width: 1000px) {
    font-size: 80%;
    margin-bottom: ${SPACING.medium}px;
  }

  @media screen and (max-width: 850px) {
    font-size: 70%;
  }

  @media screen and (max-width: 600px) {
    font-size: 60%;
  }

  @media screen and (max-width: 460px) {
    font-size: 50%;
  }
`;

export const SpanBold = styled.b`
  font-family: "LatoBlack";
  font-size: 100%;
  color: ${COLORS.yellow};
`;

export const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 38px;
`;
export const ImageBox = styled.div`
  display: flex;
  flex: 1;
  margin-left: 10%;

  @media screen and (max-width: 850px) {
    margin: ${SPACING.extraLarge}px;
  }
`;

export const ImageBoxThree = styled.div`
  display: flex;
  position: absolute;
  right: 13%;
  top: 15%;
  z-index: 1;
  max-width: 1100px;

  @media screen and (max-width: 1290px) {
    right: 8%;
  }
  @media screen and (max-width: 850px) {
    right: 2%;
    left: 2%;
  }
`;

export const ItemImage = styled.img`
  max-height: 100%;
  max-width: 100%;

  @media screen and (max-width: 850px) {
    //margin-bottom: ${SPACING.extraLarge}px;
  }
`;

export const StoreDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${SPACING.medium}px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const StoreImage = styled.img`
  max-width: 107px;
  max-height: 31px;
  margin-left: ${SPACING.small};
  margin: ${SPACING.medium};
`;

export const ProtocolBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: ${SPACING.extraLarge}px;

  @media screen and (max-width: 850px) {
    justify-content: center;
    align-items: center;
  }
`;

export const ProtocolContainer = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  margin: ${SPACING.extraLarge}px;
  flex: 1;

  @media screen and (max-width: 850px) {
  }
`;

export const OverlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index:999999;
  width: 100vw;
  height: 100vh;
  background:#000000b0;

  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const TitleOverlay = styled.p`
  font-family: "BrunoAce", "Rubik", "LatoBlack", sans-serif;
  line-height: 1;
  font-size: calc(${(props) => props.fontSize}px + 1 * ((100vw - 320px) / 680));
  //margin-bottom: ${SPACING.large}px;
  @media screen and (max-width: 1000px) {
    font-size: calc(${(props) => props.fontSize}px - 5px);
    margin-bottom: 12px;
  }
  @media screen and (max-width: 850px) {
    font-size: calc(${(props) => props.fontSize}px - 10px);
    margin-bottom: 12px;
  }
`;

export const Title = styled.p`
  font-family: "BrunoAce", "Rubik", "LatoBlack", sans-serif;
  line-height: 1;
  font-size: 63px;
  margin-top: ${SPACING.extraLarge}px;
  margin-bottom: ${SPACING.large}px;
  color: ${COLORS.white}; //${({ theme }) => theme.textPrimary.color};
  text-align: center;
`;

export const WrapperNav = styled.div`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 99999;
  max-width: 1300px;
  justify-content: center;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
`;

export const WrapperComponent = styled.div`
  display: flex;
  position: relative;
  z-index: 120;
  max-width: 1300px;
  justify-content: center;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  flex-direction: "column";
  flex: 1;
  justify-content: "center";
  align-items:center;

  @media screen and (max-width: 850px) {
    align-items: center;
    padding-top: 48px;
    padding-bottom: 48px;
  }

  @media screen and (max-width: 700px) {
    padding-top: 48px;
    padding-bottom: 48px;
  }

  @media screen and (max-width: 480px) {
    background: linear-gradient(180deg, #0000004d, transparent);
  }
`;

export const ImageBoxTwo = styled.div`
  display: flex;
  margin: 40px auto 0px auto;
  max-height: 700px;
  max-width: 1100px;

  @media screen and (max-width: 850px) {
    max-width: 700px;
    min-width: 300px;
  }
`;

export const Box = styled.div`
  display: flex;
  position: relative;
  min-height: ${(props) => (props.mobileSize ? null : "100vh")};
  overflow:hidden;
  align-items:center;
  justify-content:center;

  @media screen and (max-width: 850px) {
    //min-height:inset;
  }
`;

export const FlexDirectionWrap = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 850px) {
    display: inline;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const GradientWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: 110;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
`;

export const RoadmapMain = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 50px;
  margin-right: ${SPACING.large}px;
  margin-left: ${SPACING.large}px;
`;

export const RoadStepBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

export const TimeStep = styled.p`
  margin-right: 50px;
  white-space: nowrap;
  font-size: 32px;
  font-family: "LatoBlack";
  color: ${(props) => props.theme.textPrimary.color};
`;

export const StepTitle = styled.p`
  color: ${COLORS.yellow};
  font-family: "LatoBlack";
  margin-top: ${SPACING.small}px;
  margin-bottom: ${SPACING.medium}px;
`;
export const MapBox = styled.div`
  display: flex;
  margin-right: ${SPACING.large}px;
  flex-direction: column;
`;

export const MapA = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textPrimary.color};
`;

export const MapB = styled.div`
  display: flex;
  height: 100px;
  width: 6px;
  margin-left: 12px;
  background-color: ${(props) => props.theme.textPrimary.color};

  @media screen and (max-width: 850px) {
    height: 130px;
  }
`;

export const RoadDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
`;

export const Alink = styled.a`
  text-decoration: none;
  opacity: 0.7;
  :link {
    color: ${({ theme }) => theme.textSecondary.color};
  }

  :visited {
    color: ${({ theme }) => theme.textSecondary.color};
  }

  :hover {
    opacity: 0.4;
    color: ${({ theme }) => theme.textSecondary.color};
  }

  :active {
    opacity: 0.4;
    color: ${({ theme }) => theme.textSecondary.color};
  }
`;
