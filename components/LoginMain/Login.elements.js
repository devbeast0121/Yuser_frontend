import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MainContainer = styled.div`
    width: 1240px;
    display: flex;
    margin: auto;
    flex-direction: row;
    justify-content: space-between;
    background-color:${COLORS.blackDark};

    @media screen and (max-width: 1400px){
        width: 1240px;
        display: flex;
        margin: auto;
        flex-direction: column;
        justify-content:center;
        align-items:center;
    }  
`;
export const ProfileContainer = styled.div`
    width: 369px;
    display: flex;
    //margin: auto;
    flex-direction: column;
    justify-content:center;
    //margin-top: 74px;
    background-color: ${COLORS.blackDark};
    //z-index: 99;
    padding:${SPACING.large}px;
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
    border-radius:10px;

    @media screen and (max-width: 600px){
        position: relative;
        z-index: 99;
        top: ${SPACING.large}px;
        
    }  
`;
export const LoginButton = styled.button`
    background: linear-gradient(to right,#EA42D1,#C9324D);
    width:275.57px;
    height: 35px;
    border-radius: 5px;
    padding: 0 15px;
    line-height: 33px;
    font-size: 15px;
    font-family: 'LatoBlack';
    padding-bottom:10;
    align-self:center;
    text-align:center;
    margin-top: ${SPACING.large}px;
`;


export const GoogleButton = styled.button`
    background:#D2344D;
    margin-top: ${SPACING.medium}px;
    height: 39.32px;
    width:275.57px;
    border-radius: 5px;
    border:0px transparent;  
    align-self:center;
    &:hover{
        background:#D2344D;
        opacity: 0.6;
    }
`;
export const FacebookButton = styled.button`
    background: #3b5998;
    margin-top: ${SPACING.medium}px; 
    height: 39.32px;
    width:275.57px;
    border-radius: 5px;
    border:0px transparent;  
    align-self:center;
    &:hover{
        background:#3b5998;
        opacity: 0.6;
    }
`;
export const AppleButton = styled.button`
    background: #000000;
    height: 39.32px;
    width:275.57px;
    border-radius: 5px;
    border:0px transparent;  
    align-self:center;
    &:hover{
        background:#000000;
        opacity: 0.6;
    }
`;


export const UsernameField = styled.input`
    background: transparent;
    height: 32.5px;
    width:275.57px;    
    border:0px transparent;  
    align-self:center;
    color:white;
    font-size:18px;
    margin-top:${SPACING.extraSmall}px;
    
`;
export const UsernameLabel = styled.label`
    background: transparent;
    font-family: 'LatoBlack';
    align-self:flex-start;
    color:white;
    font-size:15px;
`;

export const LogInLabel = styled.label`
    background: transparent;
    font-family: 'LatoBlack';
    color:white;
    font-size:28px;
    text-align:center;
    padding-bottom:${SPACING.large}px;
`;
export const BtnClose = styled.div`
    cursor: pointer;
    height:30px;
    width:30px;
    align-items: center;
    justify-content: center;
`;

export const Description = styled.div`
    flex-direction:column;
`;

export const DescriptionTitle = styled.div`
    font-size:34px;
    font-family: 'LatoBlack';
    margin-bottom:${SPACING.medium}px;
`;

export const SignupDescription = styled.div`
    margin-bottom:${SPACING.large}px;
    align-self:center;
`;

export const LoginDescription = styled.div`
    margin-bottom:${SPACING.medium}px;
    text-align:center;
    font-family: 'LatoBlack';
`;