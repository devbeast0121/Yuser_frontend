import React from 'react'
import {
    SocialButtonContainer,
    SocialIconBox,
    TextSocialIcon,
    Text
} from './Button.elements';
import Icon from ".././Icon/Icon";
import { COLORS } from '../../styles/Styling';
import Close from '../../public/icons/close.svg';

const SocialButton = (props) => {
    const iconColor = props.iconName == Close ? COLORS.white : ""
    const iconStroke = props.iconName == Close ? '3' : props.strokeWidth

    return (
        <SocialButtonContainer
            size={props.size}
            onClick={props.onClick}
            color={props.color}
            width={props.width}
            height={props.height}
            border={props.border}
            marginBottom={props.marginBottom}
        >
            <SocialIconBox>
                <Icon
                    width="auto"
                    height="25px"
                    name={props.iconName}
                    color={iconColor}
                    strokeWidth={iconStroke}
                />
            </SocialIconBox>
            <TextSocialIcon>
                <Text>{props.text}</Text>
            </TextSocialIcon>
        </SocialButtonContainer>
    )
}

export function DevBtn(props) {
    return (<Button onClick={() => props.action()} text={props.label} />)
}
export default SocialButton