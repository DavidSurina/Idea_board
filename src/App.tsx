import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import IdeaCard from "./Components/IdeaCard/IdeaCard";
import { v4 as uuidv4 } from "uuid";

export type ideaState = {
  title: string;
  textArea: string;
  created: Date | undefined;
  changed: Date | undefined;
  id: string;
};

export const localStorageName = "ideas_arr";

function App(): JSX.Element {
  const [titleInput, setTitleInput] = useState("");
  const [textAreaInput, setTextAreaInput] = useState("");

  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add": // to add items
        const id = uuidv4();
        return [
          ...state,
          {
            id: id,
            title: action.title,
            textArea: action.textArea,
            created: action.created,
            changed: action.changed,
          },
        ];
      case "add_all": // to retrieve items from local storage or when sorting
        return action.ideas;
      case "update": // to update items
        return state.map((item) => {
          return item.id === action.id
            ? {
                id: item.id,
                title: action.title,
                textArea: action.textArea,
                created: action.created,
                changed: action.changed,
              }
            : item;
        });
      case "delete": // to delete items
        return state.filter((item) => item.id !== action.id);
      default:
        return state;
    }
  }, []);

  // retrieves local storageItem and sets it if its present
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(localStorageName));
    if (savedItems) {
      dispatch({ type: "add_all", ideas: savedItems });
    }
  }, []);

  // sets items to localStorage - whenever items in useReducer change
  useEffect(() => {
    localStorage.setItem(localStorageName, JSON.stringify(items));
  }, [items]);

  function handleSubmit(e): void {
    e.preventDefault();
    if (titleInput !== "" && textAreaInput !== "") {
      dispatch({
        type: "add",
        title: titleInput,
        textArea: textAreaInput,
        created: new Date().toLocaleString(),
        changed: undefined,
      });
      setTitleInput("");
      setTextAreaInput("");
    }
  }

  function sortItems(
    array: Array<ideaState>,
    field: "title" | "created"
  ): void {
    const sortedItems = array.sort(function (a, b) {
      let fieldA = field === "title" ? a[field].toLowerCase() : a[field];
      let fieldB = field === "title" ? b[field].toLowerCase() : b[field];
      if (fieldA < fieldB) return -1;
      if (fieldA > fieldB) return 1;
      return 0;
    });
    console.log(sortedItems);

    dispatch({ ideas: sortedItems });
  }

  // renders the idea cards
  const ideaCardsRender =
    items.length > 0 ? (
      items.map((idea) => (
        <IdeaCard key={idea.id} ideaObj={idea} setter={dispatch} />
      ))
    ) : (
      <div>No ideas yet</div>
    );

  return (
    <div className="app">
      <section className="header">
        <h1>Idea Board</h1>
      </section>
      <section className="body">
        <form className="input_wrapper" onSubmit={handleSubmit}>
          <input
            value={titleInput}
            className="input"
            placeholder="Idea title"
            minLength={5}
            maxLength={30}
            onChange={(e) => setTitleInput(e.target.value)}
            data-testid="main-input"
          />
          <textarea
            value={textAreaInput}
            className="textarea"
            minLength={10}
            maxLength={140}
            rows={4}
            placeholder="Idea description"
            data-testid="main-textArea"
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
        <div className="filter_wrapper">
          <p>Filter by:</p>
          <div className="filter_btn-wrapper">
            <button
              type="button"
              className="input_btn"
              onClick={(e) => {
                e.preventDefault();
                sortItems(items, "created");
              }}
            >
              Created Date
            </button>
            <div className="filter_separator" />
            <button
              type="button"
              className="input_btn"
              onClick={(e) => {
                e.preventDefault();
                sortItems(items, "title");
              }}
            >
              Title
            </button>
          </div>
        </div>
        <section className="board_wrapper">{ideaCardsRender}</section>
      </section>
    </div>
  );
}

export default App;
