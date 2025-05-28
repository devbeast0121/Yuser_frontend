import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const EmptyContainer = styled.div`
    display: flex;
    flex: ${props => props.splash ? 1 : null};
    flex-direction: column;
    margin-bottom: ${SPACING.large}px;
    border-radius:10px;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin: 0;
    width:390px;
    max-height:107px;
    background-color: ${({ theme }) => theme.colorGrey.color};
    align-self:center;
    margin-top:400px;
`;

export const TxtCurrentBid = styled.p`
    font-size: ${FONT_SIZE.medium}px;
    font-family: ${props => props.titleTxt ? 'LatoBlack' : 'LatoRegular'};
    color: ${props => props.theme.name == "light" && props.titleTxt ? COLORS.black :
                                    props.theme.name == "light" && !props.titleTxt ? COLORS.greyMedium :
                                        props.theme.name == "dark" && props.titleTxt ? COLORS.white : COLORS.whiteLight};
    text-align: center;
`;
