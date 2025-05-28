import React, { useState } from 'react'
import Autolinker from 'autolinker';


const AutolinkerComponent = (props) => {
    const [textFullVisible, setTextFullVisible] = useState(false);

    const toggleFullText = () => {
        setTextFullVisible(!textFullVisible)
    }

    const linkedText = Autolinker.link(props.text, {
        mention: 'instagram',
        hashtag: false,
        newWindow: false,
        urls: false,
        email: false,
        phone: false,
        stripPrefix: true,
        sanitizeHtml: true,
        replaceFn: (match) => {
            const type = match.getType();
            if (type == 'mention') {
                //console.log("Mention: ", match.getMention());
                // console.log("Mention Service Name: ", match.getServiceName());

                var tag = new Autolinker.HtmlTag({
                    tagName: 'a',
                    attrs: { 'href': '/' + match.getMention() ,"target":"_blank"},
                    innerHtml: "@" + match.getMention(),
                    newWindow:true
                });

                tag.addClass("autolink")
                return tag.toAnchorString();

            } else if (type == 'hashtag') {
                //TODO
                // console.log("Hashtag: ", match.getHashtag());
            }
        }
    })

    return (
        <>
            <p
                onClick={toggleFullText}
                className={`autolink ${textFullVisible ? "truncate-post-full" : "truncate-post-4-lines"}`}
                dangerouslySetInnerHTML={{ __html: linkedText}}
            >
            </p>
        </>
    )
}

export default AutolinkerComponent