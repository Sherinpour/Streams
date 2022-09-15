import React from "react";
import { Field, reduxForm } from "redux-form";

const StreamForm = (props) => {
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  return (
    <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
      <Field name="title" component={renderInput} label="Enter the title: " />
      <Field
        name="description"
        component={renderInput}
        label="Ender the description"
      />
      <button className="ui button primary">submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "you must enter a title";
  }

  if (!formValues.description) {
    errors.description = "you must enter a description";
  }

  return errors;
};

export default reduxForm({ form: "streamCreate", validate })(StreamForm);
