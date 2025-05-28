import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";
import Image from "next/image";

export const MainWalletContainer = styled.div`
  display: flex;
  flex-direction:column;  
  max-width: 836px;
  width: 100%;
  margin-top: ${SPACING.large}px;
`;

export const WalletPostsContainer = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  @media screen and (max-width: 780px) {
    //640
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 30px;
  }
`;

export const ItemBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: ${SPACING.large}px;
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
  // margin-left: ${(props) => (props.positionLeft ? -24 : "auto")}px;
  // margin-right: ${(props) => (props.positionLeft ? "auto" : -24)}px;
`;

export const SubBoxTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.positionLeft ? "flex-start" : "flex-end")};
  margin-left: ${(props) => (props.positionLeft ? SPACING.medium : 0)}px;
  margin-right: ${(props) => (props.positionLeft ? 0 : SPACING.small)}px;
`;

export const ContentImage = styled(Image)`
  border-radius: 10px;
  margin-top: ${SPACING.medium}px;
  margin-bottom: ${SPACING.medium}px;
  cursor: pointer;
  flex: 1;
  height: 100%;
  width: 100%;
`;

export const BottomBox = styled.div`
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

export const TxtLarge = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  font-family: "LatoBlack";
  text-align: ${(props) => (props.positionLeft ? "left" : "right")};
  margin-top: ${SPACING.medium}px;
`;
export const TxtLargeUname = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  font-family: "LatoBlack";
  text-align: ${(props) => (props.positionLeft ? "left" : "right")};
`;

export const TxtSmall = styled.p`
   font-size: ${FONT_SIZE.small}px;
   color: ${({ theme }) => theme.textSecondary.color} 
   font-family: 'LatoRegular';
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

export const NftEmpty = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  border-radius: 15px;
  padding: 40px 24px;
`;
export const NftTitle = styled.p`
  font-size: ${FONT_SIZE.large}px;
  font-family: "Rubik", "LatoBlack", sans-serif;
`;
export const NftDescription = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  font-family: "LatoRegular";
  margin-bottom: 16px;
`;
export const NftImage = styled.div`
  display: flex;
  border-radius: 10px;
  overflow: hidden;
`;
export const Text = styled.p`
  text-align: center;
  font-size: ${FONT_SIZE.large}px;
  font-family: "LatoRegular";
  padding-left: ${SPACING.small}px;
`;
