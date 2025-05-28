import styled, { createGlobalStyle } from 'styled-components';
import { FONT_SIZE, COLORS, SPACING } from './Styling.js';

// @media points: 1290px, 991px, 700px, 515px

export const lightTheme = {
  name: 'light',
  //---------- background color
  container: { color: COLORS.white },
  containerSecondary: { color: COLORS.whiteLightMedium },
  containerOpposite: { color: COLORS.black },
  containerHover: { color: COLORS.whiteLight },
  //--------- typography colors
  textPrimary: { color: COLORS.blackDark },
  textSecondary: { color: COLORS.blackDarkMedium },
  //----------
  borderColor: { color: COLORS.whiteMedium },
  placeholder: { color: COLORS.whiteDark },
  inactiveColor: { color: COLORS.whiteDark },
  oppositeInactiveColor: { color: COLORS.blackLight },
  iconColor: { color: COLORS.black},
  hoverMenu: { color: COLORS.whiteLight},
  greyButton: { color: COLORS.whiteLightMedium},
  //---------- other colors
  colorMediumDark: { color: COLORS.whiteMedium },   //COLORS.whiteLight
  colorMedium: { color: COLORS.whiteMedium },
  colorDark: { color: COLORS.white },
  colorGrey: { color: COLORS.whiteMedium } //???
}

export const darkTheme = {
  name: "dark",
  //---------- background color
  container: { color: COLORS.black },
  containerSecondary: { color: COLORS.blackDarkMedium },
  containerOpposite: { color: COLORS.white },
  containerHover: { color: COLORS.blackDark },
  //--------- typography colors
  textPrimary: { color: COLORS.white },
  textSecondary: { color: COLORS.whiteLight },
  //----------
  borderColor: { color: COLORS.blackMedium },
  placeholder: { color: COLORS.whiteDark }, 
  inactiveColor: { color: COLORS.blackLight },
  oppositeInactiveColor: { color: COLORS.whiteDark },
  iconColor: { color: COLORS.white },
  hoverMenu: { color: COLORS.blackDarkMedium},
  greyButton: { color: COLORS.blackMedium},
  //---------- other colors
  colorMediumDark: { color: COLORS.blackDarkMedium },
  colorMedium: { color: COLORS.blackMedium },
  colorDark: { color: COLORS.blackDark },
  colorGrey: { color: COLORS.blackMedium }
}

