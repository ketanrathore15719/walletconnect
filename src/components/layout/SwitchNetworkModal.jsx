import { CloseSVG } from '../'
import { networkClass, closeClass } from './classes'

import {useEffect} from 'react'
import {networks, listNetwork} from './chainList'

const changeNetwork = async ({ networkName }) => {
	try {
		if (!window.ethereum) throw new Error("No crypto wallet found");
		await window.ethereum.request({
			method: "wallet_addEthereumChain",
			params: [
			{
				...networks[networkName]
			}
			]
		});
		window.location.reload()
	} catch (err) {
		//setError(err.message);
	}
};


const SwitchNetworkModal = ({ariaHidenNetwork, arialModalNetwork, modelClassNetwork, closeModalNetwork }) => {

	const handleNetworkSwitch = async (networkName) => {
  		//setError();
  		await changeNetwork({ networkName });
  	};

  	// const networkChanged = (chainId) => {
  	// 	console.log({ chainId });
  	// };

  	useEffect(() => {

  		// let myNfts = []

  		// for (let value of Object.values(networks)) {
  		// 	myNfts.push(value)
  		// }
  		// console.log(Object.values(networks))
  		// console.log(myNfts)

  		// window.ethereum.on("chainChanged", networkChanged);

  		// return () => { window.ethereum.removeListener("chainChanged", networkChanged) };

  	}, []);



	return(
		<div 
   			id="crypto-modal" 
   			tabIndex="-1" 
   			aria-hidden={ariaHidenNetwork} 
   			aria-modal={arialModalNetwork} role="dialog"
   			className={modelClassNetwork}>
   			
   			<div className="relative p-4 w-full max-w-md h-full md:h-auto">
   				<div className="relative bg-gray-800 rounded-lg shadow eth-modal">
   					<button type="button" 
   							className={closeClass} 
   							onClick={closeModalNetwork}
   							data-modal-toggle="crypto-modal">
   						<CloseSVG />
   					</button>

   					<div className="py-4 px-6 rounded-t border-b dark:border-gray-600">
   						<h3 className="text-base font-semibold text-gray-100 lg:text-xl dark:text-white">
   						Switch networks
   						</h3>
   					</div>

   					<div className="p-6">
   						<p className="text-sm font-normal text-gray-500 dark:text-gray-400">
   							Switch to connect with one of our available network providers or create a new one.
   						</p>
   						<ul className="my-4 space-y-3 scrollmodal">
   							{
   								listNetwork?.map((network, id) => (
   									<li key={id}>
						      			<div  
						      				onClick={() => handleNetworkSwitch(network?.name)} 
						      				className={networkClass}>
						      				<span className="flex-1 ml-3 whitespace-nowrap">{network?.title}</span>
						      			</div>
						      		</li>
   								))
   							}
				      	</ul>
   					</div>
   				</div>
   			</div>
   		</div>
	)
}

export default SwitchNetworkModal