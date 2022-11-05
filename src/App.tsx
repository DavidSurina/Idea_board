import React, { useEffect, useReducer, useState, useId } from "react";
import "./App.css";
import IdeaCard from "./Components/IdeaCard/IdeaCard";
import { v4 as uuidv4 } from "uuid";

export type ideaState = {
  title: string;
  textArea: string;
  changed: Date | undefined;
  id: string;
};

function App(): JSX.Element {
  const [titleInput, setTitleInput] = useState("");
  const [textAreaInput, setTextAreaInput] = useState("");

  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        const id = uuidv4();
        return [
          ...state,
          {
            id: id,
            title: action.title,
            textArea: action.textArea,
            changed: action.changed,
          },
        ];
      case "update":
        return state.map((item) => {
          console.log(action);
          return item.id === action.id
            ? {
                id: item.id,
                title: action.title,
                textArea: action.textArea,
                changed: action.changed,
              }
            : item;
        });
      case "delete":
        return state.filter((item) => item.id !== action.id);
      default:
        return state;
    }
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  function handleSubmit(e): void {
    e.preventDefault();
    if (titleInput !== "" && textAreaInput !== "") {
      dispatch({
        type: "add",
        title: titleInput,
        textArea: textAreaInput,
        changed: new Date().toLocaleString(),
      });
      setTitleInput("");
      setTextAreaInput("");
    }
  }

  const boardsRender =
    items.length > 0 ? (
      items.map((idea) => (
        <IdeaCard key={idea.id} ideaObj={idea} setter={dispatch} />
      ))
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
            value={titleInput}
            className="input"
            placeholder="Idea title"
            minLength={5}
            maxLength={30}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <textarea
            value={textAreaInput}
            className="textarea"
            minLength={10}
            maxLength={140}
            rows={4}
            placeholder="Idea title description"
            onChange={(e) => setTextAreaInput(e.target.value)}
          />
          <button
            className="input_btn"
            type="submit"
            disabled={titleInput === "" || textAreaInput === ""}
          >
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
