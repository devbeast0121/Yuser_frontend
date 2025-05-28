import { Switch } from '@material-ui/core';
import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const BackgroundContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: ${COLORS.black50};
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ModalContainer = styled.div`
    max-width: 530px;
    width:100%;
    background-color: #252E3B;
    border-radius: 20px;
    flex-direction: column;
    padding: ${SPACING.large}px;
    overflow: auto;
    position: relative;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.p`
    font-size: ${FONT_SIZE.large}px;
    color: ${({ theme }) => theme.textSecondary.color}
    margin-bottom: ${SPACING.large}px;
    font-family: 'LatoBlack';
`;

export const SubText = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    color: ${({ theme }) => theme.textSecondary.color}
    margin-bottom: ${props => props.margin ? 0 : SPACING.large}px;
    margin-right:  ${props => props.margin ? 40 : 0}px;
    font-family: 'LatoBlack';
    align-content: center;
`;

export const TagsInputBox = styled.input`
	height: 60px;
	width: 100%;
    display: flex;
	align-items: flex-start;
	background-color: ${({ theme }) => theme.colorGrey.color};
	border-style: solid;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.borderColor.color};
    border-width: 1px;
	outline: none;
	caret-color: ${({ theme }) => theme.placeholder.color} !important;
    // color:  ${({ theme }) => theme.textSecondary.color};
    padding-left: ${SPACING.large}px;
    padding-top: 18px;
    padding-bottom: 18px;

    &::placeholder {
        color: ${({ theme }) => theme.placeholder.color};
    }
`;

export const TagsSubText = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    color: ${props => props.color ? COLORS.White : COLORS.greyMedium};
    margin-top:   ${props => props.margin ? 0 : SPACING.medium}px;
    padding-right:  ${props => props.solid ? 5 : 0}px;
    font-family: ${props => props.solid ? 'LatoBlack' : 'LatoRegular'};
`;

export const SubBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:  ${props => props.space ? 'space-between' : ""};
    margin-bottom:  ${props => props.space ? SPACING.large : 0}px;

    @media screen and (max-width: 600px){
        flex-direction: ${props => props.small ? 'row' : 'column'};
        align-items: flex-start;
    }
`;

export const SubBoxVertical = styled.div`
    flex-direction: column;
    align-items: left;
    margin-bottom:  ${SPACING.large}px;
`;

export const Divider = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colorGrey.color};
    margin-top: ${SPACING.extraLarge}px;
    margin-bottom: ${SPACING.extraLarge}px;
    overflow: visible;
`;

export const ButtonsMenu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: ${SPACING.extraLarge}px;
    margin-right: 0px;
    margin-top: auto;
    margin-left: auto;
    padding-top: ${SPACING.extraLarge}px;
`;

export const NFTcontainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PriceBox = styled.div`
    max-width: 310px;
    width: 100%;
    height: 85px;
    border-radius: 5px;
    border-color: ${props => props.price ? COLORS.blue : '#2f3d57'};
    border-width: 2px;
    border-style: solid;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colorGrey.color};
    margin-top: ${SPACING.large}px;
    margin-left: ${props => props.left ? 0 : SPACING.small}px;
    margin-right: ${props => props.left ? SPACING.small : 0}px;
    cursor: ${props => props.left ? 'pointer' : 'default'};
    opacity: ${props => props.left ? 1 : 0.3};

    @media screen and (max-width: 600px){
        margin-left: 0px;
        margin-right: 0px;
    }
`;

export const BtnClose = styled.div`
    border-radius: 30px;
    background-color:${({ theme }) => theme.container.color};
    position: absolute;
    z-index: 9;
    top: ${SPACING.extraLarge}px;
    right: ${SPACING.extraLarge}px;
    cursor: pointer;
    height:40px;
    width:40px;
    align-items: center;
    justify-content: center;
`;

export const PriceInput = styled.input`
	display: flex;
    width: 100%;
	text-align: right;
	background-color: transparent;
	outline: none;
    border-style: none;
	caret-color: ${({ theme }) => theme.placeholder.color} !important;

    &::placeholder {
        color: $${({ theme }) => theme.placeholder.color};
    }
`;

export const PriceInputBox = styled.div`
    height: 60px;
	width: 150px;
	flex-direction: row;
	background-color: ${({ theme }) => theme.colorGrey.color};
	border-style: solid;
    border-radius: 5px;
    border-color:${({ theme }) => theme.borderColor.color};
    border-width: 1px;
    margin-left: auto;
    padding-right: ${SPACING.medium}px;
    padding-left: ${SPACING.medium}px;

    @media screen and (max-width: 600px){
        align-self : flex-start;
        margin-left: 0px;
        margin-bottom: ${SPACING.large}px;
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

   @media screen and (max-width: 600px){
        align-self : flex-start;
        margin-left: 0px;
        margin-bottom: ${SPACING.large}px;
    }
`;

export const SecretInputBox = styled.textarea`
	height: 140px;
    line-height: 1.6em;
	width: 100%;
	display: flex;
	align-items: flex-start;
	background-color: ${({ theme }) => theme.colorGrey.color};
	border-style: solid;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.borderColor.color};
    border-width: 1px;
	outline: none;
	caret-color: ${({ theme }) => theme.placeholder.color} !important;
    padding: ${SPACING.large}px;
    resize: none;
    color:  ${({ theme }) => theme.textSecondary.color};

    &::placeholder {
        color: ${({ theme }) => theme.placeholder.color};
    }
`;