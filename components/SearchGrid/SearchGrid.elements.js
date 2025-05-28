import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-column-gap: ${SPACING.large}px;
    grid-row-gap:${SPACING.large}px;
    z-index:1;
   // width:100%;
    flex:1;
    justify-content:center;
    //margin:${SPACING.large}px;
    margin-top: ${SPACING.small}px;
    @media screen and (max-width: 850px){  
        margin-right:24px;
        margin-left:24px;
    }
    @media screen and (max-width: 600px) {
        grid-template-columns:  repeat(1, 1fr);
    }
`;

export const PostContainer = styled.div`
    height:100%;
    width:100%;
    flex-direction:column;
    position: relative;
`;

export const PostImage = styled.img`
    flex:1;
    border-radius:10px;
    cursor:pointer;
    height:100%;
    width:100%;
    min-height:250px;
    min-width:250px;
    @media screen and (max-width: 600px){  
        min-width:unset;
        min-height:unset;
    }
`;

export const PostTopBar = styled.div`
    min-height:30px;
    flex-direction:row;
    justify-content:space-between;
    margin-bottom:${SPACING.medium}px;
`;

export const UserSection = styled.div`
    flex-direction:row;
    align-items:center;
`;

export const GemSection = styled.div`
    flex-direction:row;
    align-items:center;
`

export const BoldText = styled.text`
    font-weight:bold;
    font-size:${props=> props.fontSize || 16}px;
    font-family:'LatoBlack';
`;

export const BioText = styled.text`
    font-size:${props=> props.fontSize || 16}px;
    font-family:'LatoBlack';
`;

export const UserSuggestionDiv = styled.div`
    display: flex;
    color:${({ theme }) => theme.textSecondary.color};
    height: 80px;
   // width:100%;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
   
`;

export const NameBioDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    flex:1;
    height: 80px;
`;

export const PostsBox = styled.div`
    flex-direction: column; 
    margin-top: ${SPACING.large}px;
    border-top: 2px solid ${({ theme }) => theme.borderColor.color};
`;

export const HeaderBox = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: space-between;
    margin-top: ${SPACING.large}px;
    margin-bottom: ${SPACING.large}px;
    align-items: center;
`;

export const ButtonText = styled.p`
   font-size: 16px;
   color: ${COLORS.whiteLight};
   font-family: "LatoBlack";
   cursor: pointer;
`;

export const BottomBox = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding-bottom: ${SPACING.small}px;
    padding-left: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
    background:linear-gradient(0deg, #0c1017ab, transparent);
    z-index: 9;
    flex-direction: row;
    justify-content: space-between;
`;

export const BtnWrap = styled.div`
   background-color: transparent;
   font-family: 'LatoBlack';
   justify-content: ${props => props.positionLeft ? "flex-start" : "flex-end"};
   align-items: center;
   height: 40px;
   display: flex;
`;

export const TxtLarge = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family: 'LatoBlack';
    padding-left: ${SPACING.small}px;
    color: ${COLORS.white};
    text-shadow: 3px 3px 5px ${COLORS.blackMedium};
`;