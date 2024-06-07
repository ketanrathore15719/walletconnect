import React,{ useContext } from "react";

import { WalletConnectSVG, 
		 OperaSVG, 
		 FortmaticSVG, 
		 CloseSVG, 
		 WhatSVG, 
		 CoinbaseSVG, 
		 MetamaskSVG} from '../'

import { metamaskClass, 
		 metamaskClass2, 
		 closeClass, 
		 coinbaseClass, 
		 fortmaticClass,
		 operaClass,
		 walletConnectClass} from './classes'

import { TransactionContext } from "../";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useMoralis } from "react-moralis";


//import WalletConnect from "@walletconnect/client";
//import QRCodeModal from "@walletconnect/qrcode-modal";
//import { providers } from "ethers";

const Injected = new InjectedConnector({
 	supportedChainIds: [1, 3, 4, 5, 42]
});


// const connector1 = new WalletConnectProvider({
// 	rpc: {
// 		1: "https://mainnet.mycustomnode.com",
// 		3: "https://ropsten.mycustomnode.com",
// 		100: "https://dai.poa.network",
// 	},
// });

const connector = new WalletConnectProvider({
  	infuraId: "15d78b3b6cfd441bb97234d12f9727cd",
});

const ModalPopup = ({ariaHiden, arialModal, modelClass, closeModal, fm, web3}) => {
	
	const { account, activate } = useWeb3React();
	const { connectWallet, getBalance, setCurrentAccount } = useContext(TransactionContext);
	const { authenticate, isAuthenticated, user } = useMoralis();
	const connectCoinbase = async () => {

  		try {
  			var isFirefox = typeof InstallTrigger !== 'undefined';

  			if(isFirefox) {
  				alert('Coinbase Wallet not support in Firefox')
  				return;
  			}
  			activate(Injected)
  			fm.user.logout();
	 		if(account) {
	 			getBalance(account)
	      		sessionStorage.setItem('isConnected', JSON.stringify(true)); 
	      		window.location.reload();
	 		}
  		} catch(err) {
  			console.log(err)
  		}
  	}


  	let connectFortMatic = async () => {
        // Authenticate user
        try {
	        let accounts = await fm.user.login();
	        
	        if (accounts.length > 0) {
	        	getBalance(account)
	        	sessionStorage.setItem('isConnected', JSON.stringify(true)); 
		      	window.location.reload();
	            localStorage.setItem('isFortmatic', JSON.stringify(true)); 
	            localStorage.setItem('fortmatic', JSON.stringify(accounts[0])); 
	            // window.location.reload()
	        }
	    } catch(err) {
  			console.log(err)
  		}
    };


    const connectOpera = () => {
    	
    	let isOperaWallet = false;
		if(window.ethereum){
		    isOperaWallet = window.ethereum.isOpera;
		    if(!isOperaWallet) alert('Opera wallet not found!')
		}

		if(!isOperaWallet){
			connectWallet()
		}
    }
  

    const connectDappWallet = async () => {
    	console.log(connector)

    	const accounts = await connector.enable();
    	const newD = await connector.onConnect();
    	console.log(newD)
    	console.log(accounts)
    	if (accounts.length > 0) {
    		setCurrentAccount(accounts[0]);
    		getBalance(accounts[0])
    		sessionStorage.setItem('isConnected', JSON.stringify(true)); 
    		sessionStorage.setItem('currentAccount', JSON.stringify(accounts[0]))
    		window.location.reload();	
    	}
    };
	
	// const login = async () => {
 //      if (!isAuthenticated) {

 //        await authenticate({ provider: "walletconnect", chainId: 56 })
 //          .then(function (user) {
 //            console.log(user?.get("ethAddress"));
 //          })
 //          .catch(function (error) {
 //            console.log(error);
 //          });
 //      }
 //    }
 	
	return(
		<div 
   			id="crypto-modal" 
   			tabIndex="-1" 
   			aria-hidden={ariaHiden} 
   			aria-modal={arialModal} role="dialog"
   			className={modelClass}>
   			
   			<div className="relative p-4 w-full max-w-md h-full md:h-auto">
   				<div className="relative bg-gray-800 rounded-lg shadow eth-modal">
   					<button type="button" 
   							className={closeClass} 
   							onClick={closeModal}
   							data-modal-toggle="crypto-modal">
   						<CloseSVG />
   					</button>

   					<div className="py-4 px-6 rounded-t border-b dark:border-gray-600">
   						<h3 className="text-base font-semibold text-gray-100 lg:text-xl dark:text-white">
   						Connect wallet
   						</h3>
   					</div>

   					<div className="p-6">
   						<p className="text-sm font-normal text-gray-500 dark:text-gray-400">
   							Connect with one of our available wallet providers or create a new one.
   						</p>
   						<ul className="my-4 space-y-3">
   							<li>
				      			<div 
				      				onClick={connectWallet} 
				      				className={metamaskClass}>
				      				<MetamaskSVG />
				      				<span className="flex-1 ml-3 whitespace-nowrap">MetaMask</span>
				      				<span 
				      					  className={metamaskClass2}>
				      					  Popular
				      				</span>
				      			</div>
				      		</li>
				      		<li>
				      			<div 
				      				onClick={connectCoinbase} 
				      				className={coinbaseClass}>
				      				<CoinbaseSVG />
				      				<span className="flex-1 ml-3 whitespace-nowrap">Coinbase Wallet</span>
				      			</div>
				      		</li>
				      		<li>
				      			<div 
					      			onClick={connectFortMatic}
					      			className={fortmaticClass}>
					      			<FortmaticSVG />
					      			<span className="flex-1 ml-3 whitespace-nowrap">Fortmatic</span>
				      			</div>
				      		</li>
				      		<li>
		                        <div
		                        	onClick={connectDappWallet} 
		                        	className={walletConnectClass}>
		                            <WalletConnectSVG />
		                            <span className="flex-1 ml-3 whitespace-nowrap">WalletConnect</span>
		                        </div>
		                    </li>
				      		<li>
		                        <div
		                        	onClick={connectOpera}
		                        	className={operaClass}>
		                            <OperaSVG />
		                            <span className="flex-1 ml-3 whitespace-nowrap">Opera Wallet</span>
		                        </div>
		                    </li>
		                    
				      	</ul>
   						<div>
   							<div
   								className="inline-flex items-center text-xs font-normal 
   									text-gray-500 hover:underline dark:text-gray-400">
   								<WhatSVG />
   								Why do I need to connect with my wallet?
   							</div>
   						</div>
   					</div>
   				</div>
   			</div>
   		</div>
	)
}

export default ModalPopup