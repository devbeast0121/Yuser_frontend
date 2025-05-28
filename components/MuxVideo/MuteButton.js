import videojs from "video.js";
import "video.js/dist/video-js.css";

/*
	class MuteButton
	a videojs custom component (don't think about react right now) for muting and unmuting a video
	::might not need to make own class here but I'm going to leave it for now. I think it will be handy later
	William Doyle
	Aug 11th 2021
*/
export default class MuteButton extends videojs.getComponent('MuteToggle') {
	constructor(player, options = {}) {
		super(player, options);
		this.addClass('vjs-mute-button');
		this.on('click',(event)=>{
			event.stopPropagation();
		})
	}
}
videojs.registerComponent('vjs-mute-button', MuteButton); // register mute button with video js