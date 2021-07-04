import React from "react";
import {addPost, MessageType} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {AppStateType} from "../../../redux/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";


type MapStateToPropsType = {
    posts: Array<MessageType>
    textMessage: string

}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        textMessage: state.profilePage.textMessage
    }
}

type MapDispatchToPropsType = {
    addPost: (text: string) => void
}
const MapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
    addPost: (text: string) => {
        dispatch(addPost(text))
    }

}
}


export const MyPostsContainer = connect<MapStateToPropsType,MapDispatchToPropsType,{}, AppStateType>(
    MapStateToProps, MapDispatchToProps)(MyPosts)



