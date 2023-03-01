import React from "react";
import { screen, render } from "@testing-library/react";

import { GameView } from "./game";
import { mockBareBoard } from "../../views/game/utils.mock";

describe("Board", () => {
  it("should render", () => {
    const { container } = render(
      <GameView
        username="foobar"
        tiles={mockBareBoard}
        onMark={jest.fn()}
        onAdvanceTurn={jest.fn()}
        onReset={jest.fn()}
        picked={[]}
        winCondition=""
        elapsedTime={0}
        profile={null}
        onDeleteProfile={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render announcement on a won board & disable Get Number", () => {
    // not following actual data correctness
    // just want to test the announcement markup / visual
    // since otherwise we have to check if the board is already won at start
    // which is a bit illogical for this kind of game
    render(
      <GameView
        username="foobar"
        tiles={mockBareBoard}
        onMark={jest.fn()}
        onAdvanceTurn={jest.fn()}
        onReset={jest.fn()}
        picked={[0, 1, 2, 3, 4]}
        winCondition="row"
        elapsedTime={5}
        profile={null}
        onDeleteProfile={jest.fn()}
      />
    );
    expect(screen.getByTestId("announcement")).toMatchSnapshot();
    expect(screen.getByText("Get Number")).toHaveAttribute("disabled");
  });
});
