import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import App from "@/app";

describe("App", () => {
  it("renders without crashing", async () => {
    render(<App />);
    await screen.findByText("Vite + React");
  });
});
