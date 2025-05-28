/*
	VideoQueue
	@singleton
	A queue containing videos to be played
	Aug 3rd 2021
	William Doyle
*/
export default class VideoQueue {
	static instance = new VideoQueue();

	constructor() {
		this.vrefs = [];
	}

	/*
		shift()
		remove first element in queue
		Aug 10th 2021
		William Doyle
	*/
	static async shift(playnext) {
		// 0. if queue is empty warn the console and do nothing
		if (VideoQueue.instance.vrefs.length === 0) {
			console.warn(`[VideoQueue.js::shift()] nothing to remove`);
			return;
		}

		// 1. pause first element if playing
		const first = VideoQueue.instance.vrefs[0];
		// if (first.paused === false)
		// 	first?.pause()?.catch(e => {
		// 		console.log(`[VideoQueue::shift()] Pause produced error...`);
		// 		console.log(e);
		// 	});

		// 2. use filter to remove any copies of first element including the first element
		//VideoQueue.cancelRef(first);
		VideoQueue.instance.vrefs.shift();

		// 3. OPTIONAL resume the next video in the queue
		if (playnext && VideoQueue.top)
			await VideoQueue.play();

		// 4. report state
		//	console.log(`[VideoQueue::shift] VideoQueue length is ${VideoQueue.instance.vrefs.length}`);
	}

	/*
		unshift()
		place new element at first position in queue
		Aug 10th 2021
		William Doyle
	*/
	static async unshift(newVideo, startPlay) {
		// 1. if queue not empty and first element not paused... pause first element
		if (!VideoQueue.top?.paused)
			await VideoQueue.top?.pause()?.catch(e => {
				//			console.log(`[VideoQueue::unshift()] Pause produced error...`);
				//	console.log(e);
			});

		// 2. add new video to front of queue
		VideoQueue.instance.vrefs.unshift(newVideo);

		// 3. OPTIONAL play this video
		if (startPlay)
			await VideoQueue.play();

		// 4. report state
		//		console.log(`[VideoQueue::unshift] VideoQueue length is ${VideoQueue.instance.vrefs.length}`);
	}

	/*
		enqueue()
		Add a video reference to the back of the queue
		Aug 3rd 2021
		William Doyle
	*/
	static enqueue(vref) {
		VideoQueue.instance.vrefs.push(vref);
		//	console.log(`[VideoQueue::enqueue] VideoQueue length is ${VideoQueue.instance.vrefs.length}`);
	}

	/*
		dequeue()
		remove and return the first element in the queue
		Aug 3rd 2021
		William Doyle
	*/
	static dequeue() {
		if (VideoQueue.instance.vrefs.length === 0) {
			//		console.warn(`cannot remove element from empty queue`);
			return undefined;
		}
		const t = VideoQueue.instance.vrefs.shift();
		//	console.log(`[VideoQueue::dequeue] VideoQueue length is ${VideoQueue.instance.vrefs.length}`);
		return t;
	}

	/*
		play()
		play the first video in the queue
		Aug 3rd 2021
		William Doyle
	*/
	static async play() {
		//	console.log(`STUB: [VideoQueue.js] play() called`);
		if (VideoQueue.instance.vrefs.length === 0) {
			//		console.warn(`video queue is empty, nothing to play`);
			return;
		}
		// VideoQueue.instance.vrefs[0].play().catch(e => {
		await VideoQueue.top?.play()?.catch(e => {
			//		console.log(`Play produced error...`);
			//		console.log(e);
		});
	}

	/*
		pause()
		pause the first video in the queue
		Aug 10th 2021
		William Doyle
	*/
	static async pause() {
		if (VideoQueue.instance.vrefs.length === 0) {
			//		console.warn(`video queue is empty, nothing to pause`);
			return;
		}
		await VideoQueue.instance.vrefs[0]?.pause()?.catch(e => {
			//	console.log(`Pause produced error...`);
			//		console.log(e);
		});
	}

	/*
		top()
		@getter
		get the first video in the queue
		Aug 3rd 2021
		William Doyle
	*/
	static get top() {
		if (VideoQueue.instance.vrefs.length === 0) {
			//		console.warn(`nothing at [0]`);
			return undefined;
		}
		return VideoQueue.instance.vrefs[0];
	}

	/*
		cancelRef()
		remove all videos which are the same object (ref type) as the provided parameter
		Aug 3rd 2021
		William Doyle
	*/
	static cancelRef(vref) {
		VideoQueue.instance.vrefs = VideoQueue.instance.vrefs.filter(vr => vr !== vref);
		//console.log(`[VideoQueue::cancelRef] VideoQueue length is ${VideoQueue.instance.vrefs.length}`);
	}

	static get length() {
		return VideoQueue.instance.vrefs.length;
	}

	static dump() {
		VideoQueue.instance.vrefs = [];
	}
}