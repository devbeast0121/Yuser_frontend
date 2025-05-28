"use strict";
import Hls from 'hls.js'

export default function setupHls (props, videoRef, hlsRef) {

	if (!videoRef?.current) 						// early exit if no video 
			return;

		if (videoRef?.current?.canPlayType('application/vnd.apple.mpegurl')) {
			videoRef.current.src = props.src; 								// This will run in safari, where HLS is supported natively
			return;
		}
		if (Hls.isSupported()) {								// This will run in all other modern browsers
			hlsRef.current = new Hls();
			hlsRef.current.loadSource(props.src);
			hlsRef.current.attachMedia(videoRef?.current);
			return;
		}
		return console.error('This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API');
}