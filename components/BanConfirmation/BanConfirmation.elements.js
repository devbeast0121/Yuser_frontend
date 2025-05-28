import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const Container = styled.div`
    display: flex;
    max-width: 500px;
    width: 100%;
    max-height: 450px;
    flex-direction: column;
    z-index:99999;
	background-color: ${COLORS.blackDarkMedium};
    justify-content:center:
    align-content:center;
    border-radius:5px;
    position:absolute;
    align-self:center;
`;

export const BanReasonBox = styled.textarea`
	height: 100%;
    line-height: 1.6em;
	display: flex;
	align-items: flex-start;
	background-color: ${COLORS.blackDarkMedium};
	border-style: solid;
    border-radius: 5px;
    border-color: #2f3d57;
    border-width: 1px;
	outline: none;
	caret-color: ${COLORS.whiteLight} !important;
    color: ${COLORS.white};
    padding-top: ${SPACING.large}px;
    padding-left: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
    resize: none;
    margin-left:${SPACING.medium}px;
    margin-top:${SPACING.medium}px;
    margin-right:${SPACING.medium}px;

    &::placeholder {
        color: ${COLORS.greyMedium};
    }

    &::placeholder {
        color: ${COLORS.greyMedium};
    }

    @media screen and (max-width: 680px){
        margin-left: ${SPACING.small}px;
    }
`;

export const ButtonsMenuRow = styled.div`
    display: flex;
    max-width: 500px;
    flex-direction: row;
    justify-content:space-between;
    background-color: ${COLORS.blackDarkMedium};
    border-radius: 10px;
    padding: ${SPACING.medium}px;
    z-index: 9999;


`;

export const Background = styled.div`
    width:100%;
    height:100%;
    z-index:999;
    background-color:${COLORS.black50};
    position:fixed;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-content:center;
`;

export const BanTitle = styled.p`
    font-size: 28px;
    font-family: 'LatoBlack';
    color: ${COLORS.white};
    margin-top: ${SPACING.large}px;
    margin-bottom: ${SPACING.medium}px;
    align-self:center;
`;