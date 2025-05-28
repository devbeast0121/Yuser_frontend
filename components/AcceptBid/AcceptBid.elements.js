//import { SP } from 'next/dist/next-server/lib/utils';
import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const OverlayContainer = styled.div`
    flex-direction: column;
    width: 670px;
    background: ${({ theme }) => theme.colorGrey.color};
    padding-top: ${SPACING.large}px;
    //padding-bottom: ${SPACING.large}px;
    border-radius: 15px;
    position:relative;  

    @media screen and (max-width: 700px){
        width: 400px;
    }

    @media screen and (max-width: 480px){
       margin-left: 0px;
       margin-right: 0px;
    
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    width: 20%;
    flex-direction: column;
    align-self: flex-end;
    margin-top: ${SPACING.large}px;
    margin-bottom: ${SPACING.large}px;

    @media screen and (max-width: 680px){
        width: 40%;
    }

    @media screen and (max-width: 480px){
        width: 60%;
    }
`;
export const BidContainer = styled.div`
    flex-direction: column;
    background-color: ${({ theme }) => theme.colorGrey.color};
    border-radius:10px;
    padding: ${SPACING.large}px;
    
`;

export const TxtCurrentBid = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family: ${props => props.titleTxt ? 'LatoBlack' : 'LatoRegular'};
    color: ${props => props.theme.name == "light" && props.titleTxt ? COLORS.black :
                                    props.theme.name == "light" && !props.titleTxt ? COLORS.greyMedium :
                                        props.theme.name == "dark" && props.titleTxt ? COLORS.white : COLORS.whiteLight};
    text-align: center;
`;

export const TxtBid = styled.p`
    font-size: ${FONT_SIZE.extraLarge}px;
    padding-left: ${SPACING.large}px;
    padding-top: ${SPACING.small}px;
    font-family: 'LatoBlack';
    text-align: left;
`;

export const ImgPreview = styled.img`
	height: 59px;
	width: 59px;
	background-color: ${({ theme }) => theme.container.color};
	border-radius: 5px;
`;

export const NewSubBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:  ${props => props.between ? 'space-between' : 'flex-start'};
    padding-bottom: ${SPACING.medium}px;
    @media screen and (max-width: 480px){
        flex-direction: ${props => props.small ? 'row' : 'column'};
        align-items: flex-start;
    }
`;
export const NewFormatSubBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-start;
`;

export const TopContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px; 

    @media screen and (max-width: 480px){
      //  padding-left: ${SPACING.medium}px;
       // padding-right: ${SPACING.medium}px; 
    }     
`;

export const BottomContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    border-top-color: ${({ theme }) => theme.borderColor.color};
    border-top-style: solid;
    border-top-width: 1px;
    padding-left: ${SPACING.extraLarge}px;
    padding-right: ${SPACING.extraLarge}px;
    
    @media screen and (max-width: 480px){
      //  padding-left: ${SPACING.medium}px;
      //  padding-right: ${SPACING.medium}px; 
    }      
`;
