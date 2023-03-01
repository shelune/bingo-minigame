import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";

import { IntroView } from "./intro";

describe("IntroView", () => {
  it("should render", () => {
    const { container } = render(
      <IntroView
        setUsername={jest.fn()}
        setShowingGame={jest.fn()}
        username="Stranger"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should disable the button if no username", () => {
    render(
      <IntroView
        setUsername={jest.fn()}
        setShowingGame={jest.fn()}
        username=""
      />
    );
    expect(screen.getByText("Enter")).toHaveAttribute("disabled");
  });

  it("should call setUsername when typing in username", () => {
    const mockSetUsername = jest.fn();
    render(
      <IntroView
        setUsername={mockSetUsername}
        setShowingGame={jest.fn()}
        username=""
      />
    );
    fireEvent.change(screen.getByLabelText("Player name"), {
      target: {
        value: "Foobar",
      },
    });
    expect(mockSetUsername).toHaveBeenCalled();
  });

  it("should call setShowingGame when hitting Enter", () => {
    const mockSetShowingGame = jest.fn();
    render(
      <IntroView
        setUsername={jest.fn()}
        setShowingGame={mockSetShowingGame}
        username="Foobar"
      />
    );
    screen.getByText("Enter").click();
    expect(mockSetShowingGame).toHaveBeenCalled();
  });
});
