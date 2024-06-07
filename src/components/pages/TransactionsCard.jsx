import { shortenAddress } from "../"
//import {useFetch} from "../";
const TransactionsCard = ({ to_address, from_address, timestamp_created, status, keyword, amount, url }) => {
	//const gifUrl = useFetch({ keyword });
    
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
                <div className="display-flex justify-start w-full mb-6 p-1">
                    <a href={`https://ropsten.etherscan.io/address/${from_address}`} target="_blank" rel="noreferrer">
                        <p className="text-white text-base flex">From : <span className="pl-6">{shortenAddress(from_address)}</span></p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${to_address}`} target="_blank" rel="noreferrer">
                        <p className="text-white text-base flex">To : <span className="pl-11">{shortenAddress(to_address)}</span></p>
                    </a>
                    <p className="text-white text-base">Amount : {amount} ETH</p>
                    {status && (
                        <>
                           <p className="text-white text-base flex">Status : <span className="pl-5 text-green-500">{status}</span></p>
                        </>
                    )}
                </div>
                {/*<img
                  src={gifUrl || url}
                  alt="nature"
                  className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
                />*/}
                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold">{timestamp_created}</p>
                </div>
            </div>
        </div>
	)
}

export default TransactionsCard