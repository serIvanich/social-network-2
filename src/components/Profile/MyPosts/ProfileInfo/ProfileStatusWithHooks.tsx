import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusPropsType = {
    status: string
    changeUserProfileStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<ProfileStatusPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState(props.status)

    useEffect(() => {

            setLocalStatus(props.status)

    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.changeUserProfileStatus(localStatus)
    }

    const changeInputText = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                        <span onDoubleClick={activateEditMode}>
                            { props.status || '-------'}
                        </span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={changeInputText}
                       autoFocus={true}
                       onBlur={deactivateEditMode}
                       value={localStatus}/>
            </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks
