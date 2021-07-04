import React, {ComponentType} from 'react'
import {
    addDialogsTextActionCreate,
    DialogItemType,
    DialogsTextsType
} from "../../redux/dialogs-reducer";

import {Dialogs} from "./Dialogs";
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStateToPropsType = {
    dialogItems: Array<DialogItemType>
    dialogTexts: Array<DialogsTextsType>
    newMessage: string
}
const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogItems: state.dialogsPage.dialogItems,
        dialogTexts: state.dialogsPage.dialogTexts,
        newMessage: state.dialogsPage.newMessage,
    }
}

type MapDispatchToPropsType = {
    addMessage: (text: string) => void
}
const MapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {

    return {
        addMessage: (text: string) => {
            dispatch(addDialogsTextActionCreate(text))
        }

    }
}

// const withAuthRedirectDialogs = withAuthRedirect(Dialogs)
//
// export const DialogsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
//     MapStateToProps, MapDispatchToProps)(withAuthRedirectDialogs)

export default compose<ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    MapStateToProps, MapDispatchToProps),
    withAuthRedirect
)
(Dialogs)
