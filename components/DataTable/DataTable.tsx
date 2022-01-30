import { Box, Checkbox, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import Button from "components/Button/Button";
import Input from "components/Form/Input";
import Image from "components/Image/Image";
import React from "react";
import { BsCaretDownFill, BsCaretUpFill, BsImage } from "react-icons/bs";
import { layoutStyles } from "theme/components";

interface DataTableProps {
  //   x: string;
  columns: Array<{
    id: string;
    label: string;
    numeric: boolean;
    width?: string;
  }>;
  rows: Array<{
    id: string | number;
    image?: string | null;
    [x: string]: any;
  }>;
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows }) => {
  const gridTemplateColumns = columns?.reduce(
    (acc, col) => acc + "1fr ",
    rows?.[0].image !== undefined ? "100px " : "50px "
  );

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
          <>
            <Text textAlign={"right"} fontSize="xs" fontStyle="italic" mb={2}>
              Showing {rows.length} rows
            </Text>

            <Grid
              gridTemplateColumns={gridTemplateColumns}
              gridGap={5}
              borderBottom={layoutStyles.border}
              borderColor={layoutStyles.borderColor}
              h="40px"
              alignItems={"center"}
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
                  <Checkbox />

                  <Icon transform="translate(2px, 2px)">
                    <BsCaretDownFill />
                  </Icon>
                </Flex>
              </Flex>

              {columns?.map(({ id, label }) => (
                <Flex
                  alignItems="center"
                  key={id}
                  data-testid={`data-table-column`}
                >
                  <Text fontWeight={"bold"} fontSize="xs">
                    {label}
                  </Text>

                  <Icon
                    transform="translate(5px, 2px)"
                    data-testid="data-table-column-sort-up"
                  >
                    <BsCaretUpFill />
                  </Icon>
                  <Icon
                    transform="translate(5px, 2px)"
                    data-testid="data-table-column-sort-down"
                  >
                    <BsCaretDownFill />
                  </Icon>
                </Flex>
              ))}
            </Grid>
          </>

          {/* Body */}
          {rows?.map((row) => (
            <Grid
              key={row.id}
              data-testid={`data-table-row`}
              gridTemplateColumns={gridTemplateColumns}
              gridGap={5}
              borderBottom={layoutStyles.border}
              borderColor={layoutStyles.borderColor}
              h="60px"
              alignItems={"center"}
            >
              <Flex alignItems="center" justifyContent={"space-between"}>
                <Checkbox p={"3px"} />

                {row.image !== undefined &&
                  (row.image === null ? (
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      {...layoutStyles}
                      data-testid="data-table-row-no-image"
                      boxSize="50px"
                      fontSize="30px"
                      color="gray.500"
                      backgroundColor="accent.2"
                    >
                      <BsImage />
                    </Flex>
                  ) : (
                    <Image
                      src={row.image as string}
                      alt={row.product as string}
                      w="50px"
                      h="50px"
                    />
                  ))}
              </Flex>

              {columns?.map(({ id }) => (
                <Box
                  key={`${row.id}--${id}`}
                  data-testid={`data-table-row-cell`}
                >
                  <Text fontSize="xs">{row[id] || "null"}</Text>
                </Box>
              ))}
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
