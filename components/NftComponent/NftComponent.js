// import React, { useState, useEffect, useReducer, useRef } from "react";
// import { inject, observer } from "mobx-react";
// import {
//     ModalContainer,
//     Post,
//     PostBody,
//     PostSideBarContainer,
//     BtnLink,
//     TxtLink,
//     LinkBox,
//     PostUserContainer,
//     NFTUserContainer,
//     PostBox,
//     UserName,
//     ContentDiscription,
//     BtnClose,
//     ProgressBar,
//     CommentsContainer,
//     BuyContainer,
//     BidContainer,
//     TxtCurrentBid,
//     BidBox,
//     TxtBid,
//     TxtDollarBid,
//     BtnBuy,
//     TitleHistory,
//     CommentInputBox,
//     PostBodyInner,
//     ButtonCopy,
//     ButtonExpand,
//     OpenGiftBarContainer,
//     BackdropOverlay,
//     WrapOverflow,
//     WrapOverflowVertical,
//     TextLarge,
//     NFTOwnerNameBox,
//     PropertyList,
//     PropertyListContainer,
//     ItemContainer,
//     ButtonMore,
//     BtnText,
//     TitleContainer,
//     TableTitle,
//     TabBox,
//     EmptyBox,
//     PriceBoxWrap,
//     PostSideBarContainerNFT,
//     BtnSideBar,
//     BtnTextnft,
//     ContentDescriptionnft,
//     TextNormal,
//     ButtonWrapper70,
//     ButtonWrapper50,
//     UnlockedContainer,
//     UnlockedMain,
//     UnlockedBox,
//     ImageNFT
//   } from "../NftComponent/NftComponent.elements"
//   import Icon from "../components/Icon/Icon";


// export default inject("store")(
//     observer(function NftComponent(props) {

//         const [updatedImgHeight, setUpdatedImgHeight] = useState(false)
//         const [fullPropertyLenght, setFullPropertyLenght] = useState(false);
//         React.useEffect(() => {
//             replaceHeight();
//             window.addEventListener("resize", replaceHeight);
//             return () => window.removeEventListener("resize", replaceHeight);
//           }, []);
      
//           const replaceHeight = () => {
//             if (window.innerWidth <= 1800) {
//               setUpdatedImgHeight(true)
//             } else {
//               setUpdatedImgHeight(false)
//             }
//           }
      
      
//           const closeAll = () => {
//             props.setShow(false)
//           }
//           const showFullProperty = () => {
//             setFullPropertyLenght(!fullPropertyLenght)
//           }
      
//           const PropertyListInner = () => {
//             let attributes = []
//             attributes = fullPropertyLenght ? properties : properties.slice(0, 2)
      
//             return (
//               <>
//                 {attributes.map((data, id) => {
//                   return <ItemContainer key={id}>
//                     <UserName>{data[0]}</UserName>
//                     <UserName NFT={true} centered={true} style={{ opacity: 0.5 }}>{(data[1] / 10000) * 100}{'% have this property'}</UserName>
//                   </ItemContainer>
//                 })}
      
//               </>
//             );
      
//           }
      
//           const downloadImage = () => {
//             saveAs(nft.metadata.image, 'image.png') // Put your image url here.
//             setUnlockedFeatured(false)
//           }
//           const copyToClickboardFunction = () => {
//             navigator.clipboard.writeText(nft.metadata.image)
//             setIsVisible(true)
//             setTimeout(() => setIsVisible(false), 3000);
//             setUnlockedFeatured(false)
      
//           }
//           const comingSoonFunction = () => {
//             setComingSoon(true)
//             setTimeout(() => setComingSoon(false), 3000);
//             setUnlockedFeatured(false)
//           }
      
//           const showUnlockedFeatures = () => {
//             setUnlockedFeatured(true)
//           }
//           async function claim() {
      
//             try {
//               await client.service('set-nft-profpic').create({
//                 userId: session.user._id,
//                 hash: avatarHash,
//               }).then(async () => {
//                 let profObj = {
//                   avatar: avatarHash
//                 }
//                 await client.service('change-profile')
//                   .create(profObj).then(() => window.location.reload())
//               }
//               );
//             } catch (err) {
//               console.log(err)
//             }
//             console.log("Success! Please logout and login back to see your Avatar")
      
