import React, { useState } from "react";
import {
  ListContainer,
  RowContainer,
  Name,
  Title,
  AvatarContainer,
  ChatNameBox,
} from "./ParticipantsList.elements";
import Avatar from "../Avatar/Avatar";
import { inject, observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";
import { AvatarUrl } from "../../stores/tools";
import AvatarDefault from "../../public/icons/avatar.svg";
import { useStore } from "../../stores/RootStore";

export default inject("store")(
  observer(function ParticipantsList(props) {
    const rootstore = useStore();
    const [userName, setUserName] = useState("");
    const [hover, setHover] = useState(false);

    React.useEffect(() => {
      async function doEffect() {
        if (rootstore.roomId !== null) {
          await rootstore.getRoomMembers(rootstore.roomId);
        }
      }
      doEffect();
    }, [rootstore.roomId]);

    const optionsVariants = {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
      exit: {
        opacity: 0,
      },
    };


    const onOptionsHover = (value, userName) => {
      if (value) {
        setUserName(userName != null ? userName : "")
        setHover(true);
      } else {
        setUserName("")
        setHover(false);
      }
    }

    return (
      <ListContainer>
        <Title>{"Chatters"}</Title>
        {rootstore.chatMembers.length !== 0 &&
          rootstore.chatMembers.map((row, index) => (
            <RowContainer key={index} row={row}>
              <AvatarContainer
                key={index}
                style={{}}
                as={motion.div}
                whileHover={'visible'}
                onHoverStart={() => onOptionsHover(true, row.user?.uname)}
                onHoverEnd={() => onOptionsHover(false, row.user?.uname)}
              >
                {row.user?.avatar ? (

                  <Avatar
                    src={AvatarUrl(row.user.avatar, "s")}
                    size={"small"}
                    alt={"Author Avatar"}
                    frame={false}
                    edit={false}
                  />
                ) : (
                  <Avatar
                    src={AvatarDefault}
                    size={"small"}
                    alt={"Author Avatar"}
                    frame={false}
                    edit={false}
                  />
                )}
                {hover && row.user?.uname === userName ?
                  <AnimatePresence style={{ position: "relative" }}>
                    <ChatNameBox
                      as={motion.div}
                      variants={optionsVariants}
                      initial='hidden'
                      animate='visible'
                      exit='exit'
                    >
                      <Name isAdmin={row.isAdmin}>{row.user?.uname} {row.isAdmin ? "(Admin)" : ""}</Name>
                    </ChatNameBox>
                  </AnimatePresence>
                  : null}
              </AvatarContainer>
            </RowContainer>
          ))}
      </ListContainer>
    );
  })
);
