import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const PromoBoxContainer = styled.div` 
    display: flex;
    flex-direction: column;
    padding-right: ${SPACING.medium}px;
    padding-left: ${SPACING.medium}px;
    margin-top: ${SPACING.large}px;
    //background-color: ${({ theme }) => theme.colorDark.color};
`;

export const Invite = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-left: ${SPACING.medium}px;
`;
export const InviteBox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: ${SPACING.large}px;
`;

export const TxtLarge = styled.p`
    font-family: 'LatoBlack';
    font-size: ${FONT_SIZE.medium}px;
    margin-bottom: ${SPACING.medium}px;
`;

export const TxtSmall = styled.p`
    font-family: 'LatoRegular';
    font-size: ${FONT_SIZE.small}px;
`;