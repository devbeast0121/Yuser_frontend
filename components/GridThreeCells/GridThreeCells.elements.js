import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  flex: 1;
  margin-top: ${SPACING.large}px;
`;

export const GridPostsContainer = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  padding-left: ${SPACING.large}px;
  padding-right: ${SPACING.large}px;
  padding-bottom: ${SPACING.large}px;

  @media screen and (max-width: 1390px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ItemBox = styled.div`
  display: flex;
  aspect-ratio: 1 / 1;
  flex-direction: column;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  cursor: pointer;
  flex: 1;
  min-height: 33%;
  min-width: 33%;

  &:before {
    padding-bottom: 100%;
    display: block;
    display: grid;
    content: none;
  }
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
export const Backdrop = styled.div`
  display: flex;
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

export const ScrollButton = styled.button`
  position: fixed;
  left: 92%;
  bottom: 40px;
  font-size: 12px;
  z-index: 99;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary.color};
  background-color: ${(props) => props.theme.container.color};
  height: 40px;
  border-width: 1px;
  border-color: ${COLORS.purple};
  border-style: solid;
  width: 94px;
  border-radius: 5px;

  @media screen and (max-width: 991px) {
    right: ${SPACING.medium}px;
    left: auto;
  }

  @media screen and (max-width: 700px) {
    right: ${SPACING.small}px;
    left: auto;
  }
`;
export const TxtButton = styled.p`
  font-size: ${FONT_SIZE.small}px;
  font-family: "LatoBlack";
`;

export const ImageNFT = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  //grid-area: 1 / 1 / 2 / 2;
`;

export const BottomBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding-bottom: ${SPACING.small}px;
  padding-left: ${SPACING.medium}px;
  padding-right: ${SPACING.medium}px;
  background: linear-gradient(0deg, #0c1017ab, transparent);
  z-index: 9;
  flex-direction: row;
  justify-content: space-between;
`;

export const BtnWrap = styled.div`
  display: flex;
  background-color: transparent;
  font-family: "LatoBlack";
  justify-content: ${(props) =>
    props.positionLeft ? "flex-start" : "flex-end"};
  align-items: center;
  height: 40px;
`;

export const TxtLarge = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  font-family: "LatoBlack";
  padding-left: ${SPACING.small}px;
  color: ${COLORS.white};
  text-shadow: 3px 3px 5px ${COLORS.blackMedium};
`;

export const TxtLargeNFT = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  font-family: "LatoBlack";
  padding-left: ${SPACING.small}px;
  margin-top: ${SPACING.medium}px;
`;

export const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  margin-bottom: ${SPACING.medium}px;
`;

export const StatusBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: ${(props) =>
    props.positionLeft ? "flex-start" : "flex-end"};
  align-items: center;
`;

export const SubBoxTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.positionLeft ? "flex-start" : "flex-end")};
  margin-left: ${(props) => (props.positionLeft ? SPACING.medium : 0)}px;
  margin-right: ${(props) => (props.positionLeft ? 0 : SPACING.small)}px;
`;

export const TxtSmall = styled.p`
  font-size: ${FONT_SIZE.small}px;
  color: ${props => props.theme.textSecondary.color};
  font-family: "LatoRegular";
`;

export const TxtLargeUname = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  font-family: "LatoBlack";
  text-align: ${(props) => (props.positionLeft ? "left" : "right")};
`;

export const BottomBoxNft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubBoxBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${SPACING.medium}px;
`;

export const Text = styled.p`
  text-align: center;
  font-size: ${FONT_SIZE.large}px;
  font-family: "LatoBlack";
  padding-left: ${SPACING.small}px;
`;

export const ItemBoxNfT = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: ${SPACING.large}px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 9999;
`;