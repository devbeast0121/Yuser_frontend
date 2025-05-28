import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';
import { motion } from 'framer-motion';

export const NavbarMobileContainer = styled.div`
  display: none;
    
    @media screen and (max-width: 700px){
        height: 70px;
        display: ${props=>props.postModalVisible ? "none" : "flex"};
        flex: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        //padding-right: ${SPACING.medium}px;
       // padding-left: ${SPACING.medium}px;
        z-index: 999;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;

export const NavButton = styled.div`
    width: auto;
    flex-direction:row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    padding-top: ${SPACING.medium}px;
    padding-bottom: ${SPACING.medium}px;
    padding-right: ${SPACING.large}px;
    padding-left: ${SPACING.large}px;
    z-index: 999;
    position: relative;

    &:hover{
        background-color:${({ theme }) => theme.hoverMenu.color};  
        width: 100%;
    }
`;

export const MenuButton = styled.div`
    width: auto;
    flex-direction:row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    padding-top: ${SPACING.medium}px;
    padding-bottom: ${SPACING.medium}px;
    margin-right: ${SPACING.large}px;
    z-index: 999;
`;

export const LogoImg = styled.img`
    height: 30px;
    margin-top: ${SPACING.medium}px;
    padding-right: ${SPACING.medium}px;
    cursor: pointer;
`;

export const Divider = styled.div`
    height: 1px;
    width: 85%;
    background-color: ${({ theme }) => theme.borderColor.color};
    margin-top: ${SPACING.medium}px;
    margin-bottom: ${SPACING.medium}px;
    margin-right: ${SPACING.large}px;
    margin-left: ${SPACING.large}px;
`;

export const BtnText = styled.p`
    margin-left: ${SPACING.medium}px;
    font-size: 20px;
    font-family: ${props => props.active ? 'LatoBlack' : 'LatoRegular'};
`;

// motion animation
const variants = {
    visible: { opacity: 1, y: 0},
    hidden: { opacity: 0, y: 2500} 
};

export const NavBox = styled(motion.div).attrs(props => ({
    initial: props.animate,
    variants,
    transition: { duration: 0.5 }
}))`
    flex: 1;
    background-color: ${({ theme }) => theme.container.color};
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: ${props => props.animate == "visible" ? 999 : 1};
    overflow: hidden;
    margin-top: 70px;
`;

export const SubMenu = styled.ul`
    flex-direction: column;
    margin-left: 40px;
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
export const SignUpModal = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: "COLORS.black50";
    z-index: 999999;
    justify-content: center;
    align-items: center;
`;

export const OverlayContainerSignUp = styled.div`
    flex-direction: column;
    width: 379px;
    height:592px;
    background: #0B1731;
    padding-top: ${SPACING.large}px;
    padding-bottom: ${SPACING.large}px;
    border-radius: 15px;
    position:relative;  
    @media screen and (max-width: 700px){
        width: 400px;
    }
    @media screen and (max-width: 480px){
       margin-left: 0px;
       margin-right: 0px;
    
    }
`;

export const TitleOverlay = styled.p`
    font-family: 'Rubik', 'LatoBlack', sans-serif;
    line-height: 1;
    font-size: calc(${props => props.fontSize}px + 1 * ((100vw - 320px) / 680));
    //margin-bottom: ${SPACING.large}px;
    @media screen and (max-width: 1000px){
        font-size: calc( ${props => props.fontSize}px - 5px );
        margin-bottom:12px;
    }
    @media screen and (max-width: 750px){
        font-size: calc( ${props => props.fontSize}px - 10px );
        margin-bottom:12px;
    }
`;

export const ImageBox = styled.div` 
    margin-left: auto;
    margin-right: auto;
    width:75%;
    height:75%;
    
    flex:1;
    @media screen and (max-width: 850px){
        margin-top: ${props => props.reverse && props.mobileReverse ? 0 : props.mobileReverse ? SPACING.large : props.reverse ? SPACING.large : 0}px;
        order: ${props => props.mobileReverse && props.reverse ? 1 : props.reverse ? 2 : 1};
    }
`;

export const StoreDiv = styled.div`
   flex-direction:row;
   justify-contents:space-between;
   margin-top: ${SPACING.medium}px;
    @media screen and (max-width: 600px){
       flex-direction:column;
    }
`;

export const StoreImage = styled.img`
    max-width:107px;
    max-height:31px;
    margin-left:${SPACING.small}
    margin:${SPACING.medium}
    @media screen and (max-width: 600px){
       
    }
`;
