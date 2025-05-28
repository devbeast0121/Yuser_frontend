import React, { useEffect, useRef, } from 'react';
import Hls from 'hls.js'
import useShouldPlay from '../../Hooks/useShouldPlay';
import VideoQueue from '../../stores/VideoQueue';
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { ButtonsWrap } from './VideojsWrap';
import { deepFreeze, typeid } from '../../stores/tools';

// https://docs.videojs.com/tutorial-react.html <-- start here if you are trying to fix problems -- wdd September 1st 2021
// maybe issue is this: https://docs.videojs.com/tutorial-troubleshooting.html#videojs-errors

export default function MuxVideo(props) {
	const videoRef = useRef(null);		// the video ... 	clasic HTML5 we all know and love
	const playerRef = useRef(null);		// video Player...	video js stuff .. instance of class `Player` 
	const hlsRef = useRef(null);		// hls...		add support for propritary video type

	const isVisible = typeof window === 'undefined' ? false : useShouldPlay(videoRef);

	// options used by videojs Player object
	const options = deepFreeze({
		controlBar: {
			fullscreenToggle: false,
			playToggle: {
				replay: true,
			},
		},
		bigPlayButton: false,
	});

	//  when we open a video post in the PostModal... that video goes to the front of the queue
	useEffect(() => {
		if (!props?.singleMode || !videoRef?.current)
			return;

		VideoQueue.unshift(videoRef.current, true);		// put video at front of queue

		return function cleanup() {
			if (props?.singleMode)
				VideoQueue.shift(true);			// remove front element of queue .. .notice that we don't use cancelRef here...
		}
	}, [props?.singleMode]);

	/**
	 * 	Manages VideoQueue but is pretty much unrelated to videojs.
	 * 	
	 * 	singleMode::	causes this code to be skipped because in single mode other videos are not 
	 * 			playing. Thus we don't need to manage a "play queue"
	 * 	isVisable::	the video is visable on the screen and if there are no other videos playing
	 * 			this video will play. If there are videos playing it will wait until it is 
	 * 			the only video, or the all videos on the screen are younger than it , and 
	 * 			then it will play.
	 * 	cancelRef:: 	Will remove the video from the queue. It will also make sure there are no 
	 * 			duplicates of that video hanging around in the queue. 
	 */
	useEffect(() => {
		if (props?.singleMode)
			return;

		// do nothing if the video being referenced is not ready
		if (videoRef === null || !videoRef?.current)
			return;

		if (isVisible) {
			VideoQueue.enqueue(videoRef.current);
			if (VideoQueue.top === videoRef.current)
				VideoQueue.play(); 							// play the proper video from the queue... may or may not be this video
			return;
		}

		videoRef?.current?.pause()?.catch(e => console.log(e)); 				// pause sometimes throws an error but it never seems to be an issue
		VideoQueue.cancelRef(videoRef.current);
		VideoQueue.play(); 									// play the proper video from the queue... may or may not be this video
	}, [isVisible, props?.singleMode,]);


	// setup videojs and HLS
	useEffect(() => {
		if (!videoRef?.current || playerRef?.current) 						// early exit if no video or already have player
			return;

		playerRef.current = videojs(videoRef?.current, options, () => console?.log());
		console.info(typeid(playerRef?.current).name);

		// list the videojs components that need to be removed from the videos control bar
		const unwantedVideoJsComponents = deepFreeze([
			'playToggle',
			'volumePanel',
			'durationDisplay',
			'remainingTimeDisplay',
		]);

		// add the videojs buttons
		playerRef?.current?.getChild("controlBar")?.addChild(new ButtonsWrap(playerRef?.current));

		// remove videojs junk
		unwantedVideoJsComponents.forEach(removableEl => playerRef?.current?.getChild('controlBar')?.removeChild(removableEl));

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
	}, [props.src, videoRef]);

	// useEffect used only for clean up code
	useEffect(() => {
		return function cleanup() {
			VideoQueue.cancelRef(videoRef?.current);
			if (playerRef.current) {
				// console.log(`🧹🎞️ --cleaning up video player. Type is "${typeid(playerRef.current).name}" this will not work if it is not "Player"`);
				playerRef.current?.dispose();
				playerRef.current = null;
			}
			if (hlsRef.current) {
				// console.log(`🧹🎞️ --cleaning up hls. Type check --> "${typeid(hlsRef.current).name}"`);
				hlsRef.current.destroy();
				hlsRef.current = null;
			}
		}
	}, [])

	return (
		<div data-vjs-player >
			<video
				loop
				controls 
				preload="metadata"
				ref={videoRef}
				poster={props.poster}
				className="video-js"
				autoPlay= {props.singleMode ? true : false}
				onError={(e) =>{e.currentTarget.src ="https://yuser-assets.imgix.net/processingImage.png?fit=clip&w=200&fm=webp$auto=format&dpr=2"; e.target.onError = null;}} 
			>
				{/* 	DUE TO BUG IN VIDEO.JS SOURCE TAG IS REQUIRED TO ALLOW VIDEO.JS TO RESTART PLAY
					PAUSE WORKS JUST FINE BUT WITHOUT THIS TAG BUT TRYING TO PLAY DOES NOTHING (NOT EVEN THROW AN ERROR)
					https://github.com/videojs/video.js/issues/6014
					TO MAKE THINGS WORSE PostModal WILL NOT AUTOMATICALLY PLAY IF THIS TAG _IS_ HERE 
					THE "SOLUTION" IS CURRENTLY TO INCLUDE THE TAG WHEN NOT IN SINGLE MODE AND REMOVE IT WHEN IN SINGLE MODE
					HOWEVER, THIS SUCKS BECAUSE IT MEANS WHEN VIEWING A VIDEO VIA PostModal, IT WILL PLAY ON START BUT 
					IF PAUSED IT CANNOT BE RESUMED!
				*/
					<source src={props.src} />
				}
			</video>
		</div>
	);
}