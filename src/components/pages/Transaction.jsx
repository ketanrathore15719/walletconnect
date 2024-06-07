import React, { useContext, useState } from "react";
import { TransactionContext } from "../";
import {Pagination} from '../';
import {TransactionsCard} from '../'

let PageSize = 4;

const Transactions = () => {
    const { transactions } = useContext(TransactionContext);
    const isConnect =  JSON.parse(sessionStorage.getItem("isConnected"));
    const [currentPage, setCurrentPage] = useState(1);
    //const [currentTableData, setCurrentTableData] = useState([])
    let currentTableData = [];
  
    if(transactions.length !== 0) {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        currentTableData = transactions?.slice(firstPageIndex, lastPageIndex);
       // setCurrentTableData(transactions?.slice(firstPageIndex, lastPageIndex))
    }

    // const currentTableData = useMemo(() => {
    //   const firstPageIndex = (currentPage - 1) * PageSize;
    //   const lastPageIndex = firstPageIndex + PageSize;
    //   return transactions?.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);

    return (
        <div id="transaction" className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-services">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {isConnect ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Latest Transactions
                    </h3>
                    ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                        Connect your account to see the latest transactions
                    </h3>
                )}
                {
                    isConnect && (
                        <>
                            <div className="flex flex-wrap justify-center items-center mt-10">
                                {currentTableData?.map((transaction, i) => (<TransactionsCard key={i} {...transaction} />))}
                            </div>
                            <Pagination
                                className="items-end mt-50 position:fixed "
                                currentPage={currentPage}
                                totalCount={transactions.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                                pageset={'#transaction'}
                            />
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Transactions;

//(<TransactionsCard key={i} {...transaction} />))