import React from "react"

// Credit: 
// https://stackoverflow.com/questions/45514676/react-check-if-element-is-visible-in-dom
// https://stackoverflow.com/users/3013279/creaforge
// retrieved on July 26th 2021 by William Doyle

export default function useOnScreen(ref) {
	const [isIntersecting, setIntersecting] = React.useState(false)

	const observer = new IntersectionObserver(
		([entry]) => setIntersecting(entry.isIntersecting)
	)

	React.useEffect(() => {
		observer.observe(ref.current)
		// Remove the observer as soon as the component is unmounted
		return () => { observer.disconnect() }
	}, [])

	return isIntersecting
}