import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const ButtonContainer = styled.button`
  height: ${(props) =>
    props.size === "large"
      ? 60
      : (props) => (props.size === "medium" ? 50 : 40)}px;
  background-color: ${(props) => props.color == "transparent" ? props.theme.container.color : props.color};
  border-width: ${(props) => (props.border === true ? 1 : 0)}px;
  border-color: ${(props) => props.borderColor};
  border-style: ${(props) => (props.border === true ? "solid" : null)};
  width: ${(props) => props.width};
  display: flex;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.95 : 1)};
  padding-left: ${(props) => (props.justIcon  ? 0 : 10)}px;
  padding-right: ${(props) => (props.justIcon  ? 0 : 10)}px;
`;

export const IconContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

export const TextContainer = styled.p`
  font-family: "LatoBlack";
  justify-content: center;
  padding-left: ${(props) => (props.padding ? 12 : 0)}px;
  padding-right: ${(props) => (props.padding ? 12 : 0)}px;
  color: ${(props) => props.colorText};
  white-space: nowrap;
  text-shadow: ${(props) => (props.shadow ? "1px 3px rgba(0, 0, 0, 0.2)" : "none")};
`;
export const TextContainerIcon = styled.p`
  font-family: "LatoBlack";
  margin-right: auto;
  color: ${(props) => props.colorText};
  white-space: nowrap;
  text-shadow: ${(props) => (props.shadow ? "1px 3px rgba(0, 0, 0, 0.2)" : "none")};
`;

export const SocialButtonContainer = styled.button`
  height: ${(props) =>
    props.size === "large"
      ? 60
      : (props) => (props.size === "medium" ? 50 : 40)}px;
  background-color: ${(props) => props.color == "transparent" ? props.theme.container.color : props.color};
  width: ${(props) => props.width}px;
  min-width: 228px;
  display: flex;
  flex: 1;
  border-radius: 5px;
  flex-direction: row;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.95 : 1)};
  border-style: none;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.marginBottom}px;

  -webkit-transition: all 0.3s; 
  -moz-transition: all 0.3s;
  transition: all 0.3s;

  :hover {
    opacity: 0.9;
    transform: scale(0.99);
  }
  :active {
    transform: scale(0.95);
  }
`;

export const SocialIconBox = styled.div`
  display: flex;
  height: ${(props) =>
    props.size === "large"
      ? 60
      : (props) => (props.size === "medium" ? 50 : 40)}px;
      width: ${(props) =>
        props.size === "large"
          ? 60
          : (props) => (props.size === "medium" ? 50 : 40)}px;
  align-items: center;
  justify-content: center;
`;

export const TextSocialIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Text = styled.p`
  color: ${COLORS.white};
  font-family: "LatoBlack";
  font-size: ${(props) =>
    props.size === "large"
      ? FONT_SIZE.large
      : (props) =>
        props.size === "medium" ? FONT_SIZE.medium : FONT_SIZE.medium}px;
`;

export const BorderedButtonContainer = styled.button`
  min-width: 180px;
  width: 100%;
  height: ${(props) =>
    props.size === "large"
      ? 60
      : (props) => (props.size === "medium" ? 50 : 40)}px;
  background-color:  ${(props) => props.color == "transparent" ? props.theme.container.color : props.color};
  width: ${(props) => props.width}px;
  border-radius: 5px;
  flex-direction: row;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.95 : 1)};
  border: 3px solid ${COLORS.purple};
  align-items: center;
  justify-content: space-between;

  -webkit-transition: all 0.3s; 
  -moz-transition: all 0.3s;
  transition: all 0.3s;

  :hover {
    opacity: 0.9;
    transform: scale(0.99);
  }
  :active {
    transform: scale(0.95);
  }
`;

export const BorderedSocialIconBox = styled.div`
  display: flex;
  height: ${(props) =>
    props.size === "large"
      ? 60
      : (props) => (props.size === "medium" ? 50 : 40)}px;
  width: ${(props) =>
    props.size === "large"
      ? 60
      : (props) => (props.size === "medium" ? 50 : 40)}px;
  align-items: center;
  justify-content: center;
  border-right: 3px solid ${COLORS.purple};
`;

export const TextBorderedIcon = styled.p`
  font-family: "LatoBlack";
  font-size: 14px;
`;
