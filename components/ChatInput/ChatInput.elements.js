import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const TextInputContainer = styled.div`
  display: flex;
  position: relative;
  z-index: 99;
  flex: 1;
  flex-direction: column; 
  flex-direction: column;
  padding: ${SPACING.medium}px;
  margin:${SPACING.medium}px;
  background-color: ${({ theme }) => theme.containerHover.color};
  border:1px solid ${(props) => props.textInputFocused ? props.theme.inactiveColor.color : props.theme.borderColor.color };
  border-radius:5px;
`;

export const MessageOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  justify-items: center;
  margin-top: 6px;
`;
export const MessageIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items:center;

  @media screen and (max-width: 400px) {
    gap: 20px;
  }
  @media screen and (max-width: 380px) {
    gap: 16px;
  }
  @media screen and (max-width: 360px) {
    gap: 12px;
  }
  @media screen and (max-width: 340px) {
    gap: 8px;
  }
`;

export const SendButton = styled.div`
  display: flex;
  max-width: 120px;
  min-width: 70px;
  height: 30px;
  //padding: 0px ${SPACING.medium}px 5px ${SPACING.medium}px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${COLORS.white};
  border-radius: 5px;
  opacity: ${(props) =>
    props.commentDraft !== "" || props.imageUri !== null || props.fileAdded
      ? 1
      : 0.4};
  background-color: ${COLORS.blue};
  cursor: pointer;

  @media screen and (max-width: 340px) {
    margin-left: 8px;
  }
`;

export const ReplyPreviewBox = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  position: sticky;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: ${({ theme }) =>
    theme.name == "light" ? COLORS.whiteMedium : COLORS.blackDarkMedium};
  border-top: 1px solid ${({ theme }) => theme.containerSecondary.color};
  border-right: 1px solid ${({ theme }) => theme.containerSecondary.color};
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  padding-left: ${SPACING.large}px;
  padding-right: ${SPACING.large}px;
  padding-top: ${SPACING.medium}px;
  padding-bottom: ${SPACING.medium}px;
  gap: ${SPACING.medium}px;
`;

export const BtnClose = styled.div`
  display: flex;
  border-radius: 50%;
  //background-color: ${({ theme }) => theme.container.color};
  background-color: ${COLORS.black};
  z-index: 999;
  cursor: pointer;
  height: 20px;
  width: 20px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  height: 60px;
  width: 60px;
  border-radius: 10px;
  position: relative;
  z-index: 99;
  overflow: hidden;
`;

export const BtnDelete = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: ${COLORS.black};
  position: absolute;
  z-index: 999;
  top: 17px;
  left: 71px;
  cursor: pointer;
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
`;

export const MessageInputBox = styled.textarea`
  min-height: 40px;
  //max-height: 150px; //300px
  line-height: 1.6em;
  width: 100%;
  align-items: flex-start;
  background-color: transparent;
  caret-color: ${({ theme }) => theme.placeholder.color} !important;
  color: ${({ theme }) => theme.textSecondary.color};
  border: none;
  border: none;
  outline: none;
  resize: none;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
    display: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholder.color};
  }
`;

export const FilePreview = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
`;

export const Label = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-top: 4px;

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

export const Input = styled.input`
  display: none;
`;

export const ContainerFileLayout = styled.div`
  display: flex;
  width: 48px;
  height: 40px;
  overflow: hidden;
  border: none;
  border-color: transparent;
  min-height:unset;
  justify-content:center;
  align-items:center;
  padding-bottom: 4px;

`;

export const PreviewFileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
