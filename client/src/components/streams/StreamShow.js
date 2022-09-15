import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StreamShow = () => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const stream = useSelector((state) => state.streams[id]);

  useEffect(() => {
    var flvPlayer = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${stream.id}.flv`,
    });
    flvPlayer.attachMediaElement(videoRef.current);
    flvPlayer.load();
  }, []);

  const renderContent = () => {
    if (!stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = stream;
    return (
      <div>
        <video ref={videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  };
  return <div>{renderContent()}</div>;
};

export default StreamShow;