//           }
// return(
//     <ModalContainer>
//                   <Post>
//                     <ImageNFT
//                       updatedImgHeight={updatedImgHeight}
//                       src={nft.metadata.image + '?fit=clip&w=1800&fm=webp$auto=format'} alt="NFT image"
//                     />
//                     {/* <BtnClose onClick={closeAll}>
//                       <Icon
//                         strokeColor={({ theme }) => theme.iconColor.color}
//                         strokeWidth="3"
//                         height="auto"
//                         width="24px"
//                         name={Close}
//                       />
//                     </BtnClose> */}
//                   </Post>
//                   <PostBodyInner style={{ maxWidth: 650, backgroundColor: 'rgb(18, 25, 35)' }}>
//                     <PostSideBarContainerNFT position={"horizontal"}>
//                       <BtnSideBar onClick={copyToClickboardFunction}>
//                         <Icon width="auto" height="35px" name={Share} />
//                         <BtnTextnft>{'SHARE'}</BtnTextnft>
//                       </BtnSideBar>
//                       <BtnSideBar onClick={comingSoonFunction}>
//                         <Icon width="auto" height="35px" name={Buy} />
//                         <BtnTextnft>{'BUY'}</BtnTextnft>
//                       </BtnSideBar>
//                       <BtnSideBar onClick={downloadImage}>
//                         <Icon width="auto" height="35px" name={Save} />
//                         <BtnTextnft>{'SAVE'}</BtnTextnft>
//                       </BtnSideBar>
//                       <BtnSideBar onClick={showUnlockedFeatures}>
//                         <Icon width="auto" height="35px" name={Unlock} />
//                         <BtnTextnft>{'UNLOCK'}</BtnTextnft>
//                       </BtnSideBar>
//                     </PostSideBarContainerNFT>

//                     {unlockedFeatured ?
//                       <UnlockedContainer>
//                         <TextLarge>{'UNLOCKABLE FEATURES'}</TextLarge>
//                         <UnlockedMain>
//                           <TextLarge small={true}>{'Official NextGems Avatar'}</TextLarge>
//                           <TextNormal>{'Show off your NextGems as your profile picture'}</TextNormal>

//                           <Avatar
//                             src={nft.metadata.image + '?fit=clip&w=1800&fm=webp$auto=format'}
//                             size={"large"}
//                             alt={"nft image"}
//                             frame={true}
//                             nft={true}
//                           />
//                           <ButtonWrapper70>
                          
//                             <Button
//                               onClick={claim}
//                               color={COLORS.purple}
//                               colorText={COLORS.white}
//                               text={'MAKE PROFILE PIC'}
//                               size={'medium'}
//                               className={"FullWidth"}
//                               disabled={true}
//                             />
//                           </ButtonWrapper70>
//                         </UnlockedMain>
//                         <UnlockedMain row={true}>
//                           <UnlockedBox>
//                             <TextLarge small={true}>{'SVG Asset'}</TextLarge>
//                             <TextNormal>{'Download the SVG drawing for your nNextGems'}</TextNormal>
//                           </UnlockedBox>
//                           <ButtonWrapper50>
//                             <Button
//                               // onClick={''}
//                               color={COLORS.purple}
//                               colorText={COLORS.white}
//                               text={'COMING SOON'}
//                               size={'medium'}
//                               width={"50%"}
//                               className={"FullWidth"}
//                               disabled={true}
//                             />
//                           </ButtonWrapper50>
//                         </UnlockedMain>
//                         <UnlockedMain row={true}>
//                           <UnlockedBox>
//                             <TextLarge small={true}>{'Stone holding'}</TextLarge>
//                             <TextNormal>{'Receive stones every day'}</TextNormal>
//                           </UnlockedBox>
//                           <ButtonWrapper50>
//                             <Button
//                               // onClick={''}
//                               color={COLORS.purple}
//                               colorText={COLORS.white}
//                               text={'COMING SOON'}
//                               size={'medium'}
//                               width={"50%"}
//                               className={"FullWidth"}
//                               disabled={true}
//                             />
//                           </ButtonWrapper50>
//                         </UnlockedMain>
//                         <UnlockedMain row={true}>
//                           <UnlockedBox>
//                             <TextLarge small={true}>{'Power Boost'}</TextLarge>
//                             <TextNormal>{'Boost the reach of your content'}</TextNormal>
//                           </UnlockedBox>
//                           <ButtonWrapper50>
//                             <Button
//                               // onClick={''}
//                               color={COLORS.purple}
//                               colorText={COLORS.white}
//                               text={'COMING SOON'}
//                               size={'medium'}
//                               width={"50%"}
//                               className={"FullWidth"}
//                               disabled={true}
//                             />
//                           </ButtonWrapper50>
//                         </UnlockedMain>
//                       </UnlockedContainer>
//                       :
//                       <BuyContainer>
//                         <TextLarge>{nft.metadata.name}</TextLarge>
//                         <NFTUserContainer NFT={true}>
//                           <Avatar
//                             src={AvatarUrl(
//                                 nft.userInfo?nft.userInfo.avatar:session
//                                 .user.avatar, 'm'
//                             )}
//                             size={"medium"}
//                             alt={"avatar"}
//                             frame={true}
//                             userName={
//                               props.userInfo?props.userInfo.uname:
//                               session
//                                 .user.uname
//                             }
//                             onClick={closeAll}
//                           />
//                           <PostBox>
//                             <NFTOwnerNameBox>
//                               <UserName NFT={true}>
//                                 {"Minted by"}
//                               </UserName>
//                               <UserName>
//                                 { nft.userInfo.uname}
//                               </UserName>
//                             </NFTOwnerNameBox>
//                             <ContentDescriptionnft>
//                               <AutolinkerComponent
//                                 text={nft.metadata.description ? nft.metadata.description : "Congratulations for minting this NFT"}
//                               />
//                             </ContentDescriptionnft>
//                           </PostBox>
//                         </NFTUserContainer>
//                         {properties.length !== 0 &&
//                           <PropertyListContainer>

//                             <PropertyList>
//                               <PropertyListInner />
//                             </PropertyList>


//                             <ButtonMore
//                               onClick={showFullProperty}
//                             >
//                               <BtnText>{fullPropertyLenght ? 'Less properties' : 'More properties'}</BtnText>
//                             </ButtonMore>
//                           </PropertyListContainer>
//                         }
//                         <BidContainer>
//                           <TxtCurrentBid>{"Price"}</TxtCurrentBid>
//                           <BidBox main={true}>
//                             <BidBox>
//                               <Icon
//                                 className="MarginRightMedium"
//                                 height="auto"
//                                 width="40px"
//                                 name={Moonriver}
//                               />
//                               <TxtBid>{"0.5 MOVR"}</TxtBid>
//                             </BidBox>
//                           </BidBox>
//                           {(authUser?._id) === session.user.userId ?
//                             <BidBox main={true}>
//                               <Button
//                                 // onClick={''}
//                                 isIcon={true}
//                                 color={COLORS.purple}
//                                 colorText={COLORS.white}
//                                 iconWidth={"20px"}
//                                 strokeWidth={"2px"}
//                                 iconName={Shopping}
//                                 text={'LIST COMING SOON'}
//                                 size={'medium'}
//                                 width={"100%"}
//                                 className={"FullWidth"}
//                                 disabled={true}
//                               />
//                               {/* <Button
//                                   // onClick={""}
//                                   isIcon={true}
//                                   color={COLORS.purple}
//                                   colorText={COLORS.white}
//                                   iconWidth={"20px"}
//                                   strokeWidth={"2px"}
//                                   iconName={Present}
//                                   text={'GIFT'}
//                                   width={"100%"}
//                                   size={'medium'}
//                                   className={"FullWidth"}
//                                   disabled={true}
//                                 /> */}
//                             </BidBox>
//                             :
//                             <Button
//                               //onClick={''}
//                               isIcon={true}
//                               color={COLORS.purple}
//                               colorText={COLORS.white}
//                               iconWidth={"24px"}
//                               iconName={Shopping}
//                               text={'BUY NOW'}
//                               width={"100%"}
//                               size={'medium'}
//                               className={"FullWidth"}
//                               disabled={true}
//                             />
//                           }
//                         </BidContainer>
//                         {/*} <TitleContainer>
//                             <TitleHistory>{"Offers"}</TitleHistory>
//                           </TitleContainer> */}
//                         <TitleContainer>
//                           <TitleHistory>{"History Coming Soon"}</TitleHistory>
//                         </TitleContainer>
//                         {/*
//                       <TableTitle>
//                         <TabBox>
//                           <UserName style={{ color: COLORS.greyMedium }}>{'Event'}</UserName>
//                         </TabBox>
//                         <TabBox>
//                           <UserName style={{ color: COLORS.greyMedium }}>{'From'}</UserName>
//                         </TabBox>
//                         <TabBox>
//                           <UserName style={{ color: COLORS.greyMedium }}>{'To'}</UserName>
//                         </TabBox>
//                         <TabBox>
//                           <UserName style={{ color: COLORS.greyMedium }}>{'Price'}</UserName>
//                         </TabBox>
//                         <TabBox>
//                           <UserName style={{ color: COLORS.greyMedium }}>{'Date'}</UserName>
//                         </TabBox>
//                       </TableTitle>
//                       <BidsList
//                         bids={null
//                           //   usePost
//                           //     .bids
//                         }
//                       />*/}
//                       </BuyContainer>
//                     }
//                   </PostBodyInner>
//                 </ModalContainer>

// )

//     }))