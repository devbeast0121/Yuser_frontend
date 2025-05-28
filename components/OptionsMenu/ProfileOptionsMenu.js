import React, { useState, useEffect } from 'react'
import {
    MenuContainer,
    NavOptionsMenu,
    NavOptionsLinks,
    ProfileMenuContainer,
    TxtMenu,
    Divider,
} from './OptionsMenu.elements';
import Gem from '../../public/icons/gem.svg';
import Settings from '../../public/icons/settings.svg';
import Profile from '../../public/icons/profile.svg';
import Logout from '../../public/icons/logout.svg';
import Link from 'next/link';
import Icon from ".././Icon/Icon";
import {useStore} from "../../stores/RootStore";
import { motion } from "framer-motion";
import { useSession } from 'next-auth/client';
import Button from "../Button/Button";
import { FONT_SIZE, COLORS, SPACING } from '../../styles/Styling.js';


const ProfileOptionsMenu = (props) =>{
    const rootstore = useStore();
    const [session,loading] = useSession();
    const [loggedInUser,setLoggedInUser] = useState(null);
    if(!props?.user?._id && props?.user?.id){
        props.user._id = props.user.id;
    }
    //Adds a role to a user
    //role: A string containing the role name, e.g. the creator role would be isCreator
    async function grantRole(role)
    {
        let userId = props?.user?._id;
        if(!userId || !role)
        {
            rootstore.errMessage = "An error was encountered when trying to grant user role";
            return;
        }

        try{
            await rootstore.grantUserRole(userId,role);
            if(props.updateUser)
            {
                props.updateUser(role,true);
            }
            rootstore.successMessage = `Successfully added role: ${role} to user: ${props.user.uname}`;
        }catch(err){
            rootstore.errMessage = "There was an error when granting role to the user."
            return;
        }
        

    }
    //Removes a role from a user
    //role: A string containing the role name, e.g. the creator role would be isCreator
    async function revokeRole(role)
    {
        let userId = props?.user?._id;
        if(!userId || !role)
        {
            rootstore.errMessage = "An error was encountered when trying to remove role from user";
            return;
        }


        try{
            await rootstore.removeRoleFromUser(userId,role);
            if(props.updateUser)
            {
                props.updateUser(role,false);
            }
            rootstore.successMessage = `Successfully removed role: ${role} from user: ${props.user.uname}`;
        }catch(err){
            rootstore.errMessage = "There was an error when removing role from the user";
        }
    }

    //Bans the selected user
    async function banUser()
    {
        rootstore.showBanOverlay = true;
        props.menuVisible && props.menuVisible(false);
        return
    }

    async function hideUser(hideUser)
    {
        let userId = props?.user?._id;
        if(!userId)
        {
            rootstore.errMessage = "No userId found";
            props.menuVisible && props.menuVisible(false);
            return;
        }
        try{
            await rootstore.hideContent(userId,"user",hideUser);
            props.menuVisible && props.menuVisible(false);
            rootstore.successMessage = `User: ${props.user.uname} has been ${hideUser ? "hidden" : "unhidden"}`
            if(props.updateUser)
            {
                props.updateUser("isHidden",hideUser);
            }
            
        }catch(err){
            props.menuVisible && props.menuVisible(false);
        }
    }

    useEffect(()=>{
        if(session)
        {
            setLoggedInUser(session.user);
        }
        else{
            console.log("no Session found");
        }
    },[loggedInUser])
    
    return(
        <>
            <ProfileMenuContainer>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{opacity:0}}
                    transition={{ duration: 0.150 }}
                >
                    <NavOptionsMenu>
                        {(!props?.user?.isCreator && loggedInUser?.isMod) && 
                        <NavOptionsLinks onClick={()=>{grantRole("isCreator")}}>
                            <Button text={"Grant User Creator Role"} color={COLORS.blackDark} colorText={COLORS.white}/>
                        </NavOptionsLinks>
                        }
                        {(props?.user?.isCreator &&  loggedInUser?.isMod) &&
                        <NavOptionsLinks onClick = {()=>{revokeRole("isCreator")}}>
                            <Button text={"Remove User's Creator Role"} color={COLORS.blackDark} colorText={COLORS.white}/>
                        </NavOptionsLinks>
                        }
                        {(false && loggedInUser && loggedInUser?.isMod && !(props?.user?._id === loggedInUser?._id)) &&
                            <>
                                <Divider/>
                                <NavOptionsLinks onClick = {banUser}>
                                    <Button text={"Ban User"} color={COLORS.blackDark} colorText={COLORS.white}/>
                                </NavOptionsLinks>
                            </>
                        }
                        {( loggedInUser && loggedInUser?.isMod && !(props?.user?._id === loggedInUser?._id)) &&
                            <>
                                <Divider/>
                                <NavOptionsLinks onClick = {()=>{props?.user?.isHidden ? hideUser(false) : hideUser(true)}}>
                                    <Button text={`${!props?.user?.isHidden ? 'Hide' : 'Unhide'} User`} color={COLORS.blackDark} colorText={COLORS.white}/>
                                </NavOptionsLinks>
                            </>
                        }
                    </NavOptionsMenu>
                </motion.div>
            </ProfileMenuContainer>
        </>
    )
}
export default ProfileOptionsMenu