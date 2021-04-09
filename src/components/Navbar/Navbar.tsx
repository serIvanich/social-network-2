import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Navbar.module.css'


export const Navbar: React.FC = () => {

    return (
        <div className={s.navbar}>
            <NavLink to='/profile' className={s.item} activeClassName={s.active} >PROFILE</NavLink>
            <NavLink to='/dialogs' className={s.item} activeClassName={s.active} >DIALOGS</NavLink>
            <NavLink to='/music' className={s.item} activeClassName={s.active} >MUSIC</NavLink>
            <NavLink to='/news' className={s.item} activeClassName={s.active} >NEWS</NavLink>
        </div>
    )
}
