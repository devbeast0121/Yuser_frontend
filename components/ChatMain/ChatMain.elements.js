import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const ContainerChat = styled.div`
  display: flex;
  z-index: 1;
  flex-direction: row;
  position: relative;
  width: 100%;
  min-width: 0;

  @media screen and (max-width: 991px) {
    max-width: 991px;
    flex-direction: column;
    overflow: hidden;
    height: 100vh;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  max-width: 300px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.container.color};
  flex: 1;
  position: relative;
  z-index: 0;
`;

export const ScrollContainer = styled.div`
  display: flex;
`;

export const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => (props.innerBox ? 0 : SPACING.large)}px;
  padding-right: ${SPACING.medium}px;
  padding-left: ${SPACING.medium}px;
  flex: 1;
  min-width: 0;
`;

export const TxtNormal = styled.p`
  text-align: left;
  flex: 3;
  font-size: 16px;
  font-weight: bold;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${SPACING.small}px;
  margin-bottom: 2px;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${SPACING.medium}px;
  height:90px;
  position: relative;
  background-color: ${(props) => props.selectedChat
      ? props.theme.containerSecondary.color : props.theme.container.color};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor.color};
  cursor:pointer;

  :hover {
    background-color:${({ theme }) => theme.containerHover.color};
  }
`;

export const Divider = styled.div`
  display: flex;
  height: 1px;
  width: 85%;
  align-self: flex-end;
  background-color: ${({ theme }) => theme.containerSecondary.color};
`;

export const Content = styled.p`
  text-overflow: ellipsis;
  color: ${(props) => (props.theme.name == "light" ? null : COLORS.whiteLight)};
  display: block;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 4px; 
  padding-right: ${SPACING.extraLarge}px; 
  font-size: 16px;
  opacity: 0.6;
`;

export const BtnChatState = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom: ${(props) => (props.chatState ? 2 : 1)}px solid
    ${(props) =>
      props.chatState ? COLORS.purple : ({ theme }) => theme.borderColor.color};
  padding-bottom: ${SPACING.medium}px;
  padding-top: ${SPACING.medium}px;
`;

export const TxtChat = styled.p`
  font-family: "LatoBlack";
  text-align: ${(props) => (props.innerBox ? "center" : "left")};
`;

export const TxtTime = styled.p`
  font-family: "LatoBlack";
  text-align: ${(props) => (props.innerBox ? "center" : "right")};
  opacity: 0.4;
  flex: 1;
  font-size: 14px;

  @media screen and (max-width: 991px) {
    display: none;
  }
`;

export const BtnInvite = styled.p`
  text-align: center;
  color: ${COLORS.whiteLight};
`;

export const DeleteDropDown = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  width: 180px;
  height: 50px;
  position: absolute;
  z-index: 9999;
  margin-top: 140px;
  right: 0;
  justify-content: space-around;
  align-items: center;
`;

export const TopBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;
export const OptionsBox = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  width: 30px;
  top: 0;
  bottom: 0;
  right: 0;
  left: auto;
  background-color: transparent
  justify-content: center;
  align-items: center;
  cursor:pointer;
`;
export const OptionsSubBox = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme.name == "light" && props.onHoverChat
      ? COLORS.whiteMedium
      : props.theme.name == "light" && !props.onHoverChat
      ? "transparent"
      : props.theme.name == "dark" && props.onHoverChat
      ? COLORS.blackMedium
      : COLORS.black};
`;

export const InviteBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${SPACING.large}px;
  border-radius: 10px;
`;

export const ListContainerRow = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 3px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.purple};
  }

  @media screen and (max-width: 700px) {
    margin-top: 0px;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  display: block;
  align-items: center;
  justify-content: center;
`;
export const ChatNameBox = styled.div`
  display: flex;
  position: absolute;
  margin-top: 20px;
  margin-left: -10px;
  z-index: 999;
  height: 30px;
  max-width: 250px;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;
export const TxtShortNormal = styled.p`
  padding-left: ${SPACING.medium}px;
  padding-right: ${SPACING.medium}px;
  font-family: "LatoBlack";
`;

export const HeaderCompponent = styled.div`
  display: flex;
  position: sticky;
  z-index: 1;
  width: 100%;
  top: 0;
  right: 0;
  left: 0;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  display: flex;
  height: 76px;
  width: 76px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.containerOpposite.color};
  justify-content: center;
  align-items: center;
`;

export const CopyButton = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  background-color: ${COLORS.purple};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: ${SPACING.medium}px;
`;

export const TxtTitleInvite = styled.p`
  font-family: "LatoBlack";
  text-align: left;
  flex: 1;
  font-size: ${FONT_SIZE.large}px;
  margin-bottom: ${SPACING.small}px;
`;

export const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: ${SPACING.large}px;
  padding-bottom: ${SPACING.large}px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor.color};

  @media screen and (max-width: 700px){
    margin-top: 0px;
}
`;
