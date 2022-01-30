import DataTable from "components/DataTable/DataTable";
import { render, screen } from "../utils/test-utils";

const setup = (props = {}) => {
  render(
    <DataTable
      {...{
        columns: [{ id: "1", label: "Name", numeric: false, width: "100px" }],
        rows: [
          {
            id: 1,
          },
        ],
        ...props,
      }}
    />
  );
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

    expect(screen.getAllByTestId("data-table-column").length).toBe(2);
    expect(screen.getAllByTestId("data-table-column")[0]).toHaveTextContent(
      "Product"
    );
    expect(screen.getAllByTestId("data-table-column")[1]).toHaveTextContent(
      "Price"
    );
  });

  test("renders rows and verify images", () => {
    const props = {
      rows: [
        {
          id: "1",
          image: "https://via.placeholder.com/100",
          product: "Product 1",
          price: "Price 1",
        },
        {
          id: "2",
          image: null,
          product: "Product 2",
          price: "Price 2",
        },
        {
          id: "2",
          product: "Product 3",
          price: "Price 3",
        },
      ],
    };
    setup(props);

    expect(screen.getAllByTestId("data-table-row").length).toBe(3);
    expect(screen.getAllByTestId("data-table-row-cell").length).toBe(3);
    expect(screen.getAllByRole("img", { name: /product/i }).length).toBe(1);
    expect(screen.getByRole("img", { name: "Product 1" })).toBeInTheDocument();
    expect(screen.getAllByTestId("data-table-row-no-image").length).toBe(1);
  });
});
