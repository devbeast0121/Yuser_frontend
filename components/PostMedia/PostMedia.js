import React, { useState, useEffect, useRef } from 'react';
import { DetermineSource } from '../../stores/tools.js';
//import { ContentSection } from '../PostsList/PostsList.elements';
import MuxVideo from '../MuxVideo/MuxVideo';
import GifDisplay from '../GifDisplay/GifDisplay.js';
import NFTLabel from "../NFTLabel/NFTLabel";
import styled from 'styled-components';

export default function PostMedia({ post, singleMode = false, size, position, status, bid, bidStatus, grid = false, height, width }) {
	
	
	if ( grid === false && (post?.type?.includes('video') || post?.type?.includes('audio'))){
		return (
			<>
				<MuxVideo
					src={DetermineSource(post?.asset, post?.type, size)}
					poster={post?.thumbnail}
					singleMode={singleMode}
				/>
				<NFTLabel
					position={position}  		//position: minting || auction 
					status={status} 			//status: if minting: null || if auction: won/end/time  
				/>
				{bid ?
					<NFTLabel
						position={"bid"}    	//position: bid
						status={bidStatus}  	//status: outbid/new
					/>
					: null}
			</>)
	}
	else if (grid === true && (post?.type?.includes("video") || post?.type?.includes("audio"))){
		let src = post.thumbnail;
		if(!post.thumbnail){
			if(!height || !width){
				src = `https://image.mux.com/${post?.asset}/thumbnail.png`;
			}
			else{
				src = `https://image.mux.com/${post?.asset}/thumbnail.png?fit_mode=smartcrop&h=${height}&w=${width}`;
			}
		}
		else if(post.thumbnail.includes(".imgix.net")){
			src = `${post.thumbnail}?fit=crop&crop=focalpoint&w=${200}&h=${200}`;

			}
			
		
		else{
			if(post.thumbnail.includes(".mux.com")){
				post.thumbnail = post.thumbnail.replace("height","h");
				post.thumbnail = post.thumbnail.replace("width","w");

			}
			src = `${post.thumbnail}?fit=crop&crop=focalpoint&w=${width}&h=${height}`;
		}
		
		return(
			<>
				<ContentSection
					grid={grid}
					src = {src}
					onError={(e) =>{e.currentTarget.src ="https://yuser-assets.imgix.net/processingImage.png?fit=clip&w=200&fm=webp$auto=format&dpr=2"; e.target.onError = null;}} 
					/> 
				<NFTLabel
					position={position}  		//position: minting || auction 
					status={status} 			//status: if minting: null || if auction: won/end/time  
				/>
				{bid ?
					<NFTLabel
						position={"bid"}    	//position: bid
						status={bidStatus}  	//status: outbid/new
					/>
					: null}
			</>
		)
	}
	if (post?.type?.includes('gif')){
		return (
			<>
				<GifDisplay 
					post={post} 
					size={size}
					grid={grid}
					maxHeight={height}
					maxWidth={width}
				/>
				<NFTLabel
					position={position}  		//position: minting || auction 
					status={status} 			//status: if minting: null || if auction: won/end/time  
				/>
				{bid ?
					<NFTLabel
						position={"bid"}    	//position: bid
						status={bidStatus}  	//status: outbid/new
					/>
					: null}
			</>)
	}
	return (
		<>
			<ContentSection
				grid={grid}
				src={DetermineSource(post?.asset, post?.type, size,{height,width},grid)} 
				alt='Content image/video/audio' 
				singleMode={singleMode}
			/>
			<NFTLabel
				position={position}  		//position: minting || auction 
				status={status} 			//status: if minting: null || if auction: won/end/time  
			/>
			{bid ?
				<NFTLabel
					position={"bid"}    	//position: bid
					status={bidStatus}  	//status: outbid/new
				/>
				: null}
		</>
	)
}


const ContentSection = styled.img`
    max-width: 100%;
    max-height: ${props => props.singleMode ? "100%" : "none"};
    //object-fit: ${props => props.grid ? "cover" : "contain"}; 
	//aspect-ratio: ${props => props.grid ? 1 / 1 : "none"};
`; 