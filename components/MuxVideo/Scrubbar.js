import videojs from "video.js";
import "video.js/dist/video-js.css";

/*
	class Scrubber 
	William Doyle
	Aug 11th 2021
*/
export default class Scrubber extends videojs.getComponent('SeekBar') {
	constructor(player, options = {}) {
		super(player, options);
		this.addClass('vjs-scrubber');
	}
}
videojs.registerComponent('vjs-scrubber', Scrubber); // register mute button with video js