import React from "react";
import {
  MainContainer,
  SearchBarContainer,
  TextInput,
  LogoImg,
  Menu,
  ALink,
} from "./SearchBar.elements";
import Search from "../../public/icons/search3.svg";
import SearchListTipModal from ".././SearchListTipModal/SearchListTipModal";
import Icon from ".././Icon/Icon";
import Link from "next/link";
import { COLORS, SPACING } from "../../styles/Styling.js";
import YuserLogo from "../../public/icons/yuserTextLogo.svg";
import GemPink from "../../public/icons/gem-pink.svg";
import { useSession } from "next-auth/client";

const SearchBar = (props) => {
  const [session, loading] = useSession();
  const placeholder =
    props.location === "market" ? "Search NextGems ..." : "Search ...";
  const href = session ? "/home" : "/";

  return (
    <MainContainer className="Flex">
      <SearchBarContainer page={props.page} className="Flex">
        <Icon
          height="auto"
          width="24px"
          name={Search}
          color={({ theme }) => theme.placeholder.color}
        />
        <TextInput
          type="text"
          placeholder={placeholder}
          onChange={props.handleChange}
          className="Flex"
        />
        {/*
                <SearchListTipModal />*/}
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

export default SearchBar;
