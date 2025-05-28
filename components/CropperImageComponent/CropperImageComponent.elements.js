import styled, { css } from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const Overlay = styled.div`
    position: fixed; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); 
    z-index: 99;
    justify-content: center;
    align-items: center;
  `;

export const MainContainer = styled.div`
    flex-direction: column;
    height: ${props => props.previewType == "avatar" ? 500 : 750}px;
    width:  ${props => props.previewType == "avatar" ? 500 : 750}px;
    background:  ${({ theme }) => theme.colorGrey.color}; //${COLORS.blackDarkMedium};
    padding: ${SPACING.large}px;
    border-radius: 20px;
    position: relative;  
    ${props => props.previewType == "avatar" && css`
      @media screen and (max-width: 540px){
      width: 100%;
      max-height: 750px;
      height: 100%;
      }
   `}
   ${props => props.previewType == "featured" && css`
      @media screen and (max-width: 780px){
      width: 100%;
      max-height: 750px;
      height: 100%;
      }
   `}
   
`;

export const CropperContainer = styled.div`
    flex-direction: column;
    height: ${props => props.previewType == "avatar" ? 400 : 640}px;
    width: ${props => props.previewType == "avatar" ? 450 : 700}px;
    background: ${props => props.theme.name == "light"?  COLORS.whiteMedium : COLORS.blackDarkMedium};
    padding: ${SPACING.large}px;
    border-radius: 10px;
    overflow: hidden;
    position: relative; 
    ${props => props.previewType == "avatar" && css`
      @media screen and (max-width: 540px){
      width: 100%;
      max-height: 650px;
      height: 100%;
      }
   `}
   ${props => props.previewType == "featured" && css`
      @media screen and (max-width: 780px){
      width: 100%;
      max-height: 750px;
      height: 100%;
      }
   `}
`;

export const BottomContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    gap: 60px;
    border-top-color: ${({ theme }) => theme.borderColor.color};
    border-top-style: solid;
    border-top-width: 1px;
    padding: ${SPACING.large}px;
    
    @media screen and (max-width: 540px){
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 30px;
   } 
`;

export const MiddleContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${SPACING.large}px;
    
   @media screen and (max-width: 540px){
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
   } 
`;
export const ZoomText = styled.p`
    margin-right: ${SPACING.extraLarge}px;
    
   @media screen and (max-width: 540px){
      margin-right: 0px;
      margin-bottom: ${SPACING.large}px;
   } 
`;