const GlobalStyle = createGlobalStyle`
   body {
    background: ${({ theme }) => theme.container.color}; // see _app.js  <div style={{ backgroundColor: backgroundColorApp }}> , exception for signin.js and nextgems,js pages
    color: ${({ theme }) => theme.textPrimary.color};
  }

    *{
        box-sizing: border-box; 
        margin: 0;
        padding: 0;
        font-family: 'LatoRegular', sans-serif;
        font-size: ${FONT_SIZE.medium}px;
        outline: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-smooth: always;
    }

    .WalletsMainelements__WalletsContainer-sc-1wrr7de-2 .swiper-slide {
      width: auto;
    }
    .BannerSwiperLanding__BannerContainer-sc-1i0qdw7-0 .BannerSwiperLanding_swiper__Ro2aq {
      height:auto;
    }
    
    .walletBalance {
        text-align: left;
        font-size: ${FONT_SIZE.large}px;
        font-family: 'LatoRegular';
    }

    h1, h2, h3 { 
      font-family: 'Rubik','LatoBlack', sans-serif;
      font-size: 24px;
    }
    h1 {
      font-size: ${FONT_SIZE.reallyLarge}px;
      @media screen and (max-width: 500px){
        font-size: calc(${FONT_SIZE.reallyLarge}px - 10px);
      }
    }
    h2 {
      font-size: ${FONT_SIZE.extraLarge}px;
      @media screen and (max-width: 500px){
        font-size: calc(${FONT_SIZE.extraLarge}px - 10px);
      }
    }
    h3 {
      font-size: ${FONT_SIZE.large}px;

      @media screen and (max-width: 500px){
        font-size: calc(${FONT_SIZE.large}px - 10px);
      }
    }
    .maximumWidth {
        width:100%;
    }
    p, a {
        font-size: ${FONT_SIZE.medium}px;

        @media screen and (max-width: 500px){
            font-size: 16px;
        }
    }
    body {
        font-family: 'Lato', sans-serif;
        caret-color: transparent;
    };
    div {
        display:flex;
    };

    //WIDTH STYLING Here are a number of width classes you can use to apply widths to divs/components
    .w-800px {
      width:800px;
    }
    .w-400px {
      width:400px;
    }

    //FLEX STYLING Here are a number of flex classes you can use to apply flex styling to divs/components
    .Flex {
      display: flex;
    }
    .flex-col {
      flex-direction:column,
    }
    .flex-row {
      flex-direction:row,
    }
    .center {
      display:flex; justify-content:center; align-items: center;
    }

    .flexContainerRow {
        flex-direction:row;
        
        @media screen and (max-width: 740px){
            flex-direction:column;
        }
    };

    .flexContainerRowTitle {
        flex-direction:row;
        
        @media screen and (max-width: 1100px){
            flex-direction:column;
        }
    };

    .justifyContainerItems {
      justify-content: flex-end;

      @media screen and (max-width: 1191px){
            justify-content: center;
        }
    }

    .flexSectionTop {
        margin-right:34px;
        @media screen and (max-width: 740px){
            margin-bottom:34px;
            margin-right:0;
        }
    };

    .flexSectionTop2 {
        margin-right:34px;
        @media screen and (max-width: 740px){
            margin-top:34px;
            margin-right:0;
            order:2;
        }
    };

    .flexSectionBottom {

        @media screen and (max-width: 740px){
            flex-direction:column;
        }
    };

    .flexSectionBottom1 {

        @media screen and (max-width: 740px){
            flex-direction:column;
            order:1;
        }
    };

    .center {display:flex; justify-content:center; align-items: center;}

    div#__next {
        flex-direction:column;
    };

    li {
        display: flex;
    };

    div.modal {
        position: fixed;
        z-index: 1040;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    };

    .BoldFontSmall {
        font-size:14px;
        font-family: 'LatoBlack';
    }
    .BoldFontExtraSmall {
        font-size:13px;
        font-family: 'LatoBlack';
    }
    
    .MarginBottomSmall {
        margin-bottom:6px;
    };
    .MarginBottomMedium {
        margin-bottom:12px;
    };
    .MarginBottomLarge {
        margin-bottom:24px;
    };
    .MarginBottomExtraLarge {
        margin-bottom: 40px;
    };
    .MarginRightSmall {
        margin-right:6px;
    };
    .MarginRightMedium {
        margin-right:12px;
    };
    .MarginRightLarge {
        margin-right:24px;
    };
    .MarginLeftSmall {
        margin-left:6px;
    };
    .MarginLeftMedium {
        margin-left:12px;
    };
    .MarginLeftLarge {
        margin-left:24px;
    };
    .MarginTopSmall {
        margin-top:6px;
    };
    .MarginTopMedium {
        margin-top:12px;
    };
    .MarginTopLarge {
        margin-top:24px;
    };
    .MarginTopExtraLarge {
        margin-top: 40px;
    };
    .MarginFull {
        margin-top:12px;
        margin-left:12px;
        margin-bottom:12px;
        margin-right:12px;
    };
    .FullWidth {
        width:100%;
    }
    .PaddedWidth {
        padding-right:${SPACING.medium}px;
        padding-left:${SPACING.medium}px;
    };
    .TransparentScrollbar {
      overflow: auto;
      ::-webkit-scrollbar {
          width: 0px;
          background: transparent; /* make scrollbar transparent */
          display: none;
      }
    };
    .noHover{
      pointer-events: none;
      cursor: none;
    }
    .flexOne {
        display:flex;
        flex:1;
    };
    .Message {
        display:flex;
        flex-direction:row;
        position:fixed;
        top:0;
        left: 53%;
        transform: translateX(-53%);
        margin:0 auto;
        z-index:999;
        overflow:hidden;
    };

    .MessageTop {
        display:flex;
        flex-direction:row;
        position:fixed;
        top:0;
        left: 50%;
        transform: translateX(-50%);
        margin:0 auto;
        z-index:999;
        padding:12px 24px;
        background-color: ${({ theme }) => theme.containerSecondary.color};
        box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
        border-bottom-right-radius:10px;
        border-bottom-left-radius:10px;
        overflow:hidden;
        border-style:solid;
        border-color: ${({ theme }) => theme.colorMedium.color};
        border-width:1px;
    };
    .MessageTopnftshare {
        display:flex;
        flex-direction:row;
        position:fixed;
        top:0;
        left: 45%;
        transform: translateX(-50%);
        margin:0 auto;
        z-index:99999;
        padding:12px 24px;
        background-color: ${({ theme }) => theme.containerSecondary.color};
        box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
        border-bottom-right-radius:10px;
        border-bottom-left-radius:10px;
        overflow:hidden;
        border-style:solid;
        border-color: ${({ theme }) => theme.colorMedium.color};
        border-width:1px;
    };

    .MessageAppTop {
        display: flex;
        max-width: 680px;
        min-width: 310px;
        width: 100%;
        align-self: center;
        position: fixed;
        bottom: 95%;
        margin-left: ${SPACING.large}px;   
        margin-right: ${SPACING.large}px;
        //top: 0px;
        //left: 10%;
        //transform: translateX(-10%);
        //margin:0 auto;
        z-index:99999;
        overflow:hidden;
   
    };
    .ErrorMessageTop {
        display:flex;
        flex-direction:row;
        position:fixed;
        top:0;
        margin:0 auto;
        z-index:999;
       // padding:12px 24px;
       // background-color:${({ theme }) => theme.containerSecondary.color};
       // box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
       // border-bottom-right-radius:10px;
      //  border-bottom-left-radius:10px;
        overflow:hidden;
       // border-style:solid;
      //  border-color:${({ theme }) => theme.colorMedium.color};
        //border-width:1px;
    };
    .background-red {
      background-color: red;
    }

    .background-blue {
      background-color: blue;
    }

    .SuccessMessageTop {
      display:flex;
      flex-direction:row;
      position:fixed;
      align-self:center;
      top:0;
      transform: translateX(-35%);
      margin:0 auto;
      z-index:999;
     // padding:12px 24px;
     // background-color:${COLORS.blackDark};
     // box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
     // border-bottom-right-radius:10px;
    //  border-bottom-left-radius:10px;
     // border-style:solid;
    //  border-color:${COLORS.blackMedium};
      //border-width:1px;
  };

    .splashScreen {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 9999;
        @media screen and (max-width: 740px){
            flex-direction:column;
        }
    }

    .autolink {

        a:link, a:visited {
        color: ${COLORS.purple};
        padding: 0px 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        }

        a:hover, a:active   {
        color: ${({ theme }) => theme.textPrimary.color};
        }
    }

    .infinite-scroll-component {
      margin-top:0 !important;
    }

    .infinite-scroll-component__outerdiv {
      justify-content: center;
      margin: 0;
      align-items: flex-start;
      width: 100% !important;
    } 

    .imageSignup {
      object-position: center top;
    }

    .imageNextjsMessage {
      object-position: left center;
      border-radius: 5px;
      overflow: hidden;
      width: 100%,
      height: 100%,
    }

    .customInfinityScrollbar {
      display: flex;
      overflow-x: scroll;

        ::-webkit-scrollbar {
      height: 3px;
      }
      ::-webkit-scrollbar-track {
      background: transparent;
      }
      ::-webkit-scrollbar-thumb {
      background: ${COLORS.purple};
      }
    }

    .dzu-dropzone {
      overflow: hidden !important;
    }
    
    //----------------------------------- input-emoji
    .react-input-emoji--container {
        color: ${({ theme }) => theme.container.color} !important;
        background-color: transparent !important;
        border: 0px none transparent !important;
        border-radius: 0px !important;
        font-family: 'LatoRegular' !important;
        font-weight: normal !important;
        border: 0px none transparent !important;
        caret-color: ${({ theme }) => theme.colorGrey.color} !important;
        z-index: 9999 !important;
        margin:0 !important;
    }
    .react-emoji {
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        min-height: 40px;
    }
    .react-input-emoji--wrapper {
        padding-left: 24px !important;
    }
    .react-input-emoji--placeholder {
        left: 24px !important;
    }
    .react-input-emoji--button svg {
        fill: ${({ theme }) => theme.container.color} !important;
    }
    .react-input-emoji--button__show svg {
        fill: ${COLORS.purple} !important;
    }
    .react-input-emoji--input {
        padding:0 !important;
        overflow-x: hidden;
       /*overflow-y: hidden;*/
       line-height: 22px;
    }
    .react-input-emoji--button {
        align-self: end !important;
        margin-bottom: 0 !important;
        padding-right: 12px !important;
        padding-left: 12px !important;
        display:flex !important;
        align-self: flex-end !important;
        display: flex !important;
        min-height: 40px;
        align-items: center;
        justify-content: center;
    }
    .react-emoji-picker--wrapper {
        overflow: visible !important; 
    }
    .emoji-mart {
        font-family: 'LatoRegular' !important;
        font-size: 16px;
        display: inline-block;
        color: ${({ theme }) => theme.container.color} !important;
        border: 2px solid ${({ theme }) => theme.colorMediumDark.color} !important;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.colorMedium.color} !important; 
    }
    .emoji-mart-category-label {
        display: none !important;
    }
    .emoji-mart-search input {
        border: 2px solid ${({ theme }) => theme.colorMediumDark.color} !important;
        background-color: ${({ theme }) => theme.colorMedium.color} !important; 
        caret-color: ${({ theme }) => theme.container.color} !important;
    }
    .emoji-mart-bar {
        border: 0 solid ${({ theme }) => theme.colorMediumDark.color} !important;
    }
    .emoji-mart-search-icon {
        fill: ${({ theme }) => theme.container.color} !important;
    }
    // ------------------------------------date-time-picker
    .react-datetime-picker *{
        background-color: ${({ theme }) => theme.colorGrey.color};
        color: ${({ theme }) => theme.textPrimary.color};
    }
    .react-datetime-picker__calendar.react-datetime-picker__calendar--open{
      padding: 10px;
    }
    .react-datetime-picker__wrapper{
        border: none;
    }
    .react-datetime-picker__button__icon{
        stroke: ${({ theme }) => theme.containerSecondary.color}
    }
    .react-datetime-picker__button:enabled:hover .react-datetime-picker__button__icon,
    .react-datetime-picker__button:enabled:focus .react-datetime-picker__button__icon {
         stroke:  ${COLORS.blue};
    }
    .react-datetime-picker__calendar-button__icon.react-datetime-picker__button__icon{
      stroke: ${({ theme }) => theme.iconColor.color}
    }
    .react-datetime-picker__inputGroup__divider{
        align-self: center;
    }
    .react-datetime-picker__calendar{
        background-color:${({ theme }) => theme.colorGrey.color};
    }
    .react-datetime-picker__calendar {
        width: 300px;
        height: auto;
        border: 1px solid  ${({ theme }) => theme.borderColor.color};
        border-radius: 5px;
    }
    .react-calendar{
        display: flex;
        flex-direction: column;
    }
    .react-calendar__month-view{
       position: relative;
    }
    .react-calendar__month-view__weekdays{
        position: absolute;
        top: 0; left: 0; bottom: auto; right: 0;
        z-index: 99;
    }
    .react-calendar__month-view__days__day--weekend{
        opacity: 0.5;
    }
    .react-calendar__month-view__weekdays__weekday{
        align-items: center;
        justify-content: center;
        padding-top: 2px;
        padding-bottom: 8px;
    }
    .react-calendar__month-view__days{
        margin-top: 30px;
        position: relative;
    }
    .button{
        border-style: outset !important;
    }
    .react-calendar__navigation__arrow,
    .react-calendar__navigation__label,
    .react-calendar__century-view__decades__decade,
    .react-calendar__decade-view__years__year,
    .react-calendar__year-view__months__month,
    .react-calendar__month-view__days__day,
    .react-calendar__month-view__days__day--weekend{
        border: 0 none  transparent;
        background-color:  transparent;
        padding-top: 2px;
        padding-bottom: 8px;
    }
    .react-calendar__navigation{
        padding-top: 5px;
    }
    .react-calendar__navigation__arrow{
        padding: 0px 5px 10px 5px;
    }
    .react-datetime-picker__inputGroup,
    .react-datetime-picker__inputGroup__input.react-datetime-picker__inputGroup__year,
    .react-datetime-picker__inputGroup__input.react-datetime-picker__inputGroup__month,
    .react-datetime-picker__inputGroup__input.react-datetime-picker__inputGroup__day,
    .react-datetime-picker__inputGroup__input.react-datetime-picker__inputGroup__hour,
    .react-datetime-picker__inputGroup__input.react-datetime-picker__inputGroup__minute,
    .react-datetime-picker__inputGroup__input.react-datetime-picker__inputGroup__second,
    .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from,
    .react-datetime-picker__inputGroup__input.react-datetime-picker__inputGroup__amPm{
      background: transparent;
    }
    .react-datetime-picker__inputGroup__leadingZero{
      align-self: flex-end;
      padding-bottom: 3px;
    }
    .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--weekend{
     // opacity:0.3;
    }
    
    .react-calendar__tile.react-calendar__month-view__days__day{
      //color: ${({ theme }) => theme.textPrimary.color};
    }
    
    .react-calendar__tile.react-calendar__tile--now.react-calendar__month-view__days__day{
     // color: ${({ theme }) => theme.textPrimary.color};
      //opacity: 1;
    }
    //---------- end  date-time-picker


    .reactEasyCrop_Container{
      top: 24px;
      left: 24px;
      right: 24px;
    }
    
    // ---- trancute text -------
    //----- profile bio 3 lines
    .truncate-bio-full {
        width: 400px; 
        line-height: 1.3;
        max-height: auto; 
        text-align: left;
        cursor: pointer !important; 
    }

    .truncate-bio-3-lines {
        width: 400px;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 1.3; 
        max-height: 75px; 
        -webkit-line-clamp: 3; /* number of lines to show */
        -webkit-box-orient: vertical;
        text-align: left;
        cursor: auto;
    }

    //----- post 4 lines
    .truncate-post-full {
        line-height: 1.3;
        max-height: auto; 
        text-align: left;
        cursor: pointer !important;
    }

    .truncate-post-4-lines {
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 1.3; 
        max-height: 100px;  // 'line-height' multiply 'number of lines to show'
        -webkit-line-clamp: 4; /* number of lines to show */
        -webkit-box-orient: vertical;
        text-align: left;
        cursor: auto; 
        position:relative;
    }

    //------ copy link
    .truncate-copy-link {
        max-width: 450px;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 20px; 
        max-height: 20px;  
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
        text-align: left;
        padding-right: ${SPACING.medium}px;
    }

    //------ collection: a work description
    .truncate-collection-job-title {
        max-width: 350px;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 20px; 
        max-height: 20px;  
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
        text-align: left;

        @media screen and (max-width: 760px){
            max-width: 620px;
        }
    }

     //------ collection: name
     .truncate-collection-name {
        max-width:  185px; 
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-height: 20px; 
        max-height: 20px;  
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;

        @media screen and (max-width: 760px){
            max-width: 380px;
        }
    }

    //------ NFT: address
     .truncate-nft-address {
        max-width:  185px; 
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; 
        line-height: 16px; 
        max-height: 16px;  
        padding-left: 10px;
        padding-right: 10px;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
        font-family: "LatoBlack";

        @media screen and (max-width: 760px){
            max-width: 380px;
        }
    }
    //------- truncate end ----------

    /*think we can get rid of this -- but not sure.. if william doyle (me) added then yes we can.. check git blame*/
    input[type="range"]{
        -webkit-appearance: none;
        width: 100%;
        height: 8px;
        outline: none !important;
        appearance:none;
        border:none;
        border-radius:30px;
    }
    input[type="range"]::-moz-focus-outer {
        border: 0;
    }
    input[type="range"]:hover {
        outline:none;
    }

    .video-js {
        display: flex;
        min-height: 330px//400px;
        background-color: transparent;
        width: 100%;
        height: 100%;

        @media screen and (max-width: 500px){
            width: 100%;
        }
    }

    .modal .video-js {
        width:100%;
    }

    .video-js .vjs-tech {
        //max-width: 400px;
        //min-height: 380px;
        position: relative;
    }

    .vjs-control-bar {
        position: absolute;
        left: 0;
        top: unset;
        right: 0;
        bottom: 0;
        height: auto;
        display: flex !important;
        opacity: 0;
        /* background-color: blue !important; */
        flex-direction: column !important;
        justify-content: center;
        flex-shrink: 0;
        padding: 0 !important;
        background: transparent;
        padding-bottom: 12px !important;
        height: auto !important;
    }

    .vjs-buttonswrap {
        display: flex !important;
        flex: 1 !important;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 !important;
        padding: 0 !important;
        background-color: black !important;
        height: 50px;
        position: relative;
        padding: 0 12px !important;

        height: 50px;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        display: flex !important;
        background: transparent !important;
        /* display: none !important; */
        margin-bottom: 12px !important;

        @media screen and (max-width: 500px){
            width: 100%;
            justify-content: flex-start;
        }
    }

    .video-js .vjs-progress-control {
        width: 100% !important;
        height: 50px;
        background-image: none !important;
        position: absolute;
        bottom: 0;
    }

    .video-js .vjs-play-progress {
        background-image: linear-gradient(to right, ${COLORS.pink}, ${COLORS.red}) !important;
    }

    .video-js .vjs-control {
        background-image: none !important
    }

    .vjs-icon-placeholder:before {
        border-radius: 500px !important;
        background-image: none;
        border-width: 0px !important;
        width: 50px !important;
        opacity: 1  !important;
    }

    .vjs-button > .vjs-icon-placeholder:before {
        background-color: #0000004a;
    }

    .video-js .vjs-picture-in-picture-control {
        display:none;
    }

    .video-js .vjs-progress-control {
        margin:0 !important;
        height:15px !important;
    }

    .vjs-poster {
        width:100%;
        height:100%;
    }

    .vjs-controlswrap {
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
    }

    .vjs-progress-holder {/* needed to have a real 100% width display. */
    margin-left: 2px !important;
    margin-right: 2px !important;
    }

    .vjs-mute-button {
        border-radius: 500px;
        width:50px !important;
        height:50px !important;
    }

    .vjs-play-button {
        border-radius: 500px !important;
        width:50px !important;
        height:50px !important;
    }

    .vjs-control-bar.vjs-control-bar.vjs-control-bar.vjs-control-bar.vjs-control-bar.vjs-control-bar.vjs-control-bar.vjs-control-bar {
    transform: none !important;
    -webkit-transform: none !important;
    -ms-transform: none !important;
    background: transparent;
    }

 //--------------https://github.com/ealush/emoji-picker-react ----------///

  aside.emoji-picker-react {
    background: ${({ theme }) => theme.containerSecondary.color} !important;
    display: flex;
    flex-direction: column;
    height: 500px !important;
    width: 482px!important;
    font-family: sans-serif;
    border: 2px solid ${({ theme }) => theme.borderColor.color} !important;
    border-radius: 5px 5px 0px 0px!important;
    box-sizing: border-box;
    box-shadow: none !important;
    overflow: hidden !important;
    position: relative;
    padding-bottom: 24px !important; 
    z-index: 999999 !important; 
  }

  .emoji-picker-react .emoji-scroll-wrapper {
    overflow-y: scroll;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    overflow: auto !important;
      ::-webkit-scrollbar {
          width: 0px !important;
          background: transparent !important; /* make scrollbar transparent */
          display: none !important;
      }
  }

  .emoji-picker-react .emoji-group:before {
    background:  ${({ theme }) => theme.containerSecondary.color} !important;  
  }

  .emoji-picker-react .emoji-categories {
    background-color: ${COLORS.whiteLight} !important;
    border-radius: 5px 5px 0px 0px !important;
    z-index: 9 !important;
    box-sizing: none !important;
    border-bottom: 2px solid ${({ theme }) =>
      theme.name == "light" ? COLORS.greyButton : COLORS.blackDarkMedium} !important; 
  }
///----------end of: https://github.com/ealush/emoji-picker-react ----------////
  //----------swiperjs
    /**
 * Swiper 6.8.4
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: August 23, 2021
 */
 
@font-face {
  font-family: 'swiper-icons';
  src: url('data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA') format('woff');
  font-weight: 400;
  font-style: normal;
}
:root {
  --swiper-theme-color: ${({ theme }) => theme.textPrimary.color};
}
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  /* Fix of Webkit flickering */
  z-index: 1;
}
.swiper-container-vertical > .swiper-wrapper {
  flex-direction: column;
}
.swiper-wrapper {
  position: relative;
  max-width: 900px;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 1px;
 

  @media screen and (max-width: 991px){
      max-width: 815px !important;
    }

  @media screen and (max-width: 850px){
      max-width: 497px !important;
    }

  @media screen and (max-width: 700px){
      max-width: 360px !important;
    }
}
.swiper-slide.swiper-slide-duplicate.swiper-slide-visible.swiper-slide-prev{
  opacity: 0 !important;
  overflow: hidden !important;
}

.swiper-container-android .swiper-slide,
.swiper-wrapper {
  transform: translate3d(0px, 0, 0);
}
.swiper-container-multirow > .swiper-wrapper {
  flex-wrap: wrap;
}
.swiper-container-multirow-column > .swiper-wrapper {
  flex-wrap: wrap;
  flex-direction: column;
}
.swiper-container-free-mode > .swiper-wrapper {
  transition-timing-function: ease-out;
  margin: 0 auto;
}
.swiper-container-pointer-events {
  touch-action: pan-y;
}
.swiper-container-pointer-events.swiper-container-vertical {
  touch-action: pan-x;
}
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
}
.swiper-slide-invisible-blank {
  visibility: hidden;
}
/* Auto Height */
.swiper-container-autoheight,
.swiper-container-autoheight .swiper-slide {
  height: auto;
}
.swiper-container-autoheight .swiper-wrapper {
  align-items: flex-start;
  transition-property: transform, height;
}
/* 3D Effects */
.swiper-container-3d {
  perspective: 1200px;
}
.swiper-container-3d .swiper-wrapper,
.swiper-container-3d .swiper-slide,
.swiper-container-3d .swiper-slide-shadow-left,
.swiper-container-3d .swiper-slide-shadow-right,
.swiper-container-3d .swiper-slide-shadow-top,
.swiper-container-3d .swiper-slide-shadow-bottom,
.swiper-container-3d .swiper-cube-shadow {
  transform-style: preserve-3d;
}
.swiper-container-3d .swiper-slide-shadow-left,
.swiper-container-3d .swiper-slide-shadow-right,
.swiper-container-3d .swiper-slide-shadow-top,
.swiper-container-3d .swiper-slide-shadow-bottom {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}
.swiper-container-3d .swiper-slide-shadow-left {
  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.swiper-container-3d .swiper-slide-shadow-right {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.swiper-container-3d .swiper-slide-shadow-top {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.swiper-container-3d .swiper-slide-shadow-bottom {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
/* CSS Mode */
.swiper-container-css-mode > .swiper-wrapper {
  overflow: auto;
  scrollbar-width: none;
  /* For Firefox */
  -ms-overflow-style: none;
  /* For Internet Explorer and Edge */
}
.swiper-container-css-mode > .swiper-wrapper::-webkit-scrollbar {
  display: none;
}
.swiper-container-css-mode > .swiper-wrapper > .swiper-slide {
  scroll-snap-align: start start;
}
.swiper-container-horizontal.swiper-container-css-mode > .swiper-wrapper {
  scroll-snap-type: x mandatory;
}
.swiper-container-vertical.swiper-container-css-mode > .swiper-wrapper {
  scroll-snap-type: y mandatory;
}
:root {
  --swiper-navigation-size: 25px;
  /*
  --swiper-navigation-color: var(--swiper-theme-color);
  */
}
.swiper-button-prev,
.swiper-button-next {
  position: inherit;
  top: 0;
  width: 60px;
  height: 50px;
  margin-top: auto;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color:  ${({ theme }) => theme.iconColor.color};
  //border: 2px solid ${COLORS.purple};
  background: ${({ theme }) => theme.containerSecondary.color};
  border-radius: 5px;
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0.35;
  cursor: auto;
  pointer-events: none;
}
.swiper-button-prev:after,
.swiper-button-next:after {
  font-family: swiper-icons;
  font-size: var(--swiper-navigation-size);
  font-weight: 900;
  text-transform: none !important;
  letter-spacing: 0;
  text-transform: none;
  font-variant: initial;
  line-height: 1;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  position: initial;
  left: 24px;
  right: auto;
}
.swiper-button-prev:after,
.swiper-container-rtl .swiper-button-next:after {
  content: 'prev';
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  position: initial;
  right: 140px;
  left: auto;
}
.swiper-button-next:after,
.swiper-container-rtl .swiper-button-prev:after {
  content: 'next';
}
.swiper-button-prev.swiper-button-white,
.swiper-button-next.swiper-button-white {
  --swiper-navigation-color: #ffffff;
}
.swiper-button-prev.swiper-button-black,
.swiper-button-next.swiper-button-black {
  --swiper-navigation-color: #000000;
}
.swiper-button-lock {
  display: none;
}
:root {
  /*
  --swiper-pagination-color: var(--swiper-theme-color);
  */
}
.swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 300ms opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
}
.swiper-pagination.swiper-pagination-hidden {
  opacity: 0;
}
/* Common Styles */
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 10px;
  left: 0;
  width: 100%;
}
/* Bullets */
.swiper-pagination-bullets-dynamic {
  overflow: hidden;
  font-size: 0;
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transform: scale(0.33);
  position: relative;
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
  transform: scale(1);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {
  transform: scale(1);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
  transform: scale(0.66);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
  transform: scale(0.33);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {
  transform: scale(0.66);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {
  transform: scale(0.33);
}
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  background: #000;
  opacity: 0.2;
}
button.swiper-pagination-bullet {
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  -webkit-appearance: none;
          appearance: none;
}
.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: pointer;
}
.swiper-pagination-bullet:only-child {
  display: none !important;
}
.swiper-pagination-bullet-active {
  opacity: 1;
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
}
.swiper-container-vertical > .swiper-pagination-bullets {
  right: 10px;
  top: 50%;
  transform: translate3d(0px, -50%, 0);
}
.swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 6px 0;
  display: block;
}
.swiper-container-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
}
.swiper-container-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  display: inline-block;
  transition: 200ms transform, 200ms top;
}
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 4px;
}
.swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
.swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transition: 200ms transform, 200ms left;
}
.swiper-container-horizontal.swiper-container-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transition: 200ms transform, 200ms right;
}
/* Progress */
.swiper-pagination-progressbar {
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
}
.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transform-origin: left top;
}
.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  transform-origin: right top;
}
.swiper-container-horizontal > .swiper-pagination-progressbar,
.swiper-container-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
  width: 100%;
  height: 4px;
  left: 0;
  top: 0;
}
.swiper-container-vertical > .swiper-pagination-progressbar,
.swiper-container-horizontal > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
  width: 4px;
  height: 100%;
  left: 0;
  top: 0;
}
.swiper-pagination-white {
  --swiper-pagination-color: #ffffff;
}
.swiper-pagination-black {
  --swiper-pagination-color: #000000;
}
.swiper-pagination-lock {
  display: none;
}
/* Scrollbar */
.swiper-scrollbar {
  border-radius: 10px;
  position: relative;
  -ms-touch-action: none;
  background: rgba(0, 0, 0, 0.1);
}
.swiper-container-horizontal > .swiper-scrollbar {
  position: absolute;
  left: 1%;
  bottom: 3px;
  z-index: 50;
  height: 5px;
  width: 98%;
}
.swiper-container-vertical > .swiper-scrollbar {
  position: absolute;
  right: 3px;
  top: 1%;
  z-index: 50;
  width: 5px;
  height: 98%;
}
.swiper-scrollbar-drag {
  height: 100%;
  width: 100%;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  left: 0;
  top: 0;
}
.swiper-scrollbar-cursor-drag {
  cursor: move;
}
.swiper-scrollbar-lock {
  display: none;
}
.swiper-zoom-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.swiper-zoom-container > img,
.swiper-zoom-container > svg,
.swiper-zoom-container > canvas {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.swiper-slide-zoomed {
  cursor: move;
}
/* Preloader */
:root {
  /*
  --swiper-preloader-color: var(--swiper-theme-color);
  */
}
.swiper-lazy-preloader {
  width: 42px;
  height: 42px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -21px;
  margin-top: -21px;
  z-index: 10;
  transform-origin: 50%;
  animation: swiper-preloader-spin 1s infinite linear;
  box-sizing: border-box;
  border: 4px solid var(--swiper-preloader-color, var(--swiper-theme-color));
  border-radius: 50%;
  border-top-color: transparent;
}
.swiper-lazy-preloader-white {
  --swiper-preloader-color: #fff;
}
.swiper-lazy-preloader-black {
  --swiper-preloader-color: #000;
}
@keyframes swiper-preloader-spin {
  100% {
    transform: rotate(360deg);
  }
}
/* a11y */
.swiper-container .swiper-notification {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  opacity: 0;
  z-index: -1000;
}
.swiper-container-fade.swiper-container-free-mode .swiper-slide {
  transition-timing-function: ease-out;
}
.swiper-container-fade .swiper-slide {
  pointer-events: none;
  transition-property: opacity;
}
.swiper-container-fade .swiper-slide .swiper-slide {
  pointer-events: none;
}
.swiper-container-fade .swiper-slide-active,
.swiper-container-fade .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}
.swiper-container-cube {
  overflow: visible;
}
.swiper-container-cube .swiper-slide {
  pointer-events: none;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  z-index: 1;
  visibility: hidden;
  transform-origin: 0 0;
  width: 100%;
  height: 100%;
}
.swiper-container-cube .swiper-slide .swiper-slide {
  pointer-events: none;
}
.swiper-container-cube.swiper-container-rtl .swiper-slide {
  transform-origin: 100% 0;
}
.swiper-container-cube .swiper-slide-active,
.swiper-container-cube .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}
.swiper-container-cube .swiper-slide-active,
.swiper-container-cube .swiper-slide-next,
.swiper-container-cube .swiper-slide-prev,
.swiper-container-cube .swiper-slide-next + .swiper-slide {
  pointer-events: auto;
  visibility: visible;
}
//added new classes, (Natalia Jan 12, 2022)
/*.swiper-slide-duplicate-active,
.swiper-slide-duplicate-next,
.swiper-slide-duplicate-prev{
  opacity: 0 !important;
  overflow: hidden !important;
}

.swiper-slide-prev{
  transform: translateX(10%) scale(0.8) rotateX(0deg) rotateY(0deg)!important;
  z-index: 14 !important;
  opacity: 0.8 !important;
}
.swiper-slide-next{
  transform: translateX(2%) scale(0.8) rotateX(0deg) rotateY(0deg)!important;
  z-index: 14 !important;
  opacity: 0.8 !important;
} 

.swiper-slide-active {
  width: 200px !important;
  z-index: 15 !important;
  opacity: 1 !important;
  transform: translateX(5%)  !important;
}*/}

.swiper-slide-duplicate-active,
.swiper-slide-duplicate-next{
  opacity: 0 !important;
  overflow: hidden !important;
}
// end new css classes




.swiper-container-cube .swiper-slide-shadow-top,
.swiper-container-cube .swiper-slide-shadow-bottom,
.swiper-container-cube .swiper-slide-shadow-left,
.swiper-container-cube .swiper-slide-shadow-right {
  z-index: 0;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
.swiper-container-cube .swiper-cube-shadow {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  z-index: 0;
}
.swiper-container-cube .swiper-cube-shadow:before {
  content: '';
  background: #000;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  filter: blur(50px);
}
.swiper-container-flip {
  overflow: visible;
}
.swiper-container-flip .swiper-slide {
  pointer-events: none;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  z-index: 1;
}
.swiper-container-flip .swiper-slide .swiper-slide {
  pointer-events: none;
}
.swiper-container-flip .swiper-slide-active,
.swiper-container-flip .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}
.swiper-container-flip .swiper-slide-shadow-top,
.swiper-container-flip .swiper-slide-shadow-bottom,
.swiper-container-flip .swiper-slide-shadow-left,
.swiper-container-flip .swiper-slide-shadow-right {
  z-index: 0;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}

       
    
    /**------carousel end (swiperjs)--------- */

`;
//https://player.support.brightcove.com/styling/customizing-player-appearance.html

