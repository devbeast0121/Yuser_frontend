import { action, observable, computed, runInAction, makeAutoObservable, toJS } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
import client from '../pages/api/client';
import { FEED_TYPES } from '../components/NavFeed/NavFeed.js'
import { CookieStorage } from "cookie-storage";
import LocalPosts from './LocalPosts';
import Loader from '../pages/api/posts';
import { spliceString } from './tools';
import { abi } from "../public/data/nextGemABI.json";
import { ethers } from 'ethers';
import { abi as txABI } from '../public/data/txContractABI.json'
import { abi as wmovrAbi } from '../public/data/wmovrAbi.json'
import { abi as marketAbi } from '../public/data/marketAbi.json'
import { abi as vamprAbi } from "../public/data/vamprAbi.json";
import { abi as legendsPrebuyAbi } from '../public/data/legendsPrebuyAbi.json';
import Cookie from "js-cookie";
import GiftingStateModel from './GiftingStateModel';
import { observer } from 'mobx-react-lite';
import CommentsMaster from './CommentsMaster';
import { nanoid } from 'nanoid';
import { SERVER_URL } from '../util/server_url';


// import { formatEther, parseEther } from '@ethersproject/units';
const cookieStorage = new CookieStorage();


/*     

          ********NOTE********
  SERVER_URL is now located in util/server_url.js

*/

const txContractABI = txABI
//export const CLIENT_SIDE_URL = `https://yuser-network-web-dne2aw52ea-uk.a.run.app`
export const CLIENT_SIDE_URL = `https://yuser.co`;

//export const CHAIN_ID = "0x507"; //Moonbase

export const CHAIN_ID = "0x505"; //Moonriver

//Contract address object
const ContractAddressObj = {
  //Moonbase Contract Addresses
  "0x507":{
      legendsOfEAPrebuyContract:"0x17833D94f5C75990F0C3A20929aA9E2b99987E9a",
      WMOVRContractAddress:"0x90a642047e790188B7e748d5E1BDB9A021c6406D"
  },
  //Moonriver Contract Addresses
  "0x505":{
    legendsOfEAPrebuyContract:"",
    WMOVRContractAddress:"0x98878B06940aE243284CA214f92Bb71a2b032B8A"
  }
}



const contractAddressObject = {
  "0x507":{
    //Moonbase Addresses
    vamprContractAddress:"0xbD2573623D4A818D7158Dc159F23AB3379Cffbd6",
    NextGemContractAddress:"0xaB150D32733E9c39b5a176A6d5a697ceeF6933eF"
  },
  "0x505":{
    //Moonriver addresses
    vamprContractAddress:"",
    NextGemContractAddress:"0xc433f820467107bc5176b95f3a58248C4332F8DE"

  } 
}





enableStaticRendering(typeof window === 'undefined');

let store;

export default class RootStore {
  API_VERSION = 5; // represents which server functions are supported by the client

  @observable localGiftingState = new GiftingStateModel();
  @observable commentsMaster = new CommentsMaster();

  constructor() {
    makeAutoObservable(this);
    // To update the message list
      client.service("messages").on(
        "created",
        action(async(message) => {
          if (message.roomId === this.roomId) {
          runInAction(() => {
              this.messages = [message].concat(this.messages);      
            })
            const roomIndex = this.chatRoomList.findIndex(
              chatroom => chatroom.roomId === message.roomId
            )
            if (roomIndex !== -1) {
              await client
                .service("user-rooms")
                .patch(this.chatRoomList[roomIndex]._id, {
                  lastRead: message.createdAt,
                });
               
            }
          }
        })
      );
  
  }

  @observable userPosts = []
  @observable _userPosts = []
  @observable authUser = {}; // authenticated user
  @observable trendfeed = []
  @observable showLoginModal = false;
  @observable feedType = FEED_TYPES.HOT
  @observable localPosts = LocalPosts.getInstance();
  @observable selectedPost = undefined;
  @observable changeComment = false;
  @observable dictionaryArray = [];
  @observable postModalVisible = false;

  // web3 observables
  @observable showStayModal = false
  @observable wallets = []; // doesn't do anything yet, but will be used to store the users wallets
  @observable metamaskConnected = false;
  @observable chainIdAlert = false
  @observable connectedChainId = null;
  @observable connectedWallet = null;
  @observable transactionHash = null;
  @observable txFailed = false;
  @observable CHAIN_ID = CHAIN_ID;
  @observable showLoader = false;
  @observable commentsList = [];
  @observable fetchMoreHot = true;
  @observable fetchMoreMe = true;
  @observable fetchMoreProfile = true;
  //Mobx variables for chat related stuff
  @observable chatRoomList =[];
  @observable endOfChatroomsReached= false;
  @observable roomId = null;
  @observable messages =[];
  @observable CHAT_MESSAGE_LIMIT = 25; //the number of chat messages to pull per query
  @observable messageOffset= 0;
  @observable chatListOffset=0;
  @observable selectedChat=null;
  @observable chatMembers=[];
  @observable startEditingMessage = false;
  @observable privateChatId= null;
  @observable privateChatlist=[]
  @observable selectedRoomId =null
  @observable editMessageText = null
  @observable updateMessage = false
  @observable mutualFollowers=[]
  @observable  MUTUALS_LIST_LIMIT = 20;
  

  //Transaction overlays observables
  @observable txConfirmOverlayVisible = false;
  @observable txPendingOverlayVisible = false;
  @observable txSuccessOverlayVisible = false;
  @observable txFailedOverlayVisible = false;
  @observable txCancelledOverlayVisible = false;
  @observable metamaskOverlayVisible = false;
  @observable wrapMovrOverlayVisible = false;
  @observable failedTxMessage = "Your transaction failed.";

  //Market Confirmation Overlays
  @observable listingConfirmationVisible = false;
  @observable purchaseConfirmationVisible = false;

  //Overlay Observables
  @observable errMessage = null; //When given a string value the error component will display with the given string
  @observable successMessage = null; //When given a string value the success component will display with the given string
  @observable showBanOverlay = false;


  //Contract Addresses
  @observable wMovrAddr = ContractAddressObj[CHAIN_ID].WMOVRContractAddress;
  @observable ngContractAddrMoonriver = "0xc433f820467107bc5176b95f3a58248C4332F8DE";
  @observable vamprContractAddress  = contractAddressObject[CHAIN_ID]?.vamprContractAddress;
  @observable legendsOfEAPrebuyContractAddress = ContractAddressObj[CHAIN_ID].legendsOfEAPrebuyContract;

  //MOONBASE ALPHA ADDRESSES
  // @observable txContractTestAddr = "0xB33213f4726aA9Ef80Ea3580146b377E01587E82";
  // @observable wDevAddr = "0x90a642047e790188B7e748d5E1BDB9A021c6406D";
  // @observable marketplaceContractAddr = "0xEEc874F2A9f79e8eB08BfF83B69AD554DaeCa0f4";
  // @observable testaddr = "0xaB150D32733E9c39b5a176A6d5a697ceeF6933eF";



  //MAIN NET CONTRACT ADDRESSES
  @observable txContractTestAddr = "0x09E74b4c92Cc6CcB30FA31Ad6B8dA6EBF90377b3"
  @observable wDevAddr = "0x98878B06940aE243284CA214f92Bb71a2b032B8A";
  @observable marketplaceContractAddr = "0xfd099f63Ee9d06B171189EcA22E1A1895DDc56F2";
  @observable testaddr = "0xc433f820467107bc5176b95f3a58248C4332F8DE";



  //RPC ENDPOINTS
  @observable moonriverRPCEndpoint = "https://moonriver.api.onfinality.io/rpc?apikey=ec967d6d-83cc-461f-8a70-ab7af4d6611d"
  @observable moonbaseAlphaRPCEndpoint = "https://moonbeam-alpha.api.onfinality.io/rpc?apikey=ec967d6d-83cc-461f-8a70-ab7af4d6611d"

  //SEARCH
  DAY_TIMEFRAME = 24 * 60 * 60 * 1000; // Find all messages within the last day
  WEEK_TIMEFRAME = 7 * 24 * 60 * 60 * 1000; // Find all messages within the last wee
  SEARCH_LIMIT = 20; //the item limit for elasticsearch queries
  AUTO_COMPLETE_SEARCH_LIMIT = 6; // the search results limit for auto complete feature
  @observable searchTerm= "";
  @observable mobSearchPosts=[];
  @observable mobSearchUsers=[];

  // set the connected wallet address
  @action setConnectedWallet(address) {
    this.connectedWallet = address;
  }

  // set the connected chain id
  @action setConnectedChainId(chainId) {
    this.connectedChainId = chainId;
  }

  // Get the wallets from the user and store it in the store
  @action setWallets(address) {
    this.wallets.push(address);
  }



  /**
   *  isInBrowser()
   *  getter
   *  true when server side rendering is finsihed and currently executed in users browser
   *  William Doyle
   *  before Aug 26th 2021
   * */
  @computed get isInBrowser() {
    return typeof window !== 'undefined';
  }

  /**
   * 
   * */
  @action async initLocalPosts() {
    await Loader.LoadMe();
    await Loader.LoadHot(false, false);
    //await Loader.LoadHotMe();
  }

  /*
    setFeedType()
    Used in NavFeed.js
    William Doyle
    July 20th 2021
  */
  @action setFeedType(feedType) {
    // check that its valid
    if (Object.values(FEED_TYPES).includes(feedType)) {
      if (feedType === FEED_TYPES.ME){
        Loader.LoadMe();  // if changing to me feed, make sure posts get loaded
      }
      if(feedType===FEED_TYPES.HOT ||feedType===FEED_TYPES.ME){
        cookieStorage.setItem('FEEDTYPE', feedType); //setting every feedtype
      }
      this.feedType = feedType;
      return;
    }
    throw new Error(`Unknown feed type "${feedType}" passed to @action setFeedType() please use FEED_TYPES exported from NavFeed.js`);
  }

