import React, { useState } from "react";
import {
  MainContainer,
  SearchBarContainer,
  TextInput,
  BtnClose,
} from "./SearchChat.elements";
import Search from "../../public/icons/search3.svg";
import SearchListTipModal from ".././SearchListTipModal/SearchListTipModal";
import Icon from ".././Icon/Icon";
import Close from "../../public/icons/close.svg";
import { inject, observer } from "mobx-react";
import { useStore } from "../../stores/RootStore";
import { motion, AnimatePresence } from "framer-motion"

export default inject("store")(
  observer(function SearchChat(props) {
    let reqTimer;
    const rootstore = useStore();
    const [showClose, setShowClose] = useState(false);

    async function handleTextChange(text) {
      props.setSearchText(text);
      if (text.length > 0) {
        setShowClose(true);
      }

      if (text.length > 2) {
        if (reqTimer) {
          clearTimeout(reqTimer);
        }
        reqTimer = setTimeout(async () => {
          props.setOpenSearchModal(true);
          await rootstore
            .getUserSuggestions(text)
            .then((data) => {
              if (data.length > 0) {
                props.setSuggestions(data);
              } else {
                props.setSuggestions(data);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 200);
      }
    }

    const clearText = () => {
      props.setSearchText("");
      props.setSuggestions([]);
      props.setOpenSearchModal(false);
      setShowClose(false)
    };

    return (
      <>
        <MainContainer notMobile={props.notMobile}>
          <SearchBarContainer notMobile={props.notMobile}>
            <Icon
              height="auto"
              width="24px"
              name={Search}
              color={({ theme }) => theme.placeholder.color}
            />
            <TextInput
              type="text"
              placeholder={"Search ..."}
              value={props.searchText}
              onChange={(event) => handleTextChange(event.target.value)}
            />
            {/*
                <SearchListTipModal />*/}
          </SearchBarContainer>
          {showClose && (
            <BtnClose onClick={clearText}
              as={motion.button}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              whileHover={{ scale: 1.02, }}
              whileTap={{ scale: 0.98, }}
            >
              <Icon
                strokeColor={({ theme }) => theme.iconColor.color}
                strokeWidth="3"
                height="24px"
                width="24px"
                name={Close}
              />
            </BtnClose>
          )}
        </MainContainer>
      </>
    );
  })
);