// https://docs.videojs.com/index.html
// `

//  .vjs-control , .vjs-progress-control, .vjs-progress-holder {
//     width: 100% !important;
// }



//  .vjs-play-progress {
//     background-image: linear-gradient(to right, ${COLORS.pink}, orange) !important;
//     border-width: 3px;
//     border-color: red;
// }


//  .vjs-slider-bar {
//     border-width: 3px;
//     border-color: pink;
//     background-image: linear-gradient(to right, ${COLORS.green}, blue) !important;
//  }




// .vjs-slider-bar {



// .vjs-progress-holder .vjs-slider .vjs-slider-horizontal
//  .vjs-scrubber {
//     background-image: linear-gradient(to right, ${COLORS.pink}, orange) !important;
// }






//  .vjs-clickthrough{
//     display: flex !important;
//     flex-direction: column !important;
//     flex: 1 !important;
//     background-color: #904 !important;
//     background-image: linear-gradient(to right, ${COLORS.pink}, orange)  !important;
// }


// .vjs-wrap {
//     display: flex !important;
//     flex-direction: column !important;
//     background-image: linear-gradient(to right, ${COLORS.pink}, green)  !important;
// }

// .video-js {
//     display: flex !important;
//     flex: 1;
//     flex-direction: column !important;
//     justify-content: flex-end !important;

