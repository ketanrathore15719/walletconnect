
export const networks = {
	polygon: {
		chainId: `0x${Number(137).toString(16)}`,
		chainName: "Polygon Mainnet",
		nativeCurrency: {
			name: "MATIC",
			symbol: "MATIC",
			decimals: 18
		},
		rpcUrls: ["https://polygon-rpc.com/"],
		blockExplorerUrls: ["https://polygonscan.com/"]
	},
	Ethereum: {
		chainId: `0x${Number(1).toString(16)}`,
		chainName: "Ethereum Mainnet",
		nativeCurrency: {
			name: "Ethereum Mainnet",
			symbol: "ETH",
			decimals: 18
		},
		rpcUrls:[
			"https://cloudflare-eth.com",
			"https://rpc.ankr.com/eth",
			"https://eth-mainnet.public.blastapi.io",
			"https://rpc.flashbots.net",
			"https://mainnet-nethermind.blockscout.com"
		],
		blockExplorerUrls:["https://etherscan.io"]
	},
	ftm: {
		chainId: `0x${Number(250).toString(16)}`,
		chainName: "Fantom opera network",
		nativeCurrency: {
			name: "FTM",
			symbol: "FTM",
			decimals: 18
		},
		rpcUrls: ["https://rpc.ftm.tools"],
		blockExplorerUrls: ["https://ftmscan.com"]
	},
	ropsten: {
		chainId: `0x${Number(3).toString(16)}`,
		chainName: "Ropsten Mainnet",
		nativeCurrency: {
			name: "ROP",
			symbol: "ROP",
			decimals: 18
		},
		rpcUrls: ["https://eth-ropsten.alchemyapi.io/v2/yRSjWnYLngZX8nt4UaHwEYmLT1zhN4Er"],
		blockExplorerUrls: ["https://ropsten.etherscan.io"]
	},
	bsc: {
		chainId: `0x${Number(56).toString(16)}`,
		chainName: "Binance Smart Chain Mainnet",
		nativeCurrency: {
			name: "Binance Chain Native Token",
			symbol: "BNB",
			decimals: 18
		},
		rpcUrls: [
			"https://bsc-dataseed1.binance.org",
			"https://bsc-dataseed2.binance.org",
			"https://bsc-dataseed3.binance.org",
			"https://bsc-dataseed4.binance.org",
			"https://bsc-dataseed1.defibit.io",
			"https://bsc-dataseed2.defibit.io",
			"https://bsc-dataseed3.defibit.io",
			"https://bsc-dataseed4.defibit.io",
			"https://bsc-dataseed1.ninicoin.io",
			"https://bsc-dataseed2.ninicoin.io",
			"https://bsc-dataseed3.ninicoin.io",
			"https://bsc-dataseed4.ninicoin.io",
			"wss://bsc-ws-node.nariox.org"
		],
		blockExplorerUrls: ["https://bscscan.com"]
	},
	kovan: {
		chainId: `0x${Number(42).toString(16)}`,
		chainName: "Kovan Mainnet",
		nativeCurrency: {
			name: "KOV",
			symbol: "KOV",
			decimals: 18
		},
		rpcUrls: ["https://kovan.poa.network"],
		blockExplorerUrls: ["https://kovan.etherscan.io"]
	},
	goerli: {
		chainId: `0x${Number(420).toString(16)}`,
		chainName: "Goerli Test Mainnet",
		nativeCurrency: {
			name: "ETH",
			symbol: "ETH",
			decimals: 18
		},
		rpcUrls: ["https://goerli.optimism.io/"],
		blockExplorerUrls: ["https://ropsten.etherscan.io"]
	},
	rinkeby: {
		chainId: `0x${Number(4).toString(16)}`,
		chainName: "Ethereum Testnet Rinkeby",
		nativeCurrency: {
			name: "ETH",
			symbol: "ETH",
			decimals: 18
		},
		rpcUrls: ["https://rinkeby.infura.io/v3/"],
		blockExplorerUrls: ["https://ropsten.etherscan.io"]
	},
};


export const listNetwork = [
	{
		name:"Ethereum",
		title:"Ethereum Mainnet"
	},
	{
		name:"polygon",
		title:"Polygon Mainnet"
	},
	{
		name:"ftm",
		title:"Fantom opera network"
	},
	{
		name:"ropsten",
		title:"Ropsten Network"
	},
	{
		name:"bsc",
		title:"Binance Smart Chain Mainnet"
	},
	{
		name:"kovan",
		title:"Ethereum Testnet Kovan"
	},
	{
		name:"goerli",
		title:"Goerli Test Mainnet"
	},
	{
		name:"rinkeby",
		title:"Ethereum Testnet Rinkeby"
	},
	{
		name:"rinkeby",
		title:" Testnet Rinkeby"
	}
]