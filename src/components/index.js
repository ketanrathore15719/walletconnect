// layout component
export {default as Navbar} from './layout/Navbar'
export {default as Footer} from './layout/Footer'

//pages components
export {default as Welcome} from './pages/Welcome'
export {default as Services} from './pages/Services'
export {default as Transaction} from './pages/Transaction'
export {default as TransactionsCard} from './pages/TransactionsCard'
export {default as NetworkList} from './pages/NetworkList'


// common component
export {default as ErrorMessage} from './common/ErrorMessage'
export {default as Pagination} from './common/Pagination'
export {default as Loader} from './common/Loader'

// common svg component
export {default as MetamaskSVG} from './common/svg/MetamaskSvg'
export {default as CoinbaseSVG} from './common/svg/CoinbaseSvg'
export {default as FortmaticSVG} from './common/svg/FortmaticSvg'
export {default as WhatSVG} from './common/svg/WhatSvg'
export {default as CloseSVG} from './common/svg/CloseSvg'
export {default as OperaSVG} from './common/svg/OperaSvg'
export {default as WalletConnectSVG} from './common/svg/WalletConnectSvg'
//hooks component
export {usePagination, DOTS} from '../hooks/usePagination'
export {default as useFetch} from '../hooks/useFetch'

//utils component
export {shortenAddress} from '../utils/shortenAddress'

//context api component
export { TransactionContext } from '../context/TransactionContext'