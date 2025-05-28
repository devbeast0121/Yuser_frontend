import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const MainStakingContainer = styled.div`
    flex-direction:column;
    width: 100%;
    margin-top: ${SPACING.large}px;
`;

export const StakingEmpty = styled.div`
    flex-direction:column;
    flex:1;
    justify-content:center;
    align-items:center;
    background-color: ${({ theme }) => theme.containerSecondary.color};
    border-radius:15px;
    padding:40px 24px;
`
export const TxtTitle = styled.p`
    font-size: ${FONT_SIZE.large}px;
    font-family: 'Rubik', "LatoBlack", sans-serif;
`
export const TxtDescription = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family: 'LatoRegular';
    margin-bottom:16px;
`
export const ImageBox = styled.div`
    border-radius:10px;
    overflow:hidden;
`