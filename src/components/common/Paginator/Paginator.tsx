import React, {useState} from 'react'
import s from './Paginator.module.css'
import {Preloader} from "../Preloader/Preloader";
import cn from 'classnames'


type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    changeCurrentPage: (currentPage: number) => void
    portionSize?: number
}


export const Paginator: React.FC<PaginatorPropsType> = ({
                                                            totalItemsCount, pageSize,
                                                            isFetching, currentPage,
                                                            changeCurrentPage, portionSize = 10
                                                        }) => {


    const pagesCount = Math.ceil(totalItemsCount / pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={s.paginator}>

            {isFetching && <Preloader/>}
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>Prev</button>}

            <div>
                {pages
                    .filter(p => p >= leftPortionPageNumber && p < rightPortionPageNumber)
                    .map(p => {
                        return (
                            <span key={p} className={cn({
                                [s.selectedPage]: currentPage === p}, s.pageNumber)}
                                  onClick={() => changeCurrentPage(p)}>{p}</span>)
                    })}
            </div>
            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>Next</button>}
        </div>
    )
}
