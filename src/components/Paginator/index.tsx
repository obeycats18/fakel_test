import React, { useState, useEffect } from 'react'

import classnames from 'classnames'

import dataThunks from '../../redux/thunks/dataTableThunks'
import { useDispatch, useSelector } from 'react-redux'
import { GlobaleStore } from '../../redux/store'

const {getDataFromPage} = dataThunks

type _PaginatorPropsT = {
    pageLimit?: number
}

const _renderPageItem = (_pageCount: number, currentPage: number, handlePageClick:(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) => {

    const _pageItem = []

    for(let i = 1; i <= _pageCount; i++ ){
        _pageItem.push( <li key={i} onClick={handlePageClick} data-index={i} className={classnames("page-item", {active: i === currentPage})}><a className="page-link" href="#">{i}</a></li> )
    }

    return _pageItem
}

const Paginator: React.FC<_PaginatorPropsT> = ({pageLimit = 8}) => {

    // Общее кол-во записей
    const recordsCount = useSelector( (state: GlobaleStore) => state.data.tempData.length )
    
    // Текущая страница
    const [currentPage, setCurrentPage] = useState<number>(1)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getDataFromPage(currentPage, pageLimit))
    // }, [currentPage, pageLimit]);

    // Вычисление кол-ва страниц - общее кол-во записей / максимальное кол-во записей на одной странице
    const _pageCount = Math.ceil(recordsCount / pageLimit)

    const handlePageClick = (e: any) => {
        if(e.target) {
            const li = e.target.parentNode
            if(li) {
                const {index} = li.dataset
                dispatch(getDataFromPage(index, pageLimit))
                setCurrentPage(parseInt(index))
            }
        }
    }

    return (
        <nav aria-label="pagination-table">
            <ul className="pagination">
                {_renderPageItem(_pageCount, currentPage, handlePageClick)}
            </ul>
        </nav>
    )
}

export default Paginator;
