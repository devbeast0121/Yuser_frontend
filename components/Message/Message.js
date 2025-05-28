import React from 'react';
import {
    MessageAppContainer,
    InnerBox,
    Name,
    Text
} from './Message.elements';
import Close from '../../public/icons/close.svg';

import Button from '../Button/Button';
import Avatar from '.././Avatar/Avatar';
import { motion } from "framer-motion"
import { AvatarUrl } from '../../stores/tools.js';

export const Message = (props) => {

    const closeMessage = () => {
        props.setSingleMessageVisible(false)
    }

    return (
        <>
            <>
                <motion.div
                    key="message"
                    className="Message"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 70 }}
                    exit={{ opacity: 0, y: -100 }}
                >
                    <MessageAppContainer >
                        <Avatar
                            src={AvatarUrl("", "s")}
                            size={'small'}
                            alt={'avatar'}
                            frame={false}
                            edit={false} />
                        <InnerBox>
                            <Name>{"anna"}</Name>
                            <Text>{"ljg' pjo p'jer'ewjpfgeroj tpwejofp ewjgperjg perjpfger j"}</Text>
                        </InnerBox>
                        <Button
                            onClick={closeMessage}
                            isIcon={true}
                            color={'transparent'}
                            iconWidth={"24px"}
                            iconName={Close}
                        />
                    </MessageAppContainer>
                </motion.div>
            </>
        </>
    )
}
