import React from 'react'
import {
    ButtonContainer,
    IconContainer,
    TextContainer,
    TextContainerIcon,
} from './Button.elements';
import Icon from ".././Icon/Icon";
import { motion } from "framer-motion";
import { COLORS } from '../../styles/Styling';
import Close from '../../public/icons/close.svg';

/**
 * the Button accepts the following parameters:
 * 
 * props.disabled: true/false
 * props.className: string (ex: "FullWidth" -> globalStyles.js)
 * props.size: string ("large"(60), "medium"(50), the height by default 40px) , size={"medium"}
 * props.width: number (ex: width={200})
 * props.color: string (ex: color={COLORS.purple}/{"lime"})
 * props.border: true/false
 * 
 * props.iconName: required (ex: iconName={Logout})
 * props.isIcon: true/false 
 * props.iconWidth: auto 
 * props.iconHeight: auto
 * props.iconColor: required
 * props.iconStroke: required if props.isIcon={true} (ex: strokeWidth={"2"})
 * props.strokeColor: required if props.isIcon={true}
 * 
 * props.text: required (ex: text={"Logout"} )
 * props.colorText: required
 * props.padding: not required
 * 
 * props.onClick: required (ex: onClick={logOut}), to block visually  onClick use disabled={true}
 */

const Button = (props) => {
   
    const eventOpacityHover = props.disabled ? 1 : 0.95
    const eventOpacityTap = props.disabled ? 1 : 0.95
    const eventOpacityScale = props.disabled ? 1 : 0.96 

    return (
        <motion.div
            whileHover={{ opacity: eventOpacityHover }}
            whileTap={{ opacity: eventOpacityTap, scale: eventOpacityScale }}
            className={props.className}
        >
            <ButtonContainer
                disabled={props.disabled} // for disabling a button (add opacity, block onclick(), change cursor)
                size={props.size}
                onClick={props.onClick}
                color={props.color}
                width={props.width}
                border={props.border}
                borderColor={props.borderColor}
            >
                {props.isIcon == true ?
                    <>
                        <IconContainer>
                            <Icon
                                className={props.text ? 'MarginRightSmall' : null}
                                width={props.iconWidth}
                                height={props.iconHeight}
                                name={props.iconName}
                                color={props.iconColor}
                                strokeWidth={props.iconStroke}
                                strokeColor={props.strokeColor}
                            />
                        </IconContainer>
                        <TextContainerIcon colorText={props.colorText}>
                            {props.text}
                        </TextContainerIcon>
                    </>
                    :
                    <TextContainer padding={props.padding} colorText={props.colorText}>
                        {props.text}
                    </TextContainer>
                }
            </ButtonContainer>
        </motion.div>
    )
}

export function DevBtn(props) {
    return (<Button onClick={() => props.action()} text={props.label} />)
}
export default Button