//     background-image: linear-gradient(to right, ${COLORS.pink}, blue)  !important;
// }
// `

export const NavContainer = styled.div`
  display: flex;
  z-index: 1;
  width: 100%;
  max-width: 1290px;
  margin-right: auto;
  margin-left: auto;
  flex-direction: row;
  padding-right: ${SPACING.large}px;
  padding-left: ${SPACING.large}px;

    @media screen and (max-width: 515px){
        padding-right: ${SPACING.medium}px;
        padding-left: ${SPACING.medium}px;
    }
`;

export const MainAppContainer = styled.div`
  display: flex;
  z-index: 1;
  width: 100%;
  //max-width: ${(props) => (props.fullWidthPage ? "100%" : "1920px")};
  margin-right: auto;
  margin-left: auto;
  flex-direction: ${(props) =>
    props.horizontalNavMenuVisible ? "column" : "row"};

  @media screen and (max-width: 1190px) {
    width: 100%;
    max-width: ${props=> props.fullWidthPage ? "100%" : "1190px"};  
    margin-right: auto;
    margin-left: auto;
    flex-direction: ${props=> props.horizontalNavMenuVisible ? "column" : "row"};

    @media screen and (max-width: 1190px){
      width:100%;
    }

    @media screen and (max-width: 820px){
        padding-right: 0px;
        padding-left: 0px;
        width: 100%;
    }

    @media screen and (max-width: 700px){
        padding-right: 0px;
        padding-left: 0px;
    }
`;

