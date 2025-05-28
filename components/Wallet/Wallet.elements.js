import styled from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';
import WalletBlue from '../../public/icons/walletBlue.svg';
import WalletRed from '../../public/icons/walletRed.svg';
import MetamaskWallet from '../../public/icons/metamask_wallet.svg'

export const WalletContainer = styled.div`
  display: flex;
  height: 160px;
  width: 280px;  //check "light" theme before to change width, need space for shadow
  border-radius: 10px;
  background-image: url(${props => props.wallet === 'rocks' ? WalletRed : props.wallet === 'stones' ? WalletBlue : props.wallet === 'metaMask' ? MetamaskWallet : null});
  background-size: cover;
  flex-direction:column;
  padding: ${SPACING.large}px;
  background-color: ${({ theme }) => theme.container.color};
  flex-shrink:0;
  box-shadow: 0px 1px 12px  rgba(0,0,0,0.2) !important;
`;

export const TopPart = styled.div`
  display: flex;
  height: 45px;
  width: 100%;
  flex-direction: row;
  display: flex;
  align-items:flex-start;
`;

export const BottomPart = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items:flex-end;
  justify-content: space-between;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  width:100%;
`;

export const Text = styled.p`
  text-align: center;
  font-size: ${FONT_SIZE.large}px;
  //font-weight: 400;
  font-family: "LatoRegular";
  padding-left: ${SPACING.small}px;
  color: ${COLORS.white};
`;

export const TxtBalance = styled.p`
  text-align: left;
  //font-weight: 400;
  font-family: "LatoRegular";
  color: ${COLORS.white};
`;
export const TxtContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin-left: auto;
`;

export const TxtBottom = styled.p`
  text-align: center;
  font-size: ${FONT_SIZE.large}px;
  font-family: 'LatoRegular';
  color: ${COLORS.white};
`;

export const AddressContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.p`
  text-align: center;
  font-size: ${FONT_SIZE.small}px;
  color: ${COLORS.white};
`;

export const Address = styled.p`
  text-align: center;
  color: ${COLORS.white};
`;

export const DropDawnAmount = styled.div`
  display: flex;
  height: 30px;
  width: 98px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border-radius: 10px;
`;

export const Select = styled.select`
  height: 30px;
  width: 98px;
  background-color: transparent;
  border-radius: 10px;
  border-width: 2px;
  border-color: transparent;
  border-style: solid;
  text-align: center;
  font-family: "LatoBlack";
  font-size: ${FONT_SIZE.medium}px;
  color: ${COLORS.white};
`;

export const Option = styled.option`
  height: 30px;
  width: 80px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.borderColor.color};
  border-style: solid;
  text-align: center;
  font-family: "LatoBlack";
  color: ${COLORS.black};
`;

export const TxtSmall = styled.p`
  font-size: 12px;
  color:${({ theme }) => theme.textSecondary.color};
  text-align: left;
`;