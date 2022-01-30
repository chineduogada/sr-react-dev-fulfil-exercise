import { Checkbox, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { TiArrowUnsorted } from "react-icons/ti";
import { layoutStyles } from "theme/components";
import { Column, SortRowsByState, TableHeadProps } from "./interfaces";

const TableHead: React.FC<TableHeadProps> = ({
  gridTemplateColumns,
  rows,
  columns,
  sortRowsBy,
  setSortRowsBy,
  selectedRowsCount,
  onSelectAllRows,
}) => {
  const handleColumnClick = (column: Column) => {
    if (column.id !== sortRowsBy.columnId)
      return setSortRowsBy({
        columnId: column.id,
        up: true,
        down: false,
      });

    setSortRowsBy((prevState: SortRowsByState) => ({
      columnId:
        prevState.down && prevState.columnId === column.id
          ? undefined
          : column.id,
      up: prevState.columnId && prevState.up ? false : true,
      down: prevState.columnId && prevState.up ? true : false,
    }));
  };

  const renderColumnSortIcon = (currentColumn: Column) => {
    if (currentColumn.id === sortRowsBy.columnId) {
      return (
        (sortRowsBy.up || sortRowsBy.down) && (
          <Icon
            transform="translate(5px, 2px)"
            data-testid={
              sortRowsBy.up
                ? `data-table-column-sort-up`
                : sortRowsBy.down
                ? `data-table-column-sort-down`
                : undefined
            }
          >
            {sortRowsBy.up && <BsCaretUpFill />}
            {sortRowsBy.down && <BsCaretDownFill />}
          </Icon>
        )
      );
    }

    if (currentColumn.id !== sortRowsBy.columnId)
      return (
        <Icon transform="translate(5px, 2px)" opacity={0.5}>
          <TiArrowUnsorted />
        </Icon>
      );
  };

  return (
    <>
      <Text textAlign={"right"} fontSize="xs" fontStyle="italic" mb={2}>
        Showing <b>{rows.length}</b> rows
      </Text>

      <Grid
        gridTemplateColumns={gridTemplateColumns}
        gridGap={5}
        borderBottom={layoutStyles.border}
        borderColor={layoutStyles.borderColor}
        h="40px"
        alignItems={"center"}
        data-testid="data-table-head"
      >
        <Flex alignItems="center">
          <Flex
            gridGap="1"
            p={"3px"}
            backgroundColor="accent.2"
            w="fit-content"
            {...layoutStyles}
            alignItems={"center"}
          >
            <Checkbox
              data-testid="data-table-checkbox"
              onChange={onSelectAllRows}
              isChecked={selectedRowsCount === rows.length}
            />

            {selectedRowsCount ? (
              <Text as="span" fontSize="xs" fontWeight="bold">
                {selectedRowsCount}
              </Text>
            ) : null}

            <Icon transform="translate(2px, 2px)">
              <BsCaretDownFill />
            </Icon>
          </Flex>
        </Flex>

        {columns?.map((column) => {
          const { id, label } = column;

          const activeStyles = {
            ...layoutStyles,
            outline: "none",
            backgroundColor: "accent.2",
          };

          return (
            <Flex
              as="button"
              border="1px"
              borderColor="transparent"
              alignItems="center"
              key={id}
              data-testid={`data-table-column`}
              onClick={() => handleColumnClick(column)}
              _hover={{ ...layoutStyles, backgroundColor: "accent.2" }}
              _focus={{ ...activeStyles, opacity: 0.7 }}
              {...(column.id === sortRowsBy.columnId && activeStyles)}
            >
              <Text fontWeight={"bold"} fontSize="xs">
                {label}
              </Text>

              {renderColumnSortIcon(column)}
            </Flex>
          );
        })}
      </Grid>
    </>
  );
};

export default TableHead;
