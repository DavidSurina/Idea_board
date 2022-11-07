import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  const testText1 = "test-123";
  const testText2 = "test 1323412, hello neigbour";
  const extraInput = "extra";

  test("renders initial inputs and elements correctly", async () => {
    render(<App />);

    expect(screen.getByRole("heading")).toHaveTextContent("Idea Board");
    expect(screen.getByTestId("main-input")).toHaveClass("input");
    expect(screen.getByTestId("main-textArea")).toHaveClass("textarea");
    expect(screen.getByRole("button", { name: "Add idea" })).toBeDisabled();
    expect(screen.getByText("No ideas yet")).toBeInTheDocument();

    cleanup();
  });

  test("inputs and submit btn behave correctly and submit creates an idea box with correct content", async () => {
    render(<App />);

    await userEvent.type(screen.getByTestId("main-input"), testText1);
    expect(screen.getByRole("button", { name: "Add idea" })).toBeDisabled();

    await userEvent.type(screen.getByTestId("main-textArea"), testText2);
    expect(screen.getByRole("button", { name: "Add idea" })).not.toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: "Add idea" }));

    const ideaBox = screen.getAllByTestId("card_wrapper");
    expect(ideaBox).toHaveLength(1); // check if one box was created
    expect(ideaBox[0]).toHaveTextContent(testText1);
    expect(ideaBox[0]).toHaveTextContent(testText2);
  });

  test("input field in card updates value correctly and saves in localStorage", async () => {
    render(<App />);
    const ideaBox = screen.getByTestId("card_wrapper");
    Storage.prototype.setItem = jest.fn();
    // check for input field
    expect(within(ideaBox).queryByDisplayValue(testText1)).toBeNull();
    userEvent.click(within(ideaBox).getByTestId("edit_input"));
    // input field should be present
    expect(within(ideaBox).getByDisplayValue(testText1)).toBeInTheDocument();
    // update btn should be disabled
    expect(within(ideaBox).getByTestId("update_input")).toBeDisabled();
    // type in and it should be enabled
    await userEvent.type(
      within(ideaBox).getByDisplayValue(testText1),
      extraInput
    );
    expect(within(ideaBox).getByTestId("update_input")).not.toBeDisabled();
    // click on update
    await userEvent.click(
      within(ideaBox).getByRole("button", { name: "Update" })
    );
    // and it should save the value and call the save to local storage
    expect(
      within(ideaBox).getByText(`${testText1}${extraInput}`)
    ).toBeInTheDocument();
    expect(
      within(ideaBox).queryByDisplayValue(`${testText1}${extraInput}`)
    ).toBeNull();
    expect(localStorage.setItem).toHaveBeenCalled();

    jest.clearAllMocks();
  });

  test("text area in card updates the value correctly and saves in local storage", async () => {
    render(<App />);
    const ideaBox = screen.getByTestId("card_wrapper");
    Storage.prototype.setItem = jest.fn();

    // check for input field
    expect(within(ideaBox).queryByDisplayValue(testText2)).toBeNull();
    userEvent.click(within(ideaBox).getByTestId("edit_textArea"));
    // input field should be present
    expect(within(ideaBox).getByDisplayValue(testText2)).toBeInTheDocument();
    // update btn should be disabled
    expect(within(ideaBox).getByTestId("update_textArea")).toBeDisabled();
    // type in and it should be enabled
    await userEvent.type(
      within(ideaBox).getByDisplayValue(testText2),
      extraInput
    );
    expect(within(ideaBox).getByTestId("update_textArea")).not.toBeDisabled();
    // click on update
    await userEvent.click(
      within(ideaBox).getByRole("button", { name: "Update" })
    );
    // and it should save the value and call the save to local storage
    expect(
      within(ideaBox).getByText(`${testText2}${extraInput}`)
    ).toBeInTheDocument();
    expect(
      within(ideaBox).queryByDisplayValue(`${testText2}${extraInput}`)
    ).toBeNull();
    expect(localStorage.setItem).toHaveBeenCalled();

    jest.clearAllMocks();
  });

  test("delete button in card deletes the card and deletes from local storage", async () => {
    render(<App />);
    const ideaBox = screen.getByTestId("card_wrapper");
    Storage.prototype.setItem = jest.fn();
    // get the delete btn and click on it, expect local storage save to be called
    await userEvent.click(
      within(ideaBox).getByRole("button", { name: "Delete idea" })
    );
    expect(localStorage.setItem).toHaveBeenCalled();

    jest.clearAllMocks();
    cleanup();
  });
});
