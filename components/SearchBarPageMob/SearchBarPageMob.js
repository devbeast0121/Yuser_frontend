import React, { useState } from "react";
import {
  MainContainer,
  SearchBarContainer,
  TextInput,
  BtnClose,
  IconContainer,
  OverlayContainerSearch,
} from "./SearchBarPageMob.elements";
import Search from "../../public/icons/search3.svg";
import SearchListTipModal from ".././SearchListTipModal/SearchListTipModal";
import Icon from ".././Icon/Icon";
import Close from "../../public/icons/close.svg";
import { useStore } from "../../stores/RootStore";
import { EachUserSuggestion, UserNameText } from "../MentionsComponent/MentionsComponent.elements";
import { Avatar } from "@material-ui/core";
import { AvatarUrl } from "../../stores/tools";
import { PostImage } from "../SearchBar/SearchBar.elements";
import { COLORS, SPACING } from "../../styles/Styling";
import { runInAction } from "mobx";
import { useRouter } from "next/router";
import client from "../../pages/api/client";

const SearchBarPageMob = (props) => {
  const [text, setText] = useState("");
  //Search
  
  const rootstore = useStore();
  const router = useRouter()

 
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
    console.log(text)
    setText(text);
    if (text.length >= 2) {
      setTimeout(() => doAutoCompleteSearch(text), 250);
    }
    if (text.length === 0 || text.length<2) {
        runInAction(() => {
            rootstore.mobSearchPosts = [];
            rootstore.mobSearchUsers =[];
          });
    }
  }

  const doAutoCompleteSearch = async (text) => {
    //reset for every new search
    //setPostsList([])
    // setUsersList([])
    if(text.length>=2){
        await Promise.all([
            autoCompletePostsQuery(text),
            autoCompleteUsersQuery(text),
            //    this.getAutoCompleteUserResults(),
          ])
    }
  
  };

  async function autoCompletePostsQuery(text) {
    let autoCompletePosts = [];
    await client.reAuthenticate();
    //if end of post search results hasn't been reached
    //console.log(text,"test")
    const postsA = await rootstore.autoCompleteSearchPosts(
      text,
      "week",
      true
    );
    console.log(postsA,"posts from mob searchpage")
   if(postsA){
    runInAction(() => {
        rootstore.mobSearchPosts = postsA.data
      });
   }
  }

  // performs auto complete user search
  async function autoCompleteUsersQuery(text) {
    
    const usersA = await rootstore.autoCompleteSearchUsers(text);
    console.log(usersA,"users from mob searchpage")
    if(usersA){
        runInAction(() => {
            rootstore.mobSearchUsers =usersA.data;
          });
    }
  }
  const clearButtonPress=()=>{
    setText("")
    runInAction(() => {
        rootstore.searchTerm = "";
        rootstore.mobSearchPosts = [];
        rootstore.mobSearchUsers =[];
      });
      props.setIsSearch(false)
      props.setNavSearchVisible(false)
      router.push("/")
  }

  return (
    <>
      <MainContainer notMobile={props.notMobile}>
        <SearchBarContainer notMobile={props.notMobile}>
          <IconContainer>
            <Icon
              height="auto"
              width="24px"
              name={Search}
              color={({ theme }) => theme.placeholder.color}
            />
          </IconContainer>
          <TextInput
            type="text"
            placeholder={"Search ..."}
            value={text}
            onChange={(event) => handleTextChange(event.target.value)}
            autoFocus={true}
            style={{color:COLORS.white}}
          />
          {/*
                <SearchListTipModal />*/}
        </SearchBarContainer>
        <BtnClose onClick={() => clearButtonPress()}>
          <Icon
            strokeColor={({ theme }) => theme.iconColor.color}
            strokeWidth="3"
            height="24px"
            width="24px"
            name={Close}
          />
        </BtnClose>
      </MainContainer>
    </>
  );
};

export default SearchBarPageMob;