export const Container = styled.div`
  display: flex;
  display: flex;
  z-index: 1;
  flex-direction: row;
  position: relative;
  width: 100%;
  min-width: 0;
  justify-content: center;

  @media screen and (max-width: 991px) {
    display: flex;
    z-index: 1;
    flex-direction: row;
    position: relative;
    width:100%;
    min-width: 0;
    justify-content: center;

    @media screen and (max-width: 991px){
        display: flex;
        max-width: 991px;
       // overflow: hidden;
    } 
`;

export const ContainerSearch = styled.div`
    display: flex;
    z-index: 1;
    flex-direction: row;
    position: relative;
    width:100%;
    min-width: 0;

    @media screen and (max-width: 991px){
        display: flex;
        max-width: 991px;
        flex-direction: column;
        overflow: hidden;
    } 
`;

export const MiddleFullContainerSearch = styled.div`
    display: flex;
    flex: 1;
    z-index: 99;
    flex-direction:column;
    //border-right: 1px solid ${({ theme }) => theme.borderColor.color};
    //border-left: 1px solid ${({ theme }) => theme.borderColor.color};
    max-width: 900px;
    width: 100%;
      
    @media screen and (max-width: 940px){
      width:100%;
    }

    @media screen and (max-width: 700px){
      max-width: 700px;
      margin-top: 70px;
      border-right:  0px solid transparent;
      border-left:  0px solid transparent;
      padding-top: ${SPACING.medium}px;
    }

    @media screen and (max-width: 420px){
      max-width: 420px;
      margin-top: 70px;
      padding-left: 0px;
      padding-right: 0px;
      border-right:  0px solid transparent;
      border-left:  0px solid transparent;
      border-top: 1px solid ${({ theme }) => theme.borderColor.color};
      padding-top: ${SPACING.medium}px;
    }
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 900px;
  flex-direction: column;
  z-index: 9999;
  align-items: center;

    @media screen and (max-width: 700px){
        margin-top: 70px;
    }

    @media screen and (max-width: 420px){
        margin-top: 70px;
    }
`;

