import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import Icon from "../Icon/Icon";
import { Comment, MainContainer, Name, ReplyContainer} from './ReplyComponent.elements';
import { useStore } from '../../stores/RootStore';
import Moonriver from "../../public/icons/ReplyLine.svg";
import Avatar from '.././Avatar/Avatar';
import { AvatarUrl } from '../../stores/tools';
import { SPACING } from '../../styles/Styling';

const PREVIEW_LENGTH = 25; // number of charecters from message being replyed to we wantt to show
/*
    ChatReplyIndicator
    May 9th 2021
    Visualy show the relationship between a chat reply and the message it is replying to
    William Doyle

    props:
        roomId      the room id of the chat these messages come from 
        replyingTo  id of the message being replyed to
*/
export default inject('store')(observer(
    function ReplyComponent(props) {
  const [fullmsg, setFullmsg] = useState(null); // the message being replyed to
  const [roomMessages, setRoomMessages] = useState([]);
  const rootstore = useStore();
  /*
    Get all messages from this room and store them in a useState hook called roomMessages
  */
  async function LoadMessages() {
    // doing this for every reply in a chat is kind of wasteful
    let tmpMsgs = await rootstore.getMessages(props.roomId, props.offset);
    setRoomMessages(tmpMsgs);
  }

  React.useEffect(() => {
    // if we have a list of this rooms messages... find the one that matches our props
    if (rootstore.messages.length!==0) {
      let temp = rootstore.messages.find(msg => msg._id == props.replyToId);
      setFullmsg(temp);
    }
    // if we don't have a list of this rooms messages run an async function to load them
    // note that running LoadMessages will modify roomMessages which will cause this useEffect to run again
    //else LoadMessages();
  }, [props.messages]);


  const ShowImage = (chatInst) => {
    let uriImage
    let chat=chatInst.chat
    if (chat.imageType == "jpeg"||chat.imageType == "image/jpeg"||chat.imageType == "image/png") {
      uriImage = chat.images[0]
    } else if ((chat.imageType == "gif"&&chat.images[0].includes("giphy.com")) || chat.imageType == "sticker") {
   
      const urlYuser = chat.images[0].substring(29); // remove yuser part
      const urlGiphy = urlYuser.substring(31); //remove giphy part
 
      const idEnd = urlGiphy.indexOf("/")
      const id = urlGiphy.substring(0, idEnd) //pure id
      const url = 'https://media1.giphy.com/media/' + id + '/giphy.gif'
      uriImage = url
    }
    return (
      
        <img src={uriImage} alt="this is a image relating to the comment, the line above it says chat.commentImage" width={50} height={50} style={{alignSelf: "center", margin: "4px"}} />

    );

  }
  
  return (
    <MainContainer>
      {fullmsg && (
        <ReplyContainer
          style={{
            flexDirection: 'row',
            marginLeft: 22,
            alignItems:'center',
            justifyContent:'flex-start',
            marginTop:-15,
          }}>
            <div style={{opacity: 0.4, marginTop: 23,marginRight: 6}}>
              <Icon height="auto" width="40px" name={Moonriver} /> 
            </div>
            <div style={{marginRight: 6}}>
              <Avatar
                src={AvatarUrl(fullmsg.user.avatar, "s")}
                size={'small'}
                alt={'Author Avatar'}
                frame={false}
                edit={false}
              />
            </div>
          <Name>{fullmsg.user.uname}</Name>
          {fullmsg.text?
          <Comment>{`${fullmsg.text.substr(
            0,
            PREVIEW_LENGTH,
          )}...`}</Comment>
          :
          fullmsg.images.length>0?
          <ShowImage chat={fullmsg}/>
          :null
          }
        </ReplyContainer>
      )}
    </MainContainer>
  );
}))
