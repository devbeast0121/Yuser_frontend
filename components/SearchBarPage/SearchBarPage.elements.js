import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MainContainer = styled.div`
    display: flex;
    max-width: 100%;
    padding-top: ${SPACING.medium}px;
    margin-left: ${SPACING.large}px;
    margin-right: ${SPACING.large}px;
    flex-direction: row;
    align-items:center;

    @media screen and (max-width: 700px){
        padding-top: 0px;
    }
`;

export const Menu = styled.div`
    justify-content: center;
    align-items: center;
    margin-left: auto;
`

export const SearchBarContainer = styled.div`
    display: flex;
    width: ${props => props.page == "home" ? '50%' : '100%'};
   // background-color: ${({ theme }) => theme.name == "light" ? COLORS.whiteMedium : COLORS.blackMedium};
    border: 1px solid ${props => props.active ? props.theme.inactiveColor.color : props.theme.borderColor.color };
    border-radius: 10px;
    height: 44px;
    align-items: center;
    flex-direction: row;
    padding-left: ${SPACING.medium}px;

    @media screen and (max-width: 1100px){
        width: ${props => props.page == "home" ? '40%' : '100%'};
    }

    @media screen and (max-width: 991px){
        width: 100%;
    }
    @media screen and (max-width: 700px){
        margin-left: 0px;
    }
`;

export const TextInput = styled.input`
    display: flex;
    width: 100%;
    align-items: flex-start;
    background-color: transparent;
    margin-left: 10px;
    border: none;
    outline: none;
    line-height: 36px;
    height: 40px;
    cursor: auto;
    caret-color: ${({ theme }) => theme.placeholder.color} !important;
    color:  ${({ theme }) => theme.textSecondary.color};
    
    &::placeholder {
        color: ${({ theme }) => theme.placeholder.color};
    }

    @media screen and (max-width: 960px){
       max-width: 100%;
       margin-left: ${SPACING.small}px;
       margin-right: ${SPACING.large}px;
    }
`;

export const LogoImg = styled.img`
    height: 30px;
    margin-top: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
`;

export const ALink = styled.a`
    text-decoration: none;
    opacity:0.9;
    font-family: "Rubik","LatoBlack",  sans-serif;

    :link {
        color:  ${({ theme }) => theme.textPrimary.color}
    }

    :visited {
        color: ${({ theme }) => theme.textPrimary.color}
    }

    :hover {
        opacity: 0.4;
        color: ${({ theme }) => theme.textPrimary.color}
    }

    :active {
        opacity: 0.4;
        color: ${({ theme }) => theme.textPrimary.color}

    }
`;


export const OverlayContainerSearch = styled.div`
    flex-direction: column;
    width: 500px;
    height:380px;
    background: #141A26;
    border-radius: 5px;
    zIndex: 999999,
    position:absolute;  
    top:94px;
    @media screen and (max-width: 700px){
        width: 400px;
    }
    @media screen and (max-width: 480px){
       margin-left: 0px;
       margin-right: 0px;
    
    }
`;