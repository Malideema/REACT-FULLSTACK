import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';

function CreatePost() {
  return (
    <div className="createPostPage">
      <h1> Create A Post! </h1>
      <Formik>
          <Form>
            <Field
              id="inputCreatePost"
              name="title"
              placeholder="(Ex. John...)"
            />
          </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
