import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const FooterContainer = styled.div`
    border-top: 1px solid ${({ theme }) => theme.borderColor.color};
    padding-top: ${SPACING.medium}px;
    margin-top: auto;
    margin-bottom: ${SPACING.medium}px;

    @media screen and (max-width: 991px){
            display: none;
    }
`;

export const FooterMenu = styled.ul`
`;

export const MenuItem = styled.li`
    display: inline-block;
    margin-right: ${SPACING.medium}px;
    margin-bottom: ${SPACING.medium}px;
    opacity: 0.7;
    font-size:15px;
`;

export const Alink = styled.a`
    text-decoration: none;
    opacity: 0.9;


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