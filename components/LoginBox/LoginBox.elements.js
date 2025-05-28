import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const LoginBoxContainer = styled.div`
    display: flex;
    flex: ${props => props.splash ? 1 : null};
    flex-direction: column;
    margin-bottom: ${SPACING.large}px;
    border-radius:5px;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin: 0;
    max-width:400px;
    
    @media screen and (max-width: 991px){
        display: none;
    }
`;

export const LoginTitle = styled.p`
    text-align: center;
    font-size: 24px;
    font-family:'LatoBlack';
`;

export const LoginText = styled.p`
    text-align: center;
    line-height: 1.3;
    word-wrap: break-word;
    margin-bottom: ${SPACING.medium}px;
    margin-top: ${SPACING.medium}px;
`;

export const LoginBoxContainerSidebar = styled.div`
    display: flex;
    flex: ${props => props.splash ? 1 : null};
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: ${SPACING.large}px;
    border-radius:5px;
    
    @media screen and (max-width: 991px){
            display: none;
    }
`;

export const LoginTitleSidebar = styled.p`
    text-align: left;
    font-size: 24px;
    font-family:'LatoBlack';
`;

export const LoginTextSidebar = styled.p`
    text-align: left;
    line-height: 1.3;
    word-wrap: break-word;
    margin-bottom: ${SPACING.medium}px;
    margin-top: ${SPACING.medium}px;
`;
