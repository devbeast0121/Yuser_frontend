import React, { useEffect, } from "react";
import Gem from "../../public/icons/gem.svg";
import GemWhite from "../../public/icons/gem-white.svg";
import Icon from ".././Icon/Icon";
import GiftBarComments from "../GiftBarComments/GiftBarComments";
import { motion } from "framer-motion";
import Numeral from "react-numeral";
import f_GetCommentValue from "../../functions/f_GetCommentValue";
import WithOutsideClick from "../WithOutsideClick/WithOutsideClick";

import { useFloating, autoPlacement, computePosition, shift, offset, flip } from "@floating-ui/react-dom";
import zIndex from "@material-ui/core/styles/zIndex";

/*
    Show gem icon on comments
    Not inside own folder because it is not used anywhere else on the site
*/
export default function CommentGifter(props) {
  const initialState = {
    bounce: 0,
    size: 1,
    amountA: 0,
    justGifted: false,
    prevGemCount: props.comment.gems,
    gifted: false,
    hasGifted: false,
    userId: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setBounce":
        return { ...state, bounce: action.payload };
      case "setSize":
        return { ...state, size: action.payload };
      case "setAmountA":
        return { ...state, amountA: action.payload };
      case "setJustGifted":
        return { ...state, justGifted: action.payload };
      case "setPrevGemCount":
        return { ...state, prevGemCount: action.payload };
      case "setGifted":
        return { ...state, gifted: action.payload };
      case "setHasGifted":
        return { ...state, hasGifted: action.payload };
      case "setUserId":
        return { ...state, userId: action.payload };
      default:
        throw new Error(`This reducer does not recognize action type of "${action.type}"`);
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);

  //   C O N S T A N T S
  const variantHorizontal = {
    visible: { opacity: 1, x: 50, y: -25 },
    hidden: { opacity: 0, x: 250, y: -25 },
  };

  function Shake() {
    dispatch({ type: "setBounce", payload: -5 });
    const timers = setTimeout(() => {
      dispatch({ type: "setBounce", payload: 0 });
    }, 190);
    return () => clearTimeout(timers);
  }

  function BounceUpDown() {
    dispatch({ type: "setBounce", payload: -10 });
    dispatch({ type: "setSize", payload: 1.3 });
    const timers = setTimeout(() => {
      dispatch({ type: "setBounce", payload: 0 });
      dispatch({ type: "setSize", payload: 1 });
    }, 190);
    return () => clearTimeout(timers);
  }

  /*
      CanGiftMinimum()
      Why make a function this simple?
      Foresight! We're going to need to account for the weird 24 hour rule at some point
      William Doyle
      July 30th 2021
  */
  function CanGiftMinimum(_comment, skip = true) {
    if (!skip)
      dispatch({ type: "setPrevGemCount", payload: _comment.gifted });
    if (_comment.gifted + 10 > 2000) return false;
    if (_comment.gifted + 10 > 1000) {
      function hasBeen24Hours(__comment) {
        // ------------------------------------------- code for 24 hour stuff

        // -------------------------------------------
        return false;
      }
      if (hasBeen24Hours(_comment)) return true;
      return false;
    }
    return true;
  }

  /*
          shouldShake()
          Should the gemn icon shake or not
          William Doyle
          July 30th 2021
      */
  function shouldShake() {
    // DO NOT MODIFY STATE INSIDE THIS FUNCTION!!! YOU WILL CAUSE AN INFINITE LOOP OF RERENDERS
    if (state.justGifted) return false;

    if (props.comment.userId === props.authUser?._id) return true;

    if (!CanGiftMinimum(props.comment)) return true;

    function gemsGiftedInPastDayExceptMostRecently(_comment) {
      // ------------------------------------------- code for 24 hour stuff

      // -------------------------------------------
      return _comment.gifted - state.prevGemCount;
    }

    if (
      state.prevGemCount < 2000 &&
      gemsGiftedInPastDayExceptMostRecently(props.comment) < 1000
    )
      return false;
    return true;
  }

  const closeGiftBar = () => {
    // console.log(`stub: about to setSelectedComment to zero..`)
    props.setSelectedComment(0);
  }

  useEffect(() => {
    if (!props.showOverlay)
      props.setSelectedComment(0);

    if (props.comment.gifted > 0 || state.amountA > 0)
      dispatch({ type: "setHasGifted", payload: true });
  }, [props.showOverlay, state.gifted]);

  //To get the user Id of the target post
  useEffect(() => {
    if (!props.postId)
      return;
    const postId = props.store.localPosts.getById(props.targetPostId)
    dispatch({ type: "setUserId", payload: postId.userId })
  }, []);

  const _gemValue = () => f_GetCommentValue(props.store)(props.comment._id);

  const GiftBarCommentsWrappedWithOutsideClick = WithOutsideClick(GiftBarComments)




  /* const { x, y, reference, floating, strategy } = useFloating({
     placement: 'top',
     strategy: 'fixed',
     middleware: [ autoPlacement()],
   }); */


  const { x, y, reference, floating, strategy } = useFloating({
    strategy: 'fixed',
    middleware: [offset(-50), flip(), shift()],
  });


  return (
    <div>
      <motion.div
        key="giftBarHorizontal"
        variants={variantHorizontal}
        initial={
          props.showGiftAmounts
            ? { opacity: 1, x: 50, y: -25 }
            : { opacity: 0, x: 250, y: -25 }
        }
        exit={
          props.showGiftAmounts
            ? { opacity: 0, x: 0, y: -25 }
            : { opacity: 1, x: 0, y: -25 }
        }
        animate={props.showGiftAmounts ? "visible" : "hidden"}
        transition={{
          type: "spring",
          ease: [0.17, 0.67, 0.83, 0.67],
          damping: 30,
          mass: 1,
          stiffness: 400,
        }}
        style={{
          zIndex:
            props.showGiftAmounts &&
              props.selectedComment._id === props.comment._id
              ? 999999
              : 1,
          overflow: props.showGiftAmounts ? "visible" : "hidden",
        }}
      >
        {props.showGiftAmounts &&
          props.selectedComment._id === props.comment._id && (
            <div
              id="tooltip"
              ref={floating}
              style={{
                position: strategy,
                top: y,
                right: 12,
                height: 250,
                width: 50,
                zIndex: 999999,
              }}
            >
              <GiftBarCommentsWrappedWithOutsideClick
                wrapperCallback={closeGiftBar}
                style={{ zIndex: 999999, }}
                sendGems={async (amount) => {
                  const status = await props.store.giftComment(
                    props.comment,
                    amount
                  );
                  if (status !== -1) {
                    dispatch({ type: "setGifted", payload: true });
                    props.pullTrigger();
                    BounceUpDown();
                    dispatch({ type: "setAmountA", payload: state.amountA + amount });
                  }
                  dispatch({ type: "setGifted", payload: false });
                }}
                itemInfo={{
                  type: "comment",
                  id: props.comment._id,
                  isReply: props.commentIsReply,
                }}
                closeGiftBar={closeGiftBar}
                parentComment={props.parentComment}
              />
            </div>
          )}
      </motion.div>
      <div style={{ flexDirection: "column", alignItems: "center" }}>
        <div
          ref={reference}
          onClick={async () => {
            dispatch({ type: "setJustGifted", payload: false });
            const au = await props.store.getAuthUser();
            if (props.comment.userId === au?._id) {
              Shake(); // shake to indicate user may not gift self
              return;
            }
            if (CanGiftMinimum(props.comment, false) === false) {
              Shake();
              return;
            }
            props.setSelectedComment(props.comment);
            props.setShowGiftAmounts(true);
            dispatch({ type: "setJustGifted", payload: true });
          }}
        >
          <motion.div
            initial={shouldShake() ? { x: 0 } : { y: 0, scale: state.size }}
            animate={shouldShake() ? { x: state.bounce } : { y: state.bounce, scale: state.size }}
            transition={{
              ease: [0.17, 0.67, 0.83, 0.67],
              type: "spring",
              damping: props.comment.gifted === 0 ? 13 : 26,
              mass: 2,
              stiffness: props.comment.gifted ? 3250 : 1000,
            }}
          >{
              (() => {

                if (props.store.localGiftingState.getAmountGifted(props.comment._id))
                  return <Icon width="24px" height="24px" name={Gem} />

                if (state.hasGifted)
                  return <Icon width="24px" height="24px" name={Gem} />

                return <Icon width="24px" height="24px" name={GemWhite} />
              })()
            }
          </motion.div>
        </div>
        <GemAmountText gemValue={_gemValue()} />
      </div>
    </div>
  );
}

function GemAmountText({ gemValue }) {
  return (
    <>
      {gemValue !== 0 &&
        <p style={{ fontSize: 13, fontFamily: "LatoBlack", marginTop: 4 }}>
          {gemValue > 999 ? (
            <Numeral
              className="BoldFontSmall"
              value={gemValue}
              format={"0.0a"}
            />
          ) : (
            gemValue
          )}
        </p>
      }
    </>
  )
} 
