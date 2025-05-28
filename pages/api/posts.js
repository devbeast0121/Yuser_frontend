import { action, runInAction } from "mobx";
import { inject, observer } from "mobx-react";
import LocalPosts from "../../stores/LocalPosts";
import { clone_nf, spliceString } from "../../stores/tools";
import client from "./client";

const CHECKS = !true;
const TREND_LIST_LIMIT = 10;

const DefaultHotAndSticky = {
  initialOffTrend: 3, //this value should be same as value in yuser-server .env files
  curOffTrend: 3, //this value should be same as value in yuser-server .env files
  iniLmtTrend: 10, //this value should be same as value in yuser-server .env files
  curLmtTrend: 0, //this value should be same as value in yuser-server .env files
};

export default class Loader {
  // PRIVATE MEMBERS TO HIDE COMPLEXITY
  static #localPosts = LocalPosts.getInstance();

  //	U S E D   BY   L O A D H O T
  static #trendActivities = [];
  static #HotAndSticky = clone_nf(DefaultHotAndSticky); // to be read as "private, hot, and sticky" | tracks data (which used to be done with cookies) for LoadHot()
  static #hotFeedTimeStamp = new Date().getTime();
  //	U S E D   B Y   L O A D M E
  static #_userPosts = [];
  static #nextChallenges = [];
  static #postDateArr = "";
  static #meFeedTimeStamp = new Date().getTime();
  // TODO: make sure these get the correct initial values
  // TODO: make these numbers (not strings)
  static #postIniOffset = 0;
  static #postCurOffset = 0;
  static #postIniLimit = 3;
  static #postCurLimit = 3;
  static #bannerIndex = 0;

  //	U S E D   B Y   L O A D P R O F I L E
  static #profile_skip = 0;
  constructor() {}

