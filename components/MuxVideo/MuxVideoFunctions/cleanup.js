"use strict";

import VideoQueue from '../../../stores/VideoQueue';

/*
    Clean up code. Called when the MuxVideo component is unmounted.
    William Doyle
*/
export default function cleanup(videoRef, playerRef, hlsRef) {
    console.log(`CLEANUP: [MuxVideoFunctions] cleanup() called`);
    VideoQueue.cancelRef(videoRef?.current);
    if (playerRef.current) {
        playerRef.current?.dispose();
        playerRef.current = null;
    }
    if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
    }
}