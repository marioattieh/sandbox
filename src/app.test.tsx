import { render, screen, userEvent } from "@test-utils";

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
