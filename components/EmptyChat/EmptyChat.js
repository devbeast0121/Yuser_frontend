import React, { useEffect, useRef, useState } from 'react';
import {
    TxtCurrentBid,
    EmptyContainer
} from './EmptyChat.elements';
import { GradientButton } from '../../styles/globalStyles'
import Link from 'next/link';
import Button from '../Button/Button';
import { COLORS } from '../../styles/Styling';
import { inject, observer } from 'mobx-react';
import { useRouter } from 'next/router';

export default inject("store")(observer(
    function EmptyChat(props) {

     

        return (
            <>
                <EmptyContainer >
                    <TxtCurrentBid> Tap on a person to the left to start a chat with them.</TxtCurrentBid>
                </EmptyContainer>
            </>
        )
    }
))
