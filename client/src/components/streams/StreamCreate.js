import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamCreate = (props) => {
  const onSubmitForm = (formValues) => {
    props.createStream(formValues);
  };

  return (
    <div>
      <h3>Create a Stream</h3>
      <StreamForm onSubmit={onSubmitForm} />
    </div>
  );
};

export default connect(null, { createStream })(StreamCreate);
