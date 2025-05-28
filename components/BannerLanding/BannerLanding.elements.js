import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


export const InviteCodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 80px;
    
    @media screen and (max-width: 991px){
        display: none;
    }
`;


export const BannerImage = styled.img`
    flex:1;
    border-radius:10px;
    cursor:pointer;
    height:100%;
    width:100%;
    min-height:250px;
    min-width:250px;
`;