export const FullContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.borderColor.color};
  border-right: 1px solid ${({ theme }) => theme.borderColor.color};
`;

export const MiddleFullContainer = styled.div`
  display: flex;
  flex: 1;
  z-index: 99;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.borderColor.color};
  //border-left: 1px solid ${({ theme }) => theme.borderColor.color};
  width: 100%;

    @media screen and (max-width: 700px){
      max-width: 700px;
      margin-top: 70px;
      padding-top: ${SPACING.medium}px;
    }

    @media screen and (max-width: 420px){
      max-width: 420px;
      margin-top: 70px;
      padding-left: 0px;
      padding-right: 0px;
      border-top: 1px solid ${({ theme }) => theme.borderColor.color};
      padding-top: ${SPACING.medium}px;
    }
`;
export const MiddleFullContainerChat = styled.div`
  display: flex;
  display: flex;
  overflow: hidden;
  flex: 1;
  z-index: 99;

    @media screen and (max-width: 700px){
      display:flex;
      overflow: hidden;
      flex: 1;
      flex-direction:column;
    } 
`;

export const RightContainer = styled.div`
  display: flex;
  z-index: 1;
  display: flex;
  width: 100%;
  width: 324px;
  flex-direction: column;
  position: sticky;
  padding-top: ${SPACING.large}px;
  padding-left: ${SPACING.large}px;
  padding-bottom: ${SPACING.large}px;
  margin-right: ${SPACING.large}px;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  // z-index:9999999; //this high z-index blocks useOnClickOutside() working in RightContainer

    @media screen and (max-width: 991px){
        display:none;
    }
