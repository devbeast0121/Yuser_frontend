import React, { useState } from "react";
import {
  MainContainer,
  SearchBarContainer,
  TextInput,
  BtnClose,
  IconContainer,
  OverlayContainerSearch,
} from "./SearchBarMobile.elements";
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

const SearchBarMobile = (props) => {
  const [text, setText] = useState("");
  const [openSearchModal, setOpenSearchModal] = useState(false);
  //Search
  const [postsList, setPostsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const rootstore = useStore();
  const router = useRouter()

  async function handleTextChange(text) {
    setText(text);
    setOpenSearchModal(true);
    if (text.length >= 2) {
      setTimeout(() => doAutoCompleteSearch(), 250);
    }
    if (text.length === 0) {
      setOpenSearchModal(false);
    }
  }

  const doAutoCompleteSearch = async () => {
    await Promise.all([autoCompletePostsQuery(), autoCompleteUsersQuery()]);
  };

  //performs post queries
  async function autoCompletePostsQuery() {
    let autoCompletePosts = [];
    //if end of post search results hasn't been reached

    const postsA = await rootstore.autoCompleteSearchPosts(text, "week", true);
    if (postsA.total > 4) {
      let newPosts = postsA.data.splice(0, 4);
      setPostsList(newPosts);
    } else {
      setPostsList(postsA.data);
    }

    return autoCompletePosts;
  }

  // performs auto complete user search
  async function autoCompleteUsersQuery() {
    let autoCompleteUsers = [];
    const usersA = await rootstore.autoCompleteSearchUsers(text);
    if (usersA.total > 2) {
      let newUsers = usersA.data.splice(0, 2);
      setUsersList(newUsers);
    } else {
      setUsersList(usersA.data);
    }

    return autoCompleteUsers;
  }
  const clearButtonPress = () => {
    setText("");
    setPostsList([]);
    setUsersList([]);
    setOpenSearchModal(false);
    props.setNavSearchVisible(false)
  };


  const openSearchPage = () => {
    clearButtonPress()
    runInAction(() => {
      rootstore.searchTerm = text;
    });
    router.push({
      pathname: "/search",
    });
  };

  const openPost = (postId) => {
    window.open("/post/" + postId, "");
  };

  const openUserProfile = (uname) => {
    router.push({
      pathname: "/[uname]",
      query: { uname: uname },
    });
  };

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
      {
        openSearchModal && text.length>2 &&
        (
            <>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 75,
                bottom: 0,
                zIndex: 999999,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
                <OverlayContainerSearch>
                <div
                  style={{
                    flexDirection: "column",
                    padding: SPACING.medium,
                    alignItems: "flex-start",
                  }}
                >
                  {usersList.length > 0 && (
                    <div style={{ fontSize: 16 , color:COLORS.whiteLight}} className="MarginLeftMedium">Users</div>
                  )}

                  {usersList.length > 0 &&
                    usersList.map((suggestion) => (
                      <EachUserSuggestion
                        key={suggestion._id}
                        className="MarginLeftMedium"
                        onClick={() => openUserProfile(suggestion.uname)}
                        style={{ cursor: "pointer" }}
                      >
                        <Avatar
                          src={AvatarUrl(suggestion.avatar, "s")}
                          size={"small"}
                          alt={"avatar"}
                          userId={suggestion.userId}
                        />
                        <UserNameText className="MarginLeftMedium">
                          {suggestion.uname}
                        </UserNameText>
                      </EachUserSuggestion>
                    ))}
                  {postsList.length > 0 &&
                    postsList.map((post, index) => (
                      <div
                        style={{
                          flexDirection: "row",
                          margin: SPACING.medium,
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          cursor: "pointer",
                        }}
                        onClick={() => openPost(post?._id)}
                      >
                        {console.log(post)}
                        <PostImage
                          src={"https://yuser.imgix.net/" + post.asset}
                          post={post?._id}
                          style={{ paddingRight: SPACING.medium }}
                        />
                        {post.user?.uname}
                      </div>
                    ))}
                  {
                    (postsList.length>0||usersList.length>0 ) &&
                    <div
                    style={{
                      fontWeight: "bold",
                      cursor: "pointer",
                      margin: SPACING.medium,
                    }}
                    onClick={() => openSearchPage()}
                  >
                    {"View all search results"}
                  </div>
                  }
                </div>
              </OverlayContainerSearch>
            </div>
            </>
        )

      }
    </>
  );
};

export default SearchBarMobile;
