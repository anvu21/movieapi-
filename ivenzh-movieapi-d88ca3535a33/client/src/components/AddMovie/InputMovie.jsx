import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";

import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

export const InputMovie = () => {

  const initialValues = {
    link_url: "",
    cover_url: "",
    title: "",
    __v: 0,
    rating: 0,
    description: "",
    genres: [],
  };

  const Post = () => (
    <div>
      <h1>Insert Movie</h1>
      <Formik
        initialValues = { initialValues }
        onSubmit = { async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          //alert(JSON.stringify(values, null, 2));
          console.log("Submitted value: " + JSON.stringify(values));

          try {
            const url = "/movies";
            console.log(url);
            // const { values: res } = await axios.post(url, values);
            // console.log(res)
            const response = await fetch("/movies", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });

            console.log("success");
          } catch (error) {
            console.log(error);
          }

        }}
      >
        {({ values }) => (
          <Form>
            <Field
              name={"link_url"}
              placeholder="Link URL"
              type="text" required
            />
            <Field
              name={"cover_url"}
              placeholder="Cover URL"
              type="text" required
            />
            <Field
              name={"title"}
              placeholder="Title"
              type="text" required
            />
            <Field
              name={"rating"}
              placeholder="Rating"
              type="number" required
            />
            <Field
              name={"description"}
              placeholder="Description"
              type="text" required
            />

            <FieldArray name="genres">
              {({ insert, remove, push }) => (
                <div>
                  {values.genres.length > 0 &&
                    values.genres.map((friend, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label htmlFor={`genres.${index}`}>Name</label>
                          <Field
                            name={`genres.${index}`}
                            placeholder="Te"
                            type="text"
                          />
                          <ErrorMessage
                            name={`genres.${index}`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            Delete Genres
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push()}
                  >
                    Add Genres
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Invite</button>
          </Form>
        )}
      </Formik>
    </div>
  );


  return (
    <Post />
  );
};
export default InputMovie;
