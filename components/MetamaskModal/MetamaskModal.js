import React, { useState, useEffect, useReducer, useRef } from "react";
import {
    BackgroundContainer,
    ModalContainer,
    Title,
    SubText,
    TagsInputBox,
    TagsSubText,
    SubBox,
    Divider,
    ButtonsMenu,
    NFTcontainer,
    SubBoxVertical,
    PriceBox,
    BtnClose,
    PriceInput,
    PriceInputBox,
    DateTimeBox,
    SecretInputBox
} from "./MetamaskModal.elements";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-overlays/Modal";
import Close from "../../public/icons/close.svg";
import { inject, observer } from "mobx-react";
import Switch from "react-switch";
import { COLORS } from '../../styles/Styling.js';
import Button from '../Button/Button';
import Icon from "../Icon/Icon";
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';


export default inject("store")(
    observer(function MetamaskModal(props) {

        const closeAll = () => {
            props.setShow(false)
        }
     
        return (
            <Modal className="modal" show={props.show}>
                <motion.div
                    key="modal"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <BackgroundContainer>
                        <ModalContainer>
                            
                        </ModalContainer>
                    </BackgroundContainer>
                </motion.div>
            </Modal>
        );
    })
);
