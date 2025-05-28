import React from 'react'
import {
    BorderedButtonContainer,
    BorderedSocialIconBox,
    TextSocialIcon,
    TextBorderedIcon
} from './Button.elements';
import Icon from ".././Icon/Icon";
import { COLORS } from '../../styles/Styling';
import Close from '../../public/icons/close.svg';

const ButtonBorderedIconLeft = (props) => {
    const iconColor = props.iconName == Close ? COLORS.white : ""
    const iconStroke = props.iconName == Close ? '3' : props.strokeWidth

    return (
        <BorderedButtonContainer
            disabled={props.disabled} // for disabling a button (add opacity, block onclick(), change cursor)
            size={props.size}
            onClick={props.onClick}
            color={props.color}
            width={props.width}
            height={props.height}
            border={props.border}
        >
            <BorderedSocialIconBox size={props.size}>
                <Icon
                    width="auto"
                    height={props.iconWidth}
                    name={props.iconName}
                    color={iconColor}
                    strokeWidth={iconStroke}
                />
            </BorderedSocialIconBox>
            <TextSocialIcon>
                <TextBorderedIcon>{props.text}</TextBorderedIcon>
            </TextSocialIcon>
        </BorderedButtonContainer>
    )
}

export default ButtonBorderedIconLeft