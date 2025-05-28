import React from "react";
import {
    UserSuggestionsModal,
    EachUserSuggestion,
    UserNameText,
} from "./MentionsComponent.elements";
import Avatar from "../Avatar/Avatar";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { AvatarUrl } from "../../stores/tools";

export default inject("store")(
    observer(function MentionsComponent(props) {
        // async function onSuggestionTap(item) {
        //     props.onSuggestionTap(item);
        // }


        return (
            <UserSuggestionsModal mainContainerHeight={props.mainContainerHeight} uploadingScreen={props.uploadingScreen}>
                {toJS(props.mentions).map((suggestion) => (
                    <EachUserSuggestion
                        key={suggestion._id}
                        onClick={() => {
                           props.onSuggestionTap(suggestion);
                        }}
                        className="MarginLeftMedium"
                    >
                        <Avatar
                            src={AvatarUrl(suggestion.avatar, "s")}
                            size={"small"}
                            alt={"avatar"}
                            userId={suggestion.userId}
                        />
                        <UserNameText className="MarginLeftMedium" >
                            {suggestion.uname}
                        </UserNameText>
                    </EachUserSuggestion>
                ))}
            </UserSuggestionsModal>
        );
    })
);
