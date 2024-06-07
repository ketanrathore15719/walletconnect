import React from 'react';
import { usePagination, DOTS } from '../';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        pageset
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    const onNext = () => {
        if(lastPage !== currentPage) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if(currentPage !== 1) {
            onPageChange(currentPage - 1);
        }
    };

    return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4">
        <ul className="inline-flex items-center -space-x-px mt-10">
            <li key={'onPageChange'} onClick={onPrevious}>
                <a 
                    href={pageset} 
                    className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-black-200 rounded-l-lg 
                                border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 
                                dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Previous</span>
                    <svg 
                        className="w-5 h-5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" 
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 
                                0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
                                clipRule="evenodd">
                        </path>
                    </svg>
                </a>
            </li>

           {
                paginationRange.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return (<li key={pageNumber+1}>
                                    <a 
                                    href={pageset} 
                                    className="py-2 px-2 leading-tight text-gray-500 bg-black-200 
                                                border border-gray-300 hover:bg-gray-100 hover:text-gray-700 
                                                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                                                dark:hover:bg-gray-700 dark:hover:text-white">&#8230;
                                    </a>
                                </li>)
                    }

                    return (<li key={pageNumber+1}>
                            <a 
                                href={pageset} 
                                onClick={() => onPageChange(pageNumber)} 
                                className={`${pageNumber === currentPage ? 'bg-gray-100' : 'bg-black-200 '} py-2 px-3 leading-tight text-gray-500 border 
                                            border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 
                                            dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 
                                            dark:hover:text-white`}>
                                            {pageNumber}
                            </a>
                        </li>)
                    }
                )
            }
              
            <li onClick={onNext} key={'nextPage'}>
                <a  
                    href={pageset} 
                    className="block py-2 px-3 leading-tight text-gray-500 bg-black-200  rounded-r-lg border 
                                border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 
                                dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Next</span>
                    <svg 
                        className="w-5 h-5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" 
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 
                                010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd">
                        </path>
                    </svg>
                </a>
            </li>
        </ul>
    </div>
    );
};

export default Pagination