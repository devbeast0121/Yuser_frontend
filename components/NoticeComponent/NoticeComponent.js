import React from 'react'
import Icon from ".././Icon/Icon";
import {
    NoticeContainer,
    FirstLine,
    SecondLine
} from './NoticeComponent.elements';

const NoticeComponent = (props) => {

    return (
        <>
            <NoticeContainer>
                <Icon width={"175px"} height={"175px"} name={props.icon} />
                <FirstLine>{props.firstLine}</FirstLine>
                <SecondLine>{props.secondLine}</SecondLine>
            </NoticeContainer>
        </>
    )
}

export default NoticeComponent
