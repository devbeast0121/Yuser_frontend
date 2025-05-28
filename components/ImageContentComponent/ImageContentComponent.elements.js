import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";
import { motion, AnimatePresence } from "framer-motion";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  width: 100%;
  position: relative;
  z-index: 1;
  justify-content: ${(props) =>
    props.direction == "row" ? "space-between" : "center"};
  align-items: center;
  padding: ${SPACING.large}px;

  @media screen and (max-width: 850px) {
    flex-direction: column;
    justify-content: center;
  }
  @media screen and (max-width: 480px) {
    padding: ${SPACING.medium}px;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) =>
    props.direction == "column" ? "center" : "flex-start"};
  order: ${(props) => (props.reverse ? 1 : 2)};
  margin-left: ${(props) => props.textMarginLeft}px;
  margin-right: ${(props) => props.textMarginRight}px;
  max-width: ${(props) => props.textMaxWidth}px;
  flex: ${(props) => (props.direction == "row" ? 1 : null)};

  @media screen and (max-width: 850px) {
    padding: 0;
    width: 100%;
    align-items: ${(props) =>
      props.direction == "column" ? "center" : "flex-start"};
    margin-top: ${(props) =>
      props.reverse && props.mobileReverse
        ? SPACING.large
        : props.mobileReverse
        ? 0
        : SPACING.large}px;
    order: ${(props) =>
      props.reverse && props.mobileReverse ? 2 : props.mobileReverse ? 1 : 2};
  }
`;

export const ImageBox = styled.div`
  display: flex;
  margin: ${(props) => (props.direction == "column" ? null : "24px")};
  justify-content: center;
  align-items: center;
  order: ${(props) => (props.reverse ? 2 : 1)};
  margin-bottom: ${(props) => (props.direction == "column" ? null : null)}px;
  margin-top: ${(props) => (props.direction == "column" ? 24 : null)}px;
  position: relative;
  flex: ${(props) => (props.direction == "row" ? 1.1 : null)};

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

export const SubTitle = styled.p`
  font-family: "LatoRegular";
  text-align: ${(props) => (props.direction == "column" ? "center" : "left")};
  font-size: 100%;
  line-height: 100%;
  color: ${(props) => props.subTitleColor};
  font-size: ${(props) => props.fontSize}px;
  margin-bottom: 24px;
  margin-top:-12px;

  @media screen and (max-width: 1000px) {
    font-size: 80%;
  }
`;

export const Title = styled.p`
  font-family: "BrunoAce", "Rubik", "LatoBlack", sans-serif;
  color:#FEFC40;
  text-align: ${(props) => (props.direction == "column" ? "center" : "left")};
  line-height: 100%;
  font-size: 100%;

  @media screen and (max-width: 1300px) {
    font-size: 90%;
  }

  @media screen and (max-width: 1080px) {
    font-size: 78%;
  }

  @media screen and (max-width: 930px) {
    font-size: 70%;
  }

  @media screen and (max-width: 600px) {
    font-size: 60%;
  }

  @media screen and (max-width: 460px) {
    font-size: 50%;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.fontSize}px;
  margin-bottom: 20px;

  @media screen and (max-width: 1000px) {
    margin-bottom: 12px;
  }

  @media screen and (max-width: 850px) {
    margin-bottom: 12px;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 12px;
  }

  @media screen and (max-width: 460px) {
    margin-bottom: 12px;
  }
`;

export const Item = styled.li`
  display: list-item;
  margin-bottom: 12px;
  width: ${(props) => (props.legends ? "100%" : "100%")};

  font-size: ${(props) => (props.fontSize ? props.fontSize : 27)}px;

  @media screen and (max-width: 850px) {
    font-size: calc(
      ${(props) => (props.fontSize ? props.fontSize : 27)}px - 8px
    );
  }
`;

export const ItemCondition = styled.li`
  display: list-item;
  margin-bottom: 12px;
  width: 100%;

  font-size: ${(props) => (props.fontSize ? props.fontSize : 27)}px;

  @media screen and (max-width: 850px) {
    font-size: calc(
      ${(props) => (props.fontSize ? props.fontSize : 27)}px - 8px
    );
  }
`;

export const List = styled.ul`
  margin-top: 0;
  order: 1;

  @media screen and (max-width: 1000px) {
    margin-top: 0px;
  }

  @media screen and (max-width: 850px) {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  order: 3;
  flex-direction: column;
  font-size: ${(props) => (props.fontSize ? props.fontSize : 27)}px;
  max-width: 700px;
`;

export const Description = styled.p`
  text-align: ${(props) => (props.direction == "column" ? "center" : "left")};
  font-size: 100%;
  color: ${(props) =>
    props.descriptionColor != null
      ? props.descriptionColor
      : props.theme.textPrimary.color};

  @media screen and (max-width: 1300px) {
    font-size: 95%;
  }

  @media screen and (max-width: 1000px) {
    font-size: 85%;
  }

  @media screen and (max-width: 850px) {
    font-size: 75%;
  }

  @media screen and (max-width: 600px) {
    font-size: 75%;
  }

  @media screen and (max-width: 460px) {
    font-size: 65%;
  }
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  order: 5;
  margin-top: ${SPACING.large}px;
  max-width: 400px;

  @media screen and (max-width: 850px) {
    margin-top: ${SPACING.medium}px;
    align-items: flex-start;
  }
`;
export const BottomButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  order: 5;
  margin-top: ${SPACING.extraLarge}px;
  max-width: 400px;

  @media screen and (max-width: 850px) {
    margin-top: ${SPACING.large}px;
    align-items: flex-start;
  }
`;

export const LogoContainer = styled.div`
  margin-bottom:24px;

  @media screen and (max-width: 850px) {
    margin-bottom:12px;
  }
