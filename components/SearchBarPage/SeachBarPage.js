import React from "react";
import {
  MainContainer,
  SearchBarContainer,
  TextInput,
  Menu,
  ALink,
} from "./SearchBarPage.elements";
import Search from "../../public/icons/search3.svg";
import Icon from ".././Icon/Icon";
import Link from "next/link";
import { SPACING } from "../../styles/Styling.js";
import { useStore } from "../../stores/RootStore";
import { useState } from "react";
import { runInAction } from "mobx";
import client from "../../pages/api/client";
import Close from "../../public/icons/close.svg";

const SearchBarPage = (props) => {
  const [text, setText] = useState("");
  const rootstore = useStore();
  const [active, setActive] = useState(false)

  React.useEffect(() => {
    async function doEffect() {
      if (rootstore.searchTerm) {
        await client.reAuthenticate();
        setText(rootstore.searchTerm)
        if (rootstore.searchTerm.length >= 2) {
          setTimeout(() => doAutoCompleteSearch(rootstore.searchTerm), 250)
        }
      }
    }
    doEffect()
  }, []);


  async function handleTextChange(text) {
    props.setLoader(true)
    setText(text);
    setActive(true)
    if (text.length >= 2) {
      setTimeout(() => doAutoCompleteSearch(text), 250);
    }
    // else if (text.length < 2) {
    //   runInAction(() => {
    //     this.autoCompleteResult = [];
    //   });
    // }
  }

  const doAutoCompleteSearch = async (text) => {
    //reset for every new search
    //setPostsList([])
    // setUsersList([])
    if (text.length >= 2) {
      await Promise.all([
        autoCompletePostsQuery(text),
        autoCompleteUsersQuery(text),
        //    this.getAutoCompleteUserResults(),
      ]).then(() => props.setLoader(false))
    }
  };

  async function autoCompletePostsQuery(text) {
    let autoCompletePosts = [];
    //if end of post search results hasn't been reached
    //console.log(text,"test")
    const postsA = await rootstore.autoCompleteSearchPosts(
      text,
      "week",
      true
    );
    if (postsA) {
      //console.log("-------- postsA.data: "+ postsA.data.length)
      props.setPostsList(postsA.data);
    }
  }

  // performs auto complete user search
  async function autoCompleteUsersQuery(text) {
    let autoCompleteUsers = [];
    const usersA = await rootstore.autoCompleteSearchUsers(text);
    if (usersA) {
      props.setUsersList(usersA.data);
    }
  }
  const clearButtonPress = () => {
    setText("")
    setActive(false)
    runInAction(() => {
      rootstore.searchTerm = "";
    });

    setTimeout(() => {
      props.setPostsList([])
      props.setUsersList([])
    }, 250)
  }

  return (
    <MainContainer>
      <SearchBarContainer page={props.page} active={active}>
        <Icon
          height="auto"
          width="24px"
          name={Search}
          color={({ theme }) => theme.placeholder.color}
        />
        <TextInput
          type="text"
          value={text}
          placeholder={"Search ..."}
          onChange={(event) => handleTextChange(event.target.value)}
          autoFocus={true}
        />
        {text.length > 0 &&
          <div onClick={() => clearButtonPress()} style={{ marginRight: SPACING.medium }}>
            <Icon
              strokeColor={({ theme }) => theme.iconColor.color}
              strokeWidth="4"
              height="20px"
              width="20px"
              name={Close}
            />
          </div>
        }
      </SearchBarContainer>
      {props.link1 || props.link2 || props.link3 ? (
        <Menu>
          {props.link1 && (
            <Link href={props.link1} passHref>
              <ALink style={{ marginLeft: SPACING.large }}>
                {" "}
                {props.title1}
              </ALink>
            </Link>
          )}
          {props.link2 && (
            <Link href={props.link2} passHref>
              <ALink style={{ marginLeft: SPACING.large }}>
                {" "}
                {props.title2}
              </ALink>
            </Link>
          )}
          {props.link3 && (
            <Link href={props.link3} passHref>
              <ALink style={{ marginLeft: SPACING.large }}>
                {" "}
                {props.title3}
              </ALink>
            </Link>
          )}
        </Menu>
      ) : null}
    </MainContainer>
  );
};

export default SearchBarPage;
