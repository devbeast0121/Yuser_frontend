import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const MainContainer = styled.div` 
    flex-direction:column;
    position: relative;
    z-index: 1;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin:${SPACING.large}px;
    @media screen and (max-width: 850px){
        flex-direction:column;
    }
`;

export const ContentBox = styled.div` 
    flex-direction:column;
    justify-content: center;
    align-items: center;
    flex:1.6;
    order: ${props => props.reverse ? 1 : 2};
    padding-left: ${props => props.textMarginLeft ? SPACING.large : 0}px;
    padding-right: ${props => props.textMarginRight ? SPACING.large : 0}px;
    align-items:flex-start;
    width:100%;
    @media screen and (max-width: 850px){
        margin-top: ${props => props.reverse && props.mobileReverse ? SPACING.large : props.mobileReverse ? 0 : SPACING.large}px;
        order: ${props => props.reverse && props.mobileReverse ? 2 : props.mobileReverse ? 1 : 2};
        padding:unset;
    }
`;

export const ImageBox = styled.div` 
    margin-left: auto;
    margin-right: auto;
    width:100%;
    height:75%;
    order: ${props => props.reverse ? 2 : 1};
    flex:1;
    @media screen and (max-width: 850px){
        order: ${props => props.mobileReverse && props.reverse ? 1 : props.reverse ? 2 : 1};
    }
`;

export const Title = styled.p`
    font-family: 'Rubik', 'LatoBlack', sans-serif;
    line-height: 1;
    font-size: calc((${props => props.fontSize}/1300) * min(1290px,calc(100vw - 24px) ));
    //margin-bottom: ${SPACING.large}px;
    @media screen and (max-width: 1000px){
        margin-bottom:12px;
    }
    @media screen and (max-width: 750px){
        margin-bottom:12px;
    }
    @media screen and (max-width: 850px){
        font-size: calc(((${props => props.fontSize}/1300) * 2) * calc(100vw - 24px));
    }
`;

export const Item = styled.li`
    display: list-item;
    margin-bottom: 12px; 
    width: ${props => props.legends ? "100%" : "100%"};
   
    font-size: ${props => props.fontSize ? props.fontSize : 27}px;
    @media screen and (max-width: 750px){
        font-size: calc(${props => props.fontSize ? props.fontSize : 27}px - 8px);
    }
`;

export const ItemCondition = styled.li`
    display: list-item;
    margin-bottom: 12px; 
    width: 100%;
    font-style:  italic;
    font-size: ${props => props.fontSize ? props.fontSize : 27}px;
    @media screen and (max-width: 750px){
        font-size: calc(${props => props.fontSize ? props.fontSize : 27}px - 8px);
    }
`;

export const List = styled.ul`
    margin-top: 0;
    order:1;
    @media screen and (max-width: 1000px){
        margin-top: 0px;
    }
    @media screen and (max-width: 750px){
        margin-top: 0;
        margin-bottom: 0;
    }
`;

export const DescriptionContainer = styled.div` 
     margin-top: ${SPACING.medium}px;
     //order: 3;
     flex-direction:column;
     @media screen and (max-width: 1000px){
        margin-top: ${SPACING.medium}px;
     }
     @media screen and (max-width: 750px){
        margin-top: 0;
    }
`;

export const Description = styled.p`
    font-size: calc((${props => props.fontSize}/1300) * min(1290px,calc(100vw - 24px) ));
    @media screen and (max-width: 850px){
        font-size: calc(((${props => props.fontSize}/1300) * 2) * calc(100vw - 24px));
    }
`;


export const ButtonsBox = styled.div` 
    flex-direction: row;
    align-items: center;
    flex: 1;
    margin-left:0px;
    margin-right:0px;
    padding: 0;
    margin-top:${SPACING.large}px;
    width:100%;
    margin-bottom: ${SPACING.large}px;
`;

export const ItemImage = styled.img`
    max-height: 100%;
    max-width: 100%;
    @media screen and (max-width: 750px){
        margin-bottom: ${SPACING.medium}px;
        margin-bottom: ${props => props.mobileMargin ? SPACING.medium : 0}px
    }
`
export const StoreImage = styled.img`
    max-width:50%;
    max-height:50px;
    margin-right:12px;
    @media screen and (max-width: 600px){
       
    }
`
export const StoreDiv = styled.div`
   flex-direction:row;
   justify-content:space-between;
   margin-top: ${SPACING.large}px;
`
export const TitleLogo = styled.img`
    height: 50px;
    margin-left: ${SPACING.large}px;
    margin-bottom: ${SPACING.medium}px;
    z-index: 99;
`

export const ButtonLink = styled.div`
    display: flex;
    flex: 1;
    height: 57px;
    border-radius: 5px;
    border-color: ${props => props.left ? "transparent" : COLORS.purple};
    border-width: 2px;
    border-style: solid;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.left ? COLORS.purple : "transparent"};
    padding-left: ${SPACING.extraLarge}px;
    padding-right: ${SPACING.extraLarge}px;
    cursor: pointer;
`;

export const BtnText = styled.p`
    color: ${COLORS.White};
    font-family: "LatoBlack";
    font-weight:bold;
    flex-shrink: 0;
`;

export const MultiDescription = styled.div` 
    flex-direction: column;
    order: 2;
    @media screen and (max-width: 760px){
        flex-direction: row;
    }
`;