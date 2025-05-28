import React from "react";
import Icon from "../Icon/Icon";
import { COLORS } from "../../styles/Styling";
// import { AppText, BoldText, LightText } from '../styles/Typography';
// import { View } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import IconComponent from './IconComponent';
// import ThemeStore from '../stores/ThemeStore';
// import MainStore from '../stores/MainStore';
// import { Spacing } from '../styles';
import Emoji from "../../public/icons/emoji3.svg";
import styled from "styled-components";

function EmojiBadge(props) {
  return (
    <EmojiContainer
      onClick={props.undoEmojiPress}
      style={{ cursor: "pointer" }}
      className="Flax"
    >
      <div className="flex" style={{ fontSize: 17, alignSelf: "center" }}>
        {(() => {
          if (props.code.length <= 5)
            return String.fromCodePoint(`0x${props.code}`);
          // https://www.youtube.com/watch?v=sTzp76JXsoY
          let unicode_parts = props.code.split('-');
          return `${String.fromCodePoint(`0x${unicode_parts[0]}`)}${String.fromCodePoint(`0x${unicode_parts[1]}`)}`
        })()
      }</div>
      <ParagraphStyle>{props.count}</ParagraphStyle>
    </EmojiContainer>
  );
}

export default function MessageReactions(props) {
  return (
    <div
      className="flex"
      style={{ marginTop: 6, flexDirection: "row", flexWrap: "wrap" }}
    >
      {props.reactions.map((badgeContent, index) => (
        <EmojiBadge
          key={index}
          code={badgeContent.code}
          count={badgeContent.count}
          hostMsgId={props.hostMsgId}
          //reactToMessageWithCallback={(msgId, code) => props.reactToMessageWithCallback(msgId, code)}
          undoEmojiPress={() =>
            props.undoEmojiPress(props.hostMsg, badgeContent.code)
          }
        />
      ))}

      <EmojiContainer
       onClick={() => props.onEmojiPress(props.hostMsg)}
        style={{alignItems: "center", cursor:"pointer",}}
      >
        <Icon
          height="19px"
          width="auto"
          name={Emoji}
          color={({ theme }) => theme.iconColor.color}
        />
        <ParagraphStyle2>{"+"}</ParagraphStyle2>
      </EmojiContainer>
    </div>
  );
}


const EmojiContainer = styled.button`
    display: flex;
    height: 33px;
    border: 1px solid ${({ theme }) => theme.borderColor.color};
    border-radius: 5px;
    padding-left: 7px;
    padding-right: 7px;
    flex-direction: row;
    background-color: ${({ theme }) => theme.containerSecondary.color};
    margin-right:6px;
    line-height:1;
`;

const ParagraphStyle = styled.p`
  margin-left: 4px; 
  font-size: 17px; 
  align-self: center;
  color:${({ theme }) => theme.textPrimary.color};
`

const ParagraphStyle2 = styled.p`
margin-left: 4px; 
font-size: 17px; 
align-self: center;
  color:${({ theme }) => theme.textPrimary.color};
`