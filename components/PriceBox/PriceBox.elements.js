//import { SP } from 'next/dist/next-server/lib/utils';
import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const PriceBoxContainer = styled.div`
    display: flex;
    flex: 1;
    width: 660px;
    flex-direction: column;
    position: relative;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.container.color};//${COLORS.black};
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    padding-bottom: ${SPACING.large}px;
    margin-top: ${SPACING.large}px;

    @media screen and (max-width: 680px){
        display: flex;
        width: 450px;
    }

    @media screen and (max-width: 480px){
        display: flex;
        width: 300px;
    }
`;

export const TxtMain = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    //color: ${COLORS.whiteLight};
    line-height: 1.8;
    margin-bottom: ${props => props.property ? 0 : SPACING.large}px;
    text-align: ${props => props.align ? "right" : "left"};
`;

export const FormatSubBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-start;
`;

export const WelcomeText = styled.p`
    font-family: 'LatoBlack';
    font-size: ${FONT_SIZE.large}px;
    color: ${({ theme }) => theme.textPrimary.color};
    margin-bottom: ${props => props.property ? 0 : SPACING.medium}px;
    padding-right: ${props => props.property ? 0 : SPACING.large}px;
    padding-top: ${props => props.property ? 0 : 7}px;
`;

export const SubBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:  ${props => props.between ? 'space-between' : 'flex-start'};

    @media screen and (max-width: 480px){
        flex-direction: ${props => props.small ? 'row' : 'column'};
        align-items: flex-start;
    }
`;

export const PriceInputBox = styled.div`
    height: 60px;
	width: 175px;
	flex-direction: row;
	background-color: ${({ theme }) => theme.colorGrey.color};
	border: 1px solid  ${({ theme }) => theme.borderColor.color};
    border-radius: 5px;
    border-color:
    margin-left: auto;
    padding-right: ${SPACING.medium}px;

    @media screen and (max-width: 480px){
        align-self : flex-start;
        margin-left: 0px;
        margin-bottom: ${SPACING.large}px;
    }
`;

export const PriceInput = styled.input`
	display: flex;
    width: 100%;
	text-align: right;
	background-color: transparent;
	outline: none;
    border-style: none;
	caret-color: ${({ theme }) => theme.placeholder.color} !important;
    // color:  ${({ theme }) => theme.textSecondary.color};
    &::placeholder {
        color: ${({ theme }) => theme.placeholder.color};
    }
`;

export const DateTimeBox = styled.div`
    height: 60px;
	width: 265px;
	background-color: ${({ theme }) => theme.colorGrey.color};
	border-style: solid;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.borderColor.color};
    border-width: 1px;
    margin-left: auto;
    justify-content: flex-end;
    align-items: center;
    padding-right: ${SPACING.small}px;

   @media screen and (max-width: 480px){
        align-self : flex-start;
        margin-left: 0px;
        margin-bottom: ${SPACING.large}px;
    }
`;

export const IconWrap = styled.div`
    height: 100%;
    width: 60px;
    background-color: ${({ theme }) => theme.colorMediumDark.color};
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
`;

export const LargeTitle = styled.p`
    font-size: 35px;
    font-family: 'LatoBlack';
    color: ${({ theme }) => theme.textPrimary.color};
    margin-bottom: ${SPACING.extraLarge}px;
    margin-top: ${SPACING.large}px;

    @media screen and (max-width: 980px){
        margin-top: ${props => props.resize ? SPACING.large : 0}px;
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