import React from "react"

// Credit: 
// https://stackoverflow.com/questions/45514676/react-check-if-element-is-visible-in-dom
// https://stackoverflow.com/users/3013279/creaforge
// retrieved on July 26th 2021 by William Doyle
// function continuousThreshold(inc = 0.01) {
// 	const arr = [];
// 	for (let i = 0.0; i < 1.0; i += inc)
// 		arr.push(i);
// 	return arr;
// }

// // this version will use a custom root
// export default function useShouldPlay(ref, /*root*/) {
// 	const [isIntersecting, setIntersecting] = React.useState(false)

// 	console.log(document.getElementById('infinitesimalGoldenThread'))
// 	const observer = new IntersectionObserver(
// 		([entry]) => {
// 			console.log(entry.isIntersecting);
// 			setIntersecting(entry.isIntersecting);
// 		},
// 		{
// 			// root: document.querySelector('#infinitesimalGoldenThread')
// 			//root: document.querySelector('.infinitesimalGoldenThread')
// 			//root: document.getElementById('infinitesimalGoldenThread'),
// 			//threshold: continuousThreshold(),
// 		}
// 	)

// 	React.useEffect(() => {
// 		observer.observe(ref.current)

// 		// Remove the observer as soon as the component is unmounted
// 		return () => { observer.disconnect() }
// 	}, [])

// 	return isIntersecting
// }



// 		T H I S  V E R S I O N   P L A Y S   MEDIA ONLY WHEN ITS 90 % VISABLE

export default function useShouldPlay(ref) {
	const [isIntersecting, setIntersecting] = React.useState(false)

	function continuousThreshold(inc = 0.01) {
		const arr = [];
		for (let i = 0.0; i < 1.0; i += inc)
			arr.push(i);
		return arr;
	}

	const observer = new IntersectionObserver(
		([entry]) => {
			//	console.log(`STUB: [useShouldPlay.js] intersection ratio is ${entry.intersectionRatio}`);
			setIntersecting(entry.intersectionRatio > 0.9);
		},
		{
			threshold: continuousThreshold(),
		}
	)

	React.useEffect(() => {
		observer.observe(ref.current)
		// Remove the observer as soon as the component is unmounted
		return () => { observer.disconnect() }
	}, [])

	return isIntersecting
}


// // server side rendering safe
// function useShouldPlay_(ref) {
// 	const [isIntersecting, setIntersecting] = React.useState(false)

// 	function continuousThreshold(inc = 0.01) {
// 		const arr = [];
// 		for (let i = 0.0; i < 1.0; i += inc)
// 			arr.push(i);
// 		return arr;
// 	}

// 	const observer = new IntersectionObserver(
// 		([entry]) => {
// 			//	console.log(`STUB: [useShouldPlay.js] intersection ratio is ${entry.intersectionRatio}`);
// 			setIntersecting(entry.intersectionRatio > 0.9);
// 		},
// 		{
// 			threshold: continuousThreshold(),
// 		}
// 	)

// 	React.useEffect(() => {
// 		observer.observe(ref.current)
// 		// Remove the observer as soon as the component is unmounted
// 		return () => {
// 			if (observer)
// 				observer.disconnect();
// 		}
// 	}, [])

// 	return isIntersecting
// }


// export default function useShouldPlay(ref) {
// 	const [hook, setHook] = React.useState(undefined);

// 	function safeUseShouldPlay() {
// 		if (typeof window === 'undefined')
// 			return false;
// 		else if (hook === undefined) {
// 			setHook(useShouldPlay_(ref));
// 			return true;
// 		}
// 		else {
// 			setHook(useShouldPlay_(ref));
// 			return true;
// 		}
// 	}

// 	return safeUseShouldPlay() ? hook : false;


// }