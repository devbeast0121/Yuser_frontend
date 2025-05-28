import React from "react";
import {
  Divider,
  ButtonTitle,
  NavButton,
  NavBox,
  Alink,
} from "./FooterHorizontal.elements";

const FooterHorizontal = (props) => {
  return (
    <NavBox protocol={props.protocol}>
      <NavButton className="Flex">
        <ButtonTitle>
          <Alink href="/signin">{"Login"}</Alink>
        </ButtonTitle>
      </NavButton>
      <div className="flex" ider />
      <NavButton className="Flex">
        <ButtonTitle>
          <Alink target="_blank" href="https://rebl.gitbook.io/rebl">
            {"Docs"}
          </Alink>
        </ButtonTitle>
      </NavButton>
      <div className="flex" ider />
      <NavButton className="Flex">
        <ButtonTitle>
          <Alink
            target="_blank"
            href="https://rebl.gitbook.io/rebl//yuser/terms-and-conditions"
          >
            {"Terms"}
          </Alink>
        </ButtonTitle>
      </NavButton>
      <div className="flex" ider />
      <NavButton className="Flex">
        <ButtonTitle>
          <Alink
            target="_blank"
            href="https://rebl.gitbook.io/rebl/yuser/community-guidelines"
          >
            {"Guidelines"}
          </Alink>
        </ButtonTitle>
      </NavButton>
      <div className="flex" ider />
      <NavButton className="Flex">
        <ButtonTitle>
          <Alink target="_blank" href="https://twitter.com/reblapp">
            {"Twitter"}
          </Alink>
        </ButtonTitle>
      </NavButton>
      <div className="flex" ider />
      <NavButton className="Flex">
        <ButtonTitle>
          <Alink target="_blank" href="https://discord.gg/uRRxnfAjhY">
            {"Discord"}
          </Alink>
        </ButtonTitle>
      </NavButton>
      <div className="flex" ider />
      <NavButton className="Flex">
        <ButtonTitle>
          <Alink target="_blank" href="https://instagram.com/reblapp">
            {"Instagram"}
          </Alink>
        </ButtonTitle>
      </NavButton>
      <div className="flex" ider />
      <NavButton className="Flex">
        <ButtonTitle>
          <Alink>{"© 2023 Yuser Inc."}</Alink>
        </ButtonTitle>
      </NavButton>
    </NavBox>
  );
};

export default FooterHorizontal;