  @action setMetamaskConnected(isConnected) {
    if (isConnected === true) {
      this.metamaskConnected = true
    }
    else {
      this.metamaskConnected = false
    }
  }



  async getUser(userId) {
    return client.service('users').get(userId);
  }

  /**
   *  feedposts()
   *  getter: gets the posts of the currently active feed
   *  William Doyle
   *  Before Aug 25th 2021
   * */
  @computed({ keepAlive: true }) get feedposts() {
    switch (this.feedType) {
      case FEED_TYPES.HOT:
        return LocalPosts.getInstance().posts_hot;
      case FEED_TYPES.ME:
        return LocalPosts.getInstance().posts_me;
      case FEED_TYPES.PROFILE:
        return LocalPosts.getInstance().posts_profile;
      case FEED_TYPES.SINGLE:
        return LocalPosts.getInstance().posts_single;
      default:
        console.warn(`🙃 feedposts case not accounted for`);
        return [];
    };
  }

  /**
   * 
   * */
  @action async setSelectedPost(_post) {

    await Loader.LoadComments(_post._id);
    this.selectedPost = _post;
  }

  async userGeneratedContentFromId(ugc_id) {
    // return an object (a post or a comment) with a matching id to the ugc_id
    // will need to create a service for this:
    // something like this:
    //              MATCH (anything) WHERE anything.id = ugc_id OR id(anything) = ugc_id LIMIT 1 RETURN anything AS USER_GENERATED_CONTENT
    // return {}
  }

  @action async updateLocalGiftingState(recipientId, postId, stones) {
    if(!this.authUser?._id){
      let user = await this.getAuthUser();
      if(!user?._id){
        return;
      }
    }
    if (!this.localGiftingState.has(postId)) {
      const { gifted } = await (async () => {
         if (this.commentsMaster.hasComment(postId)) 
            return this.commentsMaster.getComment(postId);
        return await this.getSpecifiedPost(postId); 
      })();
      // console.log(`amount previously gifted --> `, gifted);
      this.localGiftingState.maybeAddContent(postId, gifted);
    }
    this.localGiftingState.addGift(postId, stones);
  }

  /**
   * Major rework: {
   *  date: March 2022,
   *  author: William Doyle,
   *  purpose: simplify local state management of gifting,
   * } 
   * */
  @action async giftStonesAndUpdateLocal(recipientId, postId, stones) {
    // if (!this.localGiftingState.has(postId)) {
    //   const { gifted } = await this.getSpecifiedPost(postId)
    //   console.log(`amount previously gifted --> `, gifted);
    //   this.localGiftingState.maybeAddContent(postId, gifted);
    // }
    // this.localGiftingState.addGift(postId, stones);
    await this.updateLocalGiftingState(recipientId, postId, stones);
    // this.localPosts?.setGifted(postId, stones);     
    this._giftStones(recipientId, postId, stones); // update database
  }

  /*
    local_gifting_state_has
    William Doyle
    March 21st 2022
    call this.localGiftingState.has
  */
  @observer local_gifting_state_has(postId) {
    const known_misuses_of_id_system = ['banner'];
    if (known_misuses_of_id_system.includes(postId)) {
      // prevent inelegent hijackings of the id system from entering my sacred system and imediatly throwing a type errer
      return false;
    }
    return this.localGiftingState.has(postId);
  }

  /*
    William Doyle
    March 21st 2022
  */
  @observer local_gifting_state_get(postId) {
    return this.localGiftingState.getAmountGifted(postId);
  }

  /**
   * Gifting the posts
   * */
  async _giftStones(recipientId, postId, stones) {
    const { user } = await client.reAuthenticate();
    //console.log(postId);
    await client
      .service('gifting')
      .create({
        gifterId: user._id,
        recipientId: recipientId,
        postId: postId,
        stones: stones,
      })
      .then((result, err) => {
        if (err)
          alert(`An error occured while gifting -> ${JSON.stringify(err)}`);
        else{

        }
          //console.log(`gifted ${stones} gems to ${recipientId}`);
      }).catch(e => {
        // THIS CATCH BLOCK SHOULD BE IMPROVED LATER!!!
        // IDEALLY THE SERVER WILL THROW A SPECIFIC TYPE OF ERROR SO I DON'T HAVE TO
        // LOGICALLY DEPEND ON THE VALUE OF THE MESSAGE. THIS, AS IT IS NOW, WILL
        // CAUSE PROBLEMS WHEN WE TRANSLATE THE APP TO ANOTHER LANGUAGE...
        // ::REMOVE THIS COMMENT WHEN NO LONGER RELEVENT::
        // WILLIAM DOYLE -- JULY 19th 2021
        if (e.message.includes(`You gift a post more than 2000 gems`))
          alert(e.message);
        else
          console.log(`error was ${JSON.stringify(e)}`);
      });
  }

  /*
    getAuthUser()
    get the current user as a notmal javascript object
    July 20th 2021
    William Doyle
  */
  async getAuthUser() {
    try {
      // WDD: I still maintain that try/catch sucks but for now here it is :: fix and if cannot remove dumb comment --wdd (older me)
      const { user } = await client.reAuthenticate();
     // return toJS(user); // please make sure toJS() is used correctly here --wdd aug 4th 2021 :: remove comment when checked
     let JsUser = toJS(user); // please make sure toJS() is used correctly here --wdd aug 4th 2021 :: remove comment when checked
      runInAction(()=>{
        if(!this.authUser?._id){
          this.authUser = JsUser;
        }
      })
      return JsUser;
    }
    catch (e) {
      //console.warn(`no user could be found`);
      return undefined;
    }
  }

  /**
   * 
   * */
  @action async addComment(parentPostId, text, parentCommentId) {
    const comment = await this._addComment(parentPostId, text, parentCommentId);
    this.localPosts.addComment(parentPostId, { text, user: await this.getAuthUser() });
    return comment
  }

  /**
   * 
   * */
  async _addComment(parentPostId, text, parentCommentId) {
    return client
      .service('comments')
      .create({ parentPostId, parentCommentId, text })
      .then(comment => {
        runInAction(() => {
          this.changeComment = true;         // sets the auth user variable
        })
        //console.log('New comment has been created _id: ' + comment._id);
        return comment;
      });
  }
//Commenting out the unwanted changes for batch system to master
  // async makePostUsingBatchSystemInterface() {
  //   const { user } = await client.reAuthenticate();

  //   await client.service('randompost').create({});
    
  // }

  /**
   * 
   * */
  @action async giftComment(comment, stones) {

    // console.log(`stub: inside rootstore.giftComment()`);

    if (this.selectedPost === undefined) {
      console.error(`selected post is undefined`);
      return;
    }

    // this.localPosts.giftComment(comment, stones);
    await this.updateLocalGiftingState(comment.userId, comment._id, stones);

    const status = await this._giftComment(comment.userId, comment._id, stones, this.selectedPost._id);
    runInAction(() => {
      this.changeComment = true;         // sets the auth user variable
    })
    return status;
  }

  /**
   * 
   * */
  async _giftComment(recipientId, commentID, stones, parentPostID) {
    if (recipientId === (await this.getAuthUser())._id) {
      alert(`You may not gift yourself`);
      return -1;
    }
    const authID = (await this.getAuthUser())?._id;
    //console.log(`%c authId is ${authID}`, `color: green`)
    await client
      .service('gift-comment')
      .create({
        gifterId: authID,
        recipientId: recipientId,
        commentID: commentID,
        stones: stones,
        parentPostID: parentPostID,
      })
      .then(result => {
        // console.log(`Result of service "gift-comments.find()" is `);
        // console.log(result);
      });
  }
  /**
   * To get the logged in user's posts posts
   * 
   * */
  async getUserPosts(amountToSkip = 0) {
    try {
      const { user } = await client.reAuthenticate();
      runInAction(() => {
        this.authUser = user;         // sets the auth user variable
      })
      if (!this.authUser._id) {
        throw new Error('[getUserPosts()] No user specified.');
      }
      this.userPosts = await client.service('posts-db').find({
        query: {
          $limit: 12,
          $skip: amountToSkip,
          userId: this.authUser._id,
          deletedAt: null,
          userPosts: 'userPosts',
          $sort: {
            _id: -1,
          },
        },
      });
      return null
    } catch (error) {
      // catching an error to log it and throw null?? William does not approve
      console.log(error);
      throw null;
    }
  }

  //Get comments for a specific post
  async getComments(parentPostId, skip) {
    if (!skip) {
      skip = 0;
    }

    const comments = await client.service('comments').find({
      query: {
        parentPostId: parentPostId,
        $skip: skip,
        $limit: 20,
      },
    });

    comments.data.forEach(comment => this.commentsMaster.addComment(comment));

    return comments.data;
  }

  //    S T U F F    F O R    F E E D S 

  @observable trendActivities = [];

  TREND_LIST_LIMIT = 10
  trendActivitiesOffset = 3; //current offset for the trend activities on activity feed screen

  @observable nextChallenges = []; //the user's next challenges to complete

  // NOTIFICATIONS
  @observable notifications = []
  @observable lastNotification
  @observable endOfNotificationsReached = false
  @observable numUnseenNotifications
  @observable notificationProps = []
  @observable notificationPropsPage = []

    //Notifications limit and offset and first timestamp
    @observable NotificationOffset = 0;
    @observable NotificationLimit = 20;
    @observable NotificationTimestamp = null;
  //get the data of a specific post using the postId

