import { render, screen } from "../utils/test-utils";
import HomePage from "pages/index";

describe("HomePage", () => {
  test("renders page heading", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", {
        name: /Sr. React Developer - Fulfil Recruiting Exercise/i,
      })
    ).toBeInTheDocument();
  });
});
