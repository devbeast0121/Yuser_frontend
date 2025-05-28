import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const MainContainer = styled.div`
  display: flex;
  align-self: center;
  width: 100%;
  height: 70px;
  border-bottom: ${(props) => (props.page == "home" ? 1 : 0)}px solid
    ${COLORS.blackDarkMedium};
  padding-left: ${SPACING.large}px;
  padding-right: ${SPACING.large}px;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  z-index: 9;
  position:absolute;
  top:0;
  background: linear-gradient(180deg, #0000009e, transparent);

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 24px;
  text-shadow:0 2px 8px rgba(0,0,0,0.8);
`;

export const ButtonLink = styled.button`
  display: flex;
  height: 40px;
  border-radius: 5px;
  border-color: ${(props) => (props.left ? COLORS.purple : "transparent")};
  border-width: 2px;
  border-style: solid;
  justify-content: center;
  align-items: center;
  box-shadow:0 2px 8px rgba(0,0,0,0.3);
  width: ${(props) => (props.left ? "20%" : "10%")};
  background-color: ${(props) => (props.left ? "transparent" : COLORS.purple)};
  //margin-right: ${(props) => (props.left ? 0 : SPACING.medium)}px;
  margin-left: ${(props) => (!props.left ? 0 : SPACING.medium)}px;
  padding-left: ${SPACING.extraLarge}px;
  padding-right: ${SPACING.extraLarge}px;
  cursor: pointer;

  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  :hover {
    opacity: 0.95;
    -webkit-transform: scale(0.99);
    -ms-transform: scale(0.99);
    transform: scale(0.99);
  }
  :active {
    -webkit-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
  }
`;
export const TextInput = styled.input`
    display: flex;
    width: 100%;
    align-items: flex-start;
    background-color: transparent;
    margin-left: 10px;
    border: none;
    outline: none;
    line-height: 36px;
    height: 40px;
    cursor: auto;
    caret-color: #FFF;
    @media screen and (max-width: 960px){
       max-width: 100%;
       margin-left: ${SPACING.small}px;
       margin-right: ${SPACING.large}px;
    }
`;

export const LogoImg = styled.img`
  height: 30px;
  margin-top: ${SPACING.medium}px;
  padding-right: ${SPACING.medium}px;
`;
export const BtnText = styled.p`
  color: ${COLORS.white};
  font-family: "LatoBlack";
  flex-shrink: 0;
`;

export const Alink = styled.a`
  text-decoration-line: ${(props) => (props.active ? "underline" : "none")};
  text-decoration-color: ${(props) => (props.active ? COLORS.purple : "none")};
  text-decoration-thickness: ${(props) => (props.active ? "3px" : "none")};
  text-underline-offset: ${(props) => (props.active ? "17px" : "none")};
  font-family: "Rubik", "LatoBlack", sans-serif;
  margin-left: ${SPACING.large}px;

  :link {
    color: ${COLORS.white};
  }

  :visited {
    color: ${COLORS.white};
  }

  :hover {
    opacity: 0.6;
    color: ${COLORS.white};
  }

  :active {
    opacity: 0.6;
    color: ${COLORS.white};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const OverlayContainerSignUp = styled.div`
  display: flex;
  flex-direction: column;
  width: 379px;
  background: #0b1731;
  border-radius: 15px;
  position: relative;
  padding:24px 0;
  @media screen and (max-width: 700px) {
    width: 400px;
  }
  @media screen and (max-width: 480px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`;

export const TitleOverlay = styled.p`
  font-family: "Rubik", "LatoBlack", sans-serif;
  line-height: 1;
  font-size: calc(${(props) => props.fontSize}px + 1 * ((100vw - 320px) / 680));
  line-height: calc(${(props) => props.fontSize}px + 1 * ((100vw - 320px) / 680));
  @media screen and (max-width: 1000px) {
    font-size: calc(${(props) => props.fontSize}px - 5px);
    line-height: calc(${(props) => props.fontSize}px - 5px);
  }
  @media screen and (max-width: 750px) {
    font-size: calc(${(props) => props.fontSize}px - 10px);
    line-height: calc(${(props) => props.fontSize}px - 10px);
  }
`;

export const ImageBox = styled.div`
  display: flex;
  flex: 1;
  border-radius:10px;
  overflow:hidden;
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
  max-height: 41px;
  margin-left: ${SPACING.small};
  margin: ${SPACING.medium};
`;

export const OverlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #0b1731;
  border-radius: 15px;
  position: relative;
  width: 98vw;
  height: 98vh;

  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
