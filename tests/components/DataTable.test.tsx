import DataTable from "components/DataTable/DataTable";
import { render, screen, user, cleanup } from "../utils/test-utils";

const setup = (props = {}) => {
  render(
    <DataTable
      {...{
        columns: [
          { id: "name", label: "Name", numeric: false, width: "100px" },
        ],
        rows: [
          {
            id: 1,
            name: "test name",
          },
        ],
        onRowClick: jest.fn(),
        ...props,
      }}
    />
  );
};

describe("DataTable Component", () => {
  describe("User interface", () => {
    test("renders header correctly", () => {
      setup();

      expect(screen.getAllByTestId(/tab-item/i).length).toBe(1);
      expect(
        screen.getByRole("button", { name: /filter/i })
      ).toBeInTheDocument();
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

    test("renders rows and images as expected", () => {
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
            id: "3",
            product: "Product 3",
            price: "Price 3",
          },
        ],
      };
      setup(props);

      expect(screen.getAllByTestId("data-table-row").length).toBe(
        props.rows.length
      );
      expect(screen.getAllByTestId("data-table-row-cell").length).toBe(
        props.columns.length * props.rows.length
      );

      expect(screen.getByText(/showing/i)).toBeInTheDocument();
      expect(screen.getByText(/rows/i)).toBeInTheDocument();
      expect(screen.getAllByRole("img", { name: /product/i }).length).toBe(1);
      expect(
        screen.getByRole("img", { name: "Product 1" })
      ).toBeInTheDocument();
      expect(screen.getAllByTestId("data-table-row-no-image").length).toBe(1);
    });

    test("ensures row can be sorted by a column", () => {
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
        rows: [
          {
            id: "1",
            product: "Product 1",
            price: "Price 1",
          },
          {
            id: "2",
            product: "Product 2",
            price: "Price 2",
          },
          {
            id: "3",
            product: "Product 3",
            price: "Price 3",
          },
        ],
      };
      setup(props);

      expect(screen.queryAllByTestId("data-table-column-sort-up").length).toBe(
        0
      );
      expect(
        screen.queryAllByTestId("data-table-column-sort-down").length
      ).toBe(0);

      const clickOnColumnCell = ({
        shouldShowUpSortIcon,
        shouldShowNoSortIcons,
        cell,
      }: {
        shouldShowUpSortIcon?: boolean;
        shouldShowNoSortIcons?: boolean;
        cell: HTMLElement;
      }) => {
        user.click(cell);
        expect(
          screen.queryAllByTestId("data-table-column-sort-up").length
        ).toBe(shouldShowNoSortIcons ? 0 : shouldShowUpSortIcon ? 1 : 0);
        expect(
          screen.queryAllByTestId("data-table-column-sort-down").length
        ).toBe(shouldShowNoSortIcons ? 0 : shouldShowUpSortIcon ? 0 : 1);
      };

      const productColumnElement =
        screen.getAllByTestId("data-table-column")[0];
      const priceColumnElement = screen.getAllByTestId("data-table-column")[1];

      clickOnColumnCell({
        cell: productColumnElement,
        shouldShowUpSortIcon: true,
      });
      clickOnColumnCell({
        cell: productColumnElement,
        shouldShowUpSortIcon: false,
      });
      clickOnColumnCell({
        cell: productColumnElement,
        shouldShowNoSortIcons: true,
      });
      clickOnColumnCell({
        cell: priceColumnElement,
        shouldShowUpSortIcon: true,
      });
    });
  });

  describe("SPECIFICATIONs", () => {
    it("Should have provision to right align numeric fields in column", () => {
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

      expect(screen.getAllByTestId("data-table-row-cell")[0]).toHaveStyle(
        "text-align: left"
      );
      expect(screen.getAllByTestId("data-table-row-cell")[1]).toHaveStyle(
        "text-align: right"
      );
    });

    it("Should be able to set column width and if not set width should auto adjust itself", () => {
      const props = {
        columns: [
          {
            id: "product",
            label: "Product",
          },
          {
            id: "price",
            label: "Price",
            width: "10px",
          },
          {
            id: "vendor",
            label: "Vendor",
          },
        ],
      };
      setup(props);

      expect(screen.getByTestId("data-table-row")).toHaveStyle(
        "grid-template-columns: 50px 1fr 10px 1fr"
      );
      expect(screen.getByTestId("data-table-head")).toHaveStyle(
        "grid-template-columns: 50px 1fr 10px 1fr"
      );
    });

    it("Should register an event when row is clicked", () => {
      const onRowClick = jest.fn();
      const props = {
        onRowClick,
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
        rows: [
          {
            id: "1",
            product: "Product 1",
            price: "Price 1",
          },
        ],
      };
      setup(props);

      const row = screen.getByTestId("data-table-row");
      user.click(row);

      expect(onRowClick).toHaveBeenCalled();
      expect(onRowClick).toHaveBeenCalledTimes(1);
    });

    it("Should be able to select rows using checkboxes in rows or using select all checkbox in header", () => {
      const props = {
        rows: [
          {
            id: "1",
            name: "name 1",
          },
          {
            id: "1",
            name: "name 2",
          },
          {
            id: "1",
            name: "name 3",
          },
        ],
      };
      setup(props);

      let tableCheckbox = screen.getByTestId("data-table-checkbox");
      const rowCheckboxList = screen.getAllByTestId("data-table-row-checkbox");
      expect(rowCheckboxList.length).toBe(3);
      expect(tableCheckbox).toBeInTheDocument();

      user.click(tableCheckbox);
      expect(tableCheckbox).toHaveAttribute("data-checked");
      rowCheckboxList.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute("data-checked");
      });
    });

    it("Should have provision to infinite scroll", () => {
      let props = {
        isLoading: false,
      };
      setup(props);
      expect(screen.queryAllByTestId("data-table-loading").length).toBe(0);

      cleanup();

      let newProps = {
        isLoading: true,
        rows: [
          {
            id: "1",
            name: "name 1",
          },
          {
            id: "2",
            name: "name 2",
          },
        ],
      };
      setup(newProps);

      expect(screen.getAllByTestId("data-table-row").length).toBe(2);
      expect(screen.getAllByTestId("data-table-loading").length).toBe(1);
    });
  });
});
