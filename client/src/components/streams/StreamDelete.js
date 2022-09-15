import React from "react";
import { connect, useSelector } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { useParams } from "react-router-dom";
import { deleteStream } from "../../actions";

const StreamDelete = (props) => {
  const { id } = useParams();
  const stream = useSelector((state) => state.streams[id]);

  const streamDelete = () => {
    props.deleteStream(id);
  };

  const renderActions = () => {
    return (
      <>
        <button className="ui button negative" onClick={() => streamDelete()}>
          Delete
        </button>
        <button className="ui button">Cancel</button>
      </>
    );
  };

  const renderContent = () => {
    if (!stream) {
      return "Are you sure you want delete this stream";
    }
    return `Are you sure you want delete this stream: ${stream.title}`;
  };

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  );
};

export default connect(null, { deleteStream })(StreamDelete);
