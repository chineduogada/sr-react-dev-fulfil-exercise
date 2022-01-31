import { render, screen, act } from "../utils/test-utils";
import HomePage from "pages/index";

const setup = () => {
  act(() => {
    render(<HomePage />);
  });
};

describe("HomePage", () => {
  it("renders page heading", async () => {
    setup();
    expect(
      await screen.findByRole("heading", {
        name: /Sr. React Developer - Fulfil Recruiting Exercise/i,
      })
    ).toBeInTheDocument();
  });
  it("renders DataTable", async () => {
    setup();
    expect(await screen.findByTestId("data-table")).toBeInTheDocument();
  });
});
