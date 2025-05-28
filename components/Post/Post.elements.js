import styled from 'styled-components';
import Link from 'next/link';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MainContainer = styled.div`
    flex-direction: row;
    width: 600px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    margin-top: ${SPACING.large}px;
`;

export const PostContainer = styled.div`
    width: 536px;
    flex-direction: column;
    position: relative;
`;

export const PostSideBarContainer = styled.div`
    width: 70px;
    display: flex;
    align-items: flex-end;
    overflow:visible;

    @media screen and (max-width: 480px){
        display: flex;
        position: sticky;
        z-index: 999;
        right: 0;
        bottom: 50px;
        margin-bottom: 50px;
    }
`;

export const PostInfoSection = styled.div`
margin-bottom: ${SPACING.large}px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

    @media screen and (max-width: 480px){
       display: none;
    }
`;

export const PostInfoSectionMobile = styled.div`
   display: none;

    @media screen and (max-width: 480px){
        display: flex;
        z-index: 99;
        position: absolute;
        bottom: 20px;
        right: 150px;
        left: 0;
    }
`;

export const ContentSection = styled.img`
    width: 536px;
`;

export const ProgressBar = styled.div`
    display: flex;
`;

export const AvatarContainer = styled.div`
    border-style:solid;
    border-width:2px;
    border-color:${COLORS.purple};
    height:48px;
    width:48px;
    border-radius:24px;
    align-items:center;
    justify-content:center;
`;

export const AvatarInner = styled.div`
    border-radius: 19px;
    height:38px;
    width:38px;
    align-items:center;
    justify-content:center;
    overflow:hidden;
`;

export const Avatar = styled.img`
    height: 38px;
    width: 38px;
    justify-content: center;
    align-items: center;
    margin:auto;
`;

export const ContentInformationSection = styled.div`
    flex-direction: column;
    position: relative;
    justify-content:center;
    flex:1;
`;

export const AuthorName = styled.p`
    display: flex;
    margin-left: ${SPACING.medium}px;
    font-size: 18px;
    color: ${({ theme }) => theme.textPrimary.color};
    font-family: 'LatoBlack';
    align-items: center;
    font-family: 'LatoBlack';
    margin-bottom: 4px;

    @media screen and (max-width: 480px){
        margin-left: ${SPACING.medium}px;
        font-size: 18px;
        color: ${({ theme }) => theme.textPrimary.color};
        font-family: 'LatoBlack';
        align-items: flex-start;
        text-shadow: 2px 2px #ff0000;
    }
`;

export const ContentDescription = styled.p`
    display: flex;
    margin-left: ${SPACING.medium}px;
    font-size: 18px;
    color: ${({ theme }) => theme.textPrimary.color};
    //font-weight: 400;
    font-family: 'LatoRegular';

    @media screen and (max-width: 480px){
        margin-left: ${SPACING.medium}px;
        font-size: 18px;
        color: ${({ theme }) => theme.textPrimary.color};
        //font-weight: 400;
        font-family: 'LatoRegular';
        align-items: flex-start;
        text-shadow: 2px 2px #ff0000;
    }
`;

export const WrapOverflow = styled.div`
    overflow: hidden;   
    z-index: 999;
    position: absolute;
    bottom: 0;
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
export const MediaWrapper = styled.div`
    border-radius: 10px;
    overflow: hidden; 
    width: 500px; 
    cursor: pointer;
    min-height: 330px; 
    align-items: center;
    background-color: ${({ theme }) => theme.colorDark.color};

    @media screen and (max-width: 670px){ 
        max-width: unset;
        border-radius: 0px;
        max-width:500px;
    }

    @media screen and (max-width: 500px){ 
        max-width:500px;
        width:100%;
    }
`;