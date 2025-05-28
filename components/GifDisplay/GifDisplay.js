import React, { useEffect } from 'react';
import { DetermineSource } from '../../stores/tools.js';
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Hls from 'hls.js'


/*
	GifDisplay
	William Doyle
	March 28th 2022
	Display a gif as an image with no sound, no controls, and in a loop
	hide the controls
*/
export default function GifDisplay({ post, size, maxHeight,maxWidth, grid=false }) {
	const videoRef = React.useRef(null);
	const playerRef = React.useRef(null);

	// options used by videojs Player object
	const options = {
		controlBar: {
			fullscreenToggle: false,
			playToggle: {
				replay: true,
			},
		},
		bigPlayButton: false,
	};

	React.useEffect(() => {
		if (!videoRef?.current)
			return;
		const call_video_play = () => videoRef.current?.play();
		videoRef.current.addEventListener('canplay', call_video_play);
		playerRef.current = videojs(videoRef?.current, options, () => console?.log());

		return () => videoRef?.current?.removeEventListener('canplay', call_video_play);
	}, [videoRef]);

	useEffect(()=>{
		return ()=>{
			if (playerRef.current) {
				playerRef.current?.dispose();
				playerRef.current = null;
			}
		}
	},[])

	return (
		<div data-vjs-player >
			<video autoPlay muted loop ref={videoRef} style={{ flex: 1 }}>
				<source src={DetermineSource(post?.asset, post?.type, size, {height:maxHeight,width:maxWidth},grid)} type="video/mp4" />
			</video>
		</div>
	)
}