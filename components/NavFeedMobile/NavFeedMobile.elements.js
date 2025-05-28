import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const NavFeedMobileContainer = styled.div`
  display: none;
    
    @media screen and (max-width: 480px){
        width: 120px;
        height: 40px;
        display: flex;
        border-radius: 20px;
        background-color: ${COLORS.black20};    //'rgba(51,51,51,0.8)' in app
        flex-direction: row;
        position: sticky;
        z-index: 999;
        top: 120px;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const BtnFeed = styled.div`
   display: flex;
   height: 40px;
   width: 50%;
   align-items: center;
   justify-content: center;
   cursor: pointer;
`;


export const BtnText = styled.p`  
    padding-left: ${({ btnHot }) => (btnHot ? 8 : 0)}px;
    padding-right: ${({ btnMe }) => (btnMe ? 12 : 0)}px;
    padding-bottom: 3px;
    font-size: 15px;
    //font-weight: ${props => props.feed ? 900 : 400};
    font-family: ${props => props.feed ? 'LatoBlack' : 'LatoRegular'};
`;

export const Divider = styled.div`
    height: 30px;
    width: 4px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colorGrey.color};
    align-self: center;
`;