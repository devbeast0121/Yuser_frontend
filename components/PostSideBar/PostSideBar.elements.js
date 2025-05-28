import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MainContainer = styled.div`
    min-width: ${props => props.position === 'horizontal' ? 130 : 70}px;
    max-width:  ${props => props.position === 'horizontal' ? 496 : 70}px;
    flex-direction: ${props => props.position === 'horizontal' ? 'row' : 'column'};
    align-items: ${props => props.position === 'horizontal' ? 'center' : 'center'} ;
    justify-content: ${props => props.position === 'horizontal' ? 'center' : 'flex-end'} ;
    background:  ${props => props.position === 'horizontal' ? "linear-gradient(90deg,#DB4D46, #8C30DB)" : "linear-gradient(0deg,#DB4D46, #8C30DB)"};
    border-radius: 10px;

    @media screen and (max-width: 700px){
        justify-content: center;
        align-items: center;
        padding-bottom: ${props => props.position === 'horizontal' ? 0 : 12}px;

        background:  ${props => props.position === 'horizontal' ? "linear-gradient(90deg,#DB4D46, #8C30DB)" : "transparent"};
        background-color:  ${props => props.position === 'horizontal' ? "transparent" : COLORS.black20};
        border-radius: ${props => props.position === 'horizontal' ? "10px" : "10px 0px 0px 0px"};
    }
`;

export const PostSideBarContainer = styled.div`
    flex-direction: ${props => props.position === 'horizontal' ? 'row' : 'column'};
    display: flex;
    overflow: visible;
    padding-top: ${SPACING.medium}px;
    padding-bottom:${SPACING.medium}px;
`;

export const BtnSideBar = styled.div`
    margin-right: ${props => props.position === 'horizontal' ? '12px' : '0'};
    margin-left: ${props => props.position === 'horizontal' ? '12px' : '0'};
    justify-content: ${props => props.position === 'horizontal' ? 'flex-start' : 'center'};
    display: flex;
    flex-direction: column;
    cursor: pointer;
    align-items:center;
    margin-top:${props => props.position === 'horizontal' ? '0' : '6px'};
    margin-bottom:${props => props.position === 'horizontal' ? '0' : '6px'};
`;

export const BtnText = styled.p`    
    text-align: center ;
    padding-top: ${SPACING.small}px;
    font-size: 13px;
    font-family: "LatoBlack";
    color: ${COLORS.white}; //${({theme})=> theme.textPrimary.color};
`;

export const AvatarContainer1 = styled.div`
    display:flex;
    align-self: flex-start;

    @media screen and (max-width: 700px){ 
        //display:none;
    }
;`