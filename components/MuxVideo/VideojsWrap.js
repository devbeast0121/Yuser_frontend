import videojs from "video.js";
import "video.js/dist/video-js.css";
import MuteButton from './MuteButton';
import PlayButton from './PlayButton';

export class ButtonsWrap extends videojs.getComponent('Component') {
	constructor(player, options = {}) {
		super(player, options);
		this?.addClass('vjs-buttonswrap');
		this?.addChild(new PlayButton(player));
		this?.addChild(new MuteButton(player));
	}
}
videojs.registerComponent('vjs-buttonswrap', ButtonsWrap); // register mute button with video js