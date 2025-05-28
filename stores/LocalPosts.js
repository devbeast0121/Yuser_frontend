/*
	class to be accessed via RootStore.js
	but should probably not need any reference to mobx in this file
	that stuff will be managed by rootstore.js or whatever

	TODO: come in here and remove everything not in use... some of these functions are werid and don't act as expected.
	TODO: make singleton (maybe)
	TODO: Have option to use set____ to also set commenst
	TODO: Make setters use JS setter syntax
*/

import { action, observable, computed, runInAction, makeAutoObservable, toJS } from 'mobx'
import { clone_nf } from "./tools.js";


class _LocalPosts {

	// @observable  instance = new LocalPosts([], []);

	@observable posts_hot		// hot
	@observable posts_me		// me
	@observable comments		// current comments
	@observable posts_profile	// profile posts
	@observable posts_notif		// notification posts
	@observable posts_single	// single view posts -- still an array | might only hold 1 element
	@observable dashboard_posts // Posts for the ananlytics dashboard

	constructor() {
		this.postInHot = this.postInHot.bind(this);
		makeAutoObservable(this);
		this.posts_hot = [];
		this.posts_me = [];
		this.posts_profile = [];
		this.posts_notif = [];
		this.posts_single = [];
		this.comments = [];
		this.dashboard_posts = [];
	}

	/*
		clearAll()
		empty all the arrays
		William Doyle
		Aug 9th 2021
	*/
	@action clearAll() {
		this.posts_hot = [];
		this.posts_me = [];
		this.posts_profile = [];
		this.posts_notif = [];
		this.posts_single = [];
		this.comments = [];
		this.dashboard_posts = [];
	}

	/*
		Make sure the post is updated locally to reflect new gifted activity

		:: needs new name `setGifted` is no good because this isn't really a setter.  A mutater yes but not a setter -wdd Aug 5th 2021 
	*/
	@action setGifted(_postId, _amount) {
		function GiftByArray(parr, postId, amount) {
			const tmpPost = parr.find(p => p._id === postId);
			if (tmpPost === undefined)
				return 0;
			tmpPost.gems += amount;
			tmpPost.gifted += amount;
			tmpPost.hasGifted = true;
			return 1;
		}
		if (
			GiftByArray(this.posts_hot, _postId, _amount) +
			GiftByArray(this.posts_me, _postId, _amount) +
			GiftByArray(this.posts_profile, _postId, _amount) +
			GiftByArray(this.posts_notif, _postId, _amount) +
			GiftByArray(this.posts_single, _postId, _amount) + 
			GiftByArray(this.dashboard_posts, _postId,_amount)
			< 1)
			return console.error(`😬 could not find post with id ${postId}. The gift may or may not have been sent but will not be visable to this client untill posts are reloaded..`);
		return //console.info(`👍💎 ${_amount}, ${tmpPost?.gifted ?? "missing data"}`);
	}

	@action set setComments(_comments) {
		this.comments = _comments;
	}


	///	H O T   F E E D   S E T T E R S //////////////////////////////////////// 
	@action set setPosts_hot(_posts) {
		this.posts_hot = _posts;
		this.comments = []; // clear when change posts
	}

	@action set push_posts_hot(_posts) {
		this.posts_hot.push(..._posts);
	}
	//////////////////////////////////////////////////////////////////////////////// 

	///	M E   F E E D   S E T T E R S //////////////////////////////////////// 
	@action set setPosts_me(_posts,) {
		this.posts_me = _posts;
		this.comments = []; // clear when change posts
	}

	@action set push_posts_me(_posts) {
		this.posts_me.push(..._posts);
	}

	//////////////////////////////////////////////////////////////////////////////// 


/**
	* Dashboard feed setters
	*/
	@action set setPosts_dashboard(_posts){
		this.dashboard_posts = _posts;
		this.comments = [];
	}

	@action set push_posts_dashboard(_posts){
		this.dashboard_posts.push(..._posts)
	}
	///////////////////////////////////////////

	@action set setPosts_single(_post) {
		this.posts_single = _post;
		this.comments = []; // clear when change posts
	}

	@action set push_posts_single(_post) {
		this.posts_single.push(_post);
	}

	@action set setPosts_profile(_posts) {
		this.posts_profile = _posts;
		this.comments = []; // clear when change posts
	}

	@action push_to_posts_profile(npost) {
		if (Array.isArray(npost))
			this.posts_profile.push(...npost);
		else
			this.posts_profile.push(npost);
	}

	/*
		setPosts_notif
		@setter
		set post_notif to assigned value (should be an array) and clear comments
		William Doyle
		Aug 5th 2021
	*/
	@action set setPosts_notif(_posts) {
		this.posts_notif = _posts;
		this.comments = []; // clear when change posts
	}

