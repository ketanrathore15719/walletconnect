import React,{useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";

import { useWeb3React } from '@web3-react/core'
import { modelClass1, modelClass2, walletClass} from './classes'
import ModalPopup from './ModalPopup'
import SwitchNetworkModal from './SwitchNetworkModal'
import Fortmatic from 'fortmatic';
import Web3 from 'web3'


let fm = new Fortmatic('pk_test_F235B48F26CA50DB');
const web3 = new Web3(fm.getProvider());

const NavBarItem = ({ title,path,setToggleMenu ,classprops }) => (
  	<li className={`mx-4 cursor-pointer ${classprops}`}>
  		<a href={path} onClick={() => setToggleMenu(false)} >{title}</a>
  	</li>
);

const routePath = [
	{
		name:"Home",
		path:'#home'
	},
	{
		name:"Exchange",
		path:'#exchange'
	},
	{
		name:"Services",
		path:'#services'
	},
	{
		name:"Transaction",
		path:'#transaction'
	}
]

const Navbar = () => {

	const { deactivate } = useWeb3React();

  	const [toggleMenu, setToggleMenu] = React.useState(false);

  	const [modelClass, setModelClass] = useState(modelClass1)
  	const [ariaHiden, setAriahidden] = useState(true)
  	const [arialModal, setAriaModal] = useState(false)

  	const [ariaHidenNetwork, setAriahiddenNetwork] = useState(true)
  	const [arialModalNetwork, setAriaModalNetwork] = useState(false)
  	const [modelClassNetwork, setModelClassNetwork] = useState(modelClass1)
  	const isConnect =  JSON.parse(sessionStorage.getItem("isConnected"));

  	const discconnectWallet = async () => {

  		try{
  			deactivate()
  			fm.user.logout()
  			sessionStorage.clear()
  			localStorage.clear()
    		window.location.reload();
  		}catch(err) {
  			console.log(err)
  		}
  	}
  
  	const openModal = () => {
  		setModelClass(modelClass2)
  		setAriahidden(false)
  		setAriaModal(true)
  	}

  	const closeModal = () => {
  		setModelClass(modelClass1)
  		setAriahidden(true)
  		setAriaModal(false)
  	}

  	const openModalNetwork = () => {
  		setModelClassNetwork(modelClass2)
  		setAriahiddenNetwork(false)
  		setAriaModalNetwork(true)
  	}

  	const closeModalNetwork = () => {
  		setModelClassNetwork(modelClass1)
  		setAriahiddenNetwork(true)
  		setAriaModalNetwork(false)
  	}

 	window.Buffer = window.Buffer || require('buffer').Buffer;

  	return (
    	<nav className="w-full flex md:justify-center justify-between items-center p-4">
   		<div className="md:flex-[0.5] flex-initial justify-center items-center">
   			<h1 className="text-white text-2xl whitespace-nowrap ">Wallet Connect</h1>
   		</div>
      		
   		<ul 
   			className="text-white md:flex hidden list-none 
   							flex-row justify-between items-center flex-initial">
	     		{routePath.map((item, index) => (
	       			<NavBarItem key={item.name + index} title={item.name} path={item.path} />
	     		))}
	     		{isConnect &&
	     			<li className={`mx-4 cursor-pointer`}>
			  			<button type="button" onClick={openModalNetwork} className={walletClass} ><p className="text-white text-base font-semibold whitespace-nowrap">Switch Networks</p></button>
			  		</li> 
			  	}	
   		</ul>

   		<ul className="text-white md:flex flex-row justify-between items-center flex-initial">
     		{isConnect ? 
     			(
     				<li className="btnWallet">
                 <button
                     type="button"
                     onClick={discconnectWallet}
                     className={`${walletClass}`}
                     >
                     <AiFillPlayCircle className="text-white mr-2" />
                     <p className="text-white text-base font-semibold whitespace-nowrap">Disconnect Wallet</p>
                 </button>
              </li>

     			) :(
 				<li className="btnWallet">
	             <button 
	              	type="button" 
	              	data-modal-toggle="crypto-modal" 
	              	className={walletClass}
	              	onClick={openModal}
	              	>
	      			<AiFillPlayCircle className="text-white mr-2" />
	                  <p className="text-white text-base font-semibold">Connect Wallet</p>
	      		</button>
	           </li>
                 )
             }
   		</ul>
   		<div className="flex relative">
     		{!toggleMenu && (
       			<HiMenuAlt4 
       				fontSize={28} 
       				className="text-white md:hidden cursor-pointer" 
       				onClick={() => setToggleMenu(true)} />
     		)}
     		
     		{toggleMenu && (
       			<ul
         			className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl 
         				md:hidden list-none flex flex-col justify-start items-end 
         				rounded-md blue-glassmorphism text-white animate-slide-in"
       				>
         			<li className="text-xl w-full my-2">
         				<AiOutlineClose 
         					className="text-white md:hidden cursor-pointer" 
         					onClick={() => setToggleMenu(false)} />
         			</li>
         				{routePath.map(
           					(item, index) => <NavBarItem 
           										key={item.name + index} 
           										title={item.name} 
           										path={item.path} 
           										setToggleMenu={setToggleMenu} 
           										classprops="my-2 text-lg" />,
         				)}
         			{isConnect ? 
     			(
     				<li className="btnWalletmd">
		                 <button
		                     type="button"
		                     onClick={discconnectWallet}
		                     className={`${walletClass}`}
		                     >
		                     <AiFillPlayCircle className="text-white mr-2" />
		                     <p className="text-white text-base font-semibold whitespace-nowrap">Disconnect Wallet</p>
		                 </button>
		            </li>

     			) :(
 				<li className="btnWalletmd">
	             <button 
	              	type="button" 
	              	data-modal-toggle="crypto-modal" 
	              	className={walletClass}
	              	onClick={openModal}
	              	>
	      			<AiFillPlayCircle className="text-white mr-2" />
	                  <p className="text-white text-base font-semibold">Connect Wallet</p>
	      		</button>

	           </li>
                 )
             }
             	{isConnect &&
             		<li className="btnWalletmd">
             			<button type="button" onClick={openModalNetwork} className={walletClass} ><p className="text-white text-base font-semibold whitespace-nowrap">Switch Networks</p></button>
             		</li>
             	}
       			</ul>
     		)}
   		</div>
   		<ModalPopup   
   			ariaHiden={ariaHiden}
   			arialModal={arialModal}
   			modelClass={modelClass}
   			closeModal={closeModal}
   			fm={fm}
   			web3={web3}
   		/>

   		<SwitchNetworkModal   
   			ariaHidenNetwork={ariaHidenNetwork}
   			arialModalNetwork={arialModalNetwork}
   			modelClassNetwork={modelClassNetwork}
   			closeModalNetwork={closeModalNetwork}
   		/>
    	</nav>
  	);
};

export default Navbar;