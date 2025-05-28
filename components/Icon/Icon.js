import React from "react";
import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";

const StyledSVGIcon = styled(ReactSVG)`
  svg {
    ${({ height, width }) =>
      height && width &&
      css`
        width: ${width};
        height: ${height};
        align-items: center;
      `}
    ${({ transform }) =>
      transform &&
      css`
        transform: ${transform};
      `}
    path {
      ${({ color, strokeWidth, strokeColor }) =>
      (color || strokeWidth || strokeColor) &&
        css`
          stroke-width: ${strokeWidth};
          fill: ${color};
          stroke: ${strokeColor};
        `}
    }
    line {
      ${({ color, strokeWidth, strokeColor }) =>
        (color || strokeWidth || strokeColor) &&
        css`
          stroke-width: ${strokeWidth};
          fill: ${color};
          stroke: ${strokeColor };
        `}
    }
    rect {
      ${({ color, strokeWidth, strokeColor }) =>
        (color || strokeWidth || strokeColor ) &&
        css`
          stroke-width: ${strokeWidth};
          fill: ${color};
          stroke: ${strokeColor };
        `}
    }
    filter: ${props=>props.shadow ? "drop-shadow(3px 3px 5px #2D394D)" : null};
  }
`;

const Icon = props => {
  return (
    <StyledSVGIcon
      src={props.name}
      color={props.color}
      height={props.height}
      width={props.width}
      strokeWidth={props.strokeWidth}
      strokeColor={props.strokeColor}
      transform={props.transform}
      className={props.className}
      shadow={props.shadow}
    />
  );
};

export default Icon;