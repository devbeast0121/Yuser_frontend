import React from 'react'
import {
    CheckboxContainer
} from './Field.elements';
import Icon from ".././Icon/Icon";
import { motion } from "framer-motion";
import Check from "../../public/icons/check.svg";
import { COLORS } from '../../styles/Styling.js';

const Checkbox = (props) => {
    return (
        <motion.div
            whileTap={{ opacity: 0.30 }}
        >
            <CheckboxContainer
                onClick={props.handleClick}
            >
                {props.checked &&
                    <Icon width="24px" height="24px" name={Check} color={COLORS.blue} />
                }
            </CheckboxContainer>
        </motion.div>
    )
}

export default Checkbox