import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const MainWalletContainer = styled.div`
  display: flex;
  flex-direction:column;  
  max-width: 836px;
  width: 100%;
  margin-top: ${SPACING.large}px;
`;

export const WalletPostsContainer = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  @media screen and (max-width: 780px) {
    //640
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 30px;
  }
`;

export const ItemBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: ${SPACING.large}px;
  cursor: pointer;
`;

export const NftEmpty = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  border-radius: 15px;
  padding: 40px 24px;
`;

export const NftTitle = styled.p`
  font-size: ${FONT_SIZE.large}px;
  font-family: "Rubik", "LatoBlack", sans-serif;
`;

export const NftDescription = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  font-family: "LatoRegular";
  margin-bottom: 16px;
`;

export const NftImage = styled.div`
  display: flex;
  border-radius: 10px;
  overflow: hidden;
`;

export const NFTModal = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 700px; 
  width: 100%;
  background-color:${({ theme }) => theme.containerSecondary.color}; 
  position: absolute;
  top: 5%; 
  left: 35%;                               
  transform: translate(-35%,-5%);
  z-index: 99999;
  border-radius: 30px;
  flex-direction: column;

  @media screen and (max-width: 700px) {
    top: 7%; 
    left: 0%;                               
    transform: translate(0%,-7%);
  }
`;

export const TopBox = styled.div`
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

export const TitleTxt = styled.p`
  font-size: ${FONT_SIZE.large}px;
  font-family: "LatoBlack";
  text-align; center;
`;

export const ImageModal = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
`;

export const Description = styled.p`
  font-size: 20px;
  font-family: "LatoRegular";
  margin-bottom: ${SPACING.large}px;
  margin-top: ${SPACING.large}px;
`;

export const BottomBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  border-top-color: ${({ theme }) => theme.borderColor.color};
  border-top-style: solid;
  border-top-width: 2px;
  justify-content: space-around;

  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: ${SPACING.large}px;
    margin-bottom: ${SPACING.large}px;
`;

export const CopyButton = styled.div`
    height: 40px;
    display: flex;
    max-width: 280px; 
    width: 100%;
    border: 1px solid ${({ theme }) => theme.borderColor.color};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    margin-left: ${SPACING.small}px;
`;

export const CopyBox = styled.div`
  width: 100px;
  height: 40px;
  align-items: center; 
  justify-content: center;
  background-color: ${({ theme }) => theme.borderColor.color };
  overflow: hidden;
  font-family: "LatoBlack";
`;

export const TxtAddress = styled.p`
  font-size: ${FONT_SIZE.medium}px;
  font-family: "LatoBlack";
  text-align: center;
`;