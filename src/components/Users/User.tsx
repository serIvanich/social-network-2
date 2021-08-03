import React from 'react'
import {UserType} from "../../redux/users-reducer"
import s from './Users.module.css'
import userPhoto from './../../assets/images/users2.jpg'
import {NavLink} from 'react-router-dom';

type UserPropsType = {
    user: UserType

    followingInProgress: Array<number>
    changeCurrentPage: (currentPage: number) => void
    getFollowCallback: (userId: number) => void
    getUnfollowCallback: (userId: number) => void
}


export const User: React.FC<UserPropsType> = ({
                                                  user, followingInProgress,
                                                  getUnfollowCallback, getFollowCallback, ...props
                                              }) => {

    return (
        <div>

            <div className={s.userContainer}>
                <div>
                    <div>
                        {user.name}
                    </div>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={s.avatar} src={user.photos.small !== null ? user.photos.small : userPhoto}/>
                    </NavLink>

                    <div className={s.button}>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => getUnfollowCallback(user.id)
                                      }>UNFOLLOW</button>

                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => getFollowCallback(user.id)
                                      }>FOLLOW</button>
                        }

                    </div>
                </div>
                <div className={s.userInfo}>

                    <div>
                        My status:
                        {`\t ${user.status}`}
                    </div>
                    <div className={s.userLocation}>
                        <div>
                            City:
                            {'u.location.cityName'}
                        </div>
                        <div>
                            Country:
                            {'u.location.countryName'}
                        </div>


                    </div>
                </div>


            </div>
        </div>
    )
}


