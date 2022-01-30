import { Box, Checkbox, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import Button from "components/Button/Button";
import Input from "components/Form/Input";
import Image from "components/Image/Image";
import React from "react";
import { BsCaretDownFill, BsCaretUpFill, BsImage } from "react-icons/bs";
import { layoutStyles } from "theme/components";
import DataTableProps, { Column, Row, SortRowsByState } from "./interfaces";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows: originalRows,
}) => {
  const [rows, setRows] = React.useState<Array<Row>>(originalRows);

  const gridTemplateColumns = columns?.reduce(
    (acc, col) => acc + "1fr ",
    rows?.[0].image !== undefined ? "100px " : "50px "
  );

  const [sortRowsBy, setSortRowsBy] = React.useState<SortRowsByState>({});

  React.useEffect(() => {
    if (!sortRowsBy.columnId) return setRows(originalRows);

    const newRows = handleSortRowsAlphabetically({ rows, sortRowsBy });
    setRows(newRows);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortRowsBy.columnId, sortRowsBy.up, sortRowsBy.down]);

  return (
    <Box
      {...layoutStyles}
      as="section"
      data-testid="data-table"
      py={5}
      shadow="0 0 2px rgba(0, 0, 0, .1)"
    >
      <Flex
        mb={5}
        borderBottom={layoutStyles.border}
        borderColor={layoutStyles.borderColor}
      >
        <Button tabItem data-testid="tab-item" ml={5}>
          All
        </Button>
      </Flex>

      <Box px={5}>
        <Flex as="header">
          <Button rightIcon={<BsCaretDownFill />} roundedRight="none">
            Filter
          </Button>
          <Input
            placeholder="Search products"
            aria-label="Search products"
            roundedLeft="none"
          />
        </Flex>

        <Box mt={5}>
          {/* Head */}
          <TableHead
            gridTemplateColumns={gridTemplateColumns}
            columns={columns}
            rows={rows}
            sortRowsBy={sortRowsBy}
            setSortRowsBy={setSortRowsBy}
          />

          {/* Body */}
          <TableBody
            gridTemplateColumns={gridTemplateColumns}
            columns={columns}
            rows={rows}
          />
        </Box>
      </Box>
    </Box>
  );
};

const handleSortRowsAlphabetically = ({
  rows,
  sortRowsBy,
}: {
  rows: Array<Row>;
  sortRowsBy: SortRowsByState;
}) => {
  const newRows = [...rows];

  newRows.sort(function (a, b) {
    let firstValue: string | number = +a[sortRowsBy.columnId as string];
    let secondValue: string | number = +b[sortRowsBy.columnId as string];

    if (
      !firstValue &&
      firstValue !== 0 &&
      firstValue !== undefined &&
      firstValue !== null
    ) {
      firstValue = a[sortRowsBy.columnId as string];
      secondValue = b[sortRowsBy.columnId as string];
    }

    if (typeof firstValue === "string") {
      firstValue = `${firstValue}`.toUpperCase().trim(); // ignore upper and lowercase
      secondValue = `${secondValue}`.toUpperCase().trim(); // ignore upper and lowercase

      if (sortRowsBy.up) {
        if (firstValue < secondValue) {
          return -1;
        }
        if (firstValue > secondValue) {
          return 1;
        }
      } else {
        if (firstValue > secondValue) {
          return -1;
        }
        if (firstValue < secondValue) {
          return 1;
        }
      }
      return 0;
    }

    if (typeof firstValue === "number") {
      return sortRowsBy.up
        ? firstValue - +secondValue
        : +secondValue - firstValue;
    }

    return 0;
  });

  return newRows;
};

export default DataTable;
