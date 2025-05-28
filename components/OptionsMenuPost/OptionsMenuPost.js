import React, { useState } from 'react'
import {
    DropDownMain,
    DropDownHeader,
    DropDownList,
    ListItem,
    HederText
} from './OptionsMenuPost.elements';
import { inject, observer } from 'mobx-react';


export default inject('store')(observer(
    function OptionsMenuPost(props) {
        const [menuVisible, setMenuVisible] = useState(false)
        const menuOptions = ["Offensive", "Copyright Abuse", "Racist"]

        const handleClick = (report) => {
            props.setOptionsVisible(false)
            setMenuVisible(false)
            switch (report) {
                case "Offensive":
                    //TODO
                    break;
                case "Copyright Abuse":
                    //TODO
                    break;
                case "":
                    //TODO
                    break;
                default:
                    break;
            }
        }


        return (
            <DropDownMain>
                <DropDownHeader>
                    <HederText>{"Report Post"}</HederText>
                </DropDownHeader>
                {props.optionsVisible &&//menuVisible &&
                    <DropDownList>
                        {
                            menuOptions.map((element, index) =>
                                <ListItem key={index}
                                    onClick={() => handleClick(element)}
                                >
                                    {element}
                                </ListItem>
                            )
                        }
                    </DropDownList>
                }
            </DropDownMain>
        )
    }

))