`
export const ItemImage = styled.img`
  max-height: 100%;
  max-width: 100%;

  @media screen and (max-width: 850px) {
  }
`;
export const TitleLogo = styled.img`
  height: 50px;
  margin-left: ${SPACING.large}px;
  margin-bottom: ${SPACING.medium}px;
  z-index: 99;
`;

export const ButtonLink = styled(motion.button)`
  display: flex;
  flex: 1;
  height: 45px;
  border-radius: 5px;
  border-color: ${(props) => (props.left ? "transparent" : COLORS.purple)};
  border-width: 2px;
  border-style: solid;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.left ? props.leftButtonColor : props.rightButtonColor};
  padding-left: ${SPACING.extraLarge}px;
  padding-right: ${SPACING.extraLarge}px;
  cursor: pointer;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 480px) {
    height: 45px;
  }
`;

export const BtnText = styled.p`
  // color: ${({ theme }) => theme.textSecondary.color};
  color: ${COLORS.white};
  font-size:18px;
  font-family: "LatoBlack";
  flex-shrink: 0;
`;

export const MultiDescription = styled.div`
  display: flex;
  flex-direction: column;
  order: 2;
  font-size: ${(props) => (props.fontSize ? props.fontSize : 27)}px;

  @media screen and (max-width: 760px) {
    flex-direction: row;
  }
`;


export const StickerBox = styled.div`
  display: flex;
  margin: ${(props) => (props.direction == "column" ? null : "24px")};
  justify-content: center;
  align-items: center;
  order: ${(props) => (props.reverse ? 2 : 1)};
  margin-bottom: ${(props) => (props.direction == "column" ? "0" : null)}px;
  margin-top: ${(props) => (props.direction == "column" ? 24 : "0")}px;
  position: relative;
  flex: ${(props) => (props.direction == "row" ? 1.1 : null)};
  flex-direction: row;
  margin:${(props) => (props.mobileMargin == false ? "0" : props.direction == "column" ? "0" : "24px")};
  margin-top: ${(props) => (props.direction == "column" ? '24px' : null)};

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

export const StickerColumn1 = styled.div`
flex-direction:column;height:450px;margin-right:12px;
@media screen and (max-width: 850px) {
  height:410px;
}
`;
export const StickerColumn2 = styled.div`
flex-direction:column;height:450px;margin-right:12px;
@media screen and (max-width: 850px) {
  height:410px;
}
`;
export const StickerColumn3 = styled.div`
flex-direction:column;height:450px;
@media screen and (max-width: 850px) {
  height:410px;
}
`;
export const StickerBox1 = styled.div`
  flex-direction: column;
  background: #704BCC;
  border-radius: 15px;
  align-items: flex-start;
  padding: 12px;
  max-width:150px;
  margin-bottom: 12px;
  flex: 0.95;
`
export const StickerBox2 = styled.div`
  flex-direction: column;
  background: #704BCC;
  border-radius: 15px;
  align-items: flex-start;
  padding: 12px;
  max-width:150px;
  flex: 1.05;
    background: #D33B83;
`
export const StickerBox3 = styled.div`
flex-direction: column;
background: #704BCC;
border-radius: 15px;
align-items: flex-start;
padding: 12px;
max-width:150px;
margin-bottom: 12px;
    flex: 1.1;
    background: #D33B83;
`
export const StickerBox4 = styled.div`
flex-direction: column;
background: #704BCC;
border-radius: 15px;
align-items: flex-start;
padding: 12px;
max-width:150px;
flex: 0.9;
background: #BA4B58;
`
export const StickerBox5 = styled.div`
flex-direction: column;
background: #704BCC;
border-radius: 15px;
align-items: flex-start;
padding: 12px;
max-width: 150px;
flex: 0.9;
margin-bottom: 12px;
background: #BA4B58;
`
export const StickerBox6 = styled.div`
flex-direction: column;
background: #704BCC;
border-radius: 15px;
align-items: flex-start;
padding: 12px;
max-width: 150px;
flex: 1.1;
`

export const StickerTitle1 = styled.div`
font-family:'LatoBlack';
`
export const StickerTitle2 = styled.div`
font-family:'LatoBlack';
`
export const StickerTitle3 = styled.div`
font-family:'LatoBlack';
`
export const StickerTitle4 = styled.div`
font-family:'LatoBlack';
`
export const StickerTitle5 = styled.div`
font-family:'LatoBlack';
`
export const StickerTitle6 = styled.div`
font-family:'LatoBlack';
`
export const StickerSubtitle1 = styled.div`

`
export const StickerSubtitle2 = styled.div`

`
export const StickerSubtitle3 = styled.div`

`
export const StickerSubtitle4 = styled.div`

`
export const StickerSubtitle5 = styled.div`

`
export const StickerSubtitle6 = styled.div`

`
export const StickerImage1 = styled.img`
max-height: 100%;
max-width: 100%;
margin-top:auto;

@media screen and (max-width: 850px) {
}
`;
export const StickerImage2 = styled.img`
max-height: 100%;
max-width: 100%;
margin-top:auto;

@media screen and (max-width: 850px) {
}
`;
export const StickerImage3 = styled.img`
max-height: 100%;
max-width: 100%;
margin-top:auto;

@media screen and (max-width: 850px) {
}
`;
export const StickerImage4 = styled.img`
max-height: 100%;
max-width: 100%;
margin-top:auto;

@media screen and (max-width: 850px) {
}
`;
export const StickerImage5 = styled.img`
max-height: 100%;
max-width: 100%;
margin-top:auto;

@media screen and (max-width: 850px) {
}
`;
export const StickerImage6 = styled.img`
max-height: 100%;
max-width: 100%;
margin-top:auto;

@media screen and (max-width: 850px) {
}
`;