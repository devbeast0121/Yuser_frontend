import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const FeaturedPhotoBox = styled.div`
  display: flex;
  height: 380px;
  width: 100%;
  max-width: 900px;
  margin-top: ${SPACING.large}px;
  position: relative;

  @media screen and (max-width: 700px){
    margin-top: 0px;
  }
  @media screen and (max-width: 440px){
    height: 210px;
  }
`;

export const ProfileBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  padding-left: ${SPACING.large}px;
  padding-right: ${SPACING.large}px;
`;

export const FeaturedImage = styled.img`
  position: absolute;
  top: 0; 
  right: 0;
  bottom: 0; 
  left: 0;
  z-index: 1;
  display: flex;
  width:  100%;
	height: 100%;
  object-fit: cover;
  border-radius: 5px;
  overflow: hidden;

  @media screen and (max-width: 700px){
    border-radius: 0px;
  }
`;

export const FeaturedImageDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0; 
  bottom: 0; 
  left: 0;
  z-index: 999;
  display: flex;
  width:  100%;
	height: 100%;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.borderColor.color};

    @media screen and (max-width: 900px){
      max-width: 650px;
      max-height: max-width;
    }

    @media screen and (max-width: 700px){
      border-radius: 0px;
    }
`;

export const ProfileTopMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;

  @media screen and (max-width: 440px){
    justify-content: flex-start;
    margin-bottom: ${SPACING.large}px;
  }
`;

export const StatsInfo = styled.div`
  display:flex;
  flex-direction: row;  
  margin-bottom: ${SPACING.medium}px;

  @media screen and (max-width: 700px){
    
  }

  @media screen and (max-width: 440px){
    flex-wrap: wrap;
    margin-bottom: 0px;
  }
`;

export const Stats = styled.div`
  display: flex;  
  flex-wrap: wrap;
  flex-direction: column;
  margin-right: ${SPACING.extraLarge}px;

  @media screen and (max-width: 440px){
      margin-bottom: ${SPACING.large}px;
  }
`;

export const NameBioBox = styled.div`
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: ${SPACING.large}px;
`;

export const UserName = styled.p`
  font-family: 'LatoBlack';
  font-size: ${FONT_SIZE.large}px;
`;

export const TruncateBox = styled.p`
   
`;

export const Title = styled.p`
  text-align: center;
  color: ${props => props.theme.textSecondary.color};
  font-family: 'LatoRegular', sans-serif;
  font-size: 12px;
`;
export const StatsValue = styled.p`
  text-align: center;
  font-family: 'LatoBlack';
  font-size: ${FONT_SIZE.extraLarge}px;
  color: ${props => props.theme.textPrimary.color};
`;

export const LinearGradient = styled.div`
  position:absolute;
  left:0;
  bottom:0;
  right:0;
  height:70%;
  z-index:9;
  background: linear-gradient(0deg, #0d1017e6, #0c101700);
  //background: ${({ theme }) => theme.name == "light" ? "linear-gradient(0deg, #e6e6e6, #0c101700)" : "linear-gradient(0deg, #0d1017e6, #0c101700)"};
`;

export const BackdropOverlay = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.2;
`;

export const BtnWrapper = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${COLORS.greyButton};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: ${SPACING.medium}px;
  margin-left: ${SPACING.large}px;
`;

export const AvatarWrapper = styled.div`
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  transform: translate(0%, -50%);

  @media screen and (max-width: 440px){
    top: -50%;
    left: 0;
    transform: translate(0, -90%);
  }
`;
