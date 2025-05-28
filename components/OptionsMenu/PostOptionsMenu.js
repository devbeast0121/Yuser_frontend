import React, { useState, useEffect } from 'react'
import {
    PostMenuContainer,
    PostOptionsMenu,
    PostOptionsLinks,
    TxtMenu,
    PostDivider
} from './OptionsMenu.elements';
import { inject, observer } from 'mobx-react';
import { CookieStorage } from "cookie-storage";
import { motion } from "framer-motion";

const cookieStorage = new CookieStorage();
const jwt = cookieStorage.getItem('feathers-jwt')

export default inject('store')(observer(
    function PostOptionsMenu(props) {
        function handleAddRemove(addRemove)
        {
            if(props.onAddRemoveStar)
            {
                props.onAddRemoveStar(addRemove);
            }
        }
        function handleDelete()
        {
            if(props.onDeletePost)
            {
                props.onDeletePost();
            }
        }

        function handleHideContent()
        {
            if(props.onHideContent)
            {
                props.onHideContent(!props.isHidden);
            }
        }
        return (
            <>
            <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{opacity:0}}
                        transition={{ duration: 0.150 }}
                    >
                <PostMenuContainer position={props.position}>
                
                    { props.user.isMod && 
                    <>
                        { (!props.isStarred && props.user.isMod) &&
                            <PostOptionsLinks onClick={()=>{handleAddRemove("add")}}>
                                <TxtMenu>{"Star Content"}</TxtMenu>
                            </PostOptionsLinks>
                        }
                        { (props.isStarred && props.user.isMod) &&
                            <PostOptionsLinks onClick={()=>{handleAddRemove("remove")}}>
                                <TxtMenu>{"Remove Star From Content"}</TxtMenu>
                            </PostOptionsLinks>
                        }
                        <PostDivider position={props.position}/>
                        {
                            props.user.isMod && 
                            <PostOptionsLinks onClick={handleDelete}>
                                <TxtMenu>{"Delete Post"}</TxtMenu>
                            </PostOptionsLinks>
                        }
                        {
                            props.user.isMod && 
                            <>
                                <PostDivider position={props.position}/>
                                <PostOptionsLinks onClick={handleHideContent}>
                                    <TxtMenu>{`${props.isHidden ? 'Unhide':"Hide"} Post`}</TxtMenu>
                                </PostOptionsLinks>
                            </>
                        }
                    </>
                    }
                </PostMenuContainer>
                </motion.div>
            </>
        )
    }

))