  /**
   * */
  getSpecifiedPost(postId) {
    try{
      return client.service('posts').get(postId);
      }catch(err){
        if(err.name==="FeathersError" && err.type==="not-authenticated")
        {
          return {};
        }
        throw err;
      }
  }

  /**
   * 
   * */
   async _getNotifications() {
    let lenBefore = this.notifications.length;
    await this.getNotifications()
    let lenAfter = this.notifications.length;
    //console.log(`this.notifications is ${this.notifications.length} elements long`);
    runInAction(()=>{
      this.notificationProps = toJS(this.notifications)
    })
    return lenBefore !== lenAfter;
  }

  /**
   * 
   * */
   async _getNotificationsPage() {
    let lenBefore = this.notifications.length;
    await this.getNotifications(false,false);
    let lenAfter = this.notifications.length;
    //console.log(`this.notifications is ${this.notifications.length} elements long`);
    runInAction(()=>{
      this.notificationPropsPage = toJS(this.notifications)
    })
    return lenBefore !== lenAfter;
  }

  /**
   * Updates the stored notification dates array
   * @param {object} noti The notification object
   * @param {string[]} noti.dates The new dates array
   * @param {string[]} dates The current dates array
   */
  async updateNotificationDates(noti, dates) {
    try {
      if (noti.dates.length > 0) {
        var dateArr = dates;
        if (dateArr == null || dateArr == '' || dateArr == undefined) {
          dateArr = noti.dates;
        } else {
          //re-assigning values ( might get new values)
          dateArr = noti.dates;
          dateArr.forEach(function (part, index, theArray) {
            theArray[index] = Number(theArray[index].replace(/_/g, ''));
          });
          dateArr.sort((a, b) => b - a);

          dateArr.forEach((part, index, theArray) => {
            theArray[index] = spliceString(
              String(theArray[index]),
              4,
              0,
              '_',
            );
            theArray[index] = spliceString(theArray[index], 7, 0, '_');
          });
        }

        await cookieStorage.setItem('notidates', dateArr.join(','));
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 
   * */
  resetNotifCookieStorage() {
    //resetting post related values
    cookieStorage.setItem('iniOffsetNoti', '0'); //this value should be same as value in yuser-server .env files
    cookieStorage.setItem('curOffsetNoti', '0'); //this value should be same as value in yuser-server .env files
    cookieStorage.setItem('iniLmtnoti', '10'); //this value should be same as value in yuser-server .env files
    cookieStorage.setItem('curLmtNoti', '0'); //this value should be same as value in yuser-server .env files
  }

  /**
   * 
   * */
   @action async getNotifications(beginFromTop = false,verbose = false) {
    if (beginFromTop) {
      //this.resetNotifCookieStorage();
      this.notifications = [];
      this.notificationProps = [];
      this.notificationPropsPage = [];
      this.NotificationOffset = 0;
      this.NotificationTimestamp = new Date().getTime();
    }
    if(this.NotificationTimestamp === null || this.NotificationTimestamp === undefined){
      this.NotificationTimestamp = new Date().getTime();
    }
    //console.log(this.NotificationTimestamp);
    let newLimit = this.NotificationLimit;
    let curOffset = this.NotificationOffset;
    if(beginFromTop) {
      this.lastNotification = null;
      this.endOfNotificationsReached = false;
    }
    if (!this.endOfNotificationsReached) {
      return client
        .service('stream-notifications')
        .find({
          query: {
            retNum:newLimit,
            skip:curOffset,
            startTimestamp:this.NotificationTimestamp,
            verbose
          },
        })
        .then(async noti => {
          let newOffset = curOffset + noti.results?.length;
          this.NotificationOffset = newOffset
          if(noti.startTimestamp && noti.startTimestamp !== this.NotificationTimestamp){
            this.NotificationOffset = 0;
            this.NotificationTimestamp = noti.startTimestamp
          }
          //await this.updateNotificationDates(noti, dates);

          return noti;
        })
        .then(
          action(notifications => {
            this.numUnseenNotifications = 0;
            if (beginFromTop) {
              this.notifications = [];
            }
            if (notifications.results.length > 0) {
              this.notifications = this.notifications.concat(
                notifications.results,
              );
              //distinct values
              this.notifications = this.notifications.filter(
                (v, i, a) => a.findIndex(t => t.id === v.id) === i,
              );
              // this.notifications = this.notifications.concat(
              // 	notifications.results
              // );
              this.lastNotification =
                notifications.results[notifications.results.length - 1].id;

              // //if less notifications are sent
              // if (notifications.results.length < 10) {
              // 	this.endOfNotificationsReached = true;
              // }
            } else {
              this.endOfNotificationsReached = true;
            }
          }),
        )
        .catch(error => console.log(error));
    }
    return this.notifications
  }

  // F O L L O W I N G 

  /**
   * Follows a user
   * @param {string} userId The id of the user to be followed
   */
  async followUser(userId) {
    await client.service('follow').create({ userId: userId });

    // analytics().logEvent('follow_user');
    // cacheProfileData(true);
    // //refresh activity feed when user is followed
    // this.getActivitiesFeed(true);
  }

  /**
   * Unfollows a user
   * @param {string} userId The id of the user to be unfollowed
   */
  async unfollowUser(userId) {
    await client.service('follow').remove(userId);
  }

  /**
   * 
   * */
  async doIFollowUser(userId) {
    const answer = await client.service('do-i-follow-user').find({
      query: {
        wantedId: userId
      }
    });
    return answer;
  }

  /**
   * Mentions user comment
   * */
  async getUserSuggestions(keyword) {
    return client
      .service('users-es')
      .get(1, {
        query: {
          //uname: { $regex: new RegExp('^' + keyword).toString() }
          uname: { $search: keyword },
        },
      })
      .then(result => {
        return result.data;
      })
      .catch(error => {
        console.log('MainStore.getUserSuggestions failed: ' + error.message);
      });
  }




  /**
     * Retrieves a user's followers
     * @param {string} userId The user id of the user whose followers will be retrieved
     * @param {number} skip The offset to retrieve
     */
  async getFollowers(userId, skip) {
    return client.service('get-followers').find({
      query: {
        $skip: skip,
        $limit: 20,
        userId: userId,
      },
    });
  }

  /**
   * Retrieves the user's someone is following
   * @param {string} userId The id of the user whose followed users will be retrieved
   * @param {number} skip The offset to retrieve
   */
  async getFollowing(userId, skip) {
    return client.service('get-following').find({
      query: {
        $skip: skip,
        $limit: 20,
        userId: userId,
      },
    });
  }


  async createWallet(address, userId) {
    await client.reAuthenticate();
    let retval = await client.service('user-eth-wallets').create({ address: address, userId: userId });
    return null;
  }




  //The function to get the properties to be displayed in the nft modal
  async getMetaData(tokenid) {
    let metadata = await client.service('get-metadata').get(tokenid);
    //console.log(metadata);
    return metadata;
  }

  async GetWMOVRBalance(userWalletAddr) {
    let balance = 0;
    if (typeof window !== "undefined") {
      let metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
      let chain = await metamaskProvider.getNetwork();
      if (this.CHAIN_ID === "0x507" && Number(this.CHAIN_ID) === chain.chainId) {
        // wmovrABI can stay the same, just sets up the contract methods
        const wmovrABI = [{ "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "address", "name": "guy", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "dst", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "address", "name": "dst", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdrawal", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "guy", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "deposit", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "dst", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "src", "internalType": "address" }, { "type": "address", "name": "dst", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "receive", "stateMutability": "payable" }];
        let WMOVRContract = new ethers.Contract(this.wDevAddr, wmovrABI, metamaskProvider);
        balance = await WMOVRContract.balanceOf(userWalletAddr); //the call to get the balance of WMOVR returns in wei so will need to be converted
        balance = ethers.utils.formatEther(balance);
      }
      else if (this.CHAIN_ID === "0x505" && Number(this.CHAIN_ID) === chain.chainId) {
        // wmovrABI can stay the same, just sets up the contract methods
        const wmovrABI = [{ "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "address", "name": "guy", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "dst", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "address", "name": "dst", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdrawal", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "guy", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "deposit", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "dst", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "src", "internalType": "address" }, { "type": "address", "name": "dst", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "receive", "stateMutability": "payable" }];
        let WMOVRContract = new ethers.Contract(this.wMovrAddr, wmovrABI, metamaskProvider);
        balance = await WMOVRContract.balanceOf(userWalletAddr);
        balance = ethers.utils.formatEther(balance);
      }
    }
    return balance;
  }

  async getMovrBalance(walletAddress) {
    let balance = 0;
    if (typeof window !== "undefined" && window.ethereum) {
      let metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
      let chain = await metamaskProvider.getNetwork();
      if (this.CHAIN_ID === "0x507" && Number(this.CHAIN_ID) === chain.chainId) {
        let bnBalance = await metamaskProvider.getBalance(walletAddress);
        balance = ethers.utils.formatEther(bnBalance);
      }
      else if (this.CHAIN_ID === "0x505" && Number(this.CHAIN_ID) === chain.chainId) {
        let bnBalance = await metamaskProvider.getBalance(walletAddress);
        balance = ethers.utils.formatEther(bnBalance);
      }
    }
    return balance;
  }

  async testConvert(wDevContract, userWalletAddr, value) {
    // wDevContract.methods.deposit().send({ from: userWalletAddr, value: value }, (err, response) => {
    //   if (err) {
    //     console.log(err);
    //     return
    //   }
    // })
  }

  // async convert(wMovrContract, userWalletAddr, value) {
  //   wMovrContract.methods.deposit().send({ from: userWalletAddr, value: value }, (err, response) => {
  //     if (err) {
  //       console.log(err);
  //       return
  //     }
  //   })
  // }

  async testMint(wDevContract, nextGemTestContract, nextGemTestAddr, numToPurchase, userWalletAddr, value) {
    // await client.reAuthenticate();
    // try {
    //   await wDevContract.methods.approve(nextGemTestAddr, value).send({ from: userWalletAddr }, async (err, res) => {
    //     if (err) {
    //       console.log(err)
    //       return;
    //     }
    //     this.transactionHash = res;


    //   });

    //   this.transactionHash = await this.purchaseNextGem(null, userWalletAddr, 0.01, numToPurchase);
    // } catch (err) {
    //   this.errMessage = err.message;

    // }

    return this.transactionHash;
  }

  // async mint(wMovrContract, nextGemContract, nextGemAddr, numToPurchase, userWalletAddr, value) {
  //   await client.reAuthenticate();
  //   try{
  //   await wMovrContract.methods.approve(nextGemAddr, value).send({ from: userWalletAddr }, async (err, res) => {
  //     if (err) {
  //       console.log(err)
  //       return;
  //     }
  //     this.transactionHash = res;


  //   });

  //     this.transactionHash = await this.purchaseNextGem(null, userWalletAddr, 0.01, numToPurchase);
  //   }catch(err){
  //     this.errMessage = err.message;

  //   }

  //   return this.transactionHash;
  // }

  async purchaseNextGem(userId, walletAddress, pricePer, numToPurchase) {
    //console.log(userId,walletAddress,pricePer,numToPurchase);
    /*await client.reAuthenticate();
    let signedTx = null;
    let tokenIds = null;

    try {
      ({ signedTx, tokenIds } = await client.service("purchase-next-gem").create({
        address: walletAddress,
        limit: numToPurchase,
      }));
      console.log(tokenIds);
      let web3 = new Web3('https://rpc.testnet.moonbeam.network');
      //let web3 = new Web3('https://rpc.moonriver.moonbeam.network'); //MainNet
      await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction, (err, resp) => {
        if (err) {
          console.log(err);
        }
        this.transactionHash = resp;
        return this.transactionHash;

      });
      return this.transactionHash;
    } catch (err) {
      this.errMessage = err.message;
      this.txFailed = true;
      if (this.errMessage !== "Could not find enough NextGems to complete your transaction." && this.errMessage !== "Error when signing transaction" && this.errMessage !== "No wallet found" && this.errMessage !== "Not enough NextGems remaining") {
        await client.service("purchase-next-gem").update(null, { address: walletAddress, tokenIds: tokenIds })
      }
      return this.transactionHash;
    }*/
    return null;
  }

  async getNextGemsRemaining() {

    return 0;
  }




  async getWalletNFTs(walletAddress, skip = 0, limit = 6) {
    let returnedNFTs = await client.service('nft-get-wallet-tokens').get(null, {
      query: {
        walletAddress: walletAddress,
        skip: Number(skip),
        limit: Number(limit)
      }
    })
    return returnedNFTs;
  }

  async getUserNFTsFromUserId(userId,skip=0,limit=0){
    let returnedNFTs = await client.service('nft-get-wallet-tokens').get(null,{
      query:{
        userId:userId,
        skip:Number(skip),
        limit:Number(limit)
      }
    })
    return returnedNFTs;
  }



  //To get the wallet user details
  async getUserInfoFromWallet(walletId) {
    let userDetails = {};
    try {
      userDetails = await client.service('get-user-from-wallet').get(walletId);
    } catch (err) {
      userDetails = { uname: walletId, avatar: null }
    }
    userDetails.walletAddress = walletId;
    if (userDetails.uname === walletId) {
      userDetails.uname = null
    }
    return userDetails
  }


  async getNFTList(skip, limit) {
    let retNFTS = [];
    limit = 6;
    let listings = await client.service('nft-listing').find({
      query: {
        skip: skip,
        limit: limit
      }
    });
    for (let listing of listings) {
      let contractId = Number(listing.tokenId);
      let metadata = await client.service('get-metadata').get(null, {
        query: {
          contractId: Number(contractId),
          contractAddress: listing.nftToken.toString()
        }
      });
      let highestBid, minPrice;
      highestBid = BigInt(listing.highestBid);
      minPrice = BigInt(listing.minPrice);
      if (metadata) {
        metadata.seller = listing.seller;
        metadata.highestBid = listing.highestBid;
        metadata.highestBidder = listing.highestBidder;
        metadata.auctionEnd = listing.auctionEnd;
        metadata.saleToken = listing.saleToken;
        metadata.cost = highestBid >= minPrice ? listing.highestBid : listing.minPrice;
        metadata.tokenContractAddress = listing.nftToken;
        metadata.owner = metadata.seller;
        metadata.contractId = Number(contractId);
        let { minter } = await client.service('nft-get-ownership-info').get(null, {
          query: {
            contractAddress: metadata.tokenContractAddress,
            tokenId: contractId
          }
        });
        let ownerInfo, minterInfo;
        ownerInfo = await this.getUserInfoFromWallet(listing.seller);
        minterInfo = await this.getUserInfoFromWallet(minter);
        metadata.minterInfo = minterInfo;
        metadata.ownerInfo = ownerInfo;
        retNFTS.push(metadata);
      }
    }
    return retNFTS;

  }

  // The function to get details of single NFT 
  async getNFTDetails(tokenId, contractAddress) {
    if (!tokenId || !contractAddress) {
      return null;
    }

    //await client.reAuthenticate()
    let retNFTS = {};

    let metadata = await client.service('get-metadata').get(null, {
      query: {
        contractAddress: contractAddress,
        contractId: tokenId
      }
    });
    //retNFTS.push([metadata,userOwningNft]);
    let walletInfo = metadata.ownerWalletAddress;
    let userOwningNft = await this.getUserInfoFromWallet(walletInfo);
    retNFTS.metadata = metadata
    retNFTS.userInfo = userOwningNft
    retNFTS.ownerWallet = walletInfo;
    retNFTS.contractAddress = contractAddress.toString();
    retNFTS.ContractId = Number(tokenId);


    return retNFTS

  }


  async getListingDetails(tokenId, tokenContractAddress) {

    let listingObj = {};
    let listing = await client.service('nft-listing').get(null, {
      query: {
        tokenId: tokenId,
        contractAddr: tokenContractAddress
      }
    });
    if (listing) {
      let offerInfo = await client.service('nft-offer').get(listing.listingNumber);
      let offerValue = Number(offerInfo.bidAmount).toString();
      listingObj.seller = listing.seller;
      listingObj.auctionEnd = Number(listing.auctionEnd);
      listingObj.saleToken = listing.saleToken;
      listingObj.tokenId = listing.tokenId;
      listingObj.minPrice = listing.minPrice;
      listingObj.listingId = listing.listingNumber;
      listingObj.highestBidder = offerInfo.bidder ? offerInfo.bidder : "0x0000000000000000000000000000000000000000";
      listingObj.salePrice = BigInt(listing.minPrice) > BigInt(offerValue) ? ethers.utils.formatEther(listing.minPrice) : ethers.utils.formatEther(offerValue);
      listingObj.highestBid = ethers.utils.formatEther(offerInfo.bidAmount);
    }
    else {
      listingObj = null;
    }
    return listingObj;

  }


  async getTokenHistory(tokenId, contractAddress, limit, skip) {
    limit = limit ? limit : 0;
    skip = skip ? skip : 0;
    let history = await client.service('nft-token-history').get(Number(tokenId), {
      query: {
        contractAddress: contractAddress.toString(),
        limit: Number(limit),
        skip: Number(skip),
      }
    })
    for (let entry of history) {
      if (entry.price) {
        let tempPrice = ethers.utils.formatEther(BigInt(entry.price));
        entry.price = parseFloat(tempPrice).toFixed(3);
      }
      if (entry.from) {
        let fromInfo = await this.getUserInfoFromWallet(entry.from);
        entry.fromInfo = fromInfo;
      }
      if (entry.to) {
        let toInfo = await this.getUserInfoFromWallet(entry.to);
        entry.toInfo = toInfo;
      }
    }
    return history;
  }





  async getUserWallets(uid) {
    if (uid) {
      client.reAuthenticate();
      let wallets = await client.service('user-eth-wallets').find({ query: { userid: uid } });
      return wallets;
    }
    else {
      return [];
    }
  }

  async getWhitelistedWallets(uid) {
    if (uid) {
      client.reAuthenticate();
      let wallets = await client.service('get-whitelisted-wallets').find({ query: { userid: uid } });
      return wallets;
    }
    else {
      return [];
    }
  }

  async ownsNextGem(uname) {
    if (uname) {
      let ownsNextGem = await client.service('user-owns-nextgem').get(uname);
      return ownsNextGem;
    }
    else {
      return false;
    }
  }


  //The function to get the number of prebought ngs
  async getUnmintedNfts(walletID) {
    //New contract address
    // let ngContractAddrMoonriver = "0xb8Ff462CDeb4EAeB47130FdCa1590189e084429d";
    // const providerURL = "https://rpc.testnet.moonbeam.network";
    //   chainId: 1287,
    //   name: 'moonbase-alphanet'
    // })
    // const ngContract = new ethers.Contract(ngContractAddrMoonriver,txABI,provider)
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    let preboughtNfts = 0;
    if (chainId === CHAIN_ID) {
      // const txContract = new ethers.Contract(this.txContractTestAddr, txContractABI, ethersProvider);
      // preboughtNfts = await txContract.getUserMint(walletID)
      // preboughtNfts=preboughtNfts.toNumber()

    }
    return preboughtNfts

  }

  //The code to show the whitelisted user badge
  async isWhitelisted() {
    let round
    const { user } = await client.reAuthenticate();
    try {
      round = await client.service('whitelist-check').get(user._id);
    } catch (err) {
      console.log(err)
    }
    return round
  }

  async getActiveWhitelist() {

    // const txContract = new ethers.Contract(this.txContractTestAddr, txContractABI, ethersProvider);
    // let whitelistOne = false , whitelistTwo = false ,openSale = false;
    // whitelistOne = await txContract.firstWhitelistActive();
    // whitelistTwo = await txContract.secondWhitelistActive();
    // openSale = await txContract.allowMint();
    // if(openSale)
    // {
    //   return 3
    // }
    // else if (whitelistTwo)
    // {
    //   return 2
    // }
    // else if(whitelistOne)
    // {
    //   return 1
    // }
    return 3;
    return 0;
  }


  getAbi(contractAddress){
      switch(contractAddress){
        case this.vamprContractAddress:
          return vamprAbi
        default:
          return abi;
      }
  }

  /*
    auctionEnd: End date of the auction in Milliseconds
    minPrice: Minimum bid price of the auction in string format rounded to 3 decimal places
    tokenid: The id of the token being 
    tokenContractAddress: The contract address for the token that is being listed.
  */
  async listItem(auctionEnd, minPrice, tokenid, tokenContractAddress, dictionaryObj) {
    const abi = this.getAbi(tokenContractAddress)
    let timeInMS = new Date(auctionEnd).getTime() / 1000;
    let BNTime = ethers.BigNumber.from(timeInMS);
    let withoutDecimals = minPrice * 1000;
    let BNMinPrice = ethers.utils.parseEther(withoutDecimals.toString());
    BNMinPrice = BNMinPrice.div(1000);
    let saleToken = this.wDevAddr
    if (typeof window !== "undefined" && window.ethereum) {
      const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
      let selectedChainId = await metamaskProvider.getNetwork();
      if (selectedChainId.chainId !== Number(this.CHAIN_ID)) {
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = false;
        this.txCancelledOverlayVisible = false;
        this.errMessage = "Error: Invalid blockchain selected";
        return;
      }
      let metamaskSigner = metamaskProvider.getSigner();
      const ngContract = new ethers.Contract(tokenContractAddress, abi, metamaskSigner);
      const marketContract = new ethers.Contract(this.marketplaceContractAddr, marketAbi, metamaskSigner);
      let approveHash = null;
      try {
        this.txConfirmOverlayVisible = true;
        approveHash = await ngContract.approve(this.marketplaceContractAddr, tokenid, { gasPrice: 5000000000, gasLimit: 1000000 });
        this.transactionHash = approveHash.hash;
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = true;
      } catch (err) {
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = false;
        if (err.code === 4001) {
          this.txCancelledOverlayVisible = true;
          return;
        }
        else {
          this.failedTxMessage = "There was an error while creating your transaction"
          this.txFailedOverlayVisible = true;
          console.error(err)
        }
        this.transactionHash = null;
        return;
      }
      let approveComplete = false;
      while (!approveComplete) {
        try {
          this.txPendingOverlayVisible = true;
          await approveHash.wait();
          this.txPendingOverlayVisible = false;
          approveComplete = true;
        } catch (err) {
          this.txPendingOverlayVisible = false;
          console.log(err, "error")
          let errReceipt = err.receipt;
          if (errReceipt.status === 0) {
            this.txFailedOverlayVisible = true;
            approveComplete = true;
            return;
          }
          else if (errReceipt.status === 1) {
            if (!err.cancelled && err.reason === "repriced") {
              approveHash = err.replacement;
              this.transactionHash = approveHash.hash;
            }
            else {
              this.txFailedOverlayVisible = true;
              approveComplete = true;
              return;
            }
          }
        }
      }

      let listHash = null;
      try {
        this.transactionHash = null;
        this.txPendingOverlayVisible = false;
        this.txConfirmOverlayVisible = true;
        listHash = await marketContract.listItem(BNTime, BNMinPrice, tokenid, tokenContractAddress, saleToken, { gasPrice: 5000000000, gasLimit: 1000000 });
        this.transactionHash = listHash.hash;
        this.txPendingOverlayVisible = true;
        this.txConfirmOverlayVisible = false;
      } catch (err) {
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = false;
        if (err.code === "4001") {
          this.txCancelledOverlayVisible = true;
          return;
        }
        else {
          this.failedTxMessage = "There was an error while creating your transaction"
          this.txFailedOverlayVisible = true;
        }
        this.transactionHash = null;
        return;
      }
      let listingComplete = false;
      while (!listingComplete) {
        try {
          this.txPendingOverlayVisible = true;
          await listHash.wait();
          runInAction(() => {
            this.dictionaryArray = [...this.dictionaryArray, dictionaryObj];         // sets the function to disable bid button to true
          })
          Cookie.set("dictionaryArray", JSON.stringify(this.dictionaryArray));
          this.txPendingOverlayVisible = false;
          this.txSuccessOverlayVisible = true;
          listingComplete = true;
        } catch (err) {
          this.txPendingOverlayVisible = false;
          let errReceipt = err.receipt;
          if (errReceipt.status === 0) {
            this.txFailedOverlayVisible = true;
            listingComplete = true;
            return;
          }
          else if (errReceipt.status === 1) {
            if (!err.cancelled && err.reason === "repriced") {
              listHash = err.replacement
              this.transactionHash = listHash.hash;
            }
            else {
              this.txFailedOverlayVisible = true;
              listingComplete = true;
              return;
            }
          }
        }
      }
    }
    else {
      this.errMessage = "Error metamask could not be found";
    }

  }

  /*
    itemNumber: The listing number in string format
    bidprice: The amount to bid in string format rounded to 3 decimal places
  */
  async bidOnListedItem(itemNumber, bidPrice, dictionaryObj) {
    let withoutDecimals = bidPrice * 1000;
    let BNBidPrice = ethers.utils.parseEther(withoutDecimals.toString());
    BNBidPrice = BNBidPrice.div(1000);
    // if(!bidPrice.isBigNumber)
    // {
    //   BNbidPrice =  ethers.utils.parseEther(bidPrice.toString());
    // }

    if (typeof window !== "undefined" && window.ethereum) {
      const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
      const metamaskSigner = metamaskProvider.getSigner();
      const marketContract = new ethers.Contract(this.marketplaceContractAddr, marketAbi, metamaskSigner);
      const wmovrContract = new ethers.Contract(this.wDevAddr, abi, metamaskSigner);
      let selectedChainId = await metamaskProvider.getNetwork();
      if (selectedChainId.chainId !== Number(this.CHAIN_ID)) {
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = false;
        this.txCancelledOverlayVisible = false;
        this.errMessage = "Error: Invalid blockchain selected";
        return;
      }

      let approve;
      try {
        this.txConfirmOverlayVisible = true;
        approve = await wmovrContract.approve(this.marketplaceContractAddr, BNBidPrice, { gasPrice: 5000000000, gasLimit: 1000000 });
        this.txConfirmOverlayVisible = false;
        this.transactionHash = approve.hash;
        this.txPendingOverlayVisible = true;
      } catch (err) {
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = false;
        this.transactionHash = null;
        if (err.code === 4001) {
          this.txCancelledOverlayVisible = true;
          return;
        }
        else {
          console.log(err);
          this.failedTxMessage = "There was an error while creating your transaction"
          this.txFailedOverlayVisible = true;
        }
        this.transactionHash = null;
        return;
      }
      let approveComplete = false;
      while (!approveComplete) {
        try {
          this.txPendingOverlayVisible = true;
          await approve.wait();
          this.txPendingOverlayVisible = false;
          approveComplete = true;
        } catch (err) {

          this.txPendingOverlayVisible = false;
          let errReceipt = err.receipt;
          if (errReceipt.status === 0) {
            console.log(err);

            this.txFailedOverlayVisible = true;
            approveComplete = true;
            return;
          }
          else if (errReceipt.status === 1) {
            if (!err.cancelled && err.reason === "repriced") {
              approve = err.replacement;
              this.transactionHash = approve.hash;
            }
            else {
              console.log(err);
              this.txFailedOverlayVisible = true;
              approveComplete = true;
              return;
            }
          }
        }
      }

      let tx;
      try {
        this.txPendingOverlayVisible = false;
        this.txConfirmOverlayVisible = true;
        tx = await marketContract.bid(itemNumber, BNBidPrice, { gasPrice: 5000000000, gasLimit: 1000000 });
        this.transactionHash = tx.hash;
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = true;
      } catch (err) {
        this.txPendingOverlayVisible = false;
        this.txConfirmOverlayVisible = false;
        if (err.code === 4001) {
          this.txCancelledOverlayVisible = true;
          return;
        }
        else {
          this.failedTxMessage = "There was an error while creating your transaction"
          this.txFailedOverlayVisible = true;
        }
        this.transactionHash = null;
        return;
      }
      let txComplete = false;
      while (!txComplete) {
        try {
          this.txPendingOverlayVisible = true;
          await tx.wait();
          runInAction(() => {
            this.dictionaryArray = [...this.dictionaryArray, dictionaryObj];         // sets the function to disable bid button to true
          })
          Cookie.set("dictionaryArray", JSON.stringify(this.dictionaryArray));
          this.txPendingOverlayVisible = false;
          this.txSuccessOverlayVisible = true;
          txComplete = true;
        } catch (err) {
          this.txPendingOverlayVisible = false;
          let errReceipt = err.receipt;
          if (errReceipt.status === 0) {
            this.txFailedOverlayVisible = true;
            txComplete = true;
            return;
          }
          else if (errReceipt.status === 1) {
            if (!err.cancelled && err.reason === "repriced") {
              tx = err.replacement;
              this.transactionHash = tx.hash;
            }
            else {
              this.txFailedOverlayVisible = true;
              txComplete = true;
              return;
            }
          }
        }
      }
    }
  }

  /*
    itemNumber: The listing number in string format.
  */
  async settleListing(itemNumber, dictionaryObj) {
    if (typeof window !== "undefined" && window.ethereum) {
      const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
      const metamaskSigner = metamaskProvider.getSigner();
      const marketContract = new ethers.Contract(this.marketplaceContractAddr, marketAbi, metamaskSigner);
      let settleTx;
      let selectedChainId = await metamaskProvider.getNetwork();
      if (selectedChainId.chainId !== Number(this.CHAIN_ID)) {
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = false;
        this.txCancelledOverlayVisible = false;
        this.errMessage = "Error: Invalid blockchain selected";
        return;
      }
      try {
        this.txConfirmOverlayVisible = true;
        settleTx = await marketContract.settle(itemNumber, { from: window.ethereum.selectedAddress, gasPrice: 5000000000, gasLimit: 1000000 });
        this.transactionHash = settleTx.hash;
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = true;
      } catch (err) {
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = false;
        if (err.code === 4001) {
          this.txCancelledOverlayVisible = true;
          return
        }
        else {
          this.failedTxMessage = "There was an error while creating your transaction"
          this.txFailedOverlayVisible = true;
        }
        this.transactionHash = null;
        return;
      }

      let settleComplete = false;
      while (!settleComplete) {
        try {
          this.txPendingOverlayVisible = true;
          await settleTx.wait();
          runInAction(() => {
            this.dictionaryArray = [...this.dictionaryArray, dictionaryObj];         // sets the function to disable bid button to true
          })
          //console.log(this.dictionaryArray,"dictionary array after txn")
          Cookie.set("dictionaryArray", JSON.stringify(this.dictionaryArray));
          this.txPendingOverlayVisible = false;
          this.txSuccessOverlayVisible = true;
          settleComplete = true;
        } catch (err) {
          this.txPendingOverlayVisible = false;
          let errReceipt = err.receipt;
          if (errReceipt.status === 0) {
            console.log(err);
            this.txFailedOverlayVisible = true;
            settleComplete = true;
            return;
          }
          else if (errReceipt.status === 1) {
            if (!err.cancelled && err.reason === "repriced") {
              settleTx = err.replacement;
              this.transactionHash = settleTx.hash;
            }
            else {
              console.log(err);
              this.txFailedOverlayVisible = true;
              settleComplete = true;
              return;
            }
          }
        }
      }
    }
    else {
      this.errMessage = "Metamask could not be found";
    }
  }

  async wrapMovr(amountToWrap) {
    if (typeof window !== "undefined" && window.ethereum) {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      let selectedChainId = await ethersProvider.getNetwork();
      if (selectedChainId.chainId !== Number(this.CHAIN_ID)) {
        //console.log(selected.chainId,Number(this.CHAIN_ID))
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = false;
        this.txCancelledOverlayVisible = false;
        this.errMessage = "Error: Invalid blockchain selected";
        return;
      }
      const signer = ethersProvider.getSigner();
      const WMOVRContract = new ethers.Contract(this.wDevAddr, wmovrAbi, signer);
      let withoutDecimals = amountToWrap * 1000;
      let BNwrapAmount = ethers.utils.parseEther(withoutDecimals.toString());
      BNwrapAmount = BNwrapAmount.div(1000);
      let depositTx;
      try {
        this.txConfirmOverlayVisible = true;
        depositTx = await WMOVRContract.deposit({ value: BNwrapAmount, gasPrice: 5000000000, gasLimit: 1000000 });
        this.transactionHash = depositTx.hash;
        this.txConfirmOverlayVisible = false;
        this.txPendingOverlayVisible = true;
      } catch (err) {
        console.log(err);
        this.txPendingOverlayVisible = false;
        this.txConfirmOverlayVisible = false;
        if (err.code === 4001) {
          this.txCancelledOverlayVisible = true;
          return;
        }
        else {
          this.failedTxMessage = "There was an error while creating your transaction";
        }
        this.transactionHash = null;
        return;
      }

      let depositComplete = false;
      while (!depositComplete) {
        try {
          this.txPendingOverlayVisible = true;
          await depositTx.wait();
          this.txPendingOverlayVisible = false;
          this.txSuccessOverlayVisible = true;
          depositComplete = true;
        } catch (err) {
          this.txPendingOverlayVisible = false;
          let errReceipt = err.receipt
          if (errReceipt.status === 1) {
            if (!err.cancelled && err.reason === "repriced") {
              depositTx = err.replacement;
              this.transactionHash = depositTx.hash;
            }
            else {
              this.txFailedOverlayVisible = true;
              this.transactionHash = null;
              depositComplete = true;
              return;
            }
          }
        }
      }
    }
    this.wrapMovrOverlayVisible = false;
  }
  /*
    feePercent: Value of the fee percent in Integer
    nftCost: Subtotal of the nft price in a String representation of a Float eg. "12.001"
  */
  getNFTCostMinusFees(feePercent, nftCost) {
    let validatedPrice = parseFloat(nftCost).toFixed(3);
    let priceWithoutDecimals = validatedPrice * 1000;
    let BNPrice = ethers.utils.parseEther(priceWithoutDecimals.toString()).div(1000);
    let feeCost = BNPrice.mul(feePercent).div(100);
    BNPrice = BNPrice.sub(feeCost);

    return ethers.utils.formatEther(BNPrice);
  }

  async getListingOffers(listingNumber, limit = 5, skip = 0) {
    let offers = await client.service('nft-offer').find({
      query: {
        listingNumber: listingNumber,
        limit: limit,
        skip: skip
      }
    });
    let fullOffers = [];
    for (let offer of offers) {
      let userWallet = await this.getUserInfoFromWallet(offer.bidder);
      let offerObject = {};
      offerObject.bidder = userWallet.uname;
      offerObject.bidderWallet = userWallet.walletAddress;
      offerObject.bidderAvatar = userWallet.avatar;
      offerObject.bidAmount = ethers.utils.formatEther(offer.bidAmount);
      fullOffers.push(offerObject);
    }
    return fullOffers;
  }



  async searchNftListings(searchText, limit = 6, skip = 0, sortBy = "ContractId", sortDirection = "asc") {
    let searchResults = await client.service('nft-search-listings').find({
      query: {
        searchTerms: searchText,
        limit: limit,
        skip: skip,
        sortBy: sortBy,
        sortDirection: sortDirection
      }
    });
    //console.log(searchResults)
    return searchResults;
  }

  /*

  */
  async getAllNextGems(limit = 6, skip = 0, onlyListed = false, sortBy = "ContractId", sortDirection = "asc") {
    let tokens = await client.service('nextgems-handler').find({
      query: {
        limit: limit,
        skip: skip,
        onlyListed: onlyListed,
        sortBy: sortBy,
        sortDirection: sortDirection
      }
    });
    return tokens;
  }

  async queryBlockchainListingDetails(listingNumber) {
    if (typeof window !== "undefined" && window.ethereum) {
      const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
      const chain = await metamaskProvider.getNetwork();
      if (this.CHAIN_ID === "0x507" && Number(this.CHAIN_ID) === chain.chainId) {
        //Moonbase
        let marketContract = new ethers.Contract(this.marketplaceContractAddr, marketAbi, metamaskProvider);

        let listingDetails = await marketContract.Items(listingNumber);
        let parsedListObj = {}
        parsedListObj.minPrice = listingDetails.minPrice.toString();
        parsedListObj.auctionEnd = Number(listingDetails.auctionEnd);
        parsedListObj.highestBidder = listingDetails.highestBidder.toLowerCase();
        parsedListObj.highestBid = ethers.utils.formatEther(listingDetails.highestBid);
        parsedListObj.seller = listingDetails.seller;
        parsedListObj.salePrice = BigInt(listingDetails.minPrice) > BigInt(listingDetails.highestBid) ? ethers.utils.formatEther(listingDetails.minPrice) : ethers.utils.formatEther(listingDetails.highestBid);
        return parsedListObj;
      }
      else if (this.CHAIN_ID === "0x505" && Number(this.CHAIN_ID) === chain.chainId) {
        //Moonriver
        let marketContract = new ethers.Contract(this.marketplaceContractAddr, marketAbi, metamaskProvider);

        let listingDetails = await marketContract.Items(listingNumber);
        let parsedListObj = {}
        parsedListObj.minPrice = listingDetails.minPrice.toString();
        parsedListObj.auctionEnd = Number(listingDetails.auctionEnd);
        parsedListObj.highestBidder = listingDetails.highestBidder.toLowerCase();
        parsedListObj.highestBid = ethers.utils.formatEther(listingDetails.highestBid);
        parsedListObj.seller = listingDetails.seller;
        parsedListObj.salePrice = BigInt(listingDetails.minPrice) > BigInt(listingDetails.highestBid) ? ethers.utils.formatEther(listingDetails.minPrice) : ethers.utils.formatEther(listingDetails.highestBid);
        return parsedListObj;
      }
    }
    return {};
  }

  async getPreboughtLegends(){
    let numPurchased = 0;
    if(typeof window !== "undefined" && window.ethereum){
      let currentWalletAddress = window.ethereum.selectedAddress;
      const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
      const chain = await metamaskProvider.getNetwork();
      if(Number(this.CHAIN_ID) === Number(chain.chainId)){
        const legendsPrebuyContract = new ethers.Contract(this.legendsOfEAPrebuyContractAddress,legendsPrebuyAbi,metamaskProvider);
        let contractNumPurchased = await legendsPrebuyContract.getTokensBought(currentWalletAddress);
        numPurchased = Number(contractNumPurchased);
      }
    }
    return numPurchased;
  }

  async getLegendsRemaining(){
    let numRemaining = 0;
    if(typeof window !== "undefined" && window.ethereum){
        let metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
        const chain = await metamaskProvider.getNetwork();
        if(Number(this.CHAIN_ID) === Number(chain.chainId)){
          let contract = new ethers.Contract(this.legendsOfEAPrebuyContractAddress,legendsPrebuyAbi,metamaskProvider);
          let contractSupplyRemaining = await contract.supplyRemaining();
          numRemaining = Number(contractSupplyRemaining);
        }
    }
    return numRemaining;
  }

   //Grants a role to a given user
   async grantUserRole(userId,role)
   {
     let data = {
       userId:userId,
       role:role
     }
     await client.service('grant-user-role').create(data);
     return;
   }
 
   async removeRoleFromUser(userId,role)
   {
     let data = {
       userId:userId,
       role:role
     };
 
     await client.service("grant-user-role").remove(null,{query:data});
 
     return;
   }

   async userHasRole(userId,role){
     let data = {
       query:{
        role:role
       }
     }
     let {hasRole}  = await client.service('grant-user-role').get(userId,data);
     return hasRole;
   }
 
   async starContent(activityId,addOrRemove)
   {
     if(addOrRemove === "add")
     {
       try{
         //console.log(`trying to star ${activityId}`)
         await client.service('star-activity').create({
           activityID:activityId
         });
         this.successMessage = "Successfully starred post."
         return true;
       }catch(err)
       {
         this.errMessage = "There was an error starring the content";
         return false;
       }
     }
 
     else if (addOrRemove === "remove")
     {
       try{
         //console.log(`trying to remove star from ${activityId}`)
         await client.service('star-activity').remove(activityId);
         this.successMessage = "Successfully removed star from post."
         return false;
       }catch(err)
       {
         console.log(err);
         this.errMessage = "There was an error removing the star from the content";
         return false;
       }
     }
     else{
       return false;
     }
   }
 
 
   async deletePost(postId){
     try{
       await client.service('posts').remove(postId);
       this.successMessage = "Post was successfully removed.";
     }catch(err)
     {
       this.errMessage = "There was an error removing the post.";
     }
   }
 
   async banUser(userId,reason=null)
   {
     try{
       await client.service('user-bans').create({
         userId:userId,
         reason:reason
       });
       this.successMessage = "User was successfully banned.";
     }catch(err)
     {
       this.errMessage = "There was an error when attempting to ban user.";
     }
   }
 
   async hideContent(contentId,type,hide)
   {
     try{
       await client.service('hide-content').create({
         contentId:contentId,
         type:type,
         hide:hide
       });
       this.successMessage = `${type} was ${hide ? "hidden" : "unhidden"} successfully`;
     }catch(err){
       this.errMessage = `There was an error trying to ${hide ? "hidde" : "unhide"}  ${type}`;
       return false;
     }
     return true;
   }

  //--------------------------------------------------CHAT RELATED STUFF-----------------------------------------------------------------------//
  async getChatroomlist(offset) {
    let chatOffset =0
    if(offset){
     chatOffset=offset
    }
    await client.reAuthenticate();
    try {
      const roomList = await client.service('get-chatrooms').create({
        limit: 20,
        skip: chatOffset,
      });
      runInAction(() => {
        if (chatOffset=== 0) this.chatRoomList = roomList.data;
        else this.chatRoomList = this.chatRoomList.concat(roomList.data);

      //  chatRoomOffset += roomList.data.length;
      //  this.chatRoomList = roomList.data;
      //  // if offset will be past total amount of results, the end was reached
      //   if (chatRoomOffset >= roomList.total) {
      //     this.endOfChatroomsReached = true;
      //   }

      });
      
    } catch (error) {
      console.log(error);
    } 
    return this.chatRoomList
  }

  //The function to get th total number of rooms for the user
  async getChatlistTotal() {
    let roomList =[];
    await client.reAuthenticate();
    try {
       roomList = await client.service('get-chatrooms').create({
        limit: 10,
        skip: 0,
      });
      
    } catch (error) {
      console.log(error);
    } 
    return roomList.total
  }

    /**
   * Retrieves the messages in a chatroom
   * @param {String} roomId The id of a room
   * @param {Number} skip The number of messages to skip over
   */
  @action
  async getMessages(roomId, skip) {
    await client.reAuthenticate();
    runInAction(() => {
      this.messageOffset= skip;         // sets the message offset
    })
    let messages= await client.service('messages').find({
      query: {
        $sort: {
          _id: -1,
        },
        $limit: this.CHAT_MESSAGE_LIMIT,
        $skip: skip,
        roomId: roomId,
      },
    });

    return messages
  }

  async loadMessagesOnClick(roomId,messageOffset) {
    runInAction(() => {
      this.roomId= roomId;   
      this.selectedRoomId=null      
    })
    const messageList = await this.getMessages(roomId, messageOffset)
    // const members = await this.getRoomMembers(roomId)
    // console.log(members,"the chat memebets")
    runInAction(() => {
      this.messages= messageList.data;    
      // this.chatMembers=members       
    })
    // console.log(this.messages,"the new set of messages")
}


async loadInitialMessageList() {
  const roomList =  await this.getChatroomlist()
  if(roomList.length!==0){
    const roomId= roomList[0].roomId
    runInAction(() => {
      this.roomId= roomId;         
    })
    if (roomId!==null) {
        const messagesList = await this.getMessages(roomId,0)
        // const members = await this.getRoomMembers(roomId)
        // console.log(members,"the chat memebets")
        runInAction(() => {
          this.messages= messagesList.data;   
          // this.chatMembers=members     
        })
      }
  }
 
}


async loadInconmingMessages() {
  const roomList =  await this.getChatroomlist()
  if(roomList.length!==0){
    const roomId= roomList[0].roomId
    // runInAction(() => {
    //   this.roomId= roomId;         
    // })
    if (roomId!==null) {
       // const messagesList = await this.getMessages(roomId,0)
        // const members = await this.getRoomMembers(roomId)
        // console.log(members,"the chat memebets")
        // runInAction(() => {
        //   this.messages= messagesList.data;   
        //   // this.chatMembers=members     
        // })
      }
  }
 
}

//send message to server
async sendMessage(
  text,
  images,
  roomId,
  imageHeight,
  imageWidth,
  imageType,
  replyingTo,
) {
  await client.reAuthenticate();
  return await client.service('messages').create({
    text,
    images: images,
    roomId: roomId,
    imageHeight,
    imageWidth,
    imageType,
    replyingTo,
    replyingTo: replyingTo,
  })//.then(thing => console.log(JSON.stringify(thing)));
}

async getRoomMembers(roomId) {
  return client
    .service('get-room-members')
    .get(roomId)
    .then(members => {
      runInAction(() => {
        this.chatMembers= members.data;         
      })
    })
    .catch(error => console.log(error.message));
}

//The function to edit the message
async editMessage(messageId, changes) {
  return client.service('messages').patch(messageId, changes);
}

//The service to check the number of members in a room
async getRoomMembersAmount(roomId) {
  return client
    .service('get-room-members')
    .get(roomId)
    .then(members => {
      return members.total;
    })
    .catch(error => console.log(error.message));
}

//The service to check whether the session.user is an admin
async isUserAdminOfRoom(uid, rid) {
  let result = await client.service('user-rooms').find({
    query: {
      $limit: 1,
      roomId: rid,
      userId: uid,
    },
  });
  if (result.data[0].isAdmin) {
    let memCount = await this.getRoomMembersAmount(rid);
    //     Alert.alert('ROOM NUMBER', memCount.toString());
    return (memCount > 2);
  }
  return false;
}


//Delete a message by admin or right user
async deleteMessage(messageId) {
  return client.service('messages').remove(messageId);
}

/**
   * Deletes the given group chat or hides the given private chat
   * @param {string} roomId The room's id
   * @returns {Promise<object>} The result returned from the server
   */
 async deleteChatroom(roomId) {
  return client.service('rooms').remove(roomId);
}

async leaveChatroom(roomId,userId) {
  return client.service('user-rooms').remove(null, {
    query: {
      userId,
      roomId,
    },
  });
}

//the functionality to start a private chat
//enter private chat
async joinPrivateChat(otherId) {
  const newRoomId = await client.service('start-private-chat').create({
    userId: otherId,
  });
  const newRoom = await client
    .service('user-rooms')
    .find({
      query: {
        $limit: 1,
        roomId: newRoomId,
        userId: this.authUser._id,
      },
    })
    .catch((error) => console.log(error.message));
  if (newRoom.total != 0) {
   
    const messageList = await this.getMessages(newRoomId, 0)
 
    runInAction(() => {
      // console.debug("Added a new private room: " + newRoomId);
      this.roomId=newRoomId
      this.messages= messageList.data;  
     
      const updatedChatList = this.chatRoomList.filter(
        (m) => m.roomId !== newRoom.data[0].roomId
      );
      this.chatRoomList = updatedChatList;
   
      const tempList = [newRoom.data[0], ...this.chatRoomList];
   
      this.chatRoomList = tempList;
      // this.chatRoomList = [newRoom.data[0], ...this.chatRoomList.filter(
      //   (m) => m.roomId !== newRoom.data[0].roomId)];
 
      this.privateChatlist=messageList.data
      this.selectedRoomId=this.roomId
    });
  }

  return newRoomId;
}

//The service for emoji reactions
async reactToMessage(messageId, reactionCode) {
 
  return client
    .service('messages')
    .patch(messageId, {
      reactions: [{ code: reactionCode, count: 1, reactors: [this.authUser._id] }],
      //  newReaction: { code: reactionCode, reactor: this.authUser._id }, // simpler
    })
    .then(newdata => runInAction(() => this.messages[this.messages.findIndex(msg => msg._id == newdata._id)] = newdata));
}


 //gets list of mutual followers
 async getMutualFollowers(willReset) {
  //console.debug("getMutualFollowers is called. Current this.mutualFollowers length = " + this.mutualFollowers.length)

  let offset = this.mutualFollowers.length;
  if (willReset) {
    offset = 0;
  }

  const mutualFollowersPage = await client
    .service('get-mutual-followers')
    .find({
      query: {
        skip: offset,
        limit: 5,
      },
    });
  runInAction(() => {
    if (offset === 0) this.mutualFollowers = mutualFollowersPage.data;
   

    
  });
}




/*
  adminDashboardInterface
  @in job_code 
  @in job_data
  april 7th 2022
  william doyle
*/
  async adminDashboardInterface(job_code, job_data) {
    return await client.service('admin-dashboard-backend').find({
      query: {
        job_code,
        job_data: JSON.stringify(job_data)
      }
    });
  }

  async loadAdminDashboardOptions() {
    const result = await client.service('admin-dashboard-backend').get({ });
    return result.options;
  }
 //------------------------------------------------------SIGN UP --------------------------------------------------------------------------
   //make changes to the user's profile
   async editProfile(profileObj) {
    const result = await client
    .service('change-profile')
    .create(profileObj);
   // console.log(result,"result from chmage profile")
  }

  // if (editProfileObject.featuredPhoto) {
  //   const featuredPhotoId = await this.uploadImage(
  //     editProfileObject.featuredPhoto,
  //     'image/png',
  //     'yuser_uploads',
  //   );
  //   editProfileObject.featuredPhoto = featuredPhotoId;
  // }

   /**
   * Uploads an image to the storage
   * @param {String} filePath The path to the image being uploaded
   * @param {String} type The mime type of the image being uploaded
   * @param {String} bucket The bucket the image will be uploaded to
   * @returns The file name of the image in storage
   */
    async uploadImage(image, type, bucket, thumbID = "") {
     
      let fileId;
      if (thumbID === "") {
        fileId = nanoid(); //generate random unique photo filename
      }
 
      //console.log("uploading image",fileId)
    
  
      const signedUrl = await client.service('get-signed-url').create({
        bucket: bucket,
        assetId: fileId,
        type: type,
      });
      //console.log(signedUrl,"signed url +++")
  
      const response = await fetch(signedUrl.url, {
        method: 'PUT',
        headers: {
          "Access-Control-Allow-Origin": '*',
          'Content-Type': type,
          //'Content-Length': buffer.byteLength,
        },
        body: image,
      });
  
      //console.log(response,"respokbwd")
       if (response.ok) {
         return fileId
       }
       else throw new Error('Error uploading image.');
    }

    async getUserByUsername(username){
      let user = null
      if(username && username !== ""){
        let query = {
          targetUsername:username
        }
  
        user = await client.service("user-by-username").find({query});
      }
      return user;
    }

  async getPostLink(post){
    //console.log("inside link servicwe",post)
    const result= await client.service('deep-links').create({
      post:{
      postId:post
      }
      })
      console.log("hey hey hey")
      console.log(result,"result deeplink")
  }

  async reportPost(postId, reason) {
   // console.log("inside the report post rootstore")
   const result= await client
      .service('post-reports')
      .create({
        postId: postId,
        reason: reason,
      })
      .then(
        action(() => {
          // remove from user's today feed if possible
          // const feedPost = this.userPosts.find(post => post._id === postId);
          // this.userPosts.remove(feedPost);
          // const postIndex = this.userPosts.findIndex(post => post._id === postId);
          // if(postIndex>-1)
          // {
          //   this.userPosts.splice(postIndex,1);
          // }

          // const hotFeedPostIndex = this.trendActivities.findIndex(post => post._id === postId);
          // if(hotFeedPostIndex>-1)
          // {
          //   this.trendActivities.splice(hotFeedPostIndex,1);
          // }
          
        }),
      )
      .catch(error => {
       console.log(error.message);
      });
     // console.log(result,"result of report post")
  }
   //---------------------------------------------------------HASHTAG-----------------------------------------------------//
   async getHashtagsSuggestions(keyword) {
    let hashtags = [];
    let postHashtags = await this.getHashtagsFromPosts(keyword);
    let commentHashtags = await this.getHashtagsFromComments(keyword);
    for (let i = 0; i < postHashtags.length; i++) {
      hashtags.push(postHashtags[i]);
    }
    for (let n = 0; n < commentHashtags.length; n++) {
      if (hashtags.indexOf(commentHashtags[n]) < 0) {
        hashtags.push(commentHashtags[n]);
      }
    }
    return hashtags;
  }
  async getHashtagsFromPosts(keyword) {
    return client
      .service('posts-db')
      .find({
        query: {
          text: {$regex:keyword,$options:'i'},
        },
      })
      .then(result => {
        if (result.data && result.data.length > 0) {
          let hashtags = [];
          for (var i = 0; i < result.data.length; i++) {
            const hashtagsArray = result.data[i].text.match(/(^|\s)#(\w+)/g);
            if (hashtagsArray!==null&&hashtagsArray.length > 0) {
              for (var j = 0; j < hashtagsArray.length; j++) {
                let hashtag = hashtagsArray[j].trim();
                if (
                  hashtag.toLowerCase().startsWith(keyword.toLowerCase()) &&
                  hashtags.indexOf(hashtag.substr(1)) < 0
                ) {
                  hashtags.push(hashtag.substr(1));
                }
              }
            }
          }
          return hashtags;
        }
        return [];
      })
      .catch(error => {
        console.log(
          error
        );
      });
  }

  async getHashtagsFromComments(keyword) {
    return client
      .service('comments')
      .find({
        query: {
          text: { $regex:keyword,$options:'i'},
        },
      })
      .then(result => {
        if (result.data && result.data.length > 0) {
          let hashtags = [];
          for (var i = 0; i < result.data.length; i++) {
            const hashtagsArray = result.data[i].text.match(/(^|\s)#(\w+)/g);
            if (hashtagsArray!==null&&hashtagsArray.length > 0) {
              for (var j = 0; j < hashtagsArray.length; j++) {
                let hashtag = hashtagsArray[j].trim();
                if (
                  hashtag.toLowerCase().startsWith(keyword.toLowerCase()) &&
                  hashtags.indexOf(hashtag.substr(1)) < 0
                ) {
                  hashtags.push(hashtag.substr(1));
                }
              }
            }
          }
          return hashtags;
        }
        return [];
      })
      .catch(error => {
        console.log(
         error
        );
      });
  }

  async createViewRelationship(viewObj = {}){
    
    let authUser = await this.getAuthUser();
    if(!authUser || !authUser._id || !viewObj.type){
      return;
    }
    viewObj.userId = authUser._id;
    await client.service("views").create(viewObj);
    return;
  }



  //----------------------------------------SEARCH --------------------------------------------------------//
    /**
   * Searches for posts containing a specified phrase
   * @param {string} text The search string
   * @param {number} offset The number of results to skip
   * @param {('all'|'week'|'today')} timeFilterRange The time range to retrieve results in
   * @param {boolean} matchPrefix True if matching phrase prefix, False otherwise
   * @returns {Promise<object>} The search results
   */
     async searchPosts(text, offset, timeFilterRange, matchPrefix) {
      let query = {
        $skip: offset,
        $limit: this.SEARCH_LIMIT,
      };
      if (text && text.length > 0) {
        query.text = {
          $phrase_prefix: text,
        };
      }
      if (timeFilterRange == 'today') {
        query.createdAt = {
          $gt: new Date().getTime() - this.DAY_TIMEFRAME,
        };
      } else if (timeFilterRange == 'week') {
        query.createdAt = {
          $gt: new Date().getTime() - this.WEEK_TIMEFRAME,
        };
      }
  
      return client
        .service('posts-es')
        .find({
          query: query,
        })
        .catch(error => {
          console.log('rootstore.searchposts failed: ' + error.message);
        });
    }

    async autoCompleteSearchPosts(text, timeFilterRange, matchPrefix) {
      let query = {
        $limit: this.AUTO_COMPLETE_SEARCH_LIMIT,
        isAutoCompleteSearch: true,
      };
      if (text && text.length > 0) {
        query.text = {
          $phrase_prefix: text,
        };
      }
      if (timeFilterRange == 'today') {
        query.createdAt = {
          $gt: new Date().getTime() - this.DAY_TIMEFRAME,
        };
      } else if (timeFilterRange == 'week') {
        query.createdAt = {
          $gt: new Date().getTime() - this.WEEK_TIMEFRAME,
        };
      }
  
      return client
        .service('posts-es')
        .find({
          query: query,
        })
        .catch(error => {
          console.log('rootstore.searchPosts failed: ' + error.message);
        });
    }
  
    async autoCompleteSearchUsers(text) {
      return client.service('users-es').find({
        query: {
          $limit: this.AUTO_COMPLETE_SEARCH_LIMIT,
          $or: [{ uname: { $phrase_prefix: text } }, { bio: { $phrase_prefix: text } }],
          isAutoCompleteSearch: true,
        },
      });
    }
  
    async searchUsers(text, offset) {
      return client.service('users-es').find({
        query: {
          $skip: offset,
          $limit: this.SEARCH_LIMIT,
          $or: [{ uname: { $phrase_prefix: text } }, { bio: { $phrase_prefix: text } }],
        },
      });
    }
  //-------------------------------------------------------SEARCH-----------------------------------------------------------------------


  @action hydrate = (data) => {
    if (!data) return

    this.wallets = data.wallets
  }


}






















































function initializeStore(initialData = null) {
  const _store = store ?? new RootStore()

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}