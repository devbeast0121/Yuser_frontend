import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

//------------------------------------- CustomLayout
export const MainBox = styled.div`
  display: flex;
  max-width: 900px;
  width: 100%;
  flex-direction: column;
  //margin-right: ${SPACING.large}px;
  //margin-left: ${SPACING.large}px;
  padding-bottom: ${SPACING.extraLarge}px;

  @media screen and (max-width: 1500px) {
    margin-left: ${SPACING.large}px;
  }
  @media screen and (max-width: 960px) {
    margin-left: 0;
    margin-right: ${SPACING.large}px;
  }
`;
export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 2;
  flex-direction: row;
  padding-bottom: ${SPACING.extraLarge}px;
  justify-content: center;

  @media screen and (max-width: 980px) {
    width: 100%;
    flex: 1;
    flex-direction: column;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
  }
`;

export const Container = styled.div`
  display: flex;
  max-width: 400px;
  width: 100%;
  flex-direction: column;
  position: relative;
`;
export const MentionHashContainer = styled.div`
  display: flex;
  // justify-content:space-between;
  flex-direction: row;
  position: relative;
  padding-bottom: ${SPACING.large}px;
`;

export const ButtonsMenuRow = styled.div`
  display: flex;
  max-width: 330px;
  min-width: 250px;
  height: 150px;
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  border-radius: 10px;
  margin-left: ${SPACING.extraLarge}px;
  margin-top: ${SPACING.large}px;
  padding: ${SPACING.large}px;
  z-index: 9999;

  @media screen and (max-width: 980px) {
    display: none;
  }
`;

export const ButtonsMenuColumn = styled.div`
  display: flex;
  display: none;

  /*@media screen and (max-width: 980px){
        max-width: 980px;
        width: 100%;
        height: 75px;
        flex-direction: row; 
        margin-top:${SPACING.large}px;
    }

    @media screen and (max-width: 700px){
        margin-top:100px;
    } */
`;

export const SubMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${SPACING.large}px;
  position: relative;
`;

export const DropzoneBox = styled.div`
  display: flex;
  min-width: 348px;
  width: 100%;
  min-height: ${(props) => (props.fileAdded ? "370px" : "480px")};
  background-color: ${(props) =>
    props.fileAdded ? "transparent" : props.theme.containerSecondary.color};
  overflow: auto;
  border: ${(props) => (props.fileAdded ? "0px" : "3px")} dashed ${({ theme }) => theme.borderColor.color};
  border-radius: 20px;
  flex-direction: column;
  position: relative;
`;

export const CustomPreviewContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  border: 2px solid  ${({ theme }) => theme.borderColor.color};
  border-radius: 20px;
  z-index: 99;
  width: 100%;
  flex-shrink: 0;
  flex-direction: row;
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: ${SPACING.large}px;
  padding-bottom: ${SPACING.large}px;
  height: 300px;
`;

export const LargeTitle = styled.p`
  font-size: 35px;
  font-family: "LatoBlack";
  color: ${({ theme }) => theme.textPrimary.color};
  margin-top: ${SPACING.large}px;
  margin-bottom: ${SPACING.large}px;

  @media screen and (max-width: 700px) {
    margin-top: 90px;
  }
`;
export const SubTitle = styled.p`
  font-size: 20px;
  font-family: "LatoBlack";
  color: ${({ theme }) => theme.textPrimary.color};
  margin-top: ${SPACING.medium}px;
  margin-bottom: ${SPACING.medium}px;

  @media screen and (max-width: 700px) {
    margin-top: 90px;
  }
`;

export const WelcomeText = styled.p`
  font-family: "LatoBlack";
  font-size: ${FONT_SIZE.large}px;
  color: ${({ theme }) => theme.textPrimary.color};
  margin-bottom: ${(props) => (props.property ? 0 : SPACING.medium)}px;
  padding-right: ${(props) => (props.property ? 0 : SPACING.large)}px;
  padding-top: ${(props) => (props.property ? 0 : 7)}px;
`;

export const DescriptionInputBox = styled.textarea`
  height: 150px;
  line-height: 1.6em;
  width: 100%;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  border: 2px solid ${({ theme }) => theme.borderColor.color};
  border-radius: 5px;
  outline: none;
  caret-color: ${({ theme }) => theme.placeholder.color} !important;
  color: ${({ theme }) => theme.textSecondary.color};
  padding: ${SPACING.medium}px;
  resize: none;
  padding-bottom: 36px; //a cause - buttons # @ :)
  scroll-padding: 36px; //scroll-padding (new feature 2022) - resolve the issue with ignoring bottom padding
  margin-bottom: ${SPACING.large}px;
  overflow-y: auto;

  &::placeholder {
    color: ${({ theme }) => theme.placeholder.color};
  }

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
    display: none;
  }

  @media screen and (max-width: 680px) {
    // margin-left: ${SPACING.small}px;
  }
