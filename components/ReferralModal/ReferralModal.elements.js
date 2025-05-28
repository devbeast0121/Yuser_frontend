import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.article`
  background: ${({ theme }) => theme.containerSecondary.color};
  position: relative;
  border-radius: 10px;
  width: 50vw;
  min-width: 40vw;
  min-height: 60vh;
  aspect-ratio: 1;
  flex-direction: column;
`;

export const ModalHeader = styled.header`
  height: 20%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${SPACING.medium}px;
  margin-bottom: ${SPACING.small}px;
`;

export const HeaderText = styled.h1`
  font-weight: bold;
  display: inline-block;
  margin-bottom: ${SPACING.medium}px;
  font-size: 4vw;
`;

export const ModalBody = styled.article`
  height: 80%;
  flex-direction: column;
  padding: ${SPACING.medium}px;
  align-items: center;
`;
export const BodyText = styled.p``;

export const ModalFooter = styled.footer`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: ${SPACING.medium}px;
`;
export const FooterText = styled.p``;

export const ModalButton = styled.button`
  border-radius: 5px;
  background: ${COLORS.purple};
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary.color};
`;

export const Divider = styled.hr``;

export const SearchBar = styled.input`
  caret-color: black;
  margin-right: ${SPACING.small}px;
  padding: ${SPACING.small}px;
  min-width: 10vw;
  height: 4vh;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Table = styled.div`
  display: flex;
  overflow-y: scroll;
  overflow-x: auto;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${SPACING.medium}px;
  border-radius: ${(props) => (props.mobileLayoutVisible ? null : "10px")};
  border-width: ${(props) => (props.mobileLayoutVisible ? null : "2px")};
  border-style: ${(props) => (props.mobileLayoutVisible ? null : "solid")};
  border-color: ${(props) =>
    props.mobileLayoutVisible
      ? null
      : props.theme.borderColor.color};
`;

export const TableHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: column;
  z-index: 9;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.name == "light" ? COLORS.whiteMedium : COLORS.blackDarkMedium};
  width: 100%;
`;

export const TableTitle = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.containerSecondary.color};
  align-items: center;
  padding-top: 5px;
`;

export const TableRow = styled.div`
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1 !important;
  margin-right: ${SPACING.medium}px;
  margin-left: ${SPACING.medium}px;
`;

export const TitleTxt = styled.p`
  font-family: "LatoBlack";
  text-align: left;
  padding: 5px 12px 5px 12px;
`;

export const TableDataContainer = styled.div`
  display: flex;
  padding: 12px 0;
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.borderColor.color};
  padding: ${SPACING.small}px;
  &:hover {
    background-color: ${COLORS.blue};
  }
`;

export const SubBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  margin-right: ${SPACING.medium}px;

  @media screen and (max-width: 991px) {
    margin-bottom: ${SPACING.medium}px;
  }
`;
