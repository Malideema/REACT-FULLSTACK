import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

function CreatePost() {

  const initialValues = {
    title:"",
    postText:"",
    username:"",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
     .min(5, 'Title must be at least 5 characters long')
     .required('Title is required'),
    postText: Yup.string()
     .min(20, 'Post must be at least 20 characters long')
     .required('Post is required'),
    username: Yup.string()
     .min(5, 'Username must be at least 5 characters long')
     .required('Username is required'),
  });
  
  const onSubmit = (data) => {
    console.log(DataTransfer);
  };

  return (
    <div className="createPostPage">
       <div className="pageTitle"><h1> Create A Post! </h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="formContainer">
            <label for="title">Title:</label>
            <Field
              autocomplete="off"
              id="inputCreatePost"
              name="title"
              placeholder="(Ex. Title...)"
            />
             <label for="title">Post:</label>
            <Field
              autocomplete="off"
              id="inputCreatePost"
              name="postText"
              placeholder="(Ex. Post...)"
            />
             <label for="title">Username:</label>
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
