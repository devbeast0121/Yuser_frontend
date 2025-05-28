import videojs from "video.js";
import "video.js/dist/video-js.css";

/*
	class PlayButton
	like mute button but for play/pause
	::might not need to make own class here but I'm going to leave it for now
	William Doyle
	Aug 11th 2021
*/
export default class PlayButton extends videojs.getComponent('PlayToggle') {
	constructor(player, options = {}) {
		super(player, options);
		this.addClass('vjs-play-button');
		this.on('click',(event)=>{
			event.stopPropagation();
		})
	}
}
videojs.registerComponent('vjs-play-button', PlayButton); // register play button with video js