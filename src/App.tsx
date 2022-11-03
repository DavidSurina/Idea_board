import React, { useEffect, useReducer, useRef } from "react";
import "./App.css";
import IdeaCard from "./Components/IdeaCard/IdeaCard";

export type ideaState = {
  title: string;
  textArea: string;
  changed: Date | undefined;
};

function App(): JSX.Element {
  const titleInputRef = useRef<HTMLInputElement>();
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: state.length,
            title: action.title,
            textArea: action.textArea,
            changed: action.changed,
          },
        ];
      case "delete":
        return state.filter((_, index) => index !== action.index);
      default:
        return state;
    }
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  function handleSubmit(e): void {
    e.preventDefault();
    if (
      titleInputRef.current.value !== "" &&
      textAreaRef.current.value !== ""
    ) {
      dispatch({
        type: "add",
        title: titleInputRef?.current?.value,
        textArea: textAreaRef?.current?.value,
        changed: new Date().toLocaleString(),
      });
      titleInputRef.current.value = "";
      textAreaRef.current.value = "";
    }
  }

  const boardsRender =
    items.length > 0 ? (
      items.map((idea) => <IdeaCard ideaObj={idea} setter={dispatch} />)
    ) : (
      <div>No ideas yet</div>
    );

  return (
    <div className="app">
      <header className="header">
        <h1>Idea Board</h1>
      </header>
      <body className="body">
        <form className="input_wrapper" onSubmit={handleSubmit}>
          <input
            ref={titleInputRef}
            className="input"
            placeholder="Idea title"
            minLength={5}
            maxLength={30}
          />
          <textarea
            ref={textAreaRef}
            className="textarea"
            minLength={10}
            maxLength={140}
            rows={3}
            placeholder="Idea title description"
          />
          <button className="input_btn" type="submit">
            Add idea
          </button>
        </form>
        <div className="divider" />
        <div className="board_wrapper">{boardsRender}</div>
      </body>
    </div>
  );
}

export default App;
