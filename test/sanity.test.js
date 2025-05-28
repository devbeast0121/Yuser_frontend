// import Loader from "../pages/api/posts";
import { clone_nf, clone_NoFunctions, ImageTypes, ImageUrl, pruneArray } from "../stores/tools";
import VideoQueue from "../stores/VideoQueue";

describe("simple sanity checks", () => {

	it('simple test to show tester works', () => {
		expect(1).toEqual(1);
		expect(2).not.toEqual(1);
	});

	it('running LoadHot places posts into LocalPosts', async () => {
		// await Loader.LoadHot(false, false);
	});

	it.todo('running LoadMe places posts into LocalPosts');
	it.todo(`private members of Loader cannot be accessed`);


	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////          tools.js          //////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	it.todo('test all of tools.js (should be easy as they are all supposed to be pure functions)');
	it('clone_nf returns clone of object but not by ref', () => {
		const obj = {
			a: 'aAa',
			b: {
				a: '__a__aa',
			},
			c: [1, 2, 3, 4],
			d: 666,
		};
		expect(clone_nf(obj)).toEqual(obj);			// same value
		expect(clone_nf(obj)).not.toBe(obj);			// not same pointer
		expect(clone_NoFunctions(obj)).toEqual(obj);		// same as above 
		expect(clone_NoFunctions(obj)).not.toBe(obj);		// same as above
		expect(JSON.parse(JSON.stringify(obj))).toEqual(obj);	// same as above 
		expect(JSON.parse(JSON.stringify(obj))).not.toBe(obj);	// same as above

		const arr = [1, 2, 3,]

		expect(clone_nf(arr)).toEqual(arr);			// same value
		expect(clone_nf(arr)).not.toBe(arr);			// not same pointer
		expect(clone_NoFunctions(arr)).toEqual(arr);		// same as above 
		expect(clone_NoFunctions(arr)).not.toBe(arr);		// same as above
		expect(JSON.parse(JSON.stringify(arr))).toEqual(arr);	// same as above 
		expect(JSON.parse(JSON.stringify(arr))).not.toBe(arr);	// same as above
	});

	it('ImageUrl coverage', () => {
		expect(ImageUrl('test_asset_code')).toEqual(`https://yuser.imgix.net/${'test_asset_code'}?fit=clip&w=400&fm=jpg&dpr=2`);
		//	expect(ImageUrl('test_asset_code')).toEqual(ImageUrl('test_asset_code'));
	});

	it('pruneArray function', () => {
		// 1. objects in array have same reference to objects before being put in array
		const originalUnchanged = []; // we will not call pruneArray on this array
		const theDuplicate = new FakeVideo();
		originalUnchanged.push(theDuplicate);	// push duplicate for first time

		for (let i = 0; i < 10; i++)
			originalUnchanged.push(new FakeVideo());

		originalUnchanged.push(theDuplicate);	// push duplicate for second time

		const toPrune = originalUnchanged.map(el => el);
		expect(toPrune.length).toEqual(originalUnchanged.length); // sanity check
		const pruned = pruneArray(toPrune);
		expect(pruned.length).not.toEqual(originalUnchanged.length);
	});


	// it('ImageTypes is immutable', async () => {
	// 	const l1 = ImageTypes.length;
	// 	await expect(ImageTypes.push('blah blah blah')).rejects.toThrow();
	// 	expect(l1).toBe(ImageTypes.length);
	// });
	////////////////////////////////////////////////////////////////////////////////////////////////////////////




	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////          VideoQueue.js          /////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	class FakeVideo {
		constructor() { }
		paused = (Math.random() < 0.5); // random true or false
		pause() {
			console.log(`fake pause`);
		}
		play() {
			console.log(`fake play`);
		}
	}


	it('enqueue and unshift coverage', async () => {
		VideoQueue.dump(); 	// remove any possable values put in by previous tests
		const fakeVideo = new FakeVideo();
		VideoQueue.enqueue(fakeVideo);
		expect(VideoQueue.instance.vrefs.length).toBe(1);
		expect(VideoQueue.top).toEqual(fakeVideo);
		expect(VideoQueue.top).toBe(fakeVideo);

		const fakeVideo2 = new FakeVideo();
		VideoQueue.enqueue(fakeVideo2);
		expect(VideoQueue.top).toEqual(fakeVideo);
		expect(VideoQueue.top).toBe(fakeVideo);

		expect(VideoQueue.top).toEqual(VideoQueue.instance.vrefs[0]);
		expect(VideoQueue.top).toBe(VideoQueue.instance.vrefs[0]);

		// unshift places at front
		const fakeVideo3 = new FakeVideo();
		await VideoQueue.unshift(fakeVideo3);
		expect(VideoQueue.top).toEqual(fakeVideo3);
		expect(VideoQueue.top).toBe(fakeVideo3);
	});

	it('shift coverage', async () => {

		// 1. set up to do shift operation
		VideoQueue.dump(); 	// remove any possable values put in by previous tests

		const videos = [];
		const videoCount = 10;
		for (let i = 0; i < videoCount; i++)
			videos.push(new FakeVideo());

		expect(videos.length).toEqual(videoCount);

		videos.forEach(v => VideoQueue.enqueue(v));

		expect(VideoQueue.instance.vrefs.length).toEqual(VideoQueue.length);
		expect(VideoQueue.length).toBe(videos.length);

		// 2. do shift operation
		for (let i = 0; i < videoCount; i++) {
			await VideoQueue.shift(false);
			expect(VideoQueue.length).toBe(videoCount - (1 + i));
		}
	});

	it('top gives first element in queue', async () => {
		VideoQueue.dump(); 	// remove any possable values put in by previous tests

		expect(VideoQueue.length).toEqual(0);	// queue is empty before we put elements in
		expect(VideoQueue.top).toEqual(undefined); // top returns undefined when queue is empty

		const fv1 = new FakeVideo();		// put 1 el in an it is at top
		VideoQueue.enqueue(fv1);
		expect(VideoQueue.top).toEqual(fv1);
		expect(VideoQueue.length).toEqual(1);

		const fv2 = new FakeVideo();		// put second el in and first is still at top
		VideoQueue.enqueue(fv2);
		expect(VideoQueue.top).toEqual(fv1);
		expect(VideoQueue.length).toEqual(2);

		// shift out first element and 2nd will be at top
		VideoQueue.shift();
		expect(VideoQueue.top).toEqual(fv2);
		expect(VideoQueue.length).toEqual(1);

	});
	////////////////////////////////////////////////////////////////////////////////////////////////////////////

});