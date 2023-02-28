import React from "react";
import { screen, render } from "@testing-library/react";

import Board from "./board";
import { mockBareBoard } from "../../views/game/utils.mock";

describe("Board", () => {
  it("should render", () => {
    const { container } = render(
      <Board tiles={mockBareBoard} onMark={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should call onMark when clicking a tile", () => {
    const mockOnMark = jest.fn();
    render(<Board tiles={mockBareBoard} onMark={mockOnMark} />);
    screen.getAllByTestId("tile")[0].click();
    expect(mockOnMark).toHaveBeenCalled();
  });
});
