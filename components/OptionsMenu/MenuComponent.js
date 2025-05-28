import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import Icon from "../Icon/Icon";
import { motion, AnimatePresence } from "framer-motion";
import ArrowTriangle from "../../public/icons/arrowTriangle.svg";
import { useStore } from '../../stores/RootStore';


export default inject("store")(
    observer(function MenuComponent(props) {
        const rootstore = useStore();
        const [dropDownOpen, setDropDownOpen] = useState(false)
        const [authUser, setAuthUser] = useState(undefined);

        const title = authUser?.isMod ? null : "Report Post"

        const optionsList = [
            { text: `${props?.user?.isCreator ? "Remove" : "Grant"} User's Creator Role`, moderator: true, profile: true },
            { text: "Ban User", moderator: true, profile: true },
            { text: `${!props?.user?.isHidden ? 'Hide' : 'Unhide'} User`, moderator: false, profile: true },
            { text: `${props.isStarred ? "Remove Star From Content" : "Star Content"}`, moderator: true, profile: false },
            { text: "Delete Post", moderator: true, profile: false },
            { text: `${props?.user?.isHidden ? 'Unhide' : "Hide"} Post`, moderator: true, profile: false },
            { text: "Offensive", moderator: false },
            { text: "Copyright Abuse", moderator: false },
            { text: "Racist", moderator: false },
        ]


        useEffect(() => {
            async function doEffect() {
                setAuthUser(await rootstore.getAuthUser());
            }
            doEffect();
        }, [rootstore]);

        const toggleDropdown = () => {
            setDropDownOpen(!dropDownOpen)
        }

        
        const handleOnClick = (option) => {
            if (option.text == "Grant User's Creator Role") {
                props.grantRole("isCreator")
            } else if (option.text == "Remove User's Creator Role") {
                props.revokeRole("isCreator")
            } else if (option.text == "Ban User") {
                props.banUser()
            } else if (option.text == "Hide User") {
                props.hideUser(true)
            } else if (option.text == "Unhide User") {
                props.hideUser(false)
            } else if (option.text == "Star Content") {
                props.onAddRemoveStar("add")
            } else if (option.text == "Remove Star From Content") {
                props.onAddRemoveStar("remove")
            } else if (option.text == "Delete Post") {
                props.onDeletePost()
            } else if (option.text == 'Unhide Post' || option.text == "Hide Post") {
                props.onHideContent()
            } else if (option.text == "Offensive") {
                props.handleReportPost("Offensive")
            } else if (option.text == "Copyright Abuse") {
                props.handleReportPost("Copyright Abuse")
            } else if (option.text == "Racist") {
                props.handleReportPost("Racist")
            }
            props.setOptionsMenuVisible(false);
        }


        return (
            <>
                {authUser?.isMod ?
                    <ModalContainer profilePage={props.profilePage} position={props?.position }>
                        {optionsList.map((option, index) => (
                            <div key={index} style={{ flex: 1 }}>
                                {props.profilePage && option.moderator && option.profile ?
                                    <Option index={index} onClick={() => handleOnClick(option)}>
                                        <Text >{option.text}</Text>
                                    </Option>
                                    : null}
                                {!props.profilePage && option.moderator && !option.profile ?
                                    <Option index={index} onClick={() => handleOnClick(option)}>
                                        <Text >{option.text}</Text>
                                    </Option>
                                    : null}
                            </div>
                        ))}
                    </ModalContainer>
                    :
                    <>
                        {props.profilePage ?
                            <ModalContainer profilePage={props.profilePage} position={props?.position }>
                                {optionsList.map((option, index) => (
                                    <div key={index} style={{ flex: 1 }}>
                                        {props.profilePage && !option.moderator && option.profile ?
                                            <Option index={index} onClick={() => handleOnClick(option)}
                                                style={{ borterTop: "none" }}>
                                                <Text style={{ paddingRight: 5, paddingBottom: 5 }} >{option.text}</Text>
                                            </Option>
                                            : null}
                                    </div>
                                ))}
                            </ModalContainer>
                            :
                            <>
                                {!dropDownOpen ?
                                    <ModalContainer profilePage={props.profilePage} position={props?.position }>
                                        <DropDownHeader
                                            dropDownOpen={dropDownOpen}
                                            onClick={toggleDropdown}
                                        >
                                            <Text style={{ marginRight: 24, fontFamily: 'LatoBlack' }}>{title}</Text>
                                            <Icon height="auto" width="16px" name={ArrowTriangle} />
                                        </DropDownHeader>
                                    </ModalContainer>
                                    :
                                    <ModalContainer profilePage={props.profilePage} position={props?.position }>
                                        <DropDownHeader
                                            dropDownOpen={dropDownOpen}
                                            onClick={toggleDropdown}
                                        >
                                            <Text style={{ fontFamily: 'LatoBlack' }}>{title}</Text>
                                            <Icon height="auto" width="16px" name={ArrowTriangle} />
                                        </DropDownHeader>
                                        {optionsList.map((option, index) => (
                                            <div key={index} style={{ flex: 1 }}>
                                                {!option.moderator && !option.profile ?
                                                    <Option index={index} onClick={() => handleOnClick(option)}>
                                                        <Text >{option.text}</Text>
                                                    </Option>
                                                    : null}
                                            </div>
                                        ))
                                        }
                                    </ModalContainer>
                                }
                            </>
                        }
                    </>
                }
                {/* the "click outside" function can't be used because because openening the options
                list after displaying the title (header: "report Post") handles as a click
                outside and doesn't give to open the options list, therefore need to use the BackdropOverlay .
                Natalia **/}

                {props.optionsMenuVisible &&
                    <BackdropOverlay
                        onClick={() => props.setOptionsMenuVisible(false)}
                    />
                }
            </>
        );
    })
);

