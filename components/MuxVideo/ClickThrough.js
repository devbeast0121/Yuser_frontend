import videojs from "video.js";
import "video.js/dist/video-js.css";

/*
	class Scrubber 
	William Doyle
	Aug 11th 2021
*/
export default class ClickThrough extends videojs.getComponent('Button') {
	constructor(player, options = {}) {
		super(player, options);
		this.addClass('vjs-clickthrough');
	}

	clickHandler(evt) {
		alert(`code to load modal here`);
	}
}
videojs.registerComponent('vjs-clickthrough', ClickThrough); // register mute button with video js