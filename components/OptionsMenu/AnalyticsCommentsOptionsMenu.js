import React, { useState, useEffect, useRef } from 'react'
import {
    MenuContainer,
    NavOptionsMenu,
    NavOptionsLinks,
    ProfileMenuContainer,
    TxtMenu,
    Divider,
    MenuText,
    ProfileDropDown
} from './OptionsMenu.elements';
import Link from 'next/link';
import Icon from ".././Icon/Icon";
import RootStore, {useStore} from "../../stores/RootStore";
import { motion } from "framer-motion";
import { setOptions, useSession } from 'next-auth/client';
import Button from "../Button/Button";
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';
import DownArrow from '../../public/icons/arrowDown.svg';


export default function AnalyticsCommentsOptionsMenu(props){

    const [optionsMenuVisible,setOptionsMenuVisible] = useState(false);
    const [session,loading] = useSession();
    const [loggedInUser,setLoggedInUser] = useState(null)
    const rootstore = useStore();


    let menuRef = useRef(null);

    async function handleClickOutside(event){
        if (menuRef.current && !menuRef.current.contains(event.target)){
            setOptionsMenuVisible(false);
        }
    }
    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[])

    useEffect(()=>{
        if(session)
        {
            setLoggedInUser(session.user);
        }
        else{
            console.log("no Session found");
        }
    },[loggedInUser])


    async function deleteComment(){
        setOptionsMenuVisible(false);
        props.itemRef && (props.itemRef.style.backgroundColor = "red");
        let didDelete = await rootstore._deleteComment(props.commentId);
        if(didDelete === true){
            props.onDeleteComment && props.onDeleteComment(props.commentId);
            rootstore.successMessage = "Successfully deleted comment";
        }
        else{
            rootstore.errMessage = "There was an error when deleting comment";
            props.itemRef && (props.itemRef.style.backgroundColor = "transparent");

        }
        return;
    }


    return(
        <>
        {optionsMenuVisible ? (
            <ProfileMenuContainer ref={menuRef}>
                <motion.div
                    initial={{ opacity: 0,height:"0px" }}
                    animate={{ opacity: 1,height:"100%"}}
                    exit={{opacity:0,height:0}}
                    transition={{ duration: 0.150 }}
                >
                    <NavOptionsMenu style={{borderRadius:"10px"}}>
                        <NavOptionsLinks onClick={deleteComment}>
                            <Button text={"Delete Comment"} colorText={({theme}) => theme.textPrimary.color} color={({theme})=> theme.containerSecondary.color} />
                        </NavOptionsLinks>
                    </NavOptionsMenu>
                </motion.div>
            </ProfileMenuContainer>
        ):(
            <ProfileDropDown onClick={()=>{setOptionsMenuVisible(!optionsMenuVisible)}}>
                <MenuText>{"Options"}</MenuText>
                <Icon strokeWidth="2" width="20px" height="20px" name={DownArrow} transform={optionsMenuVisible? 'rotate(180deg)' : null}/>
            </ProfileDropDown>
        )}
        </>
    )
}