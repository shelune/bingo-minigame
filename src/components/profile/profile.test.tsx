import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";

import Profile, { PlayerData } from "./profile";

const mockPlayerData: PlayerData = {
  name: "foobar",
  gamesCount: 1,
  totalTimeSpent: 9,
  recentGames: [{ winCondition: "column", turns: 13, elapsedTime: 9 }],
};

describe("Profile", () => {
  it("should render", () => {
    const { container } = render(
      <Profile
        setOpen={jest.fn()}
        isOpen
        playerData={mockPlayerData}
        deleteProfile={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("shouldn't show if not isOpen", () => {
    render(
      <Profile
        setOpen={jest.fn()}
        isOpen={false}
        playerData={mockPlayerData}
        deleteProfile={jest.fn()}
      />
    );
    expect(screen.getByTestId("profile-drawer")).not.toHaveClass("isOpen");
  });

  it("should show empty state if no playerData given", () => {
    const { container } = render(
      <Profile
        setOpen={jest.fn()}
        isOpen
        playerData={null}
        deleteProfile={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should call deleteProfile if button is clicked", () => {
    const mockDeleteProfile = jest.fn();
    render(
      <Profile
        setOpen={jest.fn()}
        isOpen={false}
        playerData={mockPlayerData}
        deleteProfile={mockDeleteProfile}
      />
    );
    screen.getByText("Delete Profile").click();
    expect(mockDeleteProfile).toHaveBeenCalled();
  });
});
