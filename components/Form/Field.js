import React from 'react'
import {
    FieldContainer,
    IconContainer,
    InputContainer,
    InputContainerIcon,
} from './Field.elements';
import Icon from ".././Icon/Icon";
import { motion } from "framer-motion";
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';

const FieldInput = (props) => {
    return (
        <motion.div
            whileTap={{ opacity: 0.30 }}
            className={props.className}
        >
            <FieldContainer 
                onClick={props.onClick}
            >
                {props.isIcon == true ?
                    <>
                        <IconContainer>
                            <Icon
                                className={'MarginRightSmall'}
                                width={props.iconWidth} 
                                height={props.iconHeight} 
                                name={props.iconName}
                            />
                        </IconContainer>
                        <InputContainerIcon 
                            placeholder={props.placeholder}
                            type={props.type}
                            required={props.required}
                            value={props.value}
                            onChange={props.onChange}
                        />
                    </>
                    : 
                        <InputContainer 
                            placeholder={props.placeholder}
                            type={props.type}
                            required={props.required}
                            value={props.value}
                            onChange={props.onChange}
                        />
                    }
            </FieldContainer>
        </motion.div>
    )
}

export default FieldInput