import React, { useState } from "react";
import { ideaState } from "../../App";
import "./IdeaCard.css";

type propTypes = {
  ideaObj: ideaState;
  setter: any;
};

// have a look into useReducer to remove value from the array/update current value - or have a custom hook for this
// maybe you could use it somewhere else later

function IdeaCard(props: propTypes): JSX.Element {
  const { ideaObj, setter } = props;
  const { title, textArea, changed } = ideaObj;
  const [editTitle, setEditTitle] = useState(false);
  const [editDesc, setEditDesc] = useState(false);

  const titleRender = editTitle ? <input value={title} /> : <div>{title}</div>;
  const descRender = editDesc ? (
    <textarea value={textArea} />
  ) : (
    <div>{textArea}</div>
  );

  function onDeletePress(): void {
    console.log("deleted");
  }

  return (
    <div className="wrapper">
      <div className="row">
        <p>Title:</p>
        {titleRender}
      </div>
      <div className="row">
        <p>Description:</p>
        {descRender}
      </div>
      <div className="btn_row">
        <button className="delete_btn" onClick={onDeletePress}>
          Delete idea
        </button>
        <div>{`${changed}`}</div>
      </div>
    </div>
  );
}

export default IdeaCard;
