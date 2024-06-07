import React from 'react'
import {Navbar, Footer, Welcome, Transaction, NetworkList} from './components'
import { Web3ReactProvider } from '@web3-react/core'

import { Web3Provider } from "@ethersproject/providers";
//import { ethers } from "ethers";

function getLibrary(provider) {
    return new Web3Provider(provider);
}

const script = document.createElement("script");
        script.src = "/wallet/assets/metamask.js";
        script.async = true;
        document.body.appendChild(script);

const App = () => {


    return (
        <div className="min-h-screen">
            <div className="gradient-bg-welcome" id="home">
                <Web3ReactProvider getLibrary={getLibrary}>
                <Navbar />
                </Web3ReactProvider>
                <div id="logo-container" className="flex w-full justify-center items-center"></div>
                <Welcome />
            </div>  
            {/*<Services />*/}
            <Transaction />
            <NetworkList />
            <Footer />
        </div>
    )
}

export default App