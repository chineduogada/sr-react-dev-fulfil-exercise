import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import Button from "components/Button/Button";
import Input from "components/Form/Input";
import React from "react";
import { BsCaretDownFill } from "react-icons/bs";
import { layoutStyles } from "theme/components";
import { handleSortRowsAlphabetically } from "./helpers";
import DataTableProps, { Row, SortRowsByState } from "./interfaces";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const DataTable: React.FC<DataTableProps> = ({
  isLoading,
  columns,
  rows: originalRows,
  onRowClick,
}) => {
  const [rows, setRows] = React.useState<Array<Row>>(originalRows);
  const [selectedRows, setSelectedRows] = React.useState<
    Array<{ rowId: string | number }>
  >([]);

  const handleSelectOneRow = (rowId: string | number) => {
    if (
      selectedRows.some(({ rowId: selectedRowId }) => selectedRowId === rowId)
    ) {
      setSelectedRows(
        selectedRows.filter(
          ({ rowId: selectedRowId }) => selectedRowId !== rowId
        )
      );
    } else {
      setSelectedRows([...selectedRows, { rowId }]);
    }
  };

  const handleSelectAllRows = () => {
    const newSelectedRows =
      selectedRows.length === rows.length
        ? []
        : rows.map((row) => ({ rowId: row.id as string }));
    setSelectedRows(newSelectedRows);
  };

  console.log(selectedRows);

  const gridTemplateColumns = columns?.reduce(
    (acc, col) => acc + (col.width ? `${col.width} ` : "1fr "),
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
            onSelectAllRows={handleSelectAllRows}
            selectedRowsCount={selectedRows.length}
          />

          {/* Body */}
          <TableBody
            gridTemplateColumns={gridTemplateColumns}
            columns={columns}
            rows={rows}
            onRowClick={onRowClick}
            onSelectOneRow={handleSelectOneRow}
            selectedRows={selectedRows}
          />

          {isLoading && (
            <Center data-testid="data-table-loading" p={10}>
              <Spinner />
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
