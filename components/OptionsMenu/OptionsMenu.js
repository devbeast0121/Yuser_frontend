import React, { useState, useEffect } from 'react'
import {
    MenuContainer,
    NavOptionsMenu,
    NavOptionsLinks,
    TxtMenu,
    Divider,
} from './OptionsMenu.elements';
import Gem from '../../public/icons/gem.svg';
import Settings from '../../public/icons/settings.svg';
import Profile from '../../public/icons/profile.svg';
import Logout from '../../public/icons/logout.svg';
import Link from 'next/link';
import Icon from ".././Icon/Icon";
import client from '../../pages/api/client'
import { inject, observer } from 'mobx-react';
import { CookieStorage } from "cookie-storage";
import { motion } from "framer-motion";
import Router, { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';

const cookieStorage = new CookieStorage();
const jwt = cookieStorage.getItem('feathers-jwt')

export default inject('store')(observer(
    function OptionsMenu(props) {
        const [click, setClick] = useState(false)
        const [btnVisible, setVisible] = useState(true)

        const handleClick = () => {
            setClick(!click)

            if (props.show) {
                props.toggleOptionsMenu(false)
            }
        }

        const logOut = () => {
            client.logout()
            localStorage.removeItem("feathers-jwt")//To remove the stored jwt token
            signOut({ callbackUrl: '/' })
        }
        //To enable routing in case of logout
        const router = useRouter()
        // const Logout = async () => {
        //     await props.store.authStore.Disconnect()
        //     router.replace('/')
        // }


        useEffect(() => {
            const { pathname } = Router
            if (pathname == '/profile') {
                setVisible(false)
            }
        }, []);

        return (
            <>
                <MenuContainer
                    onClick={() => props.toggleOptionsMenu(false)}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.150 }}
                    >
                        <NavOptionsMenu onClick={handleClick} click={click}>
                            {btnVisible &&
                                <Link href='/profile' passHref>
                                    <NavOptionsLinks>
                                        <Icon strokeWidth="2" width="auto" height="24px" name={Profile} />
                                        <TxtMenu>{'Profile'}</TxtMenu>
                                    </NavOptionsLinks>
                                </Link>
                            }
                            <Link href='/wallets' passHref>
                                <NavOptionsLinks>
                                    <Icon strokeWidth="2" width="auto" height="24px" name={Gem} />
                                    <TxtMenu>{'Wallet'}</TxtMenu>
                                </NavOptionsLinks>
                            </Link>
                            <NavOptionsLinks onClick={() => router.push({
                                pathname: "/404",
                                callbackUrl: '/',
                                query: {
                                    type: "notice", // tells 404 page to render "comming soon" message
                                }
                            })}>
                                <Icon strokeWidth="2" width="auto" height="24px" name={Settings} />
                                <TxtMenu>{'Settings'}</TxtMenu>
                            </NavOptionsLinks>
                            <Divider />
                            <NavOptionsLinks onClick={logOut}>
                                <Icon strokeWidth="2" width="auto" height="24px" name={Logout} />
                                <TxtMenu>{'Logout'}</TxtMenu>
                            </NavOptionsLinks>
                        </NavOptionsMenu>
                    </motion.div>
                </MenuContainer>
            </>
        )
    }

))
