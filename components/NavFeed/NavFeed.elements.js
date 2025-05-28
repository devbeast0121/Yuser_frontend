import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const NavFeedContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    margin-bottom: ${SPACING.large}px;
    justify-content: center;
    align-items: flex-start;
    border-bottom-style:solid;
    border-bottom-width:1px;
    border-bottom-color:${({ theme }) => theme.borderColor.color};
    padding-bottom:12px;
    padding-top: 30px;

    @media screen and (max-width: 991px){
        border-bottom-width:0;
        align-items: center;
    }

    @media screen and (max-width: 515px){
        display: flex;
        flex-direction: row;
        height: 50px;
        width: 100%;
        min-width: 320px;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.colorGrey.color};
        margin-bottom: ${SPACING.large}px;
        padding-top: 0px;
        
    }
`;

export const BtnFeed = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:row;
    flex: 1;
    cursor: pointer;
    width:100%;
    margin-bottom: 0;
    padding: 12px;
    margin-left: -12px;
    border-radius: 2px;
    justify-content:flex-start;

        :hover {
          //  background:${({ theme }) => theme.colorDark.color};
        }

        @media screen and (max-width: 515px){
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            margin-top: 11px;
            flex: 1;
            cursor: pointer;
            padding-left: ${SPACING.large}px;
    }
`;

export const BtnText = styled.p`
    margin-left: ${SPACING.medium}px;
    font-size: 20px;
    font-family: ${props => props.feed ? 'LatoBlack' : 'LatoRegular'};

    @media screen and (max-width: 991px){
        display:none;
    }

    @media screen and (max-width: 515px){
        display: flex;
        margin-left: ${SPACING.medium}px;
        font-size: 20px;
        font-family: ${props => props.feed ? 'LatoBlack' : 'LatoRegular'};
        text-align: center;
    }

    @media screen and (max-width: 370px){
        display:none;
    }
`;

export const Divider = styled.div`
    height: 1px;
    width: 100%;
    align-self: center;
    background-color: ${({ theme }) => theme.colorGrey.color};
`;