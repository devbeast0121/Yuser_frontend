import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const MainMarketContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  flex: 1;
`;

export const MarketPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 24px;
  padding-left: ${SPACING.large}px;
  padding-right: ${SPACING.large}px;

  @media screen and (max-width: 1900px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 1700px) {
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 20px;
  }

  @media screen and (max-width: 1390px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    padding-left: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
  }
`;

export const ItemBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: ${SPACING.large}px;
`;

export const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding-bottom: ${SPACING.medium}px;
`;

export const StatusBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: ${(props) =>
    props.positionLeft ? "flex-start" : "flex-end"};
  align-items: center;
  // margin-left: ${(props) => (props.positionLeft ? -24 : "auto")}px;
  // margin-right: ${(props) => (props.positionLeft ? "auto" : -24)}px;
`;

export const SubBoxTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.positionLeft ? "flex-start" : "flex-end")};
  margin-left: ${(props) => (props.positionLeft ? SPACING.small : 0)}px;
  margin-right: ${(props) => (props.positionLeft ? 0 : SPACING.small)}px;
`;

export const ContentSection = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-top: ${SPACING.medium}px;
  margin-bottom: ${SPACING.medium}px;
  cursor: pointer;
`;

export const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${SPACING.medium}px;
`;

export const SubBoxBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${SPACING.small}px;
`;

export const TxtLarge = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  font-family: "LatoBlack";
  text-align: ${(props) => (props.positionLeft ? "left" : "right")};
`;

export const TxtMedium = styled.p`
  font-size: ${FONT_SIZE.small}px;
  font-family: "LatoBlack";
  text-align: ${(props) => (props.positionLeft ? "left" : "right")};
`;

export const TxtSmall = styled.p`
  font-size: ${FONT_SIZE.extraSmall}px;
  color: ${props => props.theme.textSecondary.color};
  font-family: "LatoBlack";
`;

export const BtnWrap = styled.div`
  display: flex;
  background-color: transparent;
  font-family: "LatoBlack";
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 200px;
`;

export const BackdropOverlay = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.2;
`;

export const ImageNFT = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;

`;
