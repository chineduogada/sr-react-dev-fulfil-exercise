import DataTable from "components/DataTable/DataTable";
import { render, screen } from "../utils/test-utils";

const setup = (
  props = {
    columns: [{ id: "1", label: "Name", numeric: false, width: "100px" }],
  }
) => {
  render(<DataTable {...props} />);
};

describe("DataTable Component", () => {
  test("renders header correctly", () => {
    setup();

    expect(screen.getAllByTestId(/tab-item/i).length).toBe(1);
    expect(screen.getByRole("button", { name: /filter/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/search products/i)).toBeInTheDocument();
  });

  test("renders columns", () => {
    const props = {
      columns: [
        {
          id: "product",
          label: "Product",
          numeric: false,
          width: "10px",
        },
        {
          id: "price",
          label: "Price",
          numeric: true, // Right Align
          width: "10px",
        },
      ],
    };

    setup(props);

    expect(screen.getAllByTestId(/data-table-column/i).length).toBe(2);
  });
});
