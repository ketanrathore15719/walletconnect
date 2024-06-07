import React, { useContext, useState, useEffect } from "react";
//import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {ErrorMessage} from '../'
import { TransactionContext } from "../";
import { shortenAddress } from "../";
import { Loader } from "../";
import { MdContentCopy } from 'react-icons/md'
import { ethers } from "ethers";
import {
  useWindowSize,
} from '@react-hook/window-size';
import Confetti from 'react-confetti';
const Input = ({ placeholder, name, type, value, handleChange }) => (
        <input
            placeholder={placeholder}
            type={type}
            step="0.0001"
            value={value}
            onChange={(e) => handleChange(e, name)}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
    );

const Welcome = () => {
    const { width, height } = useWindowSize()
    const { currentAccount,showConfetti, handleChange,getBalance, balance , sendTransaction,setError ,error,formData,isLoading, fm, web3 } = useContext(TransactionContext);
    const isConnect =  JSON.parse(sessionStorage.getItem("isConnected"));

    const isFortmatic = JSON.parse(localStorage.getItem("isFortmatic"));
    const fortmaticAddress = JSON.parse(localStorage.getItem("fortmatic"));
    const balanceEth = JSON.parse(localStorage.getItem("ethBalance"));
    const [ethBalance, setEthBalance] = useState(balanceEth ? balanceEth : null)
    
    getBalance(currentAccount)
 
    var balances = Number(balance)
    const [copySuccess, setCopySuccess] = useState('');

    let fortmaticSendTransaction = async (e) => {
    
        const { addressTo, amount, message } = formData;
        e.preventDefault();

        const parsedAmount = ethers.utils.parseEther(amount);
        //console.log(parsedAmount)
        if (!addressTo || !amount || !message) {
            setError('All field is required!')
            return
        };

        web3.eth.getAccounts((error, accounts) => {
            if (error) throw error;

            // Construct Ether transaction params
            const txnParams = {
                from: accounts[0],
                to: addressTo,
                value: parsedAmount._hex
            }
            // Send Ether transaction with web3
            web3.eth.sendTransaction(txnParams, (error, txnHash) => {
                if (error) throw error;
                //console.log(txnHash);
                // setTimeout(() => {
                //     window.location.reload()
                // },11000)
            });
        });
    };

    const handleSubmit = (e) => {
        const { addressTo, amount, message } = formData;
        e.preventDefault();

        if (!addressTo || !amount || !message) {
            setError('All field is required!')
            return
        };

        sendTransaction();
    };

    const copyClipboard = () => {
        setCopySuccess('Copied!')
        navigator.clipboard.writeText(isFortmatic ? fortmaticAddress : currentAccount)
        setTimeout(() => {
            setCopySuccess(null)
        },900)
    }

    useEffect(() => {
         const getBalance = async() => {
            let balances = await fm.user.getBalances();
            let ethBalance = balances.find((e) => {
                return e.crypto_currency === 'ETH';
            });
            //console.log(ethBalance)
            if (isFortmatic) {
                setEthBalance(ethBalance)
                localStorage.setItem('ethBalance', JSON.stringify(ethBalance ? ethBalance : null));
            }
           // console.log(await fm.user.getTransactions())
        }    
        getBalance()
        
    },[fm, isFortmatic])

    
    return (
        <div className="flex w-full justify-center items-center">
           {/* <div id="home" className="flex flex-col items-start justify-between md:p-20 py-12 px-4 ">*/}
               {/* <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
                    </p>
                    
                </div>*/}
                
                {showConfetti && <Confetti width={width} height={height} /> }
                <div id="exchange" className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 w-72 sm:w-72 w-full my-5 eth-card white-glassmorphism ">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="flex">
                                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                        <SiEthereum fontSize={21} color="#fff" />
                                    </div>
                                    <p className="text-white font-semibold text-lg mt-1 ml-2">Ethereum</p>
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                {isConnect && (
                                    <>
                                        <div className="flex">
                                            <p className="text-white font-light text-sm">
                                                { isFortmatic ? shortenAddress(fortmaticAddress) : shortenAddress(currentAccount)}
                                            </p>
                                            <MdContentCopy onClick={copyClipboard} className="text-white m-1 cursor-pointer hover:text-gray-700"/>
                                            <p className={`text-green-900 font-semibold text-xs m-1 ${copySuccess ? 'bg-green-100 w-14 rounded' : null}`}>
                                                <span className="items-center ml-1">{copySuccess}</span>
                                            </p>
                                        </div>
                                    <p className="text-white font-semibold text-sm text-lg mt-1">{isFortmatic ? ethBalance?.crypto_amount_display : balances.toFixed(4)} {'ETH'}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="p-5 m-5 sm:w-96 w-80 flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                       {/* <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />*/}
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                        <div className="h-[1px] w-full bg-gray-400 my-2" />

                        {
                            isLoading
                            ? 
                            <>
                            <Loader />
                            <p className="text-white text-sm font-light">Please wait ! don't refresh the page.</p>
                            </>
                            : 
                            (
                                isFortmatic ? 
                            <button
                                type="button"
                                onClick={fortmaticSendTransaction}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                >
                                Send now
                            </button>
                            :
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                >
                                Send now
                            </button>
                            )
                        }
                        <ErrorMessage message={error} setError={setError}/>
                    </div>
                </div>
            </div>
        /*</div>*/
    );
};

export default Welcome;