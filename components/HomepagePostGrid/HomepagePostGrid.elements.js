import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-column-gap: ${SPACING.large}px;
    grid-row-gap:${SPACING.large}px;
    z-index:1;
    flex:1;
    justify-content:center;
    margin-right: 24px;
    margin-top: 24px;
    @media screen and (max-width: 850px){  
        margin-right:24px;
        margin-left:24px;
    }
    @media screen and (max-width: 600px) {
        grid-template-columns:  repeat(1, 1fr);
    }
`;

export const PostContainer = styled.div`
    height:100%;
    width:100%;
    flex-direction:column;
`;

export const PostImage = styled.img`
    flex:1;
    border-radius:10px;
    cursor:pointer;
    height:100%;
    width:100%;
    min-height:250px;
    min-width:250px;
    @media screen and (max-width: 600px){  
        min-width:unset;
        min-height:unset;
    }
`;

export const PostTopBar = styled.div`
    min-height:30px;
    flex-direction:row;
    justify-content:space-between;
    margin-bottom:${SPACING.medium}px;
`;

export const UserSection = styled.div`
    flex-direction:row;
    align-items:center;
`;

export const GemSection = styled.div`
    flex-direction:row;
    align-items:center;
`

export const BoldText = styled.text`
    font-weight:bold;
    font-size:${props=> props.fontSize || 16}px;
    font-family:'LatoBlack';
`;