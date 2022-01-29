import DataTable from "components/DataTable/DataTable";
import { render, screen } from "../utils/test-utils";

describe("DataTable Component", () => {
  test("renders page heading", () => {
    render(<DataTable x="" />);
    expect(screen.getByText(/DataTable/i)).toBeInTheDocument();
  });
});