  /**
   * 	LoadHot()
   * 	Loads the hot feed into localPosts
   * 	@params
   * 		cookieStorage	-->	the object for cookies
   *		resetList	-->	should clear list before adding new elements	: deafult false
   *	William Doyle
   * 	Aug 13th 2021
   */
  static async LoadHot(resetList = false, authMode = true) {
    const messages = true;
    //messages && console.log(`Inside LoadHot --> 🔥 `);

    if (resetList) {
      Loader.#HotAndSticky = clone_nf(DefaultHotAndSticky);
      Loader.#localPosts.setPosts_hot = [];
	  Loader.#hotFeedTimeStamp = new Date().getTime();
    }
	
	let clientTimestamp = new Date().getTime();
    // 1. get data from server
    const initialOffset = Loader.#HotAndSticky.initialOffTrend;
    const currentOffset = Loader.#HotAndSticky.curOffTrend;
    const newOffset = initialOffset + currentOffset;
    const initialLimit = Loader.#HotAndSticky.iniLmtTrend;
    const curLimit = Loader.#HotAndSticky.curLmtTrend;

    let dateArr = Loader.#HotAndSticky.trendDateArr;
    let newLimit = curLimit;

    if (dateArr != null)
      dateArr = dateArr
        .split(",")
        .slice(currentOffset - initialOffset, currentOffset); //last parameter should be greather than first

    if (!resetList) newLimit = initialLimit + curLimit;
	clientTimestamp= Loader.#hotFeedTimeStamp
	try{
		const posts = await client
		.service(authMode ? "trendfeed" : "trendfeed-exposable")
		.find({
		  query: {
			clientTimestamp,
      version:"2",
      skip:Loader.#trendActivities.length,
      limit:20
		  },
		})
		.then(async (posts) => {
		  //save all new values in cookieStorage
		  //Loader.#HotAndSticky.curOffTrend = newOffset;
		  //if (!resetList) Loader.#HotAndSticky.curLmtTrend = newLimit;
		  if (posts?.data?.length > 0) {
			  let starredAt = posts.data[posts.data.length-1].starredAt-1;
			  Loader.#hotFeedTimeStamp=starredAt
		  }
		  return posts;
		})
		.then((posts) => {
		  let sliceOffset = Loader.#trendActivities.length;
		  if (posts) {
			if (resetList) {
			  Loader.#trendActivities = posts.data;
			  sliceOffset = 0;
			} else {
			  for (let i = 0; i < posts.data.length; i++) {
				let found = false;
  
				for (let j = 0; j < Loader.#trendActivities.length; j++)
				  if (Loader.#trendActivities[j]._id == posts.data[i]._id)
					found = true; //prevents race condition
  
				if (!found) Loader.#trendActivities.push(posts.data[i]);
			  }
			}
		  }
		  return Loader.#trendActivities.slice(sliceOffset);
		});
	  if (posts.length === 0) {
		return false;
	  }
	  if (!posts)
		throw new Error(`Something went wrong while loading the hot feed`);
		// 2. put into local posts
    runInAction(() => (Loader.#localPosts.push_posts_hot = posts));
	}catch (err) {
		console.log(err,"the error")
	}

   

    
  }

  /**
   * 	LoadMe()
   * 	Load the me feed
   * 	William Doyle
   * 	Aug 13th 2021
   */
  static async LoadMe(resetList) {
    const messages = true;
   // messages && console.log(`Inside LoadMe -->  👋`);
    let clientTimestamp = new Date().getTime();
    function appendDates(dateArr, dates) {
      if (dateArr == null || dateArr == "" || dateArr == undefined) {
        dateArr = dates;
      } else {
        //re-assigning values ( might get new values)
        dateArr = dates;
        dateArr.forEach(function (part, index, theArray) {
          theArray[index] = Number(theArray[index].replace(/_/g, ""));
        });
        dateArr.sort((a, b) => b - a);

        dateArr.forEach((part, index, theArray) => {
          theArray[index] = spliceString(String(theArray[index]), 4, 0, "_");
          theArray[index] = spliceString(theArray[index], 7, 0, "_");
        });
      }
      Loader.#postDateArr = dateArr.join(",");
    }

    if (typeof window === "undefined") {
      console.warn(
        "💥 still on server side trying to render, will not load Me Feed from server.. returning early"
      );
      return;
    }

    //messages && console.log(`💥 inside LoadMe`);

    if (resetList) {
      Loader.#postDateArr = "";
      Loader.#meFeedTimeStamp = new Date().getTime();
    }

    const initialOffset = clone_nf(Loader.#postIniOffset);
    const currentOffset = clone_nf(Loader.#postCurOffset);
    const newOffset = initialOffset + currentOffset;
    const initialLimit = clone_nf(Loader.#postIniLimit);
    const curLimit = clone_nf(Loader.#postCurLimit);
    let bannerIndex = clone_nf(Loader.#bannerIndex);
    let newBannerIndex = bannerIndex;

    let dateArr = Loader.#postDateArr;
    let newLimit = curLimit;

    if (dateArr != null)
      dateArr = dateArr
        .split(",")
        .slice(currentOffset - initialOffset, currentOffset); //last parameter should be greather than first

    if (!resetList) newLimit = initialLimit + curLimit;
    clientTimestamp = Loader.#meFeedTimeStamp;
    const posts = await client
      .service("posts")
      .find({
        query: {
          //limit: newLimit,
          feed: "todayfeed",
          //dates: dateArr,
          clientTimestamp,
        },
      })
      .then(async (posts) => {
        //console.log(posts,"hahaha")
        //save all new values in static private memebers
        // Loader.#postCurOffset = newOffset.toString();
        // if (!resetList)
        // 	Loader.#postCurLimit = newLimit.toString();
        // if (posts.dates.length > 0)
        // 	appendDates(dateArr, posts.dates);
        let newTimestamp = clientTimestamp;
        if (posts.data.length > 0) {
          newTimestamp = posts.data[posts.data.length - 1].createdAt - 1;
        }
        Loader.#meFeedTimeStamp = newTimestamp;
        return posts;
      })
      .then(
        action("retrievePosts", (posts) => {
          if (posts) {
            if (resetList) {
              Loader.#_userPosts = posts.data;
              if (
                Loader.#_userPosts.length > 8 &&
                Loader.#nextChallenges.filter(
                  (challenge) => challenge.category === "hashtag"
                ).length !== 0
              ) {
                Loader.#_userPosts.splice(1, 0, {
                  _id: "banner",
                });
                newBannerIndex = 1;
                bannerIndex = newBannerIndex;
                Loader.#bannerIndex = String(bannerIndex);
              }
              return Loader.#_userPosts;
            } else {
              let sliceOffset = Loader.#_userPosts.length;

              for (let i = 0; i < posts.data.length; i++) {
                let found = false;

                for (let j = 0; j < Loader.#_userPosts.length; j++) {
                  if (Loader.#_userPosts[j]._id == posts.data[i]._id) {
                    found = true; //prevents race condition
                  }
                  if (Loader.#_userPosts[j]._id === "banner") {
                    Loader.#_userPosts.splice(j, 1);
                  }
                }

                if (!found) {
                  Loader.#_userPosts.push(posts.data[i]);
                }
              }
              if (bannerIndex + 25 + 1 <= Loader.#_userPosts.length) {
                newBannerIndex = bannerIndex + 25;
                Loader.#_userPosts.splice(newBannerIndex, 0, { _id: "banner" });
                bannerIndex = newBannerIndex;
                Loader.#bannerIndex = String(bannerIndex);
              }
              return Loader.#_userPosts.slice(sliceOffset);
            }
          } else return [];
        })
      );
    if (posts.length === 0) {
      return false;
    }
    // console.log(posts);
    runInAction(() => (Loader.#localPosts.push_posts_me = posts));
  }

  /**
   *	LoadProfile()
   * 	Load Profile content into local posts
   * 	Aug 16th 2021
   * 	William Doyle
   * */
  static async LoadProfile(
    userId,
    resetStip = false,
    forceReturn = false,
    loadingInstructions = undefined
  ) {
    if (loadingInstructions) {
      if ("current_length" in loadingInstructions)
        Loader.#profile_skip = loadingInstructions.current_length;
    }

    if (
      Loader.#localPosts?.posts_profile.length > 0 &&
      userId !== Loader.#localPosts.posts_profile[0].userId
    ) {
      // IF POSTS_PROFILE (ARRAY) HAS CONTENT FROM ANOTHER USER WE NEED TO FIRST DELETE THOSE POSTS
      Loader.#localPosts.setPosts_profile = [];
      Loader.#profile_skip = 0;
    }

    if (resetStip) Loader.#profile_skip = 0;

    if (!userId)
      throw new Error(`No user specified in call to "LoadProfile()" ${userId}`);

    // console.log(`#profile_skip is ${Loader.#profile_skip}`);

    // const { data } = await client.service(this.authStore.isAuthenticated ? 'posts-db' : 'exposed-posts-db').find({
    const { data } = await client.service("exposed-posts-db").find({
      query: {
        $limit: 12,
        $skip: Loader.#profile_skip,
        userId: userId,
        deletedAt: null,
        userPosts: "userPosts",
        $sort: {
          _id: 1,
        },
      },
    });
    if (data.length === 0) {
      return false;
    }

    Loader.#profile_skip += data.length;
    Loader.#localPosts.push_to_posts_profile(data);

    if (forceReturn) return data;
  }

  /**
   *	LoadNotif()
   * 	Load posts found in notifications
   * 	Aug 16th 2021
   * 	William Doyle
   * */
  static async LoadNotif(postId) {
		try{
			client.reAuthenticate();
		}
		catch(err){
			return;
		}
    try{
			client.reAuthenticate();
		}
		catch(err){
			return;
		}
    const post = await client.service("posts").get(postId);
    Loader.#localPosts.unshift_to_posts_notif(post);
  }

  /**
   *	LoadSingle()
   * 	Load post when a user uses a direct link to a post
   * 	Aug 16th 2021 && Sep 15th 2021
   * 	William Doyle && Kasra Naderi
   *
   * 	@param {string} postId
   * */
  static async LoadSingle(post) {
    Loader.#localPosts.setPosts_single(post);
    Loader.#localPosts.push_posts_single(post);
  }

  /**
   *	LoadComments()
   *
   * 	Aug 16th 2021
   * 	William Doyle
   * */
   static async LoadComments(parentPostId, skip , forceReturn = false) {
		// const comments = await Loader.#fetchComments(parentPostId, skip, 20);
		
		if (!skip) {
			skip = 0;
		  }
		try{
			const comments = await client.service('comments').find({
				query: {
					parentPostId: parentPostId,
					$skip: skip,
					$limit: 20,
				},
			});
			Loader.#localPosts.setComments = comments.data;
			if (forceReturn)
				return comments.data;
		}catch(err){
			if(err?.type === "FeathersError" && err?.className === "not-authenticated"){
				return []
			}
			throw err;

		}

		
	}

  static async #fetchComments(parentPostId, skip, limit) {
    return await client.service("comments").find({
      query: {
        parentPostId: parentPostId,
        $skip: skip,
        $limit: limit,
      },
    });
  }

  /**
   * 	LoadHotMe()
   * 	Load both hot and me feeds
   * 	Aug 17th 2021
   * 	William Doyle
   * */
  static async LoadHotMe() {
    // console.log(`🎲STUB LoadHotMe()`);
    await Promise.all([Loader.LoadHot(), Loader.LoadMe(false)]);
  }
}