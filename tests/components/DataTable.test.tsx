import DataTable from "components/DataTable/DataTable";
import { render, screen } from "../utils/test-utils";

describe("DataTable Component", () => {
  test("renders header correctly", () => {
    render(<DataTable />);
    expect(screen.getAllByTestId(/tab-item/i).length).toBe(1);
    expect(screen.getByRole("button", { name: /filter/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/search products/i)).toBeInTheDocument();
  });
});
