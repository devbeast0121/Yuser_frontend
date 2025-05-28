import React from "react";
import styled from "styled-components";
import Icon from "../Icon/Icon";
import Close from "../../public/icons/close.svg";
import { COLORS, SPACING } from "../../styles/Styling.js";

const ImageModal = (props) => {
  return (
    <ImageModalContainer>
      <BtnClose onClick={props.closeImageModal}>
        <Icon
          strokeColor="white"
          strokeWidth="4"
          height="24px"
          width="24px"
          name={Close}
        />
      </BtnClose>
      <img
        src={props.uriImage}
        alt="full size image/gif/sticker"
        style={{
          width: props.imageWidth,
          height: props.imageHeight,
          objectFit: "contain",
          position: "fixed",
          top: "50%",
          left: "50%",
          /* bring your own prefixes */
          transform: "translate(-50%, -50%)",
          borderRadius: 5,
        }}
      />
    </ImageModalContainer>
  );
};
export default ImageModal;

const ImageModalContainer = styled.div`
  position: fixed;
  display: block;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99999;
`;

const BtnClose = styled.div`
  border-radius: 50%;
  background-color: ${COLORS.black};
  position: absolute;
  z-index: 9999;
  top: ${SPACING.large}px;
  left: ${SPACING.large}px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
`;
