import React from 'react';

/**
 * 	DevInfo()
 * 	Put a message on the center of the screen for quick access to some info
 * 	William Doyle
 * 	Aug 26th 2021
 * */
export default function DevInfo({ message }) {
	return (
		<div style={{
			position: "fixed",
			top: "55%",
			left: "55%",
			zIndex: 99999,
			backgroundColor: 'black',
		}}
		>
			<h1>
				{
					message
				}
			</h1>
		</div>
	);
}