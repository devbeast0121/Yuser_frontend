import React, { useEffect, useRef, useState } from 'react';
import {
    LoginBoxContainerSidebar,
    LoginTitleSidebar,
    LoginTextSidebar,
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
                <LoginBoxContainerSidebar splash={props.splash}>
                    <LoginTitleSidebar>{props.title}</LoginTitleSidebar>
                    <LoginTextSidebar>{props.textOne}</LoginTextSidebar>
                    <Button
                        text={"LOGIN"}
                        onClick={loadLogin}
                        className="FullWidth"
                        color={COLORS.purple}
                        colorText={COLORS.white}
                    />
                    {props.textTwo ?
                    <LoginTextSidebar>{props.textTwo}</LoginTextSidebar>
                    : null}
                </LoginBoxContainerSidebar>
            </>
        )
    }
))