import styled from "styled-components";
import { COLORS, SPACING } from "../../styles/Styling.js";

const ModalContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colorGrey.color};
    border: 1px solid ${({ theme }) => theme.borderColor.color};
    border-radius: 10px;
    position: absolute;
    left: ${props=>props.profilePage ? "70px" : props.position == "horizontal" ? "270px" : "none"};
    right: ${props=>props.profilePage ? "none" : props.position == "horizontal" ? "none" : "70px"};
    bottom: ${props => props.profilePage ? "none" : props.position == "horizontal" ? "none": "0px"};
    top: ${props => props.profilePage ? "20px" : props.position == "horizontal" ? "0px": "none"};
    z-index: 9999;
    overflow: hidden;
    box-shadow: 0 0 12px rgba(0,0,0,0.2);
`;

const Option = styled.div`
    flex-direction: row;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    white-space: nowrap;
    padding: ${SPACING.small}px ${SPACING.medium}px;
    border-top-width: ${props => props.index == 0 || props.index == 3 ? "0px" : "2px"};
    border-top-style: ${props => props.index == 0 || props.index == 3 ? null : "solid"};
    border-top-color: ${props => props.index == 0 || props.index == 3 ? "transparent" : props.theme.borderColor.color};
    z-index: 9998;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.name == "light" ? COLORS.black20 : COLORS.greyMedium};
    }
`;

const Text = styled.p`
    font-size: 18px; 
    color: ${({ theme }) => theme.textPrimary.color};
    padding-left: 5px;
`;

const DropDownHeader = styled.div`
    height: 40px;
    flex: 1;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    background-color: ${({ theme }) => theme.name == "light" ? COLORS.whiteMedium : COLORS.blackDarkMedium};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: ${props => props.dropDownOpen ? 0 : 10}px;
    border-bottom-right-radius: ${props => props.dropDownOpen ? 0 : 10}px;
   // border: 1px solid ${({ theme }) => theme.borderColor.color};
    padding: ${SPACING.medium}px;
`;

const BackdropOverlay = styled.div`
    position: fixed;
    z-index: 9990;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
`;