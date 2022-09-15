import React from "react";
import { connect, useSelector } from "react-redux";
import { editStream } from "../../actions";
import { useParams } from "react-router-dom";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  const { id } = useParams();
  const stream = useSelector((state) => state.streams[id]);

  const onSubmitForm = (formValues) => {
    props.editStream(formValues);
  };

  const renderEditInputs = () => {
    if (!stream) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h3>Edit Stream</h3>
          <StreamForm initialValues={stream} onSubmit={onSubmitForm} />
        </div>
      );
    }
  };

  return <div>{renderEditInputs()}</div>;
};

export default connect(null, { editStream })(StreamEdit);
