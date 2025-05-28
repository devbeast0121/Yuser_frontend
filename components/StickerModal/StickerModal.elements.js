
import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MainContainer = styled.div`
    display: block;
    height: 500px;
    width: 500px;
    flex-direction: column;
    z-index: 999;
    background-color:  ${({ theme }) => theme.colorMedium.color};
    border: 2px solid ${({ theme }) => theme.colorGrey.color};
    border-radius: 5px;
    padding: ${SPACING.large}px;
  
`;

export const SearchBox = styled.div`
    display: flex;
    height: auto;
    width: 100%;
    flex-direction: row;
    position: relative;
    margin-bottom: ${SPACING.large}px;
`;

export const TextInputBox = styled.input`
    height: 40px;
    width: 100%;
    border: 2px solid ${({ theme }) => theme.name == "light" ? COLORS.black20 : COLORS.blackDarkMedium};
    border-radius: 5px;
    background-color:${({ theme }) => theme.name == "light" ? COLORS.whiteLight : COLORS.blackDarkMedium};
    outline: none;
    caret-color: ${({ theme }) => theme.placeholder.color} !important;
    color:  ${({ theme }) => theme.textSecondary.color};
    padding-left: 33px;

    &::placeholder {
        color: ${({ theme }) => theme.placeholder.color};
    }
`;

export const IconWrapper = styled.div`
    position: absolute;
    top: 9px;
    left: 10px;
`;