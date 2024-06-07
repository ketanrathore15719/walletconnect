import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import Fortmatic from 'fortmatic';
import Web3 from 'web3'


let fm = new Fortmatic('pk_test_F235B48F26CA50DB');
const web3 = new Web3(fm.getProvider());

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionsContract;
};
//const APIKEY = 'yT-vsxTrX9h0hlm67nN9pZlFwu7D3tUM'
//const alchemyUrl = `https://eth-mainnet.alchemyapi.io/v2/${APIKEY}`

//const alchemyUrl111 = 'https://eth-ropsten.alchemyapi.io/v2/yRSjWnYLngZX8nt4UaHwEYmLT1zhN4Er'

export const TransactionsProvider = ({ children }) => {
    console.log(children)
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [currentAccount, setCurrentAccount] = useState(JSON.parse(sessionStorage.getItem("currentAccount")));
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null)
    const [balance, setBalance] = useState(0)
    const [showConfetti, setShowConfetti] = useState(false)
    
    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async () => {

        try {

            if (ethereum) {
                const isFortmatic = await fm.user.isLoggedIn()
                
                if(isFortmatic) {
                    const resFortmatic = await fm.user.getTransactions()

                    const structuredTransactions = resFortmatic?.map((transaction) => ({
                        to_address: transaction.to_address,
                        from_address: transaction.from_address,
                        timestamp_created: new Date(transaction.timestamp_created * 1000).toLocaleString(),
                        status: transaction.status,
                        amount: transaction.amount,
                        created:transaction.timestamp_created,
                    }));
                    
                    let sortedTransactions = structuredTransactions?.slice().sort((a, b) =>  b.created - a.created);
        
                    setTransactions(sortedTransactions);

                } else {
                    const transactionsContract = createEthereumContract();
                    console.log(transactionsContract)
                    const availableTransactions = await transactionsContract.getAllTransactions();

                    const structuredTransactions = availableTransactions.map((transaction) => ({
                        to_address: transaction.receiver,
                        from_address: transaction.sender,
                        timestamp_created: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                        status: 'success',
                        keyword: transaction.keyword,
                        amount: parseInt(transaction.amount._hex) / (10 ** 18),
                        created:transaction.timestamp.toNumber(),
                    }));
                    
                    let sortedTransactions = structuredTransactions?.slice().sort((a, b) =>  b.created - a.created);
        
                    setTransactions(sortedTransactions);
                }
               
            } else {
                console.log("Ethereum is not present");
            }

        } catch (error) {
            console.log('getAllTransactions',error);
        }
    };


    const checkIfTransactionsExists = async () => {
        
        try {
            
            if (ethereum) {
            
                const transactionsContract = createEthereumContract();

                const currentTransactionCount = await transactionsContract.getTransactionCount();

                window.localStorage.setItem("transactionCount", currentTransactionCount);
            }

        } catch (error) {
            console.log('checkIfTransactionsExists',error);
            // throw new Error("No ethereum object");
        }
    };


    const getBalance = async (walletAddress) => {

        try{
            if(walletAddress) {
                window.ethereum.request({method:'eth_getBalance', params:[walletAddress,'latest']})
                .then(balance => {
                    let newBalance = ethers.utils.formatEther(balance)
                    setBalance(newBalance)
                })
            }
        } catch (error) {
            console.log('getBalance',error);
        }
        
    }


    const connectWallet = async () => {
  
        try {
            
            if (!ethereum) return alert("Please install MetaMask. https://metamask.io/download/");

            // const accounts = await ethereum.request({
            //                                 method: 'wallet_requestPermissions',
            //                                 params: [{
            //                                 eth_accounts: {},
            //                             }]
            //                         });

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
          
            setCurrentAccount(accounts[0]);
            getBalance(accounts[0])
            sessionStorage.setItem('isConnected', JSON.stringify(true)); 
            sessionStorage.setItem('currentAccount', JSON.stringify(accounts[0]))
            window.location.reload();

        } catch (error) {
            console.log('connectWallet',error);
            // throw new Error("No ethereum object");
        }
    };

    const sendTransaction = async () => {

        try {
            
            if (ethereum) {

                const { addressTo, amount, keyword, message } = formData;
                const transactionsContract = createEthereumContract();
                const parsedAmount = ethers.utils.parseEther(amount);
                
                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount._hex,
                    }],
                });

                const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);

                await transactionHash.wait();
                setShowConfetti(true)
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                const transactionsCount = await transactionsContract.getTransactionCount();

                setTransactionCount(transactionsCount.toNumber());
                
                setTimeout(() => {
                    window.location.reload();
                },5000)
                

            } else {
                console.log("No ethereum object");
            }

        } catch (error) {
            console.log('sendTransaction',error);
            setError(error.message)
            // throw new Error("No ethereum object");
        }
    };


    useEffect(() => {

        const checkIfWalletIsConnect = async () => {
        
            try {
            
                if (!ethereum) return alert("Please install MetaMask. https://metamask.io/download/");

                const accounts = await ethereum.request({ method: "eth_accounts" });

                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                    getAllTransactions();
                } else {
                    console.log("No accounts found");
                }

            } catch (error) {
                console.log('checkIfWalletIsConnect',error);
            }
        };

        checkIfWalletIsConnect();
        checkIfTransactionsExists();
    },[transactionCount])
    
    //}, [transactionCount]);

    return (
        <TransactionContext.Provider
            value={{
                transactionCount,
                connectWallet,
                transactions,
                currentAccount,
                isLoading,
                sendTransaction,
                handleChange,
                formData,
                setIsLoading,
                error, 
                setError,
                balance, 
                setBalance,
                getBalance,
                ethereum,
                fm,
                web3,
                setformData,
                showConfetti,
                setCurrentAccount
            }}
            >
            {children}
        </TransactionContext.Provider>
    );
};