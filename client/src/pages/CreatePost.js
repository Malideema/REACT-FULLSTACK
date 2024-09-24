import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function CreatePost() {

  const initialValues = {
    title:"",
    postText:"",
    username:"",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
     .min(5, 'Title must be at least 5 characters long')
     .required('Title is required'),
    postText: Yup.string()
     .min(10, 'Post must be at least 10 characters long')
     .max(50, 'Max Characters is 50.')
     .required('Post is required'),
    username: Yup.string()
     .min(5, 'Username must be at least 5 characters long')
     .max(15, 'Username must be at most 15 characters long')
     .required('Username is required'),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response)=>{
      console.log("IT WORKED!");
    });
  };

  return (
    <div className="createPostPage">
       <div className="pageTitle"><h1> Create A Post! </h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema ={validationSchema}>

          <Form className="formContainer">

            <label for="title">Title:</label>

            <ErrorMessage name='title' component="span"/>

            <Field
              autocomplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="(Ex. Title...)"
            />

            <label for="title">Post:</label>

            <ErrorMessage name='postText' component="span"/>

            <Field
              autocomplete="off"
              id="inputCreatePost"
              name="postText"
              placeholder="(Ex. Post...)"
            />

            <label for="title">Username:</label>

            <ErrorMessage name='username' component="span"/>

            <Field
              autocomplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. Melody123...)"
            />

            <button type="submit"> Create Post </button>
          </Form>
      </Formik>
      </div>
    </div>
  );
}

export default CreatePost
