import {Form, Formik, Field} from 'formik';
import React from 'react'
import {isSubmitting} from "redux-form";


export const UsersSearchForm: React.FC = () => {

    const usersSearchFormValidate = (values: any) => {
        const errors = {};

        return errors;

    }

    const submitForm = (values: UsersSearchFormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log(values)
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