`;

export const RightNarrowContainer = styled.div`
  display: flex;
  display: flex;
  width: 100%;
  max-width: 100px;
  flex-direction: column;
  position: sticky;
  padding-left: ${SPACING.small}px;
  z-index: 1;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;

    @media screen and (max-width: 1180px){
        display:none;
    }
`;

export const RightContainerInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 324px;
  justify-content: flex-start;
  flex-direction: column;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  z-index: 1;
  position: fixed;
  top: 0px;
  bottom: 0px;
  width: 100%;
  padding-top: 20px;
  /* max-width: 80px; */
  overflow: hidden scroll;
  overscroll-behavior-y: contain;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  overflow: hidden;
  padding-right: 24px;
  overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    };

    @media screen and (max-width: 991px){
        display:none;
    }
`;

export const RightNarrowContainerInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 100px;
  justify-content: flex-start;
  flex-direction: column;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */

    position: fixed;
    top: 0px;
    bottom: 0px;
    width: 100%;
    padding-top: 12px;
    overflow: hidden scroll;
    overscroll-behavior-y: contain;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: flex-start;
    -webkit-box-align: flex-start;
    -ms-flex-align: flex-start;
    align-items: flex-start;
    overflow: hidden;
   // padding-right: 24px;
    overflow-y: scroll;
    z-index: 0;

    ::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    };

    @media screen and (max-width: 991px){
        display:none;
    }
