import DataTable from "components/DataTable/DataTable";
import { render, screen, user } from "../utils/test-utils";

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

      screen.debug();

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
  });
});