`;

export const Title = styled.p`
  font-size: ${FONT_SIZE.large}px;
  color: ${({ theme }) => theme.textSecondary.color};
  margin-top: ${SPACING.extraLarge}px;
  margin-bottom: ${SPACING.medium}px;
`;

export const TxtMain = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  color: ${(props) => props.solid ? props.theme.textPrimary.color : props.theme.textSecondary.color};
  line-height: 1.8;
  padding-right: ${SPACING.large}px;
  padding-left: ${(props) => (props.right ? 60 : SPACING.large)}px;
  margin-bottom: ${(props) => (props.property ? 0 : SPACING.large)}px;
  text-align: ${(props) => (props.align ? "center" : "left")};
`;

export const FormatBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 36px;
  width: 70%;
  justify-content: space-between;
`;

export const FormatSubBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
`;

export const Label = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-top: ${SPACING.large}px;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
`;

export const PreviewBox = styled.div`
  display: flex;
  flex: 1;
  flex-shrink: 0;
  flex-direction: column;
  position: relative;
`;

export const PreviewBoxMain = styled.div`
  display: flex;
  flex: 1;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const PreviewBoxProgress = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const ProgressValue = styled.p`
  font-size: 20;
  font-family: "LAtoBlack";
  margin-left: ${SPACING.large}px;
  margin-right: ${SPACING.large}px;
`;

export const ImgPreview = styled.img`
  display: block;
  height: 246px;
  width: auto;
  content: url(${(props) => props.uriImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  margin-left: ${SPACING.large}px;
  margin-right: ${SPACING.large}px;
  border-radius: 5px;
`;

export const BtnCancelUpload = styled.div`
  display: flex;
  border-radius: 12px;
  background-color: ${COLORS.whiteLightMedium};
  cursor: pointer;
  height: 24px;
  width: 24px;
  align-items: center;
  justify-content: center;
  margin-right: ${SPACING.large}px;
`;

export const CustomPreviewBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;

export const SubBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.between ? "space-between" : "flex-start"};

  @media screen and (max-width: 600px) {
    flex-direction: ${(props) => (props.small ? "row" : "column")};
    align-items: flex-start;
  }
`;

export const TitleInputBox = styled.input`
  height: 60px;
  width: 100%;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  border-style: solid;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.borderColor.color};
  border-width: 1px;
  outline: none;
  caret-color: ${({ theme }) => theme.placeholder.color} !important;
  padding-left: ${SPACING.large}px;
  padding-top: 18px;
  padding-bottom: 18px;
  margin-bottom: ${SPACING.large}px;
  color: ${({ theme }) => theme.textSecondary.color};

  &::placeholder {
    color: ${({ theme }) => theme.placeholder.color};
  }
`;

export const AddBox = styled.div`
  display: flex;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  border-radius: 5px;
`;

export const PropertyList = styled.div`
  display: flex;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  // grid-template-rows: 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 20px;
  margin-bottom: ${SPACING.medium}px;
`;

export const ItemContainer = styled.div`
  display: flex;
  max-width: 200px;
  width: 100%;
  height: 85px;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.borderColor.color};
  border-width: 2px;
  border-style: solid;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.containerSecondary.color};
`;

export const Wrapper = styled.div`
  display: flex;
  width: 20%;
  margin: ${SPACING.large}px;
  flex-direction: column;

  @media screen and (max-width: 980px) {
    width: 100%;
    margin: 0px;
  }
`;

export const GifButton = styled.div`
  display: flex;
  position: absolute;
  bottom: 36px;
  cursor: pointer;
`;

export const ContainerProgress = styled.div`
  display: flex;
  height: 22px;
  width: 100%;
  position: relative;
  align-self: flex-end;
`;

export const Background = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.container.color};
  border: 1px solid ${({ theme }) => theme.borderColor.color};
`;

export const Progress = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 10px;
  background: ${COLORS.green};
  width: ${({ percent }) => percent}%;
`;

export const EmojiModalWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 145px;
  right: 0;
  z-index: 999;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
`;
