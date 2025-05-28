import React from 'react';
import { Colorizer } from '../../stores/ClassTools';

export default function PleaseLogin({ }) {
	return (

		<div style={{
			backgroundColor: Colorizer.next,
			position: "fixed",
			top: "25%",
			left: "25%",
			zIndex: 99999,
			flexDirection: 'column',
		}}
		>
			<div style={{ backgroundColor: Colorizer.next, }}>
				<h1 style={{ color: Colorizer.next, }}>
					Hey Dummy!
				</h1>
			</div>
			<div style={{ backgroundColor: Colorizer.next }}>
				<h2 style={{ color: Colorizer.next, }}>
					Login to see more great content.
				</h2>
			</div>
			<div style={{ backgroundColor: Colorizer.next }}>
				<h3 style={{ color: Colorizer.next, }}>
					(Or I will delete your minecraft server)
				</h3>
			</div>
		</div>
	);
}