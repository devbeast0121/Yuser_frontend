import {
    BanReasonBox,
    ButtonsMenuRow,
    Container,
    Background,
    BanTitle
} from './BanConfirmation.elements';
import { Button } from '..';
import React, { useState, useEffect } from 'react'
import {useStore} from "../../stores/RootStore";
import { COLORS, SPACING } from '../../styles/Styling.js';
import Close from "../../public/icons/close.svg";
import { session, useSession } from 'next-auth/client';


export default function BanConfirmation(props){
    const [banMessage,setBanMessage] = useState('');
    const rootstore = useStore();
    const user = props.user;
    function handleMessageChange(event)
    {
        console.log(event.target.value);
        setBanMessage(event.target.value);
    }

    async function handleButtonClick(buttonType)
    {
        switch(buttonType)
        {
            case 'Cancel':
                rootstore.showBanOverlay = false;
                break;
            case 'Ban':
                if(!user?._id)
                {
                    rootstore.errMessage = "Error: Could not ban User no User Id found.";
                    return;
                }
                try{
                    await rootstore.banUser(user?._id,banMessage);
                    rootstore.showBanOverlay = false;
                }catch(err){
                    rootstore.errMessage = `Error: An error occured when trying to ban ${user.uname}.`
                    console.log(err.message);
                    return;
                }
                break;
            default:
                
                break;
        }
    }

    return ( 
        <Background>
            <Container>
                <BanTitle>Ban User</BanTitle>
                <BanReasonBox
                    type = 'text'
                    placeholder = "Enter the reason for the ban"
                    value = {banMessage}
                    onChange={(event)=>{handleMessageChange(event)}}
                />
                <ButtonsMenuRow>
                    <Button
                        text={'Cancel'}
                        onClick={()=>{handleButtonClick('Cancel')}}
                        isIcon={false}
                        color={COLORS.red}
                        colorText={COLORS.white}
                        width={"75px"}
                    />
                    <Button
                        text={'Ban User'}
                        onClick={()=>{handleButtonClick('Ban')}}
                        isIcon={false}
                        color={COLORS.purple}
                        colorText={COLORS.white}
                        width={"75px"}
                    />
                </ButtonsMenuRow>
            </Container>
        </Background>
    )
}
