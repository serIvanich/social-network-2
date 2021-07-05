import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";


export type PostFormDataType = {
    myNewPost: string
}

const maxLength10 = maxLengthCreator(10)

const ProfileAddMessageForm: React.FC<InjectedFormProps<PostFormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'myNewPost'} placeholder={'enter post'} component={Textarea} validate={[required, maxLength10]} />

            </div>
            <div>
                <button>add post</button>
            </div>

        </form>
    )
}

export default reduxForm<PostFormDataType>({form: 'ProfileMyPost'}) (ProfileAddMessageForm)
