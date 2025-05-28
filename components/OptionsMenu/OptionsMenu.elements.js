import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

export const MenuContainer = styled.div`
  display: flex;
  width: 200px;
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 10000;
  flex-direction: column;
  margin-top: 5px;
`;

export const ProfileMenuContainer = styled.div`
  display: flex;
  width: 195px;
  z-index: 10000;
  flex-direction: column;
`;

export const NavOptionsMenu = styled.div`
   flex-direction: column;
    display: flex;
    flex: 1;
    list-style: none;
    background-color: ${({ theme }) => theme.colorDark.color};
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding:10px 0;
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
`;

export const NavOptionsLinks = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    cursor: pointer;
    padding-left: 20px;
    padding-right:20px;
    padding-top:10px;
    padding-bottom:10px;
`;

export const TxtMenu = styled.p`
    padding-left: 10px;
`;

export const MenuText = styled.p`
   padding: 10px;
   flex-direction:row;
`;

export const ProfileDropDown = styled.div`
    border-style: solid;
    border-width: 1px;
    border-color: ${COLORS.white};
    justify-content: center;
    align-items: center;
    display:flex;
    flex-direction:row;
    flex:1;
    position:relative;
    
`;

export const Divider = styled.div`
    height: 1px;
    width: 90%;
    margin-top: 10px;
    margin-bottom: 10px;
    align-self: center;
    background-color: ${({ theme }) => theme.colorGrey.color};
`;


export const PostMenuContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colorDark.color};
  position: ${props=> props.position === 'vertical' ? 'absolute' : 'relative'};
  bottom: ${props=> props.position === 'vertical' ? '35px' : '0px'};
  right: 0px;
  width: ${props=>props.position === 'vertical' ? '200px': 'auto'};
  z-index: 10000;
  flex-direction: ${props=> props.position === 'vertical' ? 'column' : 'row'};
  justify-content: ${props=> props.position === 'vertical' ? 'flex-end':'flex-start'};
  align-content: ${props=> props.position === 'vertical' ? null : 'center'};
  margin-top: ${props=> props.position === 'vertical' ? '5px' : '0px'};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-radius: ${props=> props.position === 'vertical' ? 'null' : '10px'};
  border: ${props=> props.position === 'vertical' ? '0px solid' : '1px solid'};

`;

export const PostOptionsLinks = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    padding-left: 10px;
    padding-right:10px;
    padding-top:5px;
    padding-bottom:5px;
    max-width:200px;
`;

export const PostDivider = styled.div`
    height: ${props=> props.position === 'vertical'? '1px':'90%'};
    width: ${props=> props.position === 'vertical' ? '90%' : '1px'};
    align-self: center;
    background-color: ${({ theme }) => theme.borderColor.color};
`;
