import React from 'react';
import {
    BadgeContainer,
    Number
} from './Badge.elements';

const Badge = (props) => {
    return (
        <>
            <BadgeContainer position={props.position}>
                <Number>{props.value}</Number>
            </BadgeContainer>
        </>
    )
}

export default Badge