	/*
		push_to_posts_notif()
		push a new element to posts notif
		William Doyle
		Aug 5th 2021
	*/
	@action push_to_posts_notif(npost) {
		this.posts_notif.push(npost);
	}

	// like push to posts notig but pusts at the front
	@action unshift_to_posts_notif(npost) {
		this.posts_notif.unshift(npost);
	}

	/*
		getPosts_notif
		@getter
		get array called this.posts_notif in a safe way (normal and non observable js object)
		if you want an observale just access this.posts_notifs 
	*/
	get getPosts_notif() {
		return clone_nf(toJS(this.posts_notif));
	}

	get getPosts_single() {
		return clone_nf(toJS(this.posts_single));
	}

	get getComments() {
		return clone_nf(toJS(this.comments));
	}

	// gift comment
	@action giftComment(comment, stones) {
		if (this.comments === [])
			console.error(`comments is empty.. did you forget run rootstore.setSelectedPost() `);
		const found = this.comments.flatMap(com => [com, ...((com?.replies?.length > 0) ? com.replies : [])]).find(c => c._id === comment._id);
		if (found === undefined) {
			console.error(`could not find that comment locally. Strange.`);
			return;
		}
		const found2 = this.comments.flatMap(com => [com, ...((com?.replies?.length > 0) ? com.replies : [])]).find(c => c._id === comment._id);
		// console.log(`found2.totalgems is ${found2.totalgems}`);
		found.gifted += stones;
		found.totalgems += stones;
		const found3 = this.comments.flatMap(com => [com, ...((com?.replies?.length > 0) ? com.replies : [])]).find(c => c._id === comment._id);
		// console.log(`found3.totalgems is ${found3.totalgems}`);
	}

	getById(postId) {
		const wantedPost = [
			...this.posts_hot,
			...this.posts_me,
			...this.posts_profile,
			...this.posts_notif,
			...this.posts_single,
			...this.dashboard_posts,
		].find(p => p._id === postId);
		if (wantedPost === undefined)
			throw new Error(`no post with id "${postId}" found!`);
		return JSON.parse(JSON.stringify(wantedPost));
	}

	@action addComment(postId, { text, user }) {
		function CommentByArray(parr, _postId) {
			const tmpPost = parr.find(p => p._id === _postId);
			if (tmpPost === undefined)
				return 0;
			tmpPost.comments++;
			return 1;
		}

		if (
			CommentByArray(this.posts_hot, postId) +
			CommentByArray(this.posts_me, postId) +
			CommentByArray(this.posts_profile, postId) +
			CommentByArray(this.posts_notif, postId) +
			CommentByArray(this.posts_single, postId) + 
			CommentByArray(this.dashboard_posts,postId)
			< 1) {
			console.warn(`could not find post with id ${postId}. The comment may or may not have been sent but the comment count WILL NOT increment`);
			//	return;
		}
		this.comments.unshift({ text: text, gifted: 0, totalgems: 0, _id: 'unknown', user: user, userId: (user._id || user.id) })
	}

	/*
		hasPost()
		takes a post's id and returns true if that post can be fount in 1 of the arrays of posts belonging to this
		William Doyle
		Aug 5th 2021
	*/
	hasPost(postId) {
		function beSafe(parr) {
			return clone_nf(toJS(parr));
		}

		const arr = [
			...beSafe(this.posts_hot),
			...beSafe(this.posts_me),
			...beSafe(this.posts_profile),
			...beSafe(this.posts_notif),
			...beSafe(this.posts_single),
			...beSafe(this.dashboard_posts)
		];

		if (arr.findIndex(el => el?._id === postId) === -1)
			return false;
		return true;
	}

	postInHot(postId){
		function beSafe(parr) {
			return clone_nf(toJS(parr));
		}
		const arr = [...beSafe(this.posts_hot)];
		
		if(arr.findIndex(el=> el?._id === postId) === -1)
			return false;
		return true;
	}

	/**
	 * 	prune()
	 * 	remove duplicates from the arrays
	 * 	you should try and avoid using this but we've got to get moving
	 * 	Aug 19th 2021
	 * 	William Doyle
	 * */
	@action prune() {
		this.posts_hot = [... new Set(this.posts_hot)];
		this.posts_me = [... new Set(this.posts_me)];
		this.comments = [... new Set(this.comments)];
		this.posts_profile = [... new Set(this.posts_profile)];
		this.posts_notif = [... new Set(this.posts_notif)];
		this.posts_single = [... new Set(this.posts_single)];
		this.dashboard_posts = [... new Set(this.dashboard_posts)];
	}
}

export default class LocalPosts {
	static lp = new _LocalPosts();
	static getInstance() {
		return LocalPosts.lp;
	}
}