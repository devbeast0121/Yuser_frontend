// import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
// import { useDisconnect, useAccount, useChainId, useContractWrite, useContractRead, useWaitForTransaction } from "wagmi";
// import { useEffect, useRef, useState } from "react";
// import { useStore } from "../../stores/RootStore";
// import { Button } from "../../components";
// import { COLORS } from "../../styles/Styling";
// // import abi from "../../config/abi/presale.json";
// import { ethers } from "ethers";


// const ConnectButton = () => {

// //   const contractAddress = '0xA2D401F8E1Bf70ac451984195Bb07846C9Ef6cEF';
// //   const ARBAddress = '0x912ce59144191c1204e64559fe8253a0e49e6548';

// //   const provider = new ethers.providers.Web3Provider(window.ethereum);
// //   const signer = provider.getSigner();
// //   const presaleContract = new ethers.Contract(
// //     contractAddress,
// //     abi,
// //     signer
// //   );

// //   let totalQuantity;

//   const rootstore = useStore();
//   const [quantity, setQuantity] = useState('1');
//   const account = useAccount({
//     onConnect({ address, connector, isReconnected }) {
//       console.log("Connected", { address, connector, isReconnected });
//       rootstore.connectedWallet = address;
//     },
//   });
//   const getBalance = async () => {
//     rootstore.currentModal = "addfund";
//   };

//   const ref = useRef();

//   const handleBuy = async () => {
//     //   const amount = parseInt(quantity) + 1;
//     //   const price = await presaleContract.price();
//     //   const value = amount * price;
//     //   await presaleContract.preBuy(amount, ARBAddress, {value})
//     //       .then((res) => {
//     //         console.log(res);
//     //         rootstore.currentModal = "success"
//     //       })
//     //       .catch((error) => {
//     //         console.log(error.data);
//     //       })
//   }

//   const handleBuyWithARB = async () => {
//     // presaleContract.events.NFTBought({}, (error, event) => {
//     //   if (!error) {
//     //     console.log(event);
//     //   }
//     // });
//   }

// //   const readFuntion = async () => {
// //     const value = await presaleContract.currentSupply();
// //     totalQuantity = parseInt(value);
// //   }

// //   useEffect(() => {
// //     readFuntion();
// //   }, []);


//   return (
//     <div className="w-full">
//       {!account.isConnected && (
//         // <div className="w-96 flex justify-between flex-col">
//         //   <div>
//         //     <RainbowConnectButton
//         //       showBalance={true}
//         //       accountStatus="address"
//         //       chainStatus="full"
//         //     />
//         //     <div className="mt-4">
//         //       You’ll need to connect your wallet to participate in the sale. You
//         //       must connect to the Arbitrum Nova nework.
//         //     </div>
//         //   </div>
//         // </div>

//         <Button 
//             text = {"Connect Wallet"}
//             isIcon={false}
//             color={COLORS.purple}
//             colorText={COLORS.white}
//             style = {{width: `100%`}}
//         />
//       )}

//       {account.address && (
//         <div ref={ref} className="w-400px flex flex-col font-Avenir">
//           <button
//             className="h-12 bg-blue border-0 color-white font-bold mb-4"
//             onClick={getBalance}
//           >
//             ADD FUNDS
//           </button>
//           <div className="flex gap-2 font-2xl font-bold mb-4">
//             <div className="flex bg-purple h-12 rounded-sm flex-1 items-center">
//               <button className=" border-r-gray_border border-r-solid border-r flex-1 h-full text-center align-middle flex flex-col justify-center items-center" onClick={handleBuy}>
//                 <div>Buy With ETH</div>
//               </button>
//               <button className=" border-r-gray_border border-r-solid border-r flex-1 h-full text-center align-middle flex flex-col justify-center items-center" onClick={handleBuyWithARB}>
//                 <div>Buy With ARB</div>
//               </button>
//             </div>
//             <div>
//               {/* <SelectDropdown className="bg-purple h-12 flex items-center" value={quantity} setValue={setQuantity} options={[1, 2, 3, 4, 5]} /> */}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConnectButton;