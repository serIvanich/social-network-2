import React from 'react'
import s from './Paginator.module.css'
import {Preloader} from "../Preloader/Preloader";


type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    changeCurrentPage: (currentPage: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = ({
                                                            totalUsersCount, pageSize,
                                                            isFetching, currentPage,
                                                            changeCurrentPage
                                                        }) => {


    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>

            {isFetching && <Preloader/>}
            <div>
                {pages.map(p => {
                    return (
                        <span key={p} className={currentPage === p ? s.selectedPage : ''}
                              onClick={() => changeCurrentPage(p)}>{p}</span>)
                })}
            </div>
        </div>
    )
}
