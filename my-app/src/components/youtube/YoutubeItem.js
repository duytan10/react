import React from "react";

function YoutubeItem(props) {
  return (
    <div className="youtube-item">
      <div
        className="youtube__image"
        // style={{
        //   height: "250px",
        // }}
      >
        <img
          src={props.image}
          alt=""
          // style={{
          //   display: "block",
          //   maxWidth: "100%",
          //   width: "100%",
          //   height: "100%",
          //   objectFit: "cover",
          // }}
        />
      </div>
      <div className="youtube__footer">
        <img src={props.avatar} alt="" className="youtube__avatar" />
        <div className="youtube-info">
          <h3 className="youtube__title">{props.title}</h3>
          <h4 className="youtube__author">{props.author}</h4>
        </div>
      </div>
    </div>
  );
}

export default YoutubeItem;
