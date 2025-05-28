import React from "react";
import {
    UserSuggestionsModal,
    EachUserSuggestion,
    UserNameText,
} from "./HashtagSuggestions.elements";
import Avatar from "../Avatar/Avatar";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { AvatarUrl } from "../../stores/tools";

export default inject("store")(
    observer(function HashtagsSuggestions(props) {
        // async function onSuggestionTap(item) {
        //     props.onSuggestionTap(item);
        // }


        return (
            <UserSuggestionsModal mainContainerHeight={props.mainContainerHeight} uploadingScreen={props.uploadingScreen}>
                {toJS(props.hashtags).map((hashtag) => (
                    <EachUserSuggestion
                        //key={hashtag._id}
                        onClick={() => {
                           props.onSuggestionTap(hashtag);
                        }}
                        className="MarginLeftMedium"
                    >
                        <UserNameText className="MarginLeftMedium" >
                            #
                            {hashtag}
                        </UserNameText>
                    </EachUserSuggestion>
                ))}
            </UserSuggestionsModal>
        );
    })
);
