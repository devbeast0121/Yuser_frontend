import styled from 'styled-components';
import { COLORS, FONT_SIZE, SPACING } from '../../styles/Styling.js';

export const PostsListContainer = styled.div`
    margin-left:${SPACING.large}px;
    margin-right:${SPACING.large}px;
    margin-top:${SPACING.extraLarge}px;
    flex-direction:column;   
    
    @media screen and (max-width: 700px){
        margin-left: 0px;
        margin-right: 0px;
        margin-top:0;
        justify-content: center;
    }
`;

export const PostContainer = styled.div`
    width:100%;
    display: flex;
    margin-bottom: ${SPACING.extraLarge}px;
`;

export const PostBox = styled.div`
    width:100%;
    flex-direction: column;
    position: relative;
`;

export const PostSideBarContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-self: flex-end;
    z-index: ${props => props.priceBoxVisible ? 1 : props.textareaOverlayVisible ? 1 : 9999};
    position:relative;
    flex-shrink:0;
    padding-left: 23px;//${SPACING.large}px;
    overflow:visible;


    @media screen and (max-width: 700px){
        position: absolute;
        right: 0;
        bottom: 0;
        margin-bottom: 0;
    }
`;

export const WrapOverflow = styled.div`
`;

export const PostInfoSection = styled.div`
    margin-bottom: ${SPACING.medium}px;
    display: flex;
    max-width: 640px;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
`;

export const ContentSection = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

export const ImageSection = styled.img`
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit:contain;
`;

export const ProgressBar = styled.div`
    display: flex;
`;

export const ContentInformationSection = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    flex:1;
`;

export const AuthorName = styled.p`
    display: flex;
    font-family:'LatoBlack';
    align-items: center;
    margin-bottom: 4px;
    margin-bottom: ${SPACING.small}px;
    @media screen and (max-width: 700px){ 
        margin-bottom:0;
    }
`;

export const AvatarContainer1 = styled.div`
    display:flex;
    align-self: flex-start;

    @media screen and (max-width: 700px){ 
        display:none;
    }
;`

export const AvatarContainer2 = styled.div`
    display:none;
    align-self: flex-start;
    margin-right: ${SPACING.small}px;
    @media screen and (max-width: 700px){ 
        display:flex;
    }
;`

export const ButtonContainer = styled.div`
    display:flex;
    align-self:flex-start;
    margin-left:auto;

    @media screen and (max-width: 700px){ 
      position: absolute;
      top: -5px;
      right: 0;
      z-index: 9;
    }
;`

export const ContentDescription = styled.div`
    display: flex;
    font-size:20px;
    line-height: 1.3;
    margin-top: ${SPACING.medium}px;

    @media screen and (max-width: 700px){ 
        margin-bottom: 0;
    }
`;

export const BackdropOverlay = styled.div`
   position: fixed;
    z-index: 9;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
`;


export const PostMediaContainer = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    min-height:330px;
    
    @media screen and (max-width: 700px){ 
        justify-content: center;
        margin-left: ${SPACING.medium}px;
        margin-right: ${SPACING.medium}px;
    }
`;

export const MediaWrapper = styled.div`
    border-radius: 10px;
    overflow: hidden; 
    cursor: pointer;
    align-items: center;
    position:relative;
    min-height: 330px;
    background-color: ${({ theme }) => theme.name == "light" ? COLORS.whiteLight : COLORS.greyMedium};
    max-width: 550px;
    width: 100%;
    margin-left: ${props => props.height >= props.width ? 50 : 0}px;

    @media screen and (max-width: 700px){ 
        border-radius: 0px;
        max-width: 700px;
        margin-left: ${props => props.height >= props.width ? SPACING.large : 0}px;
    }
    @media screen and (max-width: 500px){ 
        margin-left: 0px;
    }
`;

export const MediaWrapperVideo = styled.div`
    border-radius: 10px;
    overflow: hidden; 
    cursor: pointer;
    align-items: center;
    position:relative;
    min-height: 330px;
    background-color: ${({ theme }) => theme.name == "light" ? COLORS.whiteLight : COLORS.greyMedium};
    max-width: 550px;
    width: 100%;
    margin-left: ${props => props.orientation == "portrait" ? 50 : 0}px;

    @media screen and (max-width: 700px){ 
        border-radius: 0px;
        max-width: 700px;
        margin-left: ${props => props.height >= props.width ? SPACING.large : 0}px;
    }
    @media screen and (max-width: 500px){ 
        margin-left: 0px;
    }
`;

export const Backdrop = styled.div`
    position: fixed;
    z-index: 1040;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.5;
    cursor: pointer;
`;

export const ContentHeader = styled.div`
    flex-direction:row;
    align-items: center;
    margin-bottom: ${SPACING.medium}px;
    margin-top: ${SPACING.large}px;
    margin-right: 93px; //sidebar + left-padding
    position: relative;
    display: flex;

    @media screen and (max-width: 700px){ 
        display: flex;
        align-items: flex-start;
        margin-left: ${SPACING.medium}px;
        margin-right: ${SPACING.medium}px;
    }
`;

export const ContentHeaderInnerVideo = styled.div`
    flex-direction:column;
    margin-left: ${props => props.orientation == "portrait" ? 50 : 0}px;

    @media screen and (max-width: 700px){ 
        margin-left: ${props => props.height >= props.width ? SPACING.large : 0}px;
    }
    @media screen and (max-width: 500px){ 
        margin-left: 0px;
    }
`;

export const ContentHeaderInner = styled.div`
    flex-direction:column;
    margin-left: ${props => props.height >= props.width ? 50 : 0}px;

    @media screen and (max-width: 700px){ 
        margin-left: ${props => props.height >= props.width ? SPACING.large : 0}px;
    }
    @media screen and (max-width: 500px){ 
        margin-left: 0px;
    }
`;

export const ScrollButton = styled.button`
   position: fixed; 
   width: 100%;
   left: 92%;
   bottom: 40px;
   font-size: 12px;
   z-index: 9999;
   cursor: pointer;
   color: ${({ theme }) => theme.textPrimary.color};
   background-color: ${({ theme }) => theme.container.color};
   height: 32px;
   border-width: 1px;
   border-color: #DC3BC3;
   border-style: solid;
   width: 94px;
   border-radius:5px;

   @media screen and (max-width: 991px){
        right: ${SPACING.medium}px;
        left: auto;
    }

   @media screen and (max-width: 700px){
        right: ${SPACING.small}px;
        left: auto;
    }
   
  `;
  export const TxtButton = styled.p`
  font-size: ${FONT_SIZE.small}px;
  font-family: 'LatoBlack';
    
`;
export const OptionsMenuButton = styled.div`
    position: absolute;
    top: ${SPACING.medium}px;
    left: ${SPACING.medium}px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${COLORS.black20};
    z-index: 9;
`;

export const SocialShareWrapper = styled.div`

`;

export const ButtonWrapper = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 9999;
`;