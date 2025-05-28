import React, { useEffect, useRef, useState } from 'react';
import {
    LoginBoxContainer,
    LoginTitle,
    LoginText
} from './LoginBox.elements';
import { GradientButton } from '../../styles/globalStyles'
import Link from 'next/link';
import Button from '../Button/Button';
import { COLORS } from '../../styles/Styling';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';

export default inject("store")(observer(
    function LoginBox(props) {

        const router = useRouter()

        const loadLogin = async () => {
            router.push('/signin', null, { shallow: true })
        }

        return (
            <>
                <LoginBoxContainer splash={props.splash}>
                    <LoginTitle>{props.title}</LoginTitle>
                    <LoginText>{props.textOne}</LoginText>
                    <Button
                        text={"LOGIN"}
                        onClick={loadLogin}
                        className="FullWidth"
                        color={COLORS.purple}
                        colorText={COLORS.white}
                    />
                    <LoginText>{props.textTwo}</LoginText>
                </LoginBoxContainer>
            </>
        )
    }
))
