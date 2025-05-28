import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const BidsListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const BidContainer = styled.div`
    flex-direction: row;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: ${SPACING.large}px 0;
    border-bottom: 1px solid #333;
    align-items: center;
    outline: none;
    border-bottom:1px solid #333;
`

export const BidBox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: ${SPACING.medium}px;
`

export const UserName = styled.p`
    font-family: 'LatoBlack';
`

export const BidTime = styled.p`
    font-size: ${FONT_SIZE.small}px;
    margin-top: ${SPACING.small}px;
    margin-right: ${SPACING.medium}px;
    color: ${COLORS.greyMedium};
`
export const BidPrice = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

export const EthereumPrice = styled.p`
    font-size: ${FONT_SIZE.large}px;
    font-family: 'LatoBlack';
    text-align: right;
`

export const DollarPrice = styled.p`
    font-size: ${FONT_SIZE.small}px;
    margin-top: ${SPACING.small}px;
    margin-right: ${SPACING.medium}px;
    color: ${COLORS.greyMedium};
    text-align: right;
`
///-------------
export const TabBox = styled.div`
    flex: 1;
`;