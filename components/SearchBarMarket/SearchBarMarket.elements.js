import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MainContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: ${SPACING.large}px;
    flex-direction: row;

    @media screen and (max-width: 420px){
      display: none;
    }
`;

export const SearchBarContainer = styled.div`
    display: flex;
    flex:1;
    background-color: ${({ theme }) => theme.name == "light" ? COLORS.whiteMedium : COLORS.blackMedium};
    height: 44px;
    align-items: center;
    border-radius: 21px;
    flex-direction: row;
    padding-left: ${SPACING.medium}px;
    margin-bottom:  ${SPACING.large}px;
`;

export const TextInput = styled.input`
    display: flex;
    width: 100%;
    align-items: flex-start;
    background-color: transparent;
    margin-left: 10px;
    border: none;
    outline: none;  // need?
    line-height: 36px;
    height: 40px;
    color: ${({ theme }) => theme.textSecondary.color};
    caret-color: ${({ theme }) => theme.textSecondary.color};
 
    &::placeholder {
      color: ${({ theme }) => theme.textSecondary.color};
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