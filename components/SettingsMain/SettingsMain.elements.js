import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const MainContainer = styled.div`
  display: flex;
  max-width: 900px;
  flex-direction: column;
  margin-top: ${SPACING.large}px;
  margin-left: ${SPACING.large}px;
  margin-right: ${SPACING.large}px;
  background-color: ${({ theme }) => theme.container.color};
`;

export const Title = styled.p`
  font-size: ${FONT_SIZE.large}px;
  font-family: "LatoBlack";
  padding-bottom: ${SPACING.extraLarge}px;
`;

export const SettingBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  margin-bottom: ${SPACING.large}px;
  margin-top: ${SPACING.extraLarge}px;
  justify-content: ${(props) => (props.row ? "space-between" : "center")};
  align-items: ${(props) => (props.row ? "center" : "flex-start")};
`;

export const Text = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  margin-bottom: ${(props) =>
    props.titlePosition ? SPACING.medium : SPACING.small}px;
  font-family: ${(props) =>
    props.titlePosition ? "LatoBlack" : "LatoRegular"};
  text-align: left;
`;

export const InputBox = styled.div`
  display: flex;
  width: 100%;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  justify-content: flex-start;
  align-items: center;
  padding-left: ${SPACING.medium}px;
`;

export const WelcomeText = styled.p`
  font-family: "LatoBlack";
  font-size: ${FONT_SIZE.medium}px;
  margin-bottom: ${(props) => (props.property ? 0 : SPACING.medium)}px;
  padding-right: ${(props) => (props.property ? 0 : SPACING.large)}px;
  padding-top: ${(props) => (props.property ? 0 : 7)}px;
`;

export const TitleInputBox = styled.input`
  height: 60px;
  width: 100%;
  align-items: flex-start;
  color: ${({ theme }) => theme.textSecondary.color};
  border: 0px none transparent;
  background-color: transparent;
  outline: none;
  padding-left: ${SPACING.large}px;
  padding-top: 18px;
  padding-bottom: 18px;
  &::placeholder {
    color: ${({ theme }) => theme.placeholder.color};
  }
`;

export const DescriptionInputBox = styled.textarea`
  height: 130px;
  line-height: 1.6em;
  width: 100%;
  align-items: flex-start;
  background-color: transparent;
  border: 0px none transparent;
  outline: none;
  border: none;
  padding-top: ${SPACING.large}px;
  padding-bottom: ${SPACING.large}px;
  padding-left: ${SPACING.large}px;
  resize: none;
  color: ${({ theme }) => theme.textSecondary.color};
  &::placeholder {
    color: ${({ theme }) => theme.placeholder.color};
  }
  @media screen and (max-width: 680px) {
    margin-left: ${SPACING.small}px;
  }
`;

export const SubBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.between ? "space-between" : "flex-start"};
  position: relative;
  @media screen and (max-width: 600px) {
    flex-direction: ${(props) => (props.small ? "row" : "column")};
    align-items: flex-start;
  }
`;

export const FormatSubBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
`;

export const TxtMain = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  color: ${(props) =>
    props.solid
      ? props.theme.textPrimary.color
      : props.theme.textSecondary.color};
  line-height: 1.8;
  padding-right: ${SPACING.large}px;
  padding-left: ${(props) => (props.right ? 60 : 0)}px;
  margin-bottom: ${(props) => (props.property ? 0 : SPACING.large)}px;
  text-align: ${(props) => (props.align ? "center" : "left")};
`;

export const ContainerAvatarLayout = styled.div`
display: flex;
    width: 200px;
    height: 200px;
    background-color: ${({ theme }) => theme.containerSecondary.color}
    overflow: hidden;
    border: dashed 3px ${({ theme }) => theme.borderColor.color};
    border-radius: 50%;
    flex-direction: column;
    position: relative;
`;

export const Label = styled.div`
display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    background-color: ${({ theme }) => theme.containerSecondary.color}
    justify-content: center;
    align-items: center;
    cursor: pointer;
    //padding-top: ${SPACING.large}px;
    position: relative;
    overflow: hidden;
    border-radius:20px;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
`;

export const Container = styled.div`
  display: flex;
  max-width: 900px;
  width: 100%;
  flex-direction: column;
  position: relative;
  margin-bottom: ${SPACING.large}px;
  border: dashed 3px ${({ theme }) => theme.borderColor.color};
  border-radius: 20px;
`;

export const FormatBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const ImgPreview = styled.img`
  flex: 1;
  border-radius: ${(props) => (props.avatar ? "50%" : "20px")};
  max-width: 100%;
  height: auto;
  object-fit: cover;
`;

export const PreviewContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 99;
  border-radius: ${(props) => (props.avatar ? "50%" : "20px")};
  height: 100%;
  width: 100%;
`;

export const UsernameWrapper = styled.div`
display: flex;
    flex-direction: row;
    align-items: center;
    justify-content; center;
    background-color: ${(props) => props.textInputFocused ? props.theme.hoverMenu.color :  props.theme.containerSecondary.color};
	caret-color: ${({ theme }) => theme.placeholder.color} !important;
    color:  ${({ theme }) => theme.textSecondary.color};
    border: none;
    border-radius: 5px;
    padding-right: ${SPACING.medium}px;
    margin-bottom: ${SPACING.medium}px;
`;

export const BioWrapper = styled.div`
display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content; center;
    background-color:  ${(props) => props.textInputFocused ? props.theme.hoverMenu.color :  props.theme.containerSecondary.color};
	caret-color: ${({ theme }) => theme.placeholder.color} !important;
    color:  ${({ theme }) => theme.textSecondary.color};
    border: none;
    border-radius: 5px;
    padding-right: ${SPACING.medium}px;
    margin-bottom: ${SPACING.large}px;
`;

export const DropzoneBox = styled.div`
display: flex;
    max-width: 900px;
    min-width: 348px;
    width: 100%;
    min-height: 350px;
    background-color: ${({ theme }) => theme.containerSecondary.color}
    overflow: hidden;
    border: dashed 3px ${({ theme }) => theme.borderColor.color};
    border-radius: 20px;
    flex-direction: column;
    position: relative;
`;
