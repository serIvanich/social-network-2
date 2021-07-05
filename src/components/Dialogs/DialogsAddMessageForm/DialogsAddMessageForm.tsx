
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";



export type DialogsFormDataType = {
    newMessage: string
}

const maxLength15 = maxLengthCreator(15)

const DialogsAddMessageForm: React.FC<InjectedFormProps<DialogsFormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newMessage'} component={'textarea'}
                       placeholder={'Enter your messages'} validate={[required, maxLength15]}
                />

            </div>
            <div>
                <button>add post</button>
            </div>

        </form>
    )
}

export default reduxForm<DialogsFormDataType>({form: 'Dialogs'}) (DialogsAddMessageForm)
