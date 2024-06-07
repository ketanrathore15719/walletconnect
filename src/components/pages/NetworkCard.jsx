//import {useState} from 'react'
const NetworkCard = ({network, id}) => {
    
    //const [netId, setNetId] = useState()
    const addNetwork = (data) => {
        console.log(data?.rpc)
        const rpcArray = data?.rpc

        data?.rpc.push("https://ropsten.infura.io/v3/15d78b3b6cfd441bb97234d12f9727cd")
        console.log(rpcArray)
        const params = [{
            chainId: `0x${Number(data?.chainId).toString(16)}`,
            chainName: data?.name,
            nativeCurrency: {
                name: data?.nativeCurrency?.name,
                symbol: data?.nativeCurrency?.symbol,
                decimals: data?.nativeCurrency?.decimals
            },
            rpcUrls: rpcArray,
            blockExplorerUrls: [data?.explorers[0]?.url]
        }]

        window.ethereum.request({ method: 'wallet_addEthereumChain', params })
        .then(() =>  {
            //setNetId(id)
            window.location.reload()
        })
        .catch((error) => console.log("Error", error.message))
    }

	return(
		<div className="bg-[#1E293B] m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[500px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            min-w-full
            flex-col p-3 rounded-md hover:shadow-2xl"
            >
            <div className="flex flex-col items-center w-full mt-3">
                <div className="display-flex justify-start w-full mb-6 p-1 text-center">
                    <p className="text-white text-base font-bold pb-2 ">{network?.name}</p>

                    <p className="text-white text-base flex">Chain ID  : <span className="pl-1 font-bold">{network?.chainId}</span></p>

                    <p className="text-white text-base flex">Currency : <span className="pl-1 font-bold">{network?.nativeCurrency?.symbol}</span></p>
                        
                </div>
                <div className="bg-black p-3 px-5 text-[#37c7da] font-bold w-max rounded-3xl -mt-5 shadow-2xl networkbtn" onClick={addNetwork.bind(this, network)}>
                    Switch networks
                </div>
            </div>
        </div>
	)
}

export default NetworkCard