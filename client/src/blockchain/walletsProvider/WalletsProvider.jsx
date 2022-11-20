// // import Web3Modal from 'web3modal'
// // import {ethers} from 'ethers'
// // import {CoinbaseWalletSDK} from '@coinbase/wallet-sdk'
// // const providerOptions={
// //     coinbasewallet:{
// //         package:CoinbaseWalletSDK,
// //         options:{
// //             appName:"Cryptobuteportal",
// //             infuraId:{5:"https://goerli.infura.io/v3/50e363c0240e459d87c20badc778bc86"}
// //         }
// //     }
// // }

// // export const connectWallet=async()=>{
// //     try{
// //         let web3Modal=new Web3Modal({
// //             cacheProvider:false,
// //             providerOptions
// //         })
// //         const web3ModalInstance=await web3Modal.connect()
// //         const web3ModalProvider=new ethers.providers.Web3Provider(web3ModalInstance)
// //         console.log(web3ModalProvider)
// //     }
// //     catch(err){
// //         console.log(err)
// //     }
// // }

// // import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
// import WalletConnect from "@walletconnect/web3-provider";
// import { ethers } from "ethers";
// import Web3Modal from "web3modal";

// const providerOptions = {
//     binancechainwallet: {
//         package: true,
//       },
//  walletconnect: {
//    package: WalletConnect, 
//    options: {
//      infuraId:"50e363c0240e459d87c20badc778bc86" }
//    }
//  }

// const web3Modal = new Web3Modal({
//     network:"goerli",
//     theme:"dark",
//     cacheProvider:true,
//     providerOptions:providerOptions // required
//   });

// export const connectWallet=async()=>{
//     try{
//         const provider=await web3Modal.connect()
//         const library=new ethers.providers.Web3Provider(provider)
        
//     }
//     catch(err){
//         console.log(err)
//     }
// }