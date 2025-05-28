/*
	A file for simple reusable functions with not state dependence. 
	Mobx should make no apprerence here 
	All functions should be pure functions

	P U R E   F U N C T I O N S   O N L Y 

	Comment your functions and keep them short. 

	Make constants immutable
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
*/


import * as crypto from 'crypto';


/*		hash()
 *		@in [
 *			input: string
 *				The thing to hash
 *			algo: optional string
 *				the hash algorithum to use. Defaults to SHA256
 *		]
 *		@out hash of input
 *		William Doyle
 *		pre september 6th 2021
 * */
export function hash(input, algo = 'SHA256') {
	const hash = crypto.createHash(algo);
	hash.update(input).end();
	return hash.digest('hex');
}


/**
 * 	deepFreeze()
 * 	Make an object immutable and return it;
 * 	taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * 	on September 1st 2021
 * 	by William Doyle
 */
export function deepFreeze(object) {
	// Retrieve the property names defined on object
	const propNames = Object.getOwnPropertyNames(object);
	// Freeze properties before freezing self
	for (const name of propNames) {
		const value = object[name];

		if (value && typeof value === "object") {
			deepFreeze(value);
		}
	}
	return Object.freeze(object);
}


/**
 * 	typeid()
 * 	get basic type info for objects which are instances of classes
 * 	William Doyle
 * 	Sep 1st 2021
 */
export function typeid(obj) {
	return Object.freeze({
		name: obj?.constructor?.name,
		//	before: ,
		//hash_code: ,
	});

}


/**
 * 	Generator function for random color
 * 	Why? Because its awesome
 * 	William Doyle
 * 	Aug 30th 2021
 * */
export function* Generator_RandomColor() {
	for (; ;)
		yield RandomColor();
}

/**
 * 	RandomColor()
 * 	William Doyle
 * 	Aug 30th 2021
 * */
export function RandomColor() {
	function randomHexNumeral() {
		return (Math.random() * 16 | 0).toString(16);
	}
	return `#${randomHexNumeral()}${randomHexNumeral()}${randomHexNumeral()}`;
}

/**
 * vout() 
 * verbous output
 * pass a function and if sentinal is set to true it will be run
 * intended to be used to turn on and off most of our console logs
 * William Doyle
 * Aug 18th 2021
*/
export function vout(fun) {
	const dev = !true;
	if (dev)
		fun();
}

/**
 * 	pruneArray()
 * 	@params
 * 		arr : Array
 * 	Take array by ref and remove duplicates
 * 	Aug 19th 2021
 * 	William Doyle
 * */
export function pruneArray(arr) {
	return [...new Set(arr)];
}

export function prunePosts(arr) {
	const o = {};
	arr.forEach(element => {
		o[element._id] = element;
	});

	return Object.values(o);
}

/*
	ImageUrl()
	take the asset code of an image and return the the imgix url for said image
	William Doyle
	Some time before July 19th 2021
*/
export function ImageUrl(asset, size,heightWidthObj,grid = false,homepageGrid = false) {
	__checkAssetType(asset);
	let {height:maxHeight,width:maxWidth} = heightWidthObj || {}
	//console.log(heightWidthObj);
	if (maxWidth && maxHeight){
		if(grid === true || homepageGrid === true){
			return `https://yuser.imgix.net/${asset}?fit=min&crop=faces,focalpoint,entropy,top&fill=blur&fm=webp$auto=format&dpr=2&h=${maxHeight}&w=${maxWidth}`
		}
		return `https://yuser.imgix.net/${asset}?fit=fillmax&fill=blur&fm=webp$auto=format&dpr=1`
	}
	else if(size){
		if (size === 's')
			return ImageUrl_sml(asset);
		if (size === 'm')
			return ImageUrl_med(asset);
		if (size === 'l')
			return ImageUrl_lrg(asset);
	}
	return `https://yuser.imgix.net/${asset}?fm=webp$auto=format&dpr=1`;

}

function ImageUrl_lrg(asset) {
	return `https://yuser.imgix.net/${asset}?fit=clip&w=1920&fm=webp$auto=format&dpr=1`;
}

function ImageUrl_med(asset) {
	return `https://yuser.imgix.net/${asset}?fit=clip&w=440&fm=webp$auto=format&dpr=2`;
}

function ImageUrl_sml(asset) {
	return `https://yuser.imgix.net/${asset}?fit=clip&w=65&fm=webp$auto=format&dpr=2`;
}

/*
	ImageUrl_safe_avatar()
	like ImageUrl but with the added safty of a default user profile picture
	William Doyle
	Some time before July 30th 2021
*/
export function ImageUrl_safe_avatar(asset) {
	const default_avatar_asset = "ikfWqTonZDTlXlEcP9voP"; // replace with IPFS of default YUSER avatar
	if (typeof asset !== 'string')
		return `https://yuser.imgix.net/${default_avatar_asset}?fit=clip&w=100&fm=webp$auto=format&dpr=2`;
	//return `https://ipfs.io/ipfs/QmVredC4AXi7yRv4LB6YKzF2kyM3GUB5RYWpfPUmdHjGWm?filename=PXL_20210730_153554272.jpg`;
	//	console.log(`william needs to give this function some love`);
	return `https://yuser.imgix.net/${asset}?fit=clip&w=100&fm=webp$auto=format&dpr=2`;
}

