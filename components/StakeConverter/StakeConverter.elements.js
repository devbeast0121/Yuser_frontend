import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const SubBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${SPACING.small}px;
    margin-left: ${SPACING.large}px;
    margin-right: ${SPACING.large}px;
    margin-bottom: ${SPACING.large}px;
    justify-content:  ${props => props.between ? 'space-between' : 'flex-start'};

    @media screen and (max-width: 480px){
        flex-direction: ${props => props.small ? 'row' : 'column'};
        align-items: flex-start;
    }
`;


export const PriceInput = styled.input`
	display: flex;
    width: 100%;
	text-align: left;
	background-color: transparent;
	outline: none; 
    border-style: none;
	caret-color: ${({ theme }) => theme.placeholder.color} !important;
    color:  ${({ theme }) => theme.textSecondary.color};
    padding-left: ${SPACING.medium}px;
    padding-top: ${SPACING.medium}px;
    font-size: 28px;
    
    &::placeholder {
        color: ${({ theme }) => theme.placeholder.color};
    }
`;

export const IconWrap = styled.div`
    height: 100%;
    width: 50%;
    background-color: ${({ theme }) => theme.containerSecondary.color};
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
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

export const TxtCurrentBid = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family:'LatoRegular';
    color:  ${({ theme }) => theme.textPrimary.color};
    margin-left: ${SPACING.large}px;
    margin-right: ${SPACING.large}px;
`;

export const PriceInputIIcon = styled.div`
    height: 60px;
	width: 100%;
	flex-direction: column;
	background-color: ${({ theme }) => theme.containerSecondary.color};
	border-style: solid;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.borderColor.color};
    border-width: 1px;
    justify-content:flex-start;
    //padding-right: ${SPACING.medium}px;
   // margin-bottom: ${SPACING.medium}px;

    @media screen and (max-width: 480px){
        align-self : flex-start;
        margin-left: 0px;
        margin-bottom: ${SPACING.large}px;
    }
`;
export const TextWMOVR = styled.div`
    font-size: ${FONT_SIZE.small}px;
   // font-family: 'LatoBlack';
    text-align: left;
    padding-top: ${SPACING.small}px;
    padding-left: ${SPACING.small}px;
`;

export const OverlayContainer = styled.div`
    flex-direction: column;
    width: 670px;
    background: ${({ theme }) => theme.containerSecondary.color};
    padding-top: ${SPACING.large}px;
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
export const BtnClose = styled.div`
    cursor: pointer;
    height:30px;
    width:30px;
    align-items: center;
    justify-content: center;
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

export const TxtBid = styled.p`
    font-size: ${FONT_SIZE.extraLarge}px;
    padding-left: ${SPACING.large}px;
    padding-top: ${SPACING.small}px;
    font-family: 'LatoBlack';
    text-align: left;
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

export const BalanceContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
`;

export const MOVRBalance = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family: 'LatoRegular';
    color:${props => props.titleTxt ? props.theme.containerSecondary.color : props.theme.containerSecondary.color}; 
    text-align: center;
`;

export const TxtLarge = styled.p`
    font-size: ${FONT_SIZE.large}px;
    //font-family: 'LatoBlack';
    padding-left: ${SPACING.small}px;
    padding-top: ${SPACING.medium}px;
    color: ${props => props.theme.textPrimary.color};
    width:100%;
`;

export const TopBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${SPACING.large}px;
    margin-left: ${SPACING.large}px;
    margin-right: ${SPACING.large}px;
    justify-content:  ${props => props.between ? 'space-between' : 'flex-start'};

    @media screen and (max-width: 480px){
        flex-direction: ${props => props.small ? 'row' : 'column'};
        align-items: flex-start;
    }
`;

export const TabWrapper = styled.div`
    width: 50%;
    margin-top: ${SPACING.large}px;


    @media screen and (max-width: 480px){
      //  padding-left: ${SPACING.medium}px;
       // padding-right: ${SPACING.medium}px; 
    }     
`;