import styled from 'styled-components';
import { Container, SideBarLeft, SideBarRight } from '../../styles/globalStyles';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const HashtagChallengeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
    flex-shrink:0;
    margin-bottom: ${SPACING.large}px;

    @media screen and (max-width: 991px){
            display: none;
    }
`;

export const ContainerInner = styled.div`
    justify-content: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    position:relative;
    margin-bottom: ${SPACING.medium}px;
`;

export const Background = styled.div`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
`;

export const HashtagInfo = styled.div`
    background:#00000078;
    position:relative;
    justify-content: flex;
    align-items: center;
    flex-direction: column;
`;

export const SectionTop = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    padding-top:  ${SPACING.large}px;
    align-items: flex-start;
`;

export const SectionBottom = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: ${SPACING.large}px;
`;

export const HashtagTitle = styled.p`
    text-align: left;
    font-size: 25px;
    font-family:'LatoBlack';
    z-index:99; 
    color: white;
`;

export const IconWrapper = styled.div`
    display: flex;
    flex: 1;
    z-index: 999; 
    height: 100px;
    width: auto;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    z-index: 999; 
    height: auto;
    justify-content: center;
`;

export const HashtagText = styled.p`
    text-align: left;
    word-wrap: break-word;
    font-family: 'LatoLight';
    z-index: 99;
    font-size: 20px;
    color: white;
`;

export const HashtagTextTwo = styled.p`
    text-align: left;
    word-wrap: break-word;
    font-family: 'LatoLight';
    z-index: 99;
    font-size: 18px;
    color: white;
`;