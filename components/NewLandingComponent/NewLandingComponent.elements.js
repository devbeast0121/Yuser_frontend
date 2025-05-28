import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

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

export const CardsContainer = styled.div`
  display: flex;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${SPACING.large}px;
  margin-top: ${SPACING.large}px;
  margin-bottom: ${SPACING.large}px;
  padding-left: ${SPACING.large}px;
  padding-right: ${SPACING.large}px;
  position: relative;
  z-index: 1;
  @media screen and (max-width: 991px) {
    display: grid;
    grid-template-columns: 1fr;
    padding-left: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
  }
`;

export const ItemCard = styled.div`
  display: flex;
  width: 100%;
  height: 470px;
  border-radius: 20px;
  background-color: #1e2431;
  flex-direction: column;
  overflow: hidden;
  @media screen and (max-width: 991px) {
    height: 230px;
    max-width: 600px;
    width: 100%;
    flex-direction: row;
    margin-bottom: ${SPACING.large}px;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (max-width: 580px) {
    max-width: 360px;
    width: 100%;
    height: 470px;
    border-radius: 20px;
    background-color: ${COLORS.blackDarkMedium};
    flex-direction: column;
    overflow: hidden;
  }
`;

export const Title = styled.p`
  font-size: 33px;
  font-family: "BrunoAce", "Rubik", "LatoBlack", sans-serif;
  color:#FEFC40;
  text-shadow: 0px 1px, 1px 0px, 1px 0px;
  margin-bottom: ${SPACING.large}px;
`;

export const Bullet = styled.div`
  display: flex;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: ${COLORS.white};
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: ${SPACING.small}px;
`;

export const ButtonMore = styled.div`
  display: flex;
  width: 20%;
  height: 40px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.purple};
  margin-top: ${SPACING.large}px;
  margin-bottom: ${SPACING.extraLarge}px;
  cursor: pointer;
  align-self: center;
  @media screen and (max-width: 991px) {
    width: 150px;
  }
`;

export const BtnText = styled.p`
  color: ${COLORS.white};
  font-family: "LatoBlack";
`;

export const MainContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  position: relative;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 850px) {
    margin: 0;
    flex-direction: column;
  }
`;
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin: 0px 0;
  max-width: 50vw;
  width: 50%;
  @media screen and (max-width: 850px) {
    max-width: 100vw;
    width: 100%;
  }
`;
export const MintingContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow: hidden;
`;
export const OverlayContainerSignUp = styled.div`
  display: flex;
  flex-direction: column;
  width: 379px;
  height: 592px;
  background: #0b1731;
  padding-top: ${SPACING.large}px;
  padding-bottom: ${SPACING.large}px;
  border-radius: 15px;
  position: relative;
  @media screen and (max-width: 700px) {
    width: 400px;
  }
  @media screen and (max-width: 480px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`;
export const ImageBox = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  height: 75%;

  flex: 1;
  @media screen and (max-width: 850px) {
    margin-top: ${(props) =>
      props.reverse && props.mobileReverse
        ? 0
        : props.mobileReverse
        ? SPACING.large
        : props.reverse
        ? SPACING.large
        : 0}px;
    order: ${(props) =>
      props.mobileReverse && props.reverse ? 1 : props.reverse ? 2 : 1};
  }
`;
export const TitleOverlay = styled.p`
  font-family: "Rubik", "LatoBlack", sans-serif;
  line-height: 1;
  font-size: calc(${(props) => props.fontSize}px + 1 * ((100vw - 320px) / 680));
  //margin-bottom: ${SPACING.large}px;
  @media screen and (max-width: 1000px) {
    font-size: calc(${(props) => props.fontSize}px - 5px);
    margin-bottom: 12px;
  }
  @media screen and (max-width: 750px) {
    font-size: calc(${(props) => props.fontSize}px - 10px);
    margin-bottom: 12px;
  }
`;
export const StoreImage = styled.img`
    max-width:107px;
    max-height:31px;
    margin-left:${SPACING.small}
    margin:${SPACING.medium}
    @media screen and (max-width: 600px){
       
    }
`;
export const StoreDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-contents: space-between;
  margin-top: ${SPACING.medium}px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
