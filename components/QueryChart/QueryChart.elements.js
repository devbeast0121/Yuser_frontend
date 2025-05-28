import styled from "styled-components";
import { FONT_SIZE, COLORS, SPACING } from "../../styles/Styling.js";

export const ChartContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor.color};
  border-radius: 5px;
`;

export const ChartButtonsContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: row;
`;

export const ChartOptionButton = styled.button`
  flex: 1;
  background: ${COLORS.purple};
  color: ${COLORS.white};
  border: none;
  margin: ${SPACING.small}px;
  justify-content: center;
  cursor: pointer;
`;
