import styled, { css } from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const Nav = styled.div`
display: flex; 
    width: ${(props) => (props.shortNav ? 80 : 250)}px;
    flex-direction: column;
    align-items: flex-start;
    height: 100vh;
    z-index: 1;
    flex-direction: column;
    overflow: hidden;
    align-items: flex-start;
    flex-shrink:0;

    @media screen and (max-width: 1190px){
            width: 80px;
        } 
    }
`;

export const NavInner = styled.div`
display: flex; 
    position: fixed;
    top: 0px;
    bottom: 0px;
    width: 100%;
    padding-top: 31px;
    max-width: ${(props) => (props.shortNav ? 80 : 250)}px;
    overflow: hidden scroll;
    overscroll-behavior-y: contain;
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    border-right: 1px solid ${({ theme }) => theme.borderColor.color};
    background-color: ${({ theme }) => theme.name == "light" ? COLORS.white : COLORS.black};

    @media screen and (max-width: 1190px){
            width: 80px;
        } 
    }
`;

export const LinkText = styled.p`
  padding-left: ${SPACING.medium}px;

  &:hover {
    opacity: 0.6;
  }
  &:active {
    font-family: "LatoBlack";
  }
`;

export const NavButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  height: 60px;
  border-radius: 30px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: 10px;
  flex-shrink: 0;
  position: relative;
  -webkit-transition: all 0.3s; 
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  width: calc(100% - 20px);

  &:hover {
    background-color: ${({ theme }) => theme.containerSecondary.color};
  }
`;

export const IconOuter = styled.div`
  display: flex;
  width: 30px;
  align-items: center;
  justify-content: center;
`;

export const BtnText = styled.p`
  margin-left: ${SPACING.medium}px;
  font-size: 18px;
  font-family: ${(props) => (props.active != "" ? "LatoBlack" : "LatoRegular")};
  color: ${(props) => (props.active != "" ? COLORS.purple : props.theme.textPrimary.color)};
  margin-right: 5px;

  @media screen and (max-width: 1190px) {
    display: none;
  }
`;

export const Divider = styled.div`
  display: flex;
  height: 1px;
  width: 30px;
  background-color: ${({ theme }) => theme.borderColor.color};
  margin-top: ${SPACING.medium}px;
  margin-bottom: ${SPACING.medium}px;
  margin-left: 26px;
`;