/*
	GifUrl()
	Take imgix asset code, return url to view asset as animated gif
	William Doyle
	July 26th 2021
*/
export function GifUrl(asset,size,heightWidthObj,grid=false,homepageGrid=false) {
	__checkAssetType(asset);
	let {height:maxHeight,width:maxWidth} = heightWidthObj || {}
	if (maxWidth && maxHeight){
		if(homepageGrid === true){
			return `https://yuser.imgix.net/${asset}?fit=crop&crop=faces,focalpoint,entropy,top&fm=animatedgif&dpr=1&h=${maxHeight}&w=${maxWidth}`
		}
		if(grid === true){
			return `https://yuser.imgix.net/${asset}?fit=crop&crop=faces,focalpoint,entropy,top&fm=mp4&dpr=1&h=${maxHeight}&w=${maxWidth}`
		}
		return `https://yuser.imgix.net/${asset}?fm=mp4&fit=fillmax`
	}
	else if(size){
		switch(size){
			case 'l':
				return `https://yuser.imgix.net/${asset}?fm=mp4&fit=fillmax&w=1920`
			case 'm':
				return `https://yuser.imgix.net/${asset}?fm=mp4&fit=fillmax&w=250`
			case 's':
				return `https://yuser.imgix.net/${asset}?fm=mp4&fit=fillmax&w=65`
			default:
				return `https://yuser.imgix.net/${asset}?fm=mp4&fit=fillmax&w=1200`
		}
	}

	return `https://yuser.imgix.net/${asset}?fm=mp4&fit=fillmax`
}

/*
	VideoUrl()
	Take mux asset code, return url to view asset
	William Doyle
	~July 26th 2021
*/
export function VideoUrl(asset) {
	__checkAssetType(asset);
	return `https://stream.mux.com/${asset}.m3u8`;
}


/*
	DetermineSource()
	take an asset and its type and return a usable form of the asset
	William Doyle
	~July 19th 2021
	*/
	export function DetermineSource(_asset, _type, _size, _maxHeightWidthObj,grid=false,homepageGrid=false) {
	switch (_type) {
		case 'image/gif':
			return GifUrl(_asset,_size,_maxHeightWidthObj,grid,_size,_maxHeightWidthObj,grid,homepageGrid);
		case 'image/jpeg':
		case 'image/png':
			return ImageUrl(_asset, _size,_maxHeightWidthObj,grid,homepageGrid);
		case 'audio/x-wav':
		case 'audio/vnd.wave':
		case 'image/video/audio':
		case 'video/mp4':
		case "audio/mp4a-latm":		// audio posts are handled the same way as videos
		case "audio/mpeg":
		case "audio/x-m4a":
			return VideoUrl(_asset);
		default: {
			console.log(`%cunknown type "${_type}" provided to function DetermineSource`, `color: green`);
			// throw error?
			break;
		}
	}
}


/*
	clone_nf()
	Alis of clone_NoFunctions()
	William Doyle
	July 28th 2021
*/
export function clone_nf(obj) {
	return clone_NoFunctions(obj);
}

/*
	clone_NoFunctions()
	Take an object and return a value copy of it but drop the functions it may have
	William Doyle
	July 28th 2021
*/
export function clone_NoFunctions(obj) {
	return JSON.parse(JSON.stringify(obj));
}


/*
	MakePostUrl()
	takes base url of client side website and a post id and combines them into a post url
	William Doyle
	July 29th 2021
*/
export function MakePostUrl(cs_base_url, pid) {
	return `${cs_base_url}/post/${pid}`;
}

export function spliceString(string, idx, rem, str) {
	return string.slice(0, idx) + str + string.slice(idx + Math.abs(rem));
}

// C O N S T A N T S   N O T   C O N S I D E R E D   S E T T I N G S 

// list of mime types that can be considered `images`
export const ImageTypes = Object.freeze([
	'image/gif',
	'image/jpeg',
	'image/png',
]);

// list of mime types that can be considered `playable` like videos and audio posts (which are videos)
export const PlayableTypes = Object.freeze([
	'image/video/audio',
	'video/mp4',
	"audio/mp4a-latm",
	"audio/mpeg",
]);


// H I D D E N    F U N C T I O N S 
function __checkAssetType(asset) {
	if (typeof asset !== 'string') {
		const emsg = `Asset must be a string! Got "${asset}"`;
		console.error(emsg);
		//throw new Error(emsg);
	}
}

// take the asset code of an avatar and return the the imgix url for said avatar

export function AvatarUrl(assetAvatar, size) {
	if (assetAvatar == "" || assetAvatar == null || assetAvatar == undefined) {
		return null 
	}

	let asset = assetAvatar

	if (assetAvatar.startsWith("https://yuser.imgix.net")) {
		let partAsset = assetAvatar.substring(24)
		asset = partAsset.substring(0, partAsset.indexOf('?'));
	}

	if (!size)
		return `https://yuser.imgix.net/${asset}?fit=clip&w=80&fm=jpg&dpr=2`;

	if (size === 's')
		return AvatarUrl_sml(asset);
	if (size === 'm')
		return AvatarUrl_med(asset);
	if (size === 'l')
		return AvatarUrl_lrg(asset);

	return `https://yuser.imgix.net/${asset}?fit=clip&w=80&fm=webp$auto=format&dpr=2`;
}

function AvatarUrl_lrg(asset) {
	return `https://yuser.imgix.net/${asset}?fit=clip&w=80&fm=webp$auto=format&dpr=2`;
}

function AvatarUrl_med(asset) {
	return `https://yuser.imgix.net/${asset}?fit=clip&w=40&fm=webp$auto=format&dpr=2`;
}

function AvatarUrl_sml(asset) {
	return `https://yuser.imgix.net/${asset}?fit=clip&w=20&fm=webp$auto=format&dpr=2`;
}