import {React, useState, useEffect} from 'react'
import NetworkCard from './NetworkCard'
import {Pagination} from '../';
const NetworkList = () => {

	const isConnect =  JSON.parse(sessionStorage.getItem("isConnected"));
	const [networkList, setNetworkList] = useState([])
	
    useEffect(() => {

    	const fetchdata = async () => {
    		const result = await fetch('https://chainlist.org/_next/data/XYzdDCC9KnzQhCcXvsOZX/en.json', {
		        method: 'GET',
		        mode: 'cors',
		    }).then(data => data.json())

		    let sortedTransactions = result?.pageProps?.sortedChains?.slice().sort((a, b) =>  a?.chainId - b.chainId);
        	//console.log(sortedTransactions)
    		setNetworkList(sortedTransactions)																																																																																																																																																																																																																																																																					
    	}

	   	fetchdata()
    },[])
    let PageSize = 20;
    const [currentPage, setCurrentPage] = useState(1);
   
    let currentTableData = [];
  
    if(networkList.length !== 0) {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        currentTableData = networkList?.slice(firstPageIndex, lastPageIndex);
       // setCurrentTableData(transactions?.slice(firstPageIndex, lastPageIndex))
    }
    
	return(
		 <div id="network" className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {isConnect && (
                    <h3 className="text-white text-3xl text-center my-2">
                        List of network
                    </h3>
                )}
				{
				    isConnect && (
				        <>
				            <div className="flex flex-wrap justify-center items-center mt-10">
				                {currentTableData?.map((network, i) => (<NetworkCard key={i} network={network} id={i}/>))}
				            </div>
				            <Pagination
				                className="items-end mt-50 position:fixed "
				                currentPage={currentPage}
				                totalCount={networkList.length}
				                pageSize={PageSize}
				                onPageChange={page => setCurrentPage(page)}
				                pageset={'#network'}
				            />
				        </>
				    )
				}
            </div>
        </div>
	)
}

export default NetworkList