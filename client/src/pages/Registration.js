import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Registration() {
    const initialValues = {
        username:"",
        password:"",
      };
    
    const validationSchema = Yup.object().shape({
        username: Yup.string()
        .min(5, 'Username must be at least 5 characters long')
        .max(15, 'Username must be at most 15 characters long')
        .required('Username is required'),

        password: Yup.string()
        .min(5, 'Password must be at least 5 characters long')
        .max(20, 'Max Characters is 20.')
        .required('Password is required'),
    });


    const onSubmit = (data) => {
        axios.post('http://localhost:3001/auth', data)
       .then(() => {
        console.log(data);
       });
    };

  return (
    <div>
      <h1>Register Here:</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema ={validationSchema}>

          <Form className="formContainer">

            <label for="title">Username:</label>

            <ErrorMessage name='username' component="span"/>

            <Field
              autocomplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. Melody123...)"
            />

            <label for="title">Password:</label>

            <ErrorMessage name='password' component="span"/>

            <Field
              autocomplete="off"
              type="password"
              id="inputCreatePost"
              name="password"
              placeholder="(Your Password...)"
            />

            <button type="submit"> Register </button>
          </Form>
      </Formik>
    </div>
  )
}

export default Registration
