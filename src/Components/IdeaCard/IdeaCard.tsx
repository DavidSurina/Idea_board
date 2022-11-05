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
  const { title, textArea, changed, id } = ideaObj;
  const [editTitle, setEditTitle] = useState({
    isEditable: false,
    value: title,
  });
  const [editDesc, setEditDesc] = useState({
    isEditable: false,
    value: textArea,
  });
  const initialInputValue = title;
  const initialTextareaValue = textArea;

  function updateCard(): void {
    setter({
      type: "update",
      id: id,
      title: editTitle.value,
      textArea: editDesc.value,
      changed: new Date().toLocaleString(),
    });
  }

  function deleteCard(): void {
    setter({
      type: "delete",
      id: id,
    });
  }

  const titleBtnRender = !editTitle.isEditable ? (
    <button
      type="button"
      onClick={() => {
        setEditTitle((prevState) => ({ ...prevState, isEditable: true }));
        console.log("fired", editTitle);
      }}
    >
      Edit
    </button>
  ) : (
    <button
      disabled={editTitle.value === initialInputValue}
      type="button"
      onClick={() => {
        updateCard();
        setEditTitle((prevState) => ({ ...prevState, isEditable: false }));
      }}
    >
      Update
    </button>
  );

  const titleRender = editTitle.isEditable ? (
    <input
      className="card_input"
      minLength={5}
      maxLength={30}
      value={editTitle.value}
      onChange={(e) =>
        setEditTitle((prevState) => ({ ...prevState, value: e.target.value }))
      }
    />
  ) : (
    <div className="card_text">{editTitle.value}</div>
  );

  const textAreaBtnRender = !editDesc.isEditable ? (
    <button
      type="button"
      onClick={() =>
        setEditDesc((prevState) => ({ ...prevState, isEditable: true }))
      }
    >
      Edit
    </button>
  ) : (
    <button
      disabled={editDesc.value === initialTextareaValue}
      type="button"
      onClick={() => {
        updateCard();
        setEditDesc((prevState) => ({ ...prevState, isEditable: false }));
      }}
    >
      Update
    </button>
  );

  const descRender = editDesc.isEditable ? (
    <textarea
      className="card_textArea"
      minLength={10}
      maxLength={140}
      rows={5}
      value={editDesc.value}
      onChange={(e) =>
        setEditDesc((prevState) => ({ ...prevState, value: e.target.value }))
      }
    />
  ) : (
    <div className="card_text">{editDesc.value}</div>
  );

  return (
    <div className="card_wrapper">
      <div className="row">
        <p>Title:</p>
        {titleBtnRender}
      </div>
      {titleRender}
      <div className="row">
        <p>Description:</p>
        {textAreaBtnRender}
      </div>
      {descRender}
      <div className="btn_row">
        <button className="delete_btn" onClick={deleteCard}>
          Delete idea
        </button>
        <div>{`${changed}`}</div>
      </div>
    </div>
  );
}

export default IdeaCard;
