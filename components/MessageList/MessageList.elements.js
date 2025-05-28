import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const ChatContainer = styled.div`
display: flex;
    height: 100%;
    flex-direction: column-reverse;
    justify-content:flex-end
    width: 100%;
    //overflow: auto;

    ::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
        display: none;
    }
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${SPACING.medium}px;
  background-color: ${(props) =>
    props.hover && props.groupIndexLocal && props.selectedMessageID
      ? props.theme.containerHover.color
      : "transparent"};
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

export const SectionBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: ${SPACING.medium}px;
`;

export const Name = styled.p`
  font-family: "LatoBlack";
  margin-right: ${SPACING.medium}px;
  font-size: 16px;
`;

export const Comment = styled.div`
  display: flex;
  z-index: 1;
  font-size: 16px;
  margin-top:5px;
`;

export const Date = styled.p`
  opacity: 0.4;
  font-size: ${FONT_SIZE.small}px;
  font-family: "LatoBlack";
  font-size: 14px;
`;

export const ReplyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const OptionsMenu = styled.div`
    flex-direction: row;
    justify-content: space-evenly;
    position: absolute;
    z-index: 9;
    top: -12px;
    right: ${SPACING.medium}px;
    background-color: ${props=>props.theme.hoverMenu.color};
    border-color: ${props=>props.theme.borderColor.color};
    border-style:solid;
    border-width:1px;
    border-radius: 5px;
    box-shadow:0 1px 6px rgba(0,0,0,0.2);
`;

export const MenuButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 6px;
`;

export const OptionsSubMenu = styled.div`
    height: auto;
    width: 130px ;
    flex-direction: column;
    position: absolute;
    z-index: 9999;
    top: -12px;
    right: 40px;
    background-color: ${props=>props.theme.container.color};
    border-radius: 5px;
    padding-left: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
    padding-top: ${SPACING.small}px;
    padding-bottom: ${SPACING.small}px;
`;

export const SubMenuButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  cursor: pointer;
`;

export const BtnText = styled.p`
  font-size: ${FONT_SIZE.small}px;
  font-family: "LatoBlack";
`;

export const Image = styled.img`
  display: block;
  flex-direction: column;
  max-height: 175px;
  height: 100%;
  width: auto;
  content: url(${(props) => props.uriImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  object-fit: scale-down;
  background-color: ${({ theme }) =>
    theme.name == "light" ? COLORS.whiteLight : COLORS.whiteLightMedium};
`;

export const DeleteButton = styled.div`
    margin-left: ${SPACING.medium}px;
    margin-top: ${SPACING.medium}px;
    background-color: ${props=>props.theme.borderColor.color};
    border-radius: 5px;
    cursor: pointer;
    height: 42px;
    width: 42px;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

export const ImageWrapper = styled.div`
  display: flex;
  margin-left: ${SPACING.medium}px;
  margin-top: ${SPACING.medium}px;
  flex-direction: row;
  border-radius: 5px;
`;
