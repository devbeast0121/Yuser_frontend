import styled from 'styled-components';
import { COLORS, FONT_SIZE, SPACING } from '../../styles/Styling.js';

export const ListContainer = styled.div` 
    display: flex;
    max-width: 100px;
    flex-direction: column;
`;

export const RowContainer = styled.div` 
    display: flex;
    height: 50px;
    width: 100%;
    flex-direction: row;
    align-items: center;
`;

export const Name = styled.p` 
    font-family: ${props => props.isAdmin ? "LatoBlack" : "LatoRegular"};
    font-size: ${FONT_SIZE.small}px;
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    max-width: 100px;
`;

export const Title = styled.p` 
    font-weight: bold;
`;

export const AvatarContainer = styled.div` 
    display: block;
    height: 30px; 
    width: 30px; 
    align-items: center;
    justify-content: center;
    margin-left: ${SPACING.small}px;
    margin-right: ${SPACING.small}px;
    position: relative;
`
export const ChatNameBox = styled.div` 
    position: sticky;
    z-index: 99999;
    height: 30px; 
    width: 100px;
    flex-direction: row;
    margin-top: 2px;
`