import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it } from "vitest";

import App from "@/app";

describe("App", () => {
  it("renders without crashing", async () => {
    render(<App />);
    await screen.findByText("Vite + React");

    await screen.findByText("count is 0");

    await userEvent.click(await screen.findByTestId("count"));

    await screen.findByText("count is 1");
  });
});
