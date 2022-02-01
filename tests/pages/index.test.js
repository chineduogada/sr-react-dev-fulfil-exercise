import { render, screen } from "../utils/test-utils";
import HomePage from "pages/index";

describe("HomePage", () => {
  test("renders `Hello`", () => {
    render(<HomePage />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});