`;

// export const RightNarrowContainerInner = styled.div`
//     width: 100%;
//     height: 100%;
//     max-width: 150px;
//     justify-content: flex-start;
//     flex-direction: column;
//     overflow-y: scroll;
//     overscroll-behavior-y: contain;
//     -ms-overflow-style: none; /* for Internet Explorer, Edge */
//     scrollbar-width: none; /* for Firefox */

//     ::-webkit-scrollbar {
//         display: none; /* for Chrome, Safari, and Opera */
//     };

//     @media screen and (max-width: 991px){
//         display:none;
//     }
// `;

export const ContainerBlur = styled.div`
    z-index: 999;
    width: 100%;
    height:100%;
    flex-direction: row;
    padding-right: ${SPACING.large}px;
    padding-left: ${SPACING.large}px;
    position:absolute;
    top:0;
    background-color:#0d10178c;
`;

export const SingleBarCenter = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 600px;
    margin:0 auto;
    flex-direction:column;
    padding-top:${SPACING.large}px;

    @media screen and (max-width: 480px){
        padding-top:0;
    }
`;

export const SideBarLeft = styled.div`
    z-index: 1;
    display: flex; 
   width: 100%;
    max-width: 324px;
    flex-direction: column;
    padding-top:${SPACING.large}px;
    padding-left: ${SPACING.large}px;
    padding-bottom: ${SPACING.large}px;
    position: sticky;
    top: ${SPACING.large}px;
    z-index: 9;
    height: 100vh; 
    overflow: auto;

    @media screen and (max-width: 991px){
        display:none;
    }
`;

export const SideBarLeftInner = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    padding-top: ${SPACING.large}px;
    width: 100%;
    max-width: 324px;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    display: block;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    ::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    };

    @media screen and (max-width: 991px){
        display:none;
    }
`;

export const SideBarLeftBlock = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    flex-shrink: 0;

    @media screen and (max-width: 991px){
        display:none;
    }
`;


export const SideBarRight = styled.div`
    display: flex;
    z-index: 1;
    width: 100%;
    max-width: 860px;
    flex-direction:column;
    padding-top: ${SPACING.large}px;
    padding-left: ${SPACING.large}px;
    padding-right: ${SPACING.large}px;
    border-right: 3px solid ${({ theme }) => theme.borderColor.color};


    @media screen and (max-width: 515px){
       width: 100%;
        min-width: 320px;
        z-index: 1;
    }
`;

export const SideBarRightWallet = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 788px;
    flex-direction:column;
    padding-top:${SPACING.large + 100}px;

    @media screen and (max-width: 515px){
        width: 100%;
        min-width: 320px;
        z-index: 1;
    }
`;

export const Icon = styled.img`
    height: 30px;
    width: 30px;
`;

export const GradientButton = styled.button`
    border-radius: 5px;
    background-image: linear-gradient(to right, #EA42D1, #C9324D);
    white-space: nowrap;
    padding: ${SPACING.medium}px;
    color: #fff;
    font-size: ${FONT_SIZE.small}px;
    outline: none;
    border: none;
    cursor: pointer;
    font-family: 'LatoBlack';
    width: 100%;
 
    &:hover {
        transition: all 0.3s ease-out;
        background: ${({ theme }) => theme.textPrimary.color};
        background: ${({ primary }) => (primary ? '#D2344D' : '#FF3B98')};
    } 

`;

export const ChatListContainer = styled.div`
  display: flex;
  display: flex;
  height: 100vh;
  width: 300px;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0px;
      background: transparent; /* make scrollbar transparent */
      display: none; /* for Chrome, Safari, and Opera */
    }
    @media screen and (max-width: 700px){
      display: none;
    } 
  `;
export const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-left: 1px solid ${({ theme }) => theme.borderColor.color};
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  overflow: clip;
  flex: 8;

    @media screen and (max-width: 700px){

    }
`;

export const SmallWindowSize = styled.div`
display: flex;
      display: flex;
      width: 100%;
      height: 60px; 
      align-items: center;
      overflow-y: hidden;
      margin-top: 70px;
    }  
`;


export default GlobalStyle