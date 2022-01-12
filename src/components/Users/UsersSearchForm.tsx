import {Form, Formik, Field} from 'formik';
import React from 'react'
import {UsersFilterType} from "../../redux/users-reducer";

type PropsType = {
    onFilterChanged: (filter: UsersFilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = ({onFilterChanged}) => {

    const usersSearchFormValidate = (values: any) => {
        const errors = {};

        return errors;

    }

    const submitForm = (values: UsersFilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log(values)
        const filter = {
            term: values.term
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>

        <Formik
            initialValues={{term: '', select: ''}}
            validate={usersSearchFormValidate}
            onSubmit={submitForm}
        >
            {({ isSubmitting }) => (
            <Form>
                <Field type='text' name='term'/>

                <Field type='select' name='select'/>

                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </Form>
            )}
        </Formik>

    </div>
}


type UsersSearchFormType = {
    term: string
    select: string
